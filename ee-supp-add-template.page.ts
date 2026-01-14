import { expect, type Locator, type Page } from '@playwright/test';
import { TemplateMockData } from '../mocks/templatesMockData';
import { Utilities } from '../utilities/actions';

let template: TemplateMockData;

export class EESuppAddPlanTemplatePage {
  readonly page: Page;
  readonly addMaxBenefitAmountField: Locator;
  readonly radioButtonNo: Locator;
  readonly radioButtonYes: Locator;
  readonly publishBtn: Locator;
  readonly invalidAddMaxBenefitAmountField: Locator;
  readonly lifeBenfitAmtAddNewRow: Locator;
  readonly benReductionByAgeAddNewRow: Locator;
  readonly benefitsAmountOptionsTable: Locator;

  //creating object to use utility class functions
  utilities = new Utilities();

  constructor(page: Page) {
    this.page = page;
    template = new TemplateMockData(this.page);
    this.addMaxBenefitAmountField = page.getByLabel('ADD Max Benefit Amount');
    this.radioButtonNo = page.getByLabel('No', { exact: true });
    this.radioButtonYes = page.locator('#mat-radio-5').getByText('Yes');
    this.publishBtn = page.getByRole('button', { name: 'Publish' });
    this.invalidAddMaxBenefitAmountField = page.locator(
      '//t1-label[contains(text(),"ADD Max Benefit Amount")]/../../..//input[contains(@class,"ng-invalid")]'
    );
    this.benefitsAmountOptionsTable = page.locator('.mat-mdc-table').first();
    this.lifeBenfitAmtAddNewRow = page.locator('a').filter({ hasText: 'add Add New Row' }).first();

    this.benReductionByAgeAddNewRow = page
      .locator('bpl-dynamic-template-table')
      .filter({ hasText: 'add Add New Row Starting Age' })
      .locator('a');
  }

  public async loadTemplate() {
    if (process.env['RUN_TIME'] == 'stage') {
      await console.log('---------stage-----------------');
    } else {
      await template.getEESuppAddTemplatesMockData();
    }
  }

  private async validateCommonFields() {
    await this.page.waitForLoadState();
    await this.page.waitForTimeout(1000);
    await this.utilities.executeStep(
      this.addMaxBenefitAmountField,
      'fill',
      'enter value 10 into ADD Max Benefit Amount field',
      '10'
    );
  }

  async documentAndValidateTemplateWhenReductions() {
    await this.validateCommonFields();
    await this.lifeBenfitAmtAddNewRow.click();
    await this.page.locator('//input[@name="601"]').fill('Option 3');
    await this.page.locator('//input[@name="602"]').fill('80');
    await this.page.getByRole('button', { name: 'Add', exact: true }).click();
    //await this.validateBenefisAmountOptions();
    await this.utilities.executeStep(this.radioButtonYes, 'click', 'select radio option Yes');
    await this.page.waitForTimeout(500);
    await expect(
      this.page.getByRole('columnheader', { name: 'ADD Life Benefit Amount' })
    ).toBeVisible();
    await expect(this.page.getByRole('columnheader', { name: 'Amounts' })).toBeVisible();
    await expect(this.page.getByRole('columnheader', { name: 'Actions' }).first()).toBeVisible();
    await expect(this.benReductionByAgeAddNewRow).toBeVisible();
    await this.benReductionByAgeAddNewRow.click();
    await this.page.locator('//input[@name="501"]').fill('60');
    await this.page.locator('//input[@name="502"]').fill('70');
    await expect(this.page.getByRole('button', { name: 'Add', exact: true })).toBeVisible();
    await expect(this.page.locator('button').filter({ hasText: 'Cancel' })).toBeVisible();
    await this.page.locator('button').filter({ hasText: 'Cancel' }).click();

    await this.benReductionByAgeAddNewRow.click();
    await this.page.locator('//input[@name="501"]').fill('50');
    await this.page.locator('//input[@name="502"]').fill('60');
    await this.page.getByRole('button', { name: 'Add', exact: true }).click();
    await this.page.waitForTimeout(500);
    await this.page.getByRole('row', { name: '60 Delete' }).first().locator('button').click();

    await this.benReductionByAgeAddNewRow.click();
    await this.page.locator('//input[@name="501"]').fill('70');
    await this.page.locator('//input[@name="502"]').fill('80');
    await this.page.getByRole('button', { name: 'Add', exact: true }).click();
    await expect(this.page.locator('tbody').filter({ hasText: '70' })).toBeVisible();

    await this.utilities.executeStep(this.publishBtn, 'click', 'click on publish');
  }

  async documentAndValidateTemplateWhenNoReductions() {
    await this.validateCommonFields();
    await this.validateBenefisAmountOptions();
    await this.utilities.executeStep(this.radioButtonNo, 'click', 'select radio option no');
    await this.utilities.executeStep(this.publishBtn, 'click', 'click on publish');
  }

  private async validateBenefisAmountOptions() {
    await this.utilities.executeStep(
      this.lifeBenfitAmtAddNewRow,
      'click',
      'Bnefits Amt options Add New Row'
    );
    await this.page.locator('//input[@name="601"]').fill('Option 1');
    await this.page.locator('//input[@name="602"]').fill('70');
    await expect(this.page.getByRole('button', { name: 'Add' }).first()).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Cancel' }).first()).toBeVisible();
    await this.lifeBenfitAmtAddNewRow.click();
    await this.page.locator('//input[@name="601"]').fill('Option 2');
    await this.page.locator('//input[@name="602"]').fill('60');
    await this.page.getByRole('button', { name: 'Add' }).first().click();
    await this.page.waitForTimeout(500);
    await this.page.getByRole('button', { name: 'Delete' }).first().click();

    await this.lifeBenfitAmtAddNewRow.click();
    await this.page.locator('//input[@name="601"]').fill('Option 3');
    await this.page.locator('//input[@name="602"]').fill('80');
    await this.page.getByRole('button', { name: 'Add' }).first().click();
    // await expect(this.benefitsAmountOptionsTable).toContainText("Option 3");
    // await expect(this.benefitsAmountOptionsTable).toContainText("80");
  }
}
