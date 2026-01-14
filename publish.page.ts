import { type Locator, type Page } from '@playwright/test';
import { PublishPageMockData } from '../mocks/publishMockData';
import { Utilities } from '../utilities/actions';

let publishMockData: PublishPageMockData;
export class PublishPage {
  readonly page: Page;
  readonly quartersFilter: Locator;
  readonly uncheckSelectAll: Locator;
  readonly Q1: Locator;
  readonly Q4: Locator;
  readonly effectiveDateField: Locator;
  readonly publishButton: Locator;
  readonly successMsg: Locator;
  readonly confirm: Locator;
  readonly maskwrapper: Locator;

  //creating object to use utility class functions
  utilities = new Utilities();

  constructor(page: Page) {
    this.page = page;
    publishMockData = new PublishPageMockData(this.page);
    this.quartersFilter = page.getByLabel('Select Quarter').getByRole('img');
    this.uncheckSelectAll = page.getByRole('option', { name: 'All' });
    this.Q1 = page.locator('//span[contains(.," Q1 ")]');
    this.Q4 = page.locator('//span[contains(.," Q4 ")]');
    this.effectiveDateField = page.locator(
      '//input[@class="mat-input-element mat-form-field-autofill-control mat-datepicker-input ng-pristine ng-valid cdk-text-field-autofill-monitored ng-touched"]'
    );
    this.publishButton = page.locator('//t1-dialog-actions/div/button[contains(.,"Publish")]');
    this.maskwrapper = page.locator('//*[@id="mat-hint-124"]');
    this.successMsg = page.locator('//div[contains(text(),"Success!")]');
    this.confirm = page.getByRole('button', { name: 'Confirm' });
  }

  async selectQuartersDropdown() {
    await this.utilities.executeStep(
      this.quartersFilter,
      'click',
      'clicking on quarters filter dropdown'
    );
  }
  async selectUnSelectAll() {
    await this.utilities.executeStep(this.uncheckSelectAll, 'click', 'clicking on unselect all');
  }

  async filterQuarters(quarterName: Locator, quarter: string) {
    await this.utilities.executeStep(quarterName, 'click', 'check or select quarter' + quarter);
  }

  async enterEffectiveDate(effectiveDate: string) {
    await this.page.getByRole('textbox', { name: 'Effective Date' }).click({ force: true });
    await this.page.getByRole('textbox', { name: 'Effective Date' }).fill(effectiveDate);
  }

  async selectQuarter() {
    await this.page.waitForLoadState();
    await this.page.getByRole('combobox', { name: 'select' }).press('Tab');
  }

  async clickPublishOnPopupForPublishTest() {
    await this.utilities.executeStep(
      this.publishButton,
      'click',
      'click on publish to apply the changes'
    );
    await this.page.waitForLoadState();
  }

  async clickPublishOnPopup() {
    if (process.env['RUN_TIME'] == 'stage') {
      await console.log('---------stage-----------------');
    } else {
      await publishMockData.publishPostMessage();
    }
    // Wait for the button to be visible & enabled before clicking
    await this.publishButton.waitFor({ state: 'visible', timeout: 10000 });

    await this.utilities.executeStep(
      this.publishButton,
      'click',
      'click on publish to apply the changes'
    );
    await this.page.waitForLoadState();
  }

  async clickConfirm() {
    if (process.env['RUN_TIME'] == 'stage') {
      await this.page.waitForTimeout(2000);
      await console.log('---------stage-----------------');
    } else {
      await publishMockData.publishPostMessage();
    }
    await this.page.waitForTimeout(1000);
    await this.utilities.executeStep(
      this.confirm,
      'click',
      'click on confirm to apply the changes'
    );
    await this.page.waitForLoadState();
  }
}
