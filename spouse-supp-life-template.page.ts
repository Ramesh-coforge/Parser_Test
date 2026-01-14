import { type Locator, type Page } from '@playwright/test';
import { TemplateMockData } from '../mocks/templatesMockData';
import { Utilities } from '../utilities/actions';

let template: TemplateMockData;
export class SpouseSuppLifePlanTemplatePage {
  readonly page: Page;
  readonly incrementalAmountField: Locator;
  readonly lifeMinBNFTAmtField: Locator;
  readonly lifeMaxBnftAmtField: Locator;
  readonly employeeElectionPercent: Locator;
  readonly radioButtonNo: Locator;
  readonly radioButtonYes: Locator;
  readonly guaranteedAmtEle: Locator;
  readonly publishBtn: Locator;
  readonly invalidEmployeeElectionPercent: Locator;
  readonly invalidIncrementalAmountField: Locator;
  readonly invalidMinLifeBenfitAmt: Locator;
  readonly invalidLifeMaxBenfitAmt: Locator;
  readonly invalidGuaranteedIssueAmt: Locator;

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
  readonly sortIconPercentage: Locator;
  readonly dataPercentageRed: Locator;

  //creating object to use utility class functions
  utilities = new Utilities();

  constructor(page: Page) {
    this.page = page;
    template = new TemplateMockData(this.page);
    this.incrementalAmountField = page.getByLabel('Incremental Amount');
    this.lifeMinBNFTAmtField = page.getByLabel('Life Min Benefit Amount');
    this.lifeMaxBnftAmtField = page.getByLabel('Life Max Benefit Amount');
    this.employeeElectionPercent = page.getByLabel('Employee Election Percent');
    this.radioButtonNo = page.getByLabel('No', { exact: true });
    this.radioButtonYes = page.getByLabel('Yes', { exact: true });
    this.guaranteedAmtEle = page.getByLabel('Guaranteed Issue Amount');
    this.publishBtn = page.getByRole('button', { name: 'Publish' });
    this.invalidIncrementalAmountField = page.locator(
      '//t1-label[contains(text(),"Incremental Amount")]/../../..//input[contains(@class,"ng-invalid")]'
    );
    this.invalidMinLifeBenfitAmt = page.locator(
      '//t1-label[contains(text(),"Life Min Benefit Amount")]/../../..//input[contains(@class,"ng-invalid")]'
    );
    this.invalidLifeMaxBenfitAmt = page.locator(
      '//t1-label[contains(text(),"Life Max Benefit Amount")]/../../..//input[contains(@class,"ng-invalid")]'
    );
    this.invalidEmployeeElectionPercent = page.locator(
      '//t1-label[contains(text(),"Employee Election Percent")]/../../..//input[contains(@class,"ng-invalid")]'
    );
    this.invalidGuaranteedIssueAmt = page.locator(
      '//t1-label[contains(text(),"Guaranteed Issue Amount")]/../../..//input[contains(@class,"ng-invalid")]'
    );

    this.startingAgeEle = page.getByRole('columnheader', {
      name: 'Starting Age',
    });
    this.percentageOfReduction = page.getByRole('columnheader', {
      name: 'Percentage of Reduction (%)',
    });
    this.actionsEle = page.getByRole('columnheader', { name: 'Actions' });
    this.addNewRow = page.locator('a').filter({ hasText: 'add Add New Row' });
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
      await console.log('---------stage-----------------');
    } else {
      await template.getSpouseSuppLifeTemplatesMockData();
    }
    await this.page.waitForTimeout(2000);
  }

  private async validateCommonFields() {
    await this.page.waitForLoadState();
    await this.utilities.executeStep(
      this.incrementalAmountField,
      'fill',
      'enter value 100 into incremental amount field',
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
      'enter value 99 into life maximum benefit amount field',
      '99'
    );

    await this.utilities.executeStep(
      this.employeeElectionPercent,
      'fill',
      'enter value 99 into employee election percent',
      '99'
    );

    await this.utilities.executeStep(
      this.guaranteedAmtEle,
      'fill',
      'enter value 200 into guaranteed amount field',
      '200'
    );
  }

  async documentAndValidateTemplateWithTable() {
    await this.page.waitForTimeout(2000);
    await this.validateCommonFields();
    await this.utilities.executeStep(this.radioButtonYes, 'click', 'select radio option Yes');
    await this.page.waitForTimeout(500);
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

  async documentAndValidateTemplateWithoutTable() {
    await this.validateCommonFields();
    await this.utilities.executeStep(this.radioButtonNo, 'click', 'select radio option no');
    await this.utilities.executeStep(this.publishBtn, 'click', 'click on publish');
  }
}
