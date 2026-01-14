import { type Locator, type Page } from '@playwright/test';
import { TemplateMockData } from '../mocks/templatesMockData';
import { Utilities } from '../utilities/actions';

let template: TemplateMockData;
export class FamilySupplementAddPage {
  readonly page: Page;
  readonly planAmtStyle;
  readonly percentageOfEmp: Locator;
  readonly empElectionForSpouse: Locator;
  readonly empElectionForDomestic: Locator;
  readonly empElectionForChild: Locator;
  readonly invalidMinAndMax;
  readonly publishBtn: Locator;
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
    this.planAmtStyle = (options: string) =>
      page.locator(
        `//p[contains(text(),"${options}")]/../..//following-sibling::div[1]//t1-select` ///div/div[contains(@class,"mat-select-value")]/span/span
      );
    this.percentageOfEmp = page
      .getByRole('option', { name: 'Percentage of Employee' })
      .last()
      .locator('span');
    this.empElectionForSpouse = page.getByLabel('Employee Election for Spouse');
    this.empElectionForDomestic = page.getByText('Employee Election for Domestic Partner %');
    this.empElectionForChild = page.getByLabel('Employee Election for Child');
    this.invalidMinAndMax = (fieldName: string, option: string) =>
      page.locator(
        `//t1-label[contains(text(), "${fieldName}")]/../../../..//following-sibling::div//t1-hint/div[1][contains(text(),"${option}")]`
      );
    this.publishBtn = page.getByRole('button', { name: 'Publish' });
    this.yesButtonEle = page.getByLabel('Yes');
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
    this.cancelEle = page.locator('button').filter({ hasText: 'Cancel' });
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
      await template.getFamilySupplementAddTemplatesMockData();
    }
  }

  async documentAndValidateFamilyupplimentAddTemplate() {
    await this.page.waitForLoadState();
    await this.page.waitForTimeout(1000);
    await this.utilities.executeStep(
      this.planAmtStyle('Spouse Amounts'),
      'click',
      'click on plan amount style dropdown'
    );
    await this.utilities.executeStep(
      this.percentageOfEmp,
      'click',
      'select option percentage of employee election'
    );
    await this.utilities.executeStep(
      this.empElectionForSpouse,
      'fill',
      'enter valid value 100 into employee election for spouse field',
      '100'
    );
    // await this.utilities.executeStep(
    //   this.planAmtStyle("Domestic Partner Amounts"),
    //   "click",
    //   "click on plan amount style dropdown"
    // );
    // await this.utilities.executeStep(
    //   this.percentageOfEmp,
    //   "click",
    //   "select option percentage of employee election"
    // );
    await this.utilities.executeStep(
      this.empElectionForDomestic,
      'fill',
      'enter valid value 100 into employee election for spouse field',
      '100'
    );
    await this.utilities.executeStep(
      this.planAmtStyle('Child Amounts'),
      'click',
      'click on plan amount style dropdown'
    );
    await this.utilities.executeStep(
      this.percentageOfEmp,
      'click',
      'select option percentage of employee election'
    );
    await this.utilities.executeStep(
      this.empElectionForChild,
      'fill',
      'enter valid value 100 into employee election for child amount field',
      '100'
    );
    await this.page.getByLabel('No', { exact: true }).click();
    await this.utilities.executeStep(this.publishBtn, 'click', 'click on publish');
  }

  async documentandValidateTable() {
    await this.page.waitForLoadState();
    await this.page.waitForTimeout(1000);
    await this.utilities.executeStep(
      this.empElectionForSpouse,
      'fill',
      'enter valid value 100 into employee election for spouse field',
      '100'
    );
    await this.utilities.executeStep(
      this.empElectionForDomestic,
      'fill',
      'enter valid value 100 into employee election for domestic partner field',
      '100'
    );
    await this.page.waitForTimeout(1000);
    await this.utilities.executeStep(
      this.empElectionForChild,
      'fill',
      'enter valid value 100 into employee election for child amount field',
      '100'
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

  async verifyPublishBtnState(state: 'disabled' | 'enabled') {
    await this.utilities.assertStep(
      this.publishBtn,
      state,
      `Verify if publish is in ${state} state`
    );
  }
}
