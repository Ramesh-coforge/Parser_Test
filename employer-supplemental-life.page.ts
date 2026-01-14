import { type Locator, type Page } from '@playwright/test';
import { TemplateMockData } from '../mocks/templatesMockData';
import { Utilities } from '../utilities/actions';

let template: TemplateMockData;
export class EmployerSupplementalLifePage {
  readonly page: Page;
  readonly optionMultipleOfEarnings: Locator;
  readonly planAmtStyle: Locator;
  readonly earningsMultiplierField: Locator;
  readonly lifeMinBNFTAmtField: Locator;
  readonly lifeMaxBnftAmtField: Locator;
  readonly addMaxBnftAmtField: Locator;
  readonly radioButton: Locator;
  readonly incrementalUnitsOption: Locator;
  readonly guaranteedAmtEle: Locator;
  readonly publishBtn: Locator;
  readonly invalidearningsMultiplierField: Locator;
  readonly invalidMinLifeBenfitAmt: Locator;
  readonly invalidLifeMaxBenfitAmt: Locator;
  readonly invalidAddMinBnftAmt: Locator;
  readonly invalidAddMaxBnftAmt: Locator;
  readonly invalidGuaranteedIssueAmt: Locator;
  readonly incrementalUnitField: Locator;
  readonly invalidIncrementalUnit: Locator;
  readonly startingAgeEle: Locator;
  readonly percentageOfReduction: Locator;
  readonly actionsEle: Locator;
  readonly addNewRow: Locator;
  readonly deleteButton: Locator;
  readonly row1Ele: Locator;
  readonly row2Ele: Locator;
  readonly addEle: Locator;
  readonly cancelEle: Locator;
  readonly startingAgeRow1: Locator;
  readonly percentageOfReductionRow1: Locator;
  readonly startingAgeRow2: Locator;
  readonly percentageOfReductionRow2: Locator;
  readonly sortIconStartAge: Locator;
  readonly dataStartAge: Locator;
  readonly yesButtonEle: Locator;
  readonly sortIconPercentage: Locator;
  readonly dataPercentageRed: Locator;
  //creating object to use utility class functions
  utilities = new Utilities();

  constructor(page: Page) {
    this.page = page;
    template = new TemplateMockData(this.page);
    this.planAmtStyle = page.getByLabel('Plan Amount Style').getByRole('img');
    this.optionMultipleOfEarnings = page
      .getByRole('option', { name: 'Multiple of Earnings' })
      .locator('span');
    this.earningsMultiplierField = page.getByLabel('Earnings Multiplier');
    this.lifeMinBNFTAmtField = page.getByLabel('Life Min Benefit Amount');
    this.lifeMaxBnftAmtField = page.getByLabel('Life Max Benefit Amount');
    this.incrementalUnitField = page.getByLabel('Incremental Amount');
    this.addMaxBnftAmtField = page.getByLabel('ADD Max Benefit Amount');
    this.radioButton = page.getByLabel('No', { exact: true });
    this.incrementalUnitsOption = page
      .getByRole('option', { name: 'Incremental Units' })
      .locator('span');
    this.guaranteedAmtEle = page.getByLabel('Guaranteed issue amount');
    this.publishBtn = page.getByRole('button', { name: 'Publish' });
    this.invalidearningsMultiplierField = page.locator(
      '//t1-label[contains(text(),"Earnings Multiplier")]/../../..//input[contains(@class,"ng-invalid")]'
    );
    this.invalidMinLifeBenfitAmt = page.locator(
      '//t1-label[contains(text(),"Life Min Benefit Amount")]/../../..//input[contains(@class,"ng-invalid")]'
    );
    this.invalidLifeMaxBenfitAmt = page.locator(
      '//t1-label[contains(text(),"Life Max Benefit Amount")]/../../..//input[contains(@class,"ng-invalid")]'
    );
    this.invalidAddMinBnftAmt = page.locator(
      '//t1-label[contains(text(),"ADD Min Benefit Amount")]/../../..//input[contains(@class,"ng-invalid")]'
    );
    this.invalidAddMaxBnftAmt = page.locator(
      '//t1-label[contains(text(),"ADD Max Benefit Amount")]/../../..//input[contains(@class,"ng-invalid")]'
    );
    this.invalidGuaranteedIssueAmt = page.locator(
      '//t1-label[contains(text(),"Guaranteed Issue Amount")]/../../..//input[contains(@class,"ng-invalid")]'
    );
    this.invalidIncrementalUnit = page.locator(
      '//t1-label[contains(text(),"Incremental Amount")]/../../..//input[contains(@class,"ng-invalid")]'
    );
    this.yesButtonEle = page.getByLabel('Yes', { exact: true });
    this.startingAgeEle = page.getByRole('columnheader', {
      name: 'Starting Age',
    });
    this.percentageOfReduction = page.getByRole('columnheader', {
      name: 'Percentage of Reduction (%)',
    });
    this.actionsEle = page.getByRole('columnheader', { name: 'Actions' });
    this.addNewRow = page.getByText('add Add New Row');
    this.deleteButton = page.locator('//table/tbody/tr[1]/td[3]/div/button/div');
    this.row1Ele = page.locator('//input[@name="501"]');
    this.row2Ele = page.locator('//input[@name="502"]');
    this.addEle = page.getByRole('button', { name: 'Add' });
    this.cancelEle = page.getByRole('button', { name: 'Cancel' });
    this.startingAgeRow1 = page.locator('//tr[1]//td[contains(@class,"cdk-column-501")]//span');
    this.percentageOfReductionRow1 = page.locator(
      '//tr[1]//td[contains(@class,"cdk-column-502")]//span'
    );
    this.startingAgeRow2 = page.locator('//tr[2]//td[contains(@class,"cdk-column-501")]//span');
    this.percentageOfReductionRow2 = page.locator(
      '//tr[2]//td[contains(@class,"cdk-column-502")]//span'
    );
    this.sortIconStartAge = page.getByRole('button', { name: 'Starting Age' });
    this.dataStartAge = page.locator('//tr[1]//td[contains(@class,"cdk-column-501")]//span');
    this.sortIconPercentage = page.getByRole('button', {
      name: 'Percentage of Reduction (%)',
    });
    this.dataPercentageRed = page.locator('//tr[1]//td[contains(@class,"cdk-column-502")]//span');
  }

