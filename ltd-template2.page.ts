import { LocatorScreenshotOptions, test, type Locator, type Page } from '@playwright/test';
import { BNCBS5561 } from '../fixtures/ltdtestdata.json';
import { TemplateMockData } from '../mocks/templatesMockData';
import { Utilities } from '../utilities/actions';

let template: TemplateMockData;
export class LTDPlanTemplatePage {
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
  readonly ssnraY: Locator;
  readonly ssnraN: Locator;
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
  readonly preExistY: Locator;
  readonly preExistN: Locator;
  readonly publishBtn: Locator;
  readonly invalidearnings: Locator;
  readonly invalidMinBenfitAmt1: Locator;
  readonly invalidMinBenfitPercnt: Locator;
  readonly invalidMaxBnftAmt: Locator;
  readonly invalidMaxCovrEarning: Locator;
  readonly invalidBnftDuration: Locator;
  readonly invalidIllnessPeriod: Locator;

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
    this.weekOption = page.getByRole('option', { name: 'Weeks' }).first().locator('span');
    this.monthsOption = page.getByRole('option', { name: 'Months' }).locator('span');
    this.minBenifitAmt = page.getByRole('textbox', { name: 'Min Benefit Amount' });
    this.minBenifitAmtPercent = page.getByRole('spinbutton', { name: 'Min Benefit Amount' });
    this.maxBenefitAmount = page.getByLabel('Max Benefit Amount');
    this.maxCoveredEarnings = page.getByLabel('Max of Covered Earnings');
    this.benefitDuration = page.locator('div').filter({ hasText: 'Benefit Duration' }).nth(4);
    this.unPaidElemination = page.locator('#mat-select-10 div').first();
    this.weeksUnPaidIllness = page.getByText('Weeks');
    this.ssnraY = page.locator('#mat-radio-2-input');
    this.ssnraN = page.locator('#mat-radio-3-input');
    this.unpaidIllnessDropdown = page
      .locator('div')
      .filter({ hasText: /^Days$/ })
      .first();
    this.unpaidIllnessDaysOption = page
      .getByRole('option', { name: 'Days' })
      .locator('span')
      .last();
    this.weeksBySelect = page.getByLabel('Weeks').locator('div').nth(2);
    this.daysBySelect = page.getByLabel('Days').locator('div').nth(2);
    this.illnessInput = page.getByLabel('Duration').first();
    this.illnessInput2 = page.getByLabel('Duration').last();
    this.eliminationAccidentDropdown = page.locator('#mat-select-14 div').nth(2);
    this.durationInput1 = page.locator(
      'div:nth-child(14) > div > div > div:nth-child(2) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix'
    );
    this.durationInput2 = page.locator('#mat-input-9');
    this.unpaidDrop = page.getByText('Unpaid Elimination Period for Accident');
    this.preExistY = page.locator('#mat-radio-5-input');
    this.preExistN = page.locator('#mat-radio-6-input');
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
      '//t1-label[contains(text(),"Max of Covered Earnings")]/../../..//input[contains(@class,"ng-invalid")]'
    );
    this.invalidBnftDuration = page.locator(
      '//t1-label[contains(text(),"Duration")]/../../..//input[contains(@class,"ng-invalid")]'
    );
    this.invalidIllnessPeriod = page.locator(
      '//t1-label[contains(text(),"Duration")]/../../..//input[contains(@class,"ng-invalid")]'
    );
  }

  public async loadTemplate() {
    if (process.env['RUN_TIME'] == 'stage') {
      await console.log('---------stage-----------------');
    } else {
      await template.getTemplatesMockDataLTD();
    }
  }

  async documentAndValidateLTDTemplate() {
    await this.page.waitForLoadState();
    await this.page.waitForTimeout(4000);
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
      'enter value ' + BNCBS5561.earningsValue + ' in perecentage of earnings',
      BNCBS5561.earningsValue
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
      'enter value ' + BNCBS5561.minBenefitAmt + ' in min benefit amount field',
      BNCBS5561.minBenefitAmt
    );
    await this.utilities.executeStep(
      this.minBenifitAmtPercent,
      'fill',
      'enter value ' + BNCBS5561.minBenefitAmt1 + ' in min benefit amount field',
      BNCBS5561.minBenefitAmt1
    );
    await this.utilities.executeStep(
      this.maxBenefitAmount,
      'fill',
      'enter value ' + BNCBS5561.maxBenefitAmtValue + ' in max benefit amount field',
      BNCBS5561.maxBenefitAmtValue
    );
    await this.utilities.executeStep(
      this.maxCoveredEarnings,
      'fill',
      'enter value ' + BNCBS5561.maxCoveredEarningsVal + ' in max covered earnings field',
      BNCBS5561.maxCoveredEarningsVal
    );
    await this.utilities.executeStep(this.ssnraY, 'click', 'select yes for ssnra');
    await this.utilities.executeStep(this.ssnraN, 'click', 'select no for ssnra');
    await this.PercentageOfEarningsInput.press('Tab');
    await this.utilities.executeStep(
      this.unpaidIllnessDropdown,
      'click',
      'click on unpaid illness dropdown to select option days'
    );
    await this.utilities.executeStep(
      this.unpaidIllnessDaysOption,
      'click',
      'able to select option days'
    );
    await this.utilities.executeStep(
      this.illnessInput,
      'fill',
      'enter value ' + BNCBS5561.illnessInput2Val + ' in illness period',
      BNCBS5561.illnessInput2Val
    );
    await this.utilities.executeStep(
      this.unpaidIllnessDropdown,
      'click',
      'click on unpaid illness dropdown to select option weeks'
    );
    await this.utilities.executeStep(this.weekOption, 'click', 'able to select option weeks');
    await this.utilities.executeStep(
      this.illnessInput2,
      'fill',
      'enter value ' + BNCBS5561.illnessInput2Val + ' in illness period',
      BNCBS5561.illnessInput2Val
    );
    await this.PercentageOfEarningsInput.press('Tab');
    await this.utilities.executeStep(
      this.preExistN,
      'click',
      'select no for pre-existing condition'
    );
    await this.utilities.executeStep(
      this.preExistY,
      'click',
      'select yes for pre-existing condition'
    );

    await this.utilities.executeStep(this.publishBtn, 'click', 'click on publish');
  }
}
