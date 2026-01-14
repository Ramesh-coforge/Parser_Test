import fs from 'fs';
import { expect, Locator, Page } from '@playwright/test';

export class ExportPage {
  readonly page: Page;
  readonly exportPageTitle: Locator;
  readonly newPlansTab: Locator;
  readonly changePlansTab: Locator;
  readonly missingDocumentsTab: Locator;
  readonly planAttributesTab: Locator;
  readonly customerCarrierContactsTab: Locator;
  readonly exportPlanAttributeExchange: Locator;
  readonly exportPlanAttributeQuarter: Locator;
  readonly exportPlanAttributeBenefitType: Locator;
  readonly exportPlanAttributeBenefitTypeSelected: Locator;
  readonly exportPlanAttributePlanType: Locator;
  readonly medicalBenefitType: Locator;
  readonly dentalBenefitType: Locator;
  readonly visionBenefitType: Locator;
  readonly lifeBenefitType: Locator;
  readonly disabilityBenefitType: Locator;
  readonly exportPlanAttributeYear: Locator;
  readonly exportPlanAttributeDocumentType: Locator;
  readonly exportPlanAttributeEffectiveDate: Locator;
  readonly exportButton: Locator;
  readonly exportBackButton: Locator;
  readonly cdkPanelOverlay: Locator;
  readonly planSelection: Locator;
  readonly rateRegionSelection: Locator;
  readonly planSelectionOption1: Locator;
  readonly planSelectionOption2: Locator;
  readonly rateRegionSelectionOption1: Locator;
  readonly rateRegionSelectionOption2: Locator;

  constructor(page: Page) {
    this.page = page;
    this.exportPageTitle = page.locator('p').filter({ hasText: 'Export' });
    this.newPlansTab = page.getByRole('tab', { name: 'New Plans' });
    this.changePlansTab = page.getByRole('tab', { name: 'Change Plans' });
    this.missingDocumentsTab = page.getByRole('tab', { name: 'Missing Documents' });
    this.planAttributesTab = page.getByRole('tab', { name: 'Plan Attributes' });
    this.customerCarrierContactsTab = page.getByRole('tab', {
      name: 'Customer Carrier Contacts',
    });
    this.exportPlanAttributeExchange = page.getByRole('combobox', { name: 'Exchange' });
    this.exportPlanAttributeQuarter = page.getByRole('combobox', { name: 'Quarter' });
    this.exportPlanAttributeBenefitType = page.getByRole('combobox', { name: 'Benefit Type' });
    this.exportPlanAttributeBenefitTypeSelected = page
      .getByRole('combobox', { name: 'Benefit Type' })
      .locator('svg');
    this.exportPlanAttributeDocumentType = page.getByRole('combobox', { name: 'Document Type' });
    this.medicalBenefitType = page.getByRole('option', { name: 'Medical' });
    this.dentalBenefitType = page.getByRole('option', { name: 'Dental' });
    this.visionBenefitType = page.getByRole('option', { name: 'Vision' });
    this.lifeBenefitType = page.getByRole('option', { name: 'Life & ADD' });
    this.disabilityBenefitType = page.getByRole('option', { name: 'Disability' });
    this.exportPlanAttributePlanType = page.getByRole('combobox', { name: 'Plan Type' });
    this.exportPlanAttributeYear = page.getByRole('combobox', { name: 'Plan Year' });

    this.exportPlanAttributeEffectiveDate = page.getByLabel('Open calendar');
    this.exportButton = page.getByRole('button', { name: 'Export' });
    this.exportBackButton = page.getByRole('button', { name: 'Back' });
    this.planSelection = page.getByText('Plan Selection');
    this.rateRegionSelection = page.getByText('Rate Region Selection');
    this.planSelectionOption1 = page.getByText('All Plans');
    this.planSelectionOption2 = page.getByText('Base Plans');
    this.rateRegionSelectionOption1 = page.getByText('Plans with Missing Attributes');
    this.rateRegionSelectionOption2 = page.getByText('All Rate Regions');
    this.cdkPanelOverlay = page.locator('.cdk-overlay-container').getByRole('listbox');
  }

  public async selectExchange(value: string): Promise<any> {
    await this.page.waitForTimeout(3000);
    await this.exportPlanAttributeExchange.waitFor();
    await this.exportPlanAttributeExchange.click();
    await this.selectCdkOption(value);
  }

  public async selectBenefitType(value: string): Promise<any> {
    await this.page.waitForTimeout(1000);
    await this.page.waitForLoadState();
    await this.exportPlanAttributeBenefitType.waitFor();
    await this.exportPlanAttributeBenefitType.click();
    await this.selectCdkOption(value);
  }

