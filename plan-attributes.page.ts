import { expect, type Locator, type Page } from '@playwright/test';
import { BNCBS927, BNCBS1438 } from '../fixtures/attributes.json';
import basePlans from '../fixtures/publish-TIII.json';
import { AttributeMockData } from '../mocks/attributeMockData';
import { Utilities } from '../utilities/actions';

export type PlanYear = {
  startDate?: string;
  endDate?: string;
};

let att: AttributeMockData;

export class PlanAttributesPage {
  readonly page: Page;
  readonly planAttributesList: Locator;
  readonly attributeEditActionCellLocator: Locator;
  readonly attributeValueCellLocator: Locator;
  readonly editAllAttributes: Locator;
  readonly publishAttributesButton: Locator;
  readonly planYearLocator: Locator;
  readonly effectiveDate: Locator;
  private readonly tableRowLocator: Locator;
  readonly editLocatorOfAttribute;
  readonly inputFieldOfValue;
  readonly valueOfSD;
  readonly datePicker: Locator;
  readonly mnthyearLabel: Locator;
  readonly basePlanName: Locator;
  readonly basePlanYear: Locator;
  readonly sbcFromCarrier: Locator;
  readonly inputField: Locator;
  readonly attributeStatusCellLocator: Locator;
  readonly attributeValidationWarning: Locator;
  readonly publishAllValues: Locator;
  readonly cancelAndCheck: Locator;
  readonly cancel: Locator;
  readonly baseplanLink: Locator;
  readonly disabledMonth: Locator;
  readonly xclose: Locator;
  readonly showMappedPlanes: Locator;
  readonly closeMappedPlanes: Locator;

  utilities = new Utilities();
  constructor(page: Page) {
    this.page = page;
    att = new AttributeMockData(this.page);
    this.planAttributesList = page.locator('bpl-attribute-list');
    this.tableRowLocator = page.locator('form table tbody tr');
    this.attributeEditActionCellLocator = page.locator('.mat-column-Action');
    this.attributeValueCellLocator = page.locator('.mat-column-Value');
    this.attributeStatusCellLocator = page.locator('.mat-column-Status');
    this.showMappedPlanes = this.page.getByText('View Mapped Plans');
    this.closeMappedPlanes = this.page.getByLabel('close drawer');
    this.editLocatorOfAttribute = (id: string) =>
      page.locator(`//td[text()="${id}"]/following-sibling::td//button`);
    this.editAllAttributes = page.getByRole('button', { name: 'Edit All' });
    this.inputFieldOfValue = (id: string) =>
      page.locator(`//td[text()="${id}"]/following-sibling::td//input`);
    this.publishAttributesButton = page
      .locator('t1-button-arrangement')
      .getByRole('button', { name: 'Publish' });
    this.planYearLocator = page
      .locator('bpl-common-header')
      .locator('.right-side-link')
      .locator('div', { hasText: 'Plan Year' });
    this.effectiveDate = page.getByLabel('Effective Date');
    this.valueOfSD = (id: string) =>
      page.locator(
        `//td[text()="${id}"]/following-sibling::td/div[@class="attribute-value ng-star-inserted"]`
      );
    this.datePicker = page.getByLabel('Open calendar');
    this.mnthyearLabel = page.locator('//button[@aria-label="Choose month and year"]');
    this.basePlanName = page.locator('bpl-common-header > div.title > div.breadcrumbs');
    this.basePlanYear = page.locator('bpl-common-header > div.title > div.right-side-link');
    this.sbcFromCarrier = page.locator('bpl-common-header > div.title');
    this.inputField = page.locator('.mat-column-Value  t1-form-field  t1-hint');
    this.attributeValidationWarning = page.locator('bpl-attribute-validation-warning');
    this.publishAllValues = page.getByRole('button', {
      name: 'Publish With Values',
    });
    this.cancelAndCheck = page.getByRole('button', { name: 'Cancel, and check' });
    this.cancel = page.getByRole('button', { name: 'Cancel' });
    this.baseplanLink = page.locator('//a[text()="Base Plans"]');
    this.inputField = page.locator('.mat-column-Value  t1-form-field  t1-hint');
    this.attributeValidationWarning = page.locator('bpl-attribute-validation-warning');
    this.disabledMonth = page.locator(
      '//button[@class="mat-focus-indicator mat-calendar-next-button mat-button-base mat-icon-button mat-button-disabled"]//div[@t1tooltipposition="right"]'
    );
    //this.cancelAndCheck = page.locator('//div[contains(text(),"Cancel, and check")]');
    this.xclose = page.locator('//span//t1-icon[contains(text(),"close")]');
  }

