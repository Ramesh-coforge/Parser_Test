import { expect, type Locator, type Page } from '@playwright/test';
import { TemplateMockData } from '../mocks/templatesMockData';
import { Utilities } from '../utilities/actions';

let template: TemplateMockData;
export class ConfirmationPopUpOnBackButtonPage {
  readonly page: Page;
  readonly dentalAttributeEdit: Locator;
  readonly dentalAttributeinput: Locator;
  readonly breadCrumbEle: Locator;
  readonly unPublishedChangesHeader: Locator;
  readonly cancelOnPopup: Locator;
  readonly backButton: Locator;
  readonly leaveAndDiscard: Locator;
  readonly visionAttributeEdit: Locator;
  readonly visionAttributeInput: Locator;
  readonly percentageOfEarningsInput: Locator;
  readonly medicalAttributeEdit: Locator;
  readonly medicalAttributeInput: Locator;
  readonly earningsMultiplierField: Locator;
  readonly lifeMaxBnftAmtField: Locator;
  readonly minBenfitAmountField: Locator;
  readonly editLocatorOfAttribute;
  readonly inputFieldOfValue;

  //creating object to use utility class functions
  utilities = new Utilities();

  constructor(page: Page) {
    this.page = page;
    template = new TemplateMockData(this.page);

    this.dentalAttributeEdit = page.getByText('$400');
    this.dentalAttributeinput = page.locator('#mat-input-32');
    this.breadCrumbEle = page.getByText('Base Plans');
    this.unPublishedChangesHeader = page.getByText('Unpublished Changes', {
      exact: true,
    });
    this.cancelOnPopup = page.getByRole('button', { name: 'Cancel' });
    this.backButton = page.getByRole('button', { name: 'Back' });
    this.leaveAndDiscard = page.getByRole('button', {
      name: 'Leave and Discard',
    });
    this.visionAttributeEdit = page.getByText('$27');
    this.visionAttributeInput = page.locator('#mat-input-61');
    this.percentageOfEarningsInput = page.getByLabel('% of earnings');
    this.medicalAttributeEdit = page.getByText('$1,000');
    this.medicalAttributeInput = this.page.locator('#mat-input-5');
    this.earningsMultiplierField = page.getByLabel('Earnings Multiplier');
    this.lifeMaxBnftAmtField = page.getByLabel('Life Max Benefit Amount');
    this.minBenfitAmountField = page.getByRole('textbox', { name: 'Min Benefit Amount' }).first();
    this.editLocatorOfAttribute = (id: string) =>
      page.locator(`//td[text()="${id}"]/following-sibling::td//button`);
    this.inputFieldOfValue = (id: string) =>
      page.locator(`//td[text()="${id}"]/following-sibling::td//input`);
  }

  public async loadTemplate() {
    if (process.env['RUN_TIME'] == 'stage') {
      await console.log('---------stage-----------------');
    } else {
      await template.getERPaidLifeAddTemplatesMockData();
    }
  }

  async editandValidateConfirmationPopupForAllBenefitTypes(benefitType: string) {
    await this.page.waitForLoadState();
    if (benefitType === 'Medical') {
      await this.utilities.executeStep(
        this.editLocatorOfAttribute('Single Deductible'),
        'click',
        'clicking on edit option of attribute'
      );
      await this.utilities.executeStep(
        this.inputFieldOfValue('Single Deductible'),
        'clear',
        'clearing value field'
      );
      await this.utilities.executeStep(
        this.inputFieldOfValue('Single Deductible'),
        'fill',
        'update value with value in single deductable attribute',
        '$1001'
      );
      await this.page.waitForLoadState();
    } else if (benefitType === 'Dental') {
      await this.utilities.executeStep(
        this.editLocatorOfAttribute('Individual Deductible - In Network'),
        'click',
        'clicking on edit option of attribute Individual Deductible - In Network'
      );
      await this.utilities.executeStep(
        this.inputFieldOfValue('Individual Deductible - In Network'),
        'fill',
        'update value with value in Individual Deductible - In Network',
        '$1001'
      );
    } else if (benefitType === 'Vision') {
      await this.utilities.executeStep(
        this.editLocatorOfAttribute('Materials Copay In-Network'),
        'click',
        'clicking on edit option of attribute Materials Copay In-Network'
      );
      await this.utilities.executeStep(
        this.inputFieldOfValue('Materials Copay In-Network'),
        'fill',
        'update value with value in Materials Copay In-Network',
        '$1001'
      );
    } else if (benefitType === 'Life & ADD') {
      await this.page.waitForLoadState();
      await this.utilities.executeStep(
        this.lifeMaxBnftAmtField,
        'fill',
        'enter value 099 into life max benefit amount field',
        '099'
      );
      await this.page.waitForLoadState();
    } else if (benefitType === 'Disability') {
      await this.page.waitForLoadState();
      await this.utilities.executeStep(
        this.percentageOfEarningsInput,
        'fill',
        'update value 61 to 62',
        '62'
      );
      await this.utilities.executeStep(this.minBenfitAmountField, 'fill', 'Add value', '101');
      await this.percentageOfEarningsInput.press('Tab');
      await this.page.waitForLoadState();
    }
    await this.utilities.executeStep(
      this.breadCrumbEle,
      'click',
      'click on bread crumb to validate confirmation popup'
    );
    await this.utilities.executeStep(this.cancelOnPopup, 'click', 'click on cancel button');
    await this.page.waitForLoadState();
    await this.utilities.executeStep(
      this.backButton,
      'click',
      'click on back to validate confirmation popup'
    );
    await this.utilities.assertStep(
      this.cancelOnPopup,
      'visible',
      'assert cancel button displayed in confirmation popup'
    );
    await this.utilities.assertStep(
      this.leaveAndDiscard,
      'visible',
      'assert Leave and Discard button displayed in confirmation popup'
    );
    await expect(this.page.locator('bpl-confirmation-dialog')).toContainText('Unpublished Changes');
    await expect(this.page.getByRole('paragraph')).toContainText(
      'You have unpublished changes, cancel to continue editing or leave and discard changes.'
    );
    await this.utilities.executeStep(
      this.leaveAndDiscard,
      'click',
      'click on leave and discard button confirmation popup'
    );
  }
}
