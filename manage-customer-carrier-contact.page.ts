import { expect, type Locator, type Page } from '@playwright/test';
import { PublishCarrierContactMockData } from 'Integration-E2E/mocks/managecarriercontactMockData';
import { CustomerCarrierContactForm } from 'Integration-E2E/spec/manage-customer-carrier-contacts.spec';
import { Utilities } from '../utilities/actions';

let publishContactMockData: PublishCarrierContactMockData;

export class ManageCustomerCarrierContactsPage {
  readonly page: Page;
  readonly carrierContactText: Locator;
  readonly selectPlanName: Locator;
  readonly successMsg: Locator;
  readonly errorMsg: Locator;
  readonly pickEffectiveDate: Locator;
  readonly sidePanel: Locator;
  readonly preEnrollmentPhoneNumber: Locator;
  readonly postEnrollmentPhoneNumber: Locator;
  readonly providerSearchUrl: Locator;
  readonly findDoc: Locator;
  readonly publishEffectiveDate: Locator;
  readonly editBtn: Locator;
  readonly cancelBtn: Locator;
  readonly cdkPanelOverlay: Locator;

  utilities = new Utilities();

  constructor(page: Page) {
    this.page = page;
    publishContactMockData = new PublishCarrierContactMockData(this.page);
    this.carrierContactText = page.getByRole('button', { name: 'Bulk Update' });
    this.selectPlanName = this.page.locator('#ag-90-input');
    this.successMsg = page.getByText(
      'Your carrier contact information has been successfully updated'
    );
    this.errorMsg = page.getByText('Our system encountered an error, republish to try again.');
    this.pickEffectiveDate = page.getByText('Pick Effective Date');
    this.sidePanel = page.locator('.t1-drawer-container');
    this.preEnrollmentPhoneNumber = page.getByLabel('Pre-Enrollment Phone Number');
    this.postEnrollmentPhoneNumber = page.getByLabel('Post-Enrollment Phone Number');
    this.providerSearchUrl = page.getByLabel('Provider Search URL');
    this.findDoc = page.getByLabel('Find a Doc');
    this.publishEffectiveDate = page.getByLabel('Effective Date', { exact: true });
    this.editBtn = this.page.locator('.t1-drawer-container').getByRole('button', { name: 'Edit' });
    this.cancelBtn = this.page.getByRole('button', { name: 'Cancel' });
    this.cdkPanelOverlay = page.locator('.cdk-overlay-container').getByRole('listbox');
  }

  public async manageCarrierContact(formData: CustomerCarrierContactForm) {
    await this.page.locator('#ag-81-input').check();
    // Changing it to click because playwright tests are flaky using check()
    await this.page.locator('#ag-92-input').click();
    await this.page.waitForTimeout(1000);
    await this.utilities.executeStep(
      this.carrierContactText,
      'click',
      'click on Customer Carrier Contact link'
    );
    await this.fillCustomerCarrierContactForm('Manage', formData);
    await this.page.getByLabel('Selected Plans').getByRole('button').first();
  }

  public async viewAndEditAndPublishCarrierContact(formData: CustomerCarrierContactForm) {
    await publishContactMockData.getCarrierContactDetails(formData.basePlanIds[0]);
    await publishContactMockData.getCarrierEffectiveDates(formData.basePlanIds[0]);
    await this.utilities.executeStep(
      this.page.locator('//button//span[contains(text(),"View")]').first(),
      'click',
      'click on first plan View link'
    );
    const noDataAvailable = await this.page.locator('text="No data available."').isVisible();
    if (noDataAvailable) {
      return;
    }
    await this.utilities.executeStep(this.editBtn, 'click', 'click on Edit button');
    await this.fillCustomerCarrierContactForm('Edit', formData);
    await this.publishCarrierContact();
  }

  public async viewAndCancelEditCarrierContact(formData: CustomerCarrierContactForm) {
    await publishContactMockData.getCarrierContactDetails(formData.basePlanIds[0]);
    await publishContactMockData.getCarrierEffectiveDates(formData.basePlanIds[0]);
    await this.utilities.executeStep(
      this.page.locator('//button//span[contains(text(),"View")]').first(),
      'click',
      'click on first plan View link'
    );
    const noDataAvailable = await this.page.locator('text="No data available."').isVisible();
    if (noDataAvailable) {
      return;
    }
    await this.utilities.executeStep(this.editBtn, 'click', 'click on Edit button');
    await this.fillCustomerCarrierContactForm('Edit', formData);
    await this.utilities.executeStep(this.cancelBtn, 'click', 'click on Cancel button');
    await this.utilities.assertStep(
      this.sidePanel,
      'text',
      'Validate Manage Customer Carrier Contacts Header',
      'View Customer Carrier Contacts'
    );
  }