  public async loadTemplate() {
    if (process.env['RUN_TIME'] == 'stage') {
      await this.page.waitForTimeout(2000);
      await console.log('---------stage-----------------');
    } else {
      await template.getEmployerSupplementLifeTemplatesMockData();
    }
  }

  async documentAndValidateEmployerSupplimentLifeTemplate() {
    await this.page.waitForLoadState();
    await this.page.waitForTimeout(1000);
    await this.utilities.executeStep(
      this.planAmtStyle,
      'click',
      'click on plan amount style dropdown'
    );
    await this.utilities.executeStep(
      this.optionMultipleOfEarnings,
      'click',
      'select option multiple earnings'
    );
    await this.utilities.executeStep(
      this.earningsMultiplierField,
      'fill',
      'enter value 100 into earnings multiplier field',
      '10'
    );
    await this.utilities.executeStep(
      this.lifeMinBNFTAmtField,
      'fill',
      'enter value 1000 into life minimum benefit amount field',
      '1000'
    );
    await this.utilities.executeStep(
      this.lifeMaxBnftAmtField,
      'fill',
      'enter value 99 into life max benefit amount field',
      '99'
    );

    await this.utilities.executeStep(
      this.guaranteedAmtEle,
      'fill',
      'enter value 200 into guaranteed amount field',
      '200'
    );
    await this.utilities.executeStep(
      this.planAmtStyle,
      'click',
      'click on plan amount style dropdown'
    );
    await this.utilities.executeStep(
      this.incrementalUnitsOption,
      'click',
      'select option incremental units amounts'
    );

    await this.utilities.executeStep(
      this.incrementalUnitField,
      'fill',
      'enter value 1000 into life incrementalUnit field',
      '1000'
    );

    await this.utilities.executeStep(
      this.lifeMinBNFTAmtField,
      'fill',
      'enter value 1000 into life minimum benefit amount field',
      '1000'
    );

    await this.utilities.executeStep(
      this.lifeMaxBnftAmtField,
      'fill',
      'enter value 99 into life max benefit amount field',
      '99'
    );
    await this.utilities.executeStep(
      this.guaranteedAmtEle,
      'fill',
      'enter value 200 into guaranteed amount field',
      '200'
    );
    await this.page.getByLabel('No', { exact: true }).click();
    await this.utilities.executeStep(this.publishBtn, 'click', 'click on publish');
  }