  public async planAttributesListIsVisible(): Promise<any> {
    await expect(this.planAttributesList).toBeVisible();
  }

  public async loadData() {
    if (process.env['RUN_TIME'] == 'stage') {
      await console.log('---------stage-----------------');
    } else {
      await att.getAttributesAndRegionalMapping();
    }
  }

  public async planAttributesListIsLoaded(): Promise<any> {
    await expect(this.planAttributesList.locator(this.tableRowLocator).first()).toBeVisible();
  }

  public async getMappedPlanName(): Promise<any> {
    this.loadData();
    await this.showMappedPlanes.click();
    await this.closeMappedPlanes.waitFor();
    await this.closeMappedPlanes.click();
  }

  public getAttributeRow(name: string): Locator {
    return this.planAttributesList.locator(this.tableRowLocator).filter({
      has: this.page.getByRole('cell', { name, exact: true }),
    });
  }

  public async clickAttributeEditAction(attributeRow: Locator): Promise<any> {
    const editActionCell = attributeRow.locator(this.attributeEditActionCellLocator);
    await expect(editActionCell).toBeVisible();
    await editActionCell.locator('button').click({ force: true });
    await this.page.waitForTimeout(1000);
  }

  public async clickStatusAttribute(attributeRow: Locator): Promise<any> {
    await attributeRow.locator(this.attributeStatusCellLocator).click();
  }

  public getAttributeInput(attributeRow: Locator): Locator {
    return attributeRow.locator(this.attributeValueCellLocator).locator('.t1-mdc-input-element');
  }

  public async focusout() {
    await this.page.getByRole('columnheader', { name: 'Value' }).click();
  }

  public getAttributeField(attributeRow: Locator): Locator {
    return attributeRow.locator(this.inputField);
  }

  public async clickPublishButton(): Promise<any> {
    await expect(this.publishAttributesButton).toBeEnabled();
    await this.publishAttributesButton.click();
  }

  public async clickCancelButton(): Promise<any> {
    await expect(this.cancelAndCheck).toBeEnabled();
    await this.cancelAndCheck.click();
  }

  public async clickEditAll(): Promise<any> {
    await expect(this.editAllAttributes).toBeVisible();
    await this.editAllAttributes.click();
  }

  public async fillAttributeInput(attributeInput: Locator, value: string): Promise<any> {
    await expect(attributeInput).toBeVisible();
    await attributeInput.clear();
    await attributeInput.pressSequentially(value);
  }

  public async getPlanYear(): Promise<PlanYear> {
    await expect(this.planYearLocator).toBeVisible();
    const textContent = await this.planYearLocator.textContent();
    const planYearDates = textContent?.replace(/Plan Year( - |)/, '');
    const planYear = planYearDates
      ?.split(' - ')
      .map(value => value.trim())
      .filter(value => value.length > 0);
    expect(planYear).toHaveLength(2);
    const startDate = planYear![0];
    const endDate = planYear![1];
    return new Promise(resolve => resolve({ startDate, endDate }));
  }