  public async editCarrierContact(formData: CustomerCarrierContactForm) {
    await publishContactMockData.getCarrierEffectiveDates(formData.basePlanIds[0]);
    await publishContactMockData.getCarrierContactDetails(formData.basePlanIds[0]);
    await this.utilities.executeStep(
      this.page.locator('//button//span[contains(text(),"Edit")]').first(),
      'click',
      'click on first plan Edit link'
    );
    await this.fillCustomerCarrierContactForm('Edit', formData);
  }

  public async editAndCancelCarrierContact(formData: CustomerCarrierContactForm) {
    await publishContactMockData.getCarrierEffectiveDates(formData.basePlanIds[0]);
    await this.editCarrierContact(formData);
    await this.utilities.executeStep(this.cancelBtn, 'click', 'click on Cancel button');
    await expect(this.sidePanel).not.toBeVisible();
  }

  async publishCarrierContact(errorCode?: number) {
    await publishContactMockData.publishContactMessage(errorCode);
    await expect(this.page.getByRole('button', { name: 'Publish' })).toBeVisible();
    await this.page.getByRole('button', { name: 'Publish' }).click();
    if (errorCode) {
      await this.utilities.assertStep(
        this.errorMsg,
        'visible',
        'error Message  displayed after publish'
      );
    } else {
      await this.utilities.assertStep(
        this.successMsg,
        'visible',
        'Success confirmation displayed after publish'
      );
    }
  }

  async fillCustomerCarrierContactForm(action: string, formData: CustomerCarrierContactForm) {
    await this.page.waitForTimeout(1000);
    await this.utilities.assertStep(
      this.sidePanel,
      'text',
      'Validate Manage Customer Carrier Contacts Header',
      action + ' Customer Carrier Contacts'
    );

    if (action === 'Edit') {
      const effDtMMDDYYYY = new Date(formData.pickEffectiveDate!).toLocaleDateString('en-US');
      const isPickEffectiveDateVisible = await this.pickEffectiveDate.isVisible();
      const isEffDtVisible = await this.page.locator('text="' + effDtMMDDYYYY + '"').isVisible();
      if (!isPickEffectiveDateVisible && isEffDtVisible) {
        await this.pickEffectiveDate.waitFor();
        await this.pickEffectiveDate.click();
        await this.selectCdkOption(effDtMMDDYYYY);
      }
    }

    await this.utilities.assertStep(
      this.preEnrollmentPhoneNumber,
      'visible',
      'Validate Pre-Enrollment Phone Number'
    );
    await this.utilities.executeStep(
      this.preEnrollmentPhoneNumber,
      'fill',
      'Fill Pre-Enrollment Phone Number',
      formData.preEnrollmentPhoneNumber
    );

    await this.utilities.assertStep(
      this.postEnrollmentPhoneNumber,
      'visible',
      'Validate Post-Enrollment Phone Number'
    );
    await this.utilities.executeStep(
      this.postEnrollmentPhoneNumber,
      'fill',
      'Fill Post-Enrollment Phone Number',
      formData.postEnrollmentPhoneNumber
    );

    await this.utilities.assertStep(
      this.providerSearchUrl,
      'visible',
      'Validate Provider Search URL'
    );
    await this.utilities.executeStep(
      this.providerSearchUrl,
      'fill',
      'Fill Provider Search URL',
      formData.providerSearchUrl
    );

    await this.utilities.assertStep(this.findDoc, 'visible', 'Validate Find a Doc');
    await this.utilities.executeStep(this.findDoc, 'fill', 'Fill Find a Doc', formData.findDoc);

    await this.utilities.assertStep(
      this.publishEffectiveDate,
      'visible',
      'Validate Effective Date'
    );
    const effDtMMDDYYYY = new Date(formData.publishEffectiveDate).toLocaleDateString('en-US');
    await this.utilities.executeStep(
      this.publishEffectiveDate,
      'fill',
      'Fill Effective Date',
      effDtMMDDYYYY
    );
  }

  private async selectCdkOption(value: string): Promise<any> {
    const option = this.page.locator('t1-option', { hasText: value });
    const cdkPanelOverlay = this.cdkPanelOverlay.filter({ has: option });
    await expect(cdkPanelOverlay).toBeVisible();
    await cdkPanelOverlay.locator(option).click();
    await this.page.keyboard.press('Escape');
  }
}