  public async selectPlanType(value: string): Promise<any> {
    await this.page.waitForTimeout(2000);
    await this.page.waitForLoadState();
    await this.exportPlanAttributePlanType.waitFor();
    await this.exportPlanAttributePlanType.click();
    await this.selectCdkOption(value);
  }

  public async selectQuarter(value: string): Promise<any> {
    await this.page.waitForTimeout(2000);
    await this.page.waitForLoadState();
    await this.exportPlanAttributeQuarter.waitFor();
    await this.exportPlanAttributeQuarter.click();
    await this.selectCdkOption(value);
  }

  public async selectPlanYear(value: string): Promise<any> {
    await this.page.waitForTimeout(1000);
    await this.page.waitForLoadState();
    await this.exportPlanAttributeYear.waitFor();
    await this.exportPlanAttributeYear.click();
    await this.selectCdkOption(value);
  }

  public async selectDocumentType(): Promise<any> {
    await this.page.waitForLoadState();
    await this.exportPlanAttributeDocumentType.waitFor();
    await this.exportPlanAttributeDocumentType.click();
    await this.selectCdkOption('Summary of Benefits Coverage (SBC)');
    await this.page.waitForLoadState('domcontentloaded');
  }

  public async selectEffectiveDate(): Promise<any> {
    await this.exportPlanAttributeEffectiveDate.click();
    await this.page.waitForTimeout(1000);
    await this.page.keyboard.press('Enter');
  }

  public async isAllRadioButtonSectionsVisible(): Promise<any> {
    await this.planSelection.isVisible();
    await this.rateRegionSelection.isVisible();
    await this.planSelectionOption1.isVisible();
    await this.planSelectionOption2.isVisible();
    await this.rateRegionSelectionOption1.isVisible();
    await this.rateRegionSelectionOption2.isVisible();
  }

  public async isMDVLifeBenefitTypesDisabled(): Promise<void> {
    const benefitTypes = [
      this.medicalBenefitType,
      this.dentalBenefitType,
      this.visionBenefitType,
      this.lifeBenefitType,
    ];

    for (const benefitType of benefitTypes) {
      await expect(benefitType).toBeDisabled();
    }
  }

  public async isMDVDisabilityBenefitTypesDisabled(): Promise<any> {
    const benefitTypes = [
      this.medicalBenefitType,
      this.dentalBenefitType,
      this.visionBenefitType,
      this.disabilityBenefitType,
    ];

    for (const benefitType of benefitTypes) {
      await expect(benefitType).toBeDisabled();
    }
  }

  public async isLifeDIBenefitTypesDisabled(): Promise<any> {
    const benefitTypes = [this.lifeBenefitType, this.disabilityBenefitType];

    for (const benefitType of benefitTypes) {
      await expect(benefitType).toBeDisabled();
    }
  }

  private async selectCdkOption(value: string): Promise<any> {
    const option = this.page.locator('t1-option', { hasText: value }).nth(0);
    const cdkPanelOverlay = this.cdkPanelOverlay.filter({ has: option });
    await expect(cdkPanelOverlay).toBeVisible();
    await cdkPanelOverlay.locator(option).click();
    await this.page.keyboard.press('Escape');
  }

  public async selectNewPlansTab(): Promise<void> {
    await this.newPlansTab.click();
  }

  public async selectChangePlansTab(): Promise<void> {
    await this.changePlansTab.click();
  }

  public async selectMissingDocumentsTab(): Promise<void> {
    await this.missingDocumentsTab.click();
  }

  public async selectPlanAttributesTab(): Promise<void> {
    await this.planAttributesTab.click();
  }

  public async selectCustomerCarrierContactTab(): Promise<void> {
    await this.customerCarrierContactsTab.click();
  }

  public async selectMissingAttributesOption(): Promise<any> {
    await this.rateRegionSelectionOption1.isVisible();
    await this.page.getByLabel('Plans with Missing Attributes').check();
  }

  public async verifyExcelDownloadOrAlert(url: string): Promise<any> {
    const [response] = await Promise.all([
      this.page.waitForResponse(
        response =>
          response.url().includes(url) && (response.status() === 200 || response.status() === 204)
      ),
      await this.exportButton.click(),
    ]);

    const statusCode = response.status();

    if (statusCode === 200) {
      const [download] = await Promise.all([
        this.page.waitForEvent('download'),
        await this.exportButton.click(),
      ]);

      const downloadPath = await download.path();

      const fileExists = fs.existsSync(downloadPath);
      expect(fileExists).toBe(true);
    } else if (statusCode === 204) {
      await expect(this.page.getByLabel('No Plans Found')).toBeVisible();
      await expect(this.page.getByLabel('No plans matched the criteria')).toBeVisible();
      await expect(
        this.page.getByRole('button', { name: 'info alert close button' })
      ).toBeVisible();
    }
  }
}