  async documentandValidateTable() {
    await this.page.waitForLoadState();
    await this.utilities.executeStep(
      this.planAmtStyle,
      'click',
      'click on plan amount style dropdown'
    );
    await this.utilities.executeStep(
      this.optionMultipleOfEarnings,
      'click',
      'select option multiple earnings'
    );
    await this.utilities.executeStep(
      this.earningsMultiplierField,
      'fill',
      'enter value 100 into earnings multiplier field',
      '10'
    );
    await this.utilities.executeStep(
      this.lifeMinBNFTAmtField,
      'fill',
      'enter value 1000 into life minimum benefit amount field',
      '1000'
    );
    await this.utilities.executeStep(
      this.lifeMaxBnftAmtField,
      'fill',
      'enter value 99 into life max benefit amount field',
      '99'
    );
    await this.utilities.executeStep(
      this.guaranteedAmtEle,
      'fill',
      'enter value 200 into guaranteed amount field',
      '200'
    );
    await this.utilities.executeStep(
      this.planAmtStyle,
      'click',
      'click on plan amount style dropdown'
    );
    await this.utilities.executeStep(
      this.incrementalUnitsOption,
      'click',
      'select option incremental units amounts'
    );
    await this.utilities.executeStep(
      this.incrementalUnitField,
      'fill',
      'enter value 1000 into life incrementalUnit field',
      '1000'
    );
    await this.utilities.executeStep(
      this.lifeMinBNFTAmtField,
      'fill',
      'enter value 1000 into life minimum benefit amount field',
      '1000'
    );
    await this.utilities.executeStep(
      this.lifeMaxBnftAmtField,
      'fill',
      'enter value 99 into life max benefit amount field',
      '99'
    );
    await this.utilities.executeStep(
      this.guaranteedAmtEle,
      'fill',
      'enter value 200 into guaranteed amount field',
      '200'
    );
    await this.utilities.executeStep(this.yesButtonEle, 'click', 'select option yes');
    await this.utilities.assertStep(
      this.startingAgeEle,
      'visible',
      'validate column header starting age'
    );
    await this.utilities.assertStep(
      this.percentageOfReduction,
      'visible',
      'validate column header percentage of reduction'
    );
    await this.utilities.assertStep(this.actionsEle, 'visible', 'validate column header actions');
    await this.utilities.assertStep(this.addNewRow, 'visible', 'validate add new room link');
    if (await this.deleteButton.isVisible()) {
      await this.utilities.executeStep(this.deleteButton, 'click', 'delete existing data row 1');
      console.log('row 1 deleted');
    }
    if (await this.deleteButton.isVisible()) {
      await this.utilities.executeStep(this.deleteButton, 'click', 'delete existing data row 2');
      console.log('row 2 deleted');
    } else {
      console.log('no row displayed to delete');
    }
    await this.utilities.executeStep(this.addNewRow, 'click', 'add new row link');
    await this.utilities.executeStep(
      this.row1Ele,
      'fill',
      'enter 60 into starting age row 1',
      '60'
    );
    await this.utilities.executeStep(
      this.row2Ele,
      'fill',
      'enter 70 into percentage of reduction row 1',
      '70'
    );
    await this.utilities.assertStep(this.addEle, 'visible', 'add link is visible');
    await this.utilities.assertStep(this.cancelEle, 'visible', 'cancel link is visible');
    await this.utilities.executeStep(
      this.cancelEle,
      'click',
      'click on cancel to not to add any row'
    );
    await this.utilities.executeStep(this.addNewRow, 'click', 'add new row link');
    await this.utilities.executeStep(
      this.row1Ele,
      'fill',
      'enter 60 into starting age row 1',
      '60'
    );
    await this.utilities.executeStep(
      this.row2Ele,
      'fill',
      'enter 70 into percentage of reduction row 1',
      '70'
    );
    await this.utilities.executeStep(this.addEle, 'click', 'click add option to add a row');
    await this.page.waitForTimeout(2000);
    await this.utilities.executeStep(this.deleteButton, 'click', 'delete the row');
    await this.utilities.executeStep(this.addNewRow, 'click', 'add new row link');
    await this.utilities.executeStep(
      this.row1Ele,
      'fill',
      'enter 20 into starting age row 1',
      '20'
    );
    await this.utilities.executeStep(
      this.row2Ele,
      'fill',
      'enter 40 into percentage of reduction row 1',
      '40'
    );
    await this.utilities.executeStep(this.addEle, 'click', 'click add option to add a row');
    await this.utilities.executeStep(this.addNewRow, 'click', 'add new row link');
    await this.utilities.executeStep(
      this.row1Ele,
      'fill',
      'enter 70 into starting age row 1',
      '70'
    );
    await this.utilities.executeStep(
      this.row2Ele,
      'fill',
      'enter 80 into percentage of reduction row 1',
      '80'
    );
    await this.utilities.executeStep(this.addEle, 'click', 'click add option to add a row');
    await this.utilities.assertStep(
      this.startingAgeRow1,
      'text',
      'starting age row1 should contain value 70',
      '70'
    );
    await this.utilities.assertStep(
      this.startingAgeRow2,
      'text',
      'starting age row2 should contain value 20',
      '20'
    );
    await this.utilities.assertStep(
      this.percentageOfReductionRow1,
      'text',
      'percentageOfReductionRow1 should contain value 80',
      '80'
    );
    await this.utilities.assertStep(
      this.percentageOfReductionRow2,
      'text',
      'percentageOfReductionRow2 should contain value 40',
      '40'
    );
    await this.utilities.executeStep(
      this.sortIconStartAge,
      'click',
      'enable sort icon for starting age'
    );
    await this.utilities.assertStep(
      this.dataStartAge,
      'text',
      'as per ascending order table should contain value 20 as first row',
      '20'
    );
    await this.utilities.executeStep(
      this.sortIconPercentage,
      'click',
      'enable sort icon for percentage of reduction column'
    );
    await this.utilities.assertStep(
      this.dataPercentageRed,
      'text',
      'as per ascending order table should contain value 40 as first row',
      '40'
    );
    await this.utilities.executeStep(this.publishBtn, 'click', 'click on publish');
  }
}
