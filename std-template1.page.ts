import { LocatorScreenshotOptions, test, type Locator, type Page } from '@playwright/test';
import { BNCBS5451 } from '../fixtures/stdtestdata.json';
import { TemplateMockData } from '../mocks/templatesMockData';
import { Utilities } from '../utilities/actions';

let template: TemplateMockData;
export class STDPlanTemplatePage {
  readonly page: Page;
  readonly textToVerify;
  readonly percentOfEarnings: Locator;
  readonly maxBenefitAmount: Locator;
  readonly maxCoveredEarnings: Locator;
  readonly selectPercentageOfEarningLabel: Locator;
  readonly PercentageOfEarningsInput: Locator;
  readonly frequencyDropdown: Locator;
  readonly daysOption: Locator;
  readonly weekOption: Locator;
  readonly monthsOption: Locator;
  readonly minBenifitAmt: Locator;
  readonly minBenifitAmtPercent: Locator;
  readonly benefitDuration: Locator;
  readonly unPaidElemination: Locator;
  readonly weeksUnPaidIllness: Locator;
  readonly durationInputBenefit: Locator;
  readonly durationInputBenefitForAccident: Locator;
  readonly unpaidIllnessDropdown: Locator;
  readonly unpaidIllnessDaysOption: Locator;
  readonly weeksBySelect: Locator;
  readonly daysBySelect: Locator;
  readonly illnessInput: Locator;
  readonly illnessInput2: Locator;
  readonly eliminationAccidentDropdown: Locator;
  readonly durationInput1: Locator;
  readonly durationInput2: Locator;
  readonly unpaidDrop: Locator;
  readonly publishBtn: Locator;
  readonly invalidearnings: Locator;
  readonly invalidMinBenfitAmt1: Locator;
  readonly invalidMinBenfitPercnt: Locator;
  readonly invalidMaxBnftAmt: Locator;
  readonly invalidMaxCovrEarning: Locator;
  readonly invalidBnftDuration: Locator;
  readonly invalidIllnessPeriod: Locator;
  readonly invalidAccdntPeriod: Locator;

  //creating object to use utility class functions
  utilities = new Utilities();

  constructor(page: Page) {
    this.page = page;
    template = new TemplateMockData(this.page);
    this.textToVerify = (header: string) =>
      page.locator(`//form/div/div/h2[contains(text(),"${header}")]`);
    this.percentOfEarnings = page.getByText('Percentage of earnings');
    this.selectPercentageOfEarningLabel = page
      .getByRole('option', { name: 'Percentage of earnings' })
      .locator('span');
    this.PercentageOfEarningsInput = page.getByLabel('% of earnings');
    this.frequencyDropdown = page.locator('#mat-select-8 div').nth(2);
    this.daysOption = page.getByRole('option', { name: 'Days' }).locator('span').first();
    this.weekOption = page.getByRole('option', { name: 'Weeks' }).locator('span').first();
    this.monthsOption = page.getByRole('option', { name: 'Months' }).locator('span');
    this.minBenifitAmt = page.getByRole('textbox', { name: 'Min Benefit Amount' });
    this.minBenifitAmtPercent = page.getByRole('spinbutton', { name: 'Min Benefit Amount' });
    this.maxBenefitAmount = page.getByLabel('Max Benefit Amount');
    this.maxCoveredEarnings = page.getByLabel('Max Covered Earnings');
    this.benefitDuration = page.locator('div').filter({ hasText: 'Benefit Duration' }).nth(4);
    this.unPaidElemination = page.locator('#mat-select-10 div').first();
    this.weeksUnPaidIllness = page.getByText('Weeks');
    this.durationInputBenefit = page.locator('#mat-input-9');
    this.durationInputBenefitForAccident = page.locator('#mat-input-10');
    this.unpaidIllnessDropdown = page
      .locator('div')
      .filter({ hasText: /^Days$/ })
      .first();
    this.unpaidIllnessDaysOption = page.getByRole('option', { name: 'Days' }).locator('span');
    this.weeksBySelect = page.getByLabel('Weeks').locator('div').nth(2);
    this.daysBySelect = page.getByLabel('Days').locator('div').nth(2);
    this.illnessInput = page.locator(
      'div:nth-child(13) > div > div > div:nth-child(2) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix'
    );
    this.illnessInput2 = page.locator('#mat-input-8');
    this.eliminationAccidentDropdown = page.locator('#mat-select-14 div').nth(2);
    this.durationInput1 = page.locator(
      'div:nth-child(14) > div > div > div:nth-child(2) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix'
    );
    this.durationInput2 = page.locator('#mat-input-9');
    this.unpaidDrop = page.getByText('Unpaid Elimination Period for Accident');
    this.publishBtn = page.getByRole('button', { name: 'Publish' });
    this.invalidearnings = page.locator(
      '//t1-label[contains(text(),"% of earnings")]/../../..//input[contains(@class,"ng-invalid")]'
    );
    this.invalidMinBenfitAmt1 = page.locator(
      '//t1-label[contains(text(),"Min Benefit Amount")]/../../..//input[contains(@class,"ng-invalid")]'
    );
    this.invalidMinBenfitPercnt = page.locator(
      '//t1-label[contains(text(),"Min Benefit Amount")]/../../..//input[contains(@class,"ng-invalid")]'
    );
    this.invalidMaxBnftAmt = page.locator(
      '//t1-label[contains(text(),"Max Benefit Amount")]/../../..//input[contains(@class,"ng-invalid")]'
    );
    this.invalidMaxCovrEarning = page.locator(
      '//t1-label[contains(text(),"Max Covered Earnings")]/../../..//input[contains(@class,"ng-invalid")]'
    );
    this.invalidBnftDuration = page.locator(
      '//t1-label[contains(text(),"Duration")]/../../..//input[contains(@class,"ng-invalid")]'
    );
    this.invalidIllnessPeriod = page.locator(
      '//t1-label[contains(text(),"Duration")]/../../..//input[contains(@class,"ng-invalid")]'
    );
    this.invalidAccdntPeriod = page.locator(
      '//t1-label[contains(text(),"Duration")]/../../..//input[contains(@class,"ng-invalid")]'
    );
  }