  async updateAttibuteSingleDeductable(
    value: string,
    validinvalid: string,
    fieldName: string,
    benefitType: string
  ) {
    await this.utilities.executeStep(
      this.editLocatorOfAttribute(fieldName),
      'click',
      'clicking on edit option of attribute'
    );
    await this.utilities.executeStep(
      this.inputFieldOfValue(fieldName),
      'clear',
      'clearing value field'
    );
    await this.utilities.executeStep(
      this.inputFieldOfValue(fieldName),
      'type',
      'update ' + validinvalid + 'value with ' + value + 'in single deductable attribute',
      value
    );
    await this.page.waitForLoadState('domcontentloaded');
    await this.publishAttributesButton.scrollIntoViewIfNeeded();
    await this.utilities.executeStep(
      this.publishAttributesButton,
      'hover',
      'hovering over publish'
    );
    await this.page.waitForLoadState('domcontentloaded');
    await this.publishAttributesButton.scrollIntoViewIfNeeded();
    await this.utilities.executeStep(this.publishAttributesButton, 'click', 'click on publish');
    await this.page.waitForLoadState('domcontentloaded');
    if (benefitType == basePlans[0]?.benefitType) {
      if (process.env['RUN_TIME'] != 'stage') {
        await this.page.waitForTimeout(2000);
        await this.utilities.executeStep(this.cancelAndCheck, 'click', 'click on cancel and check');
        await this.page.waitForTimeout(2000);
        await this.utilities.executeStep(this.publishAttributesButton, 'click', 'click on publish');
        await this.page.waitForTimeout(2000);
        await this.page.waitForLoadState();
        await this.utilities.executeStep(
          this.publishAllValues,
          'click',
          'click on publish with values'
        );
        await this.page.waitForLoadState();
      }
    }
  }

  async validateStatus(effectiveDate: string) {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    // const dateToEnter = BNCBS1438.effectiveDate;
    let statusLoc = this.page.locator(
      '//div[contains(@class,"status-padding")][contains(.,"Value Updated, Effective")][contains(.,"' +
        effectiveDate +
        ' [Q1,Q4]")]'
    );
    await this.utilities.assertStep(
      statusLoc,
      'visible',
      'Validate Value Updated, Effective ' + effectiveDate + ' [Q1,Q4] is displayed'
    );
  }

  async handleDatePicker() {
    await this.utilities.executeStep(this.datePicker, 'click', 'click on date picker');
    await this.page.waitForTimeout(2000);
    const dateToEnter = BNCBS1438.effectiveDate;
    const val = dateToEnter.split('/');
    const mnth = BNCBS927.month;
    const day = val[1];
    const year = val[2];
    await this.utilities.executeStep(this.mnthyearLabel, 'click', 'click on month and year label');
    let yearinCalender = this.page.locator('//button[@aria-label="' + year + '"]');
    await this.utilities.executeStep(yearinCalender, 'click', 'click on year of effective date');
    let mnthinCalender = this.page.locator('//button//div[text()=" ' + mnth + ' "]');
    await this.utilities.executeStep(mnthinCalender, 'click', 'select the month of effective date');
    let dayinCalender = this.page.locator('//button//div[text()=" ' + day + ' "]');
    await this.utilities.executeStep(dayinCalender, 'click', 'select the month of effective date');
    await this.page.waitForLoadState();
  }

  async handleDatePickerForEffectiveDateRestriction() {
    await this.utilities.executeStep(this.datePicker, 'click', 'click on date picker');
    await this.page.waitForTimeout(2000);
    const dateToEnter = BNCBS1438.date;
    const val = dateToEnter.split('/');
    const mnth = BNCBS1438.month;
    const day = val[1];
    const year = val[2];
    await this.utilities.executeStep(this.mnthyearLabel, 'click', 'click on month and year label');
    let yearinCalender = this.page.locator('//button[@aria-label="' + year + '"]');
    await this.utilities.executeStep(yearinCalender, 'click', 'click on year of effective date');
    let mnthinCalender = this.page.locator('//t1-calendar').getByLabel(mnth);
    await this.utilities.executeStep(mnthinCalender, 'click', 'select the month of effective date');
    await expect(this.disabledMonth).toBeHidden();
    let dayinCalender = this.page.locator('//t1-calendar').getByLabel(day).last();
    await this.utilities.executeStep(dayinCalender, 'click', 'select the day of effective date');
    await this.page.waitForLoadState();
    await this.page.waitForTimeout(3000);
  }
}
