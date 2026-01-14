import { type Locator, type Page } from '@playwright/test';
import { TemplateMockData } from '../mocks/templatesMockData';
import { Utilities } from '../utilities/actions';

let template: TemplateMockData;
export class ChildSuppLifePlanTemplatePage {
  readonly page: Page;
  readonly incrementalAmountField: Locator;
  readonly lifeMinBNFTAmtField: Locator;
  readonly lifeMaxBnftAmtField: Locator;
  readonly employeeElectionPercent: Locator;
  readonly guaranteedAmtEle: Locator;
  readonly publishBtn: Locator;
  readonly invalidIncrementalAmountField: Locator;
  readonly invalidMinLifeBenfitAmt: Locator;
  readonly invalidLifeMaxBenfitAmt: Locator;
  readonly invalidGuaranteedIssueAmt: Locator;

  //creating object to use utility class functions
  utilities = new Utilities();

  constructor(page: Page) {
    this.page = page;
    template = new TemplateMockData(this.page);
    this.incrementalAmountField = page.getByLabel('Incremental Amount');
    this.lifeMinBNFTAmtField = page.getByLabel('Life Min Benefit Amount');
    this.lifeMaxBnftAmtField = page.getByLabel('Life Max Benefit Amount');
    this.employeeElectionPercent = page.getByLabel('Employee Election Percent');
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
    this.invalidGuaranteedIssueAmt = page.locator(
      '//t1-label[contains(text(),"Guaranteed Issue Amount")]/../../..//input[contains(@class,"ng-invalid")]'
    );
  }

  public async loadTemplate() {
    if (process.env['RUN_TIME'] == 'stage') {
      await console.log('---------stage-----------------');
    } else {
      await template.getChildSuppLifeTemplatesMockData();
    }
    await this.page.waitForTimeout(2000);
  }

  async documentAndValidateTemplate() {
    await this.page.waitForLoadState();
    await this.page.waitForTimeout(1000);
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
    await this.utilities.assertStep(
      this.employeeElectionPercent,
      'disabled',
      'validate employee election percent field is disabled'
    );

    await this.utilities.executeStep(
      this.guaranteedAmtEle,
      'fill',
      'enter value 200 into guaranteed amount field',
      '200'
    );
    await this.utilities.executeStep(this.publishBtn, 'click', 'click on publish');
  }
}