  public async loadTemplate() {
    if (process.env['RUN_TIME'] == 'stage') {
      await console.log('---------stage-----------------');
    } else {
      await template.getTemplatesMockData();
    }
  }

  async documentAndValidateSTDTemplate() {
    await this.page.waitForLoadState();
    await this.utilities.executeStep(
      this.percentOfEarnings,
      'click',
      'click on plan amount style dropdown'
    );
    await this.utilities.executeStep(
      this.selectPercentageOfEarningLabel,
      'click',
      'select percentage of earnings'
    );
    await this.utilities.executeStep(
      this.PercentageOfEarningsInput,
      'fill',
      'enter value ' + BNCBS5451.earningsValue + ' in perecentage of earnings',
      BNCBS5451.earningsValue
    );
    await this.PercentageOfEarningsInput.press('Tab');
    await this.utilities.executeStep(
      this.frequencyDropdown,
      'click',
      'click on frequency dropdown to select options'
    );
    await this.utilities.executeStep(this.daysOption, 'click', 'able to select option days');
    await this.utilities.executeStep(
      this.frequencyDropdown,
      'click',
      'click on frequency dropdown to select option weeks'
    );
    await this.utilities.executeStep(this.weekOption, 'click', 'able to select option weeks');
    await this.utilities.executeStep(
      this.frequencyDropdown,
      'click',
      'click on frequency dropdown to select option months'
    );
    await this.utilities.executeStep(this.monthsOption, 'click', 'able to select option weeks');
    await this.utilities.executeStep(
      this.minBenifitAmt,
      'click',
      'click on min benefit amount input field to enter value'
    );
    await this.utilities.executeStep(
      this.minBenifitAmt,
      'fill',
      'enter value ' + BNCBS5451.minBenefitAmt + ' in min benefit amount field',
      BNCBS5451.minBenefitAmt
    );
    await this.utilities.executeStep(
      this.minBenifitAmtPercent,
      'fill',
      'enter value ' + BNCBS5451.minBenefitAmt + ' in min benefit amount field',
      BNCBS5451.minBenefitAmt
    );
    await this.utilities.executeStep(
      this.minBenifitAmtPercent,
      'fill',
      'enter value ' + BNCBS5451.minBenefitAmt1 + ' in min benefit amount field',
      BNCBS5451.minBenefitAmt1
    );
    await this.utilities.executeStep(
      this.maxBenefitAmount,
      'fill',
      'enter value ' + BNCBS5451.maxBenefitAmtValue + ' in max benefit amount field',
      BNCBS5451.maxBenefitAmtValue
    );
    await this.utilities.executeStep(
      this.maxCoveredEarnings,
      'fill',
      'enter value ' + BNCBS5451.maxCoveredEarningsVal + ' in max covered earnings field',
      BNCBS5451.maxCoveredEarningsVal
    );

    await this.utilities.executeStep(
      this.illnessInput2,
      'fill',
      'enter value ' + BNCBS5451.illnessInput2Val + ' in illness duration field',
      BNCBS5451.illnessInput2Val
    );
    //await this.utilities.executeStep(this.durationInput2, 'hover', 'hover value ' + BNCBS5451.durationInputVal2 + ' in unpaid elimation period for accident field', BNCBS5451.durationInputVal2);
    //await this.utilities.executeStep(this.durationInput2, 'fill', 'enter value ' + BNCBS5451.durationInputVal2 + ' in unpaid elimation period for accident field', BNCBS5451.durationInputVal2);
    await this.utilities.executeStep(
      this.weeksBySelect,
      'click',
      'click on benefit duration frequency dropdown to select option days'
    );
    await this.utilities.executeStep(this.daysOption, 'click', 'able to select option days');
    await this.utilities.executeStep(
      this.daysBySelect,
      'click',
      'click on benefit duration frequency dropdown to select option weeks'
    );
    await this.utilities.executeStep(this.weekOption, 'click', 'able to select option weeks');
    await this.utilities.executeStep(
      this.durationInputBenefit,
      'fill',
      'enter value ' + BNCBS5451.durationAmt + ' in duration amount field',
      BNCBS5451.durationAmt
    );
    await this.utilities.executeStep(
      this.durationInputBenefitForAccident,
      'fill',
      'enter value ' + BNCBS5451.durationAmt + ' in duration amount field',
      BNCBS5451.durationAmt
    );
    // await this.utilities.executeStep(
    //   this.unpaidIllnessDropdown,
    //   "click",
    //   "click on unpaid illness dropdown to select option days"
    // );
    // await this.utilities.executeStep(
    //   this.unpaidIllnessDaysOption,
    //   "click",
    //   "able to select option days"
    // );
    // await this.utilities.executeStep(
    //   this.unpaidIllnessDropdown,
    //   "click",
    //   "click on unpaid illness dropdown to select option weeks"
    // );
    // await this.utilities.executeStep(
    //   this.weekOption,
    //   "click",
    //   "able to select option days"
    // );
    await this.utilities.executeStep(
      this.illnessInput2,
      'fill',
      'enter value ' + BNCBS5451.illnessInput2Val + ' in illness duration field',
      BNCBS5451.illnessInput2Val
    );
    // await this.illnessInput2.press('Tab');
    // await this.utilities.executeStep(this.eliminationAccidentDropdown, 'click', 'click on elimination accident dropdown to select value');
    // await this.utilities.executeStep(this.daysOption, 'click', 'select days option');
    // await this.utilities.executeStep(this.durationInput2, 'fill', 'enter invalid value ' + BNCBS5451.invalidUnpaidAcdntVal + ' in unpaid elimation period for accident field ', BNCBS5451.invalidUnpaidAcdntVal);
    // await this.PercentageOfEarningsInput.press('Tab');
    // await this.utilities.assertStep(this.invalidAccdntPeriod, 'visible', 'validate unpaid elimation period for accident field shows error due to invalid input ' + BNCBS5451.invalidUnpaidAcdntVal);
    // await this.utilities.executeStep(this.durationInput2, 'fill', 'enter value ' + BNCBS5451.durationInputVal2 + ' in unpaid elimation period for accident field', BNCBS5451.durationInputVal2);
    await this.utilities.executeStep(this.publishBtn, 'click', 'click on publish');
  }

  async closePublishPopup() {
    await this.page.waitForLoadState();
    await this.page.waitForTimeout(3000);
    await this.page.getByRole('button', { name: 'Cancel' }).click();
    await this.page.waitForTimeout(3000);
    await this.utilities.executeStep(this.publishBtn, 'click', 'click on publish');
  }
}
