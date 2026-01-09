import assert from 'assert';
import { expect, test, type Locator, type Page } from '@playwright/test';
import { BasePlansV2MockData } from 'Integration-E2E/mocks/baseplanV2MockData';
import { CommonUtils } from 'Integration-E2E/utilities/common.utils';
import credentials from '../fixtures/credentials.json';
import { HomePageMockData } from '../mocks/baseplanMockData';

let homePageMockData: HomePageMockData;
let baseplanV2MockData: BasePlansV2MockData;
let commonUtils: CommonUtils;
export class BasePlanV2Page {
  readonly page: Page;
  readonly basePlansList: Locator;
  readonly carrierFilter: Locator;
  readonly selectFiltersButton: Locator;
  readonly addPlanButton: Locator;
  readonly planNameSearchInput: Locator;
  readonly basePlanGridPagination: Locator;
  private readonly basePlanGrid: Locator;
  private readonly cdkPanelOverlay: Locator;
  readonly gridRowExpandClosedIcon: Locator;
  readonly gridRowExpandOpenedIcon: Locator;
  readonly gridPlanTypeFilter: Locator;
  readonly gridExchangeFilter: Locator;
  readonly gridStatusFilter: Locator;
  readonly gridPlanTypeFilterSearch: Locator;
  readonly planTypeInputSearch: Locator;
  readonly planTypeInputSearchNoMatch: Locator;
  readonly planTypeFilterSelectAll: Locator;
  readonly planTypeFilterSelect;
  readonly exchangeFilterSelect;
  readonly planTypeFilterSelection;
  readonly exchangeFilterSelection;
  readonly statusFilterSelection;
  readonly basePlanNameInput: Locator;
  readonly successCloseButton: Locator;
  readonly errorCloseButton: Locator;
  readonly paginationNext: Locator;
  readonly paginationPrevious: Locator;
  readonly searchResultBasePlan;
  readonly basePlanName;
  readonly benefitType;
  readonly carriers;
  readonly planType;
  readonly planStatus;
  readonly benefitTypes;
  readonly selectAllPlans: Locator;
  readonly benefitTypeDropdownIcon: Locator;
  readonly carrierDropdownIcon: Locator;
  readonly benefitTypeInput;
  readonly firstPlanNameGridCellSelector: string;
  readonly firstPlanNameLink: Locator;

  constructor(page: Page) {
    this.page = page;
    homePageMockData = new HomePageMockData(this.page);
    baseplanV2MockData = new BasePlansV2MockData(this.page);
    commonUtils = new CommonUtils(this.page);

    this.basePlanName = (basePlanNameFilter: string) =>
      page.locator('span').filter({ hasText: basePlanNameFilter }).nth(1);
    this.benefitType = (benefitType: string) =>
      page.locator(`//div[@row-id="0"]//div[@col-id="benefitType"]//span[text()="${benefitType}"]`);
    this.carriers = (carrier: string) =>
      page.locator(`//div[@row-id="0"]//div[@col-id="carrier"]//span[text()="${carrier}"]`);
    this.planType = (planType: string) =>
      page.locator(`//div[@row-id="0"]//div[@col-id="planType"]//span[text()="${planType}"]`);
    this.planStatus = (planStatus: string) =>
      page.locator(`//div[@row-id="0"]//div[@col-id="isActive"]//span[text()="${planStatus}"]`);
    this.basePlansList = this.page.locator('bpl-base-plans');
    this.carrierFilter = page.locator('t1-select[name="carrier"]');
    this.carrierDropdownIcon = page.getByLabel('Carrier').locator('svg');
    this.benefitTypeDropdownIcon = page.getByLabel('Benefit Type').locator('svg');
    this.benefitTypeInput = (benefitType: string) =>
      page
        .locator('div')
        .filter({ hasText: 'Benefit Type' + benefitType + 'close' })
        .nth(1);
    this.selectFiltersButton = page.getByRole('button', { name: 'Select' });
    this.addPlanButton = page.getByRole('button', { name: 'Add Plan' });
    this.planNameSearchInput = page.locator('input[type="search"][name="planNameSearch"]');
    this.cdkPanelOverlay = page.locator('.cdk-overlay-container').getByRole('listbox');
    this.basePlanGrid = page.locator('bpl-base-plans-list t1-grid');
    this.basePlanGridPagination = this.basePlanGrid.locator('.mat-mdc-paginator-container');
    this.gridRowExpandClosedIcon = page.locator(
      '//span[@class="ag-group-contracted"]//span[@role="presentation"]'
    );
    this.gridRowExpandOpenedIcon = page.locator(
      '//span[@class="ag-group-expanded"]//span[@role="presentation"]'
    );
    this.gridPlanTypeFilter = page.locator(
      "//div[@col-id='planType']//span[@ref='eMenu']//span[@class='ag-icon ag-icon-filter']"
    );
    this.gridExchangeFilter = page.locator(
      "//div[@col-id='exchanges']//span[@ref='eMenu']//span[@class='ag-icon ag-icon-filter']"
    );
    this.gridStatusFilter = page.locator(
      "//div[@col-id='status']//span[@ref='eMenu']//span[@class='ag-icon ag-icon-filter']"
    );
    this.planTypeInputSearch = page.getByPlaceholder('Search...');
    this.planTypeInputSearchNoMatch = page.locator('.ag-filter-no-matches');
    this.planTypeFilterSelectAll = page.getByLabel('(Select All)');
    this.planTypeFilterSelect = (planType: string) => page.getByLabel(planType);
    this.exchangeFilterSelect = (exchange: string) => page.getByLabel(exchange, { exact: true });
    this.planTypeFilterSelection = (planType: string) =>
      page.locator(`//span[normalize-space()="${planType}"]`);
    this.exchangeFilterSelection = (exchange: string) =>
      page.locator(`//span[@class='ag-cell-value' and contains(., "${exchange}")]`);
    this.statusFilterSelection = (status: string) =>
      page.locator(`//span[normalize-space()="${status}"]`);
    this.gridPlanTypeFilterSearch = page.getByPlaceholder('Search...');
    this.basePlanNameInput = page.locator('//input[@id="mat-input-2"]');
    this.successCloseButton = page.getByRole('button', {
      name: 'success alert close button',
    });
    this.errorCloseButton = page.getByRole('button', {
      name: 'error alert close button',
    });
    this.paginationNext = page.locator('//t1-icon[contains(text(),"navigate_next")]');
    this.paginationPrevious = page.locator('//t1-icon[contains(text(),"navigate_before")]');
    this.searchResultBasePlan = (planYearStartDt: string) =>
      page.locator(`//bpl-plan-year//a[contains(text(), "${planYearStartDt}")]`).first();
    this.benefitTypes = (id: string) => page.locator(`//t1-option//span[contains(text(),"${id}")]`);
    this.selectAllPlans = page.getByLabel('Press Space to toggle all').first();
    this.firstPlanNameGridCellSelector =
      '.ag-center-cols-container .ag-row:first-child [col-id="basePlanName"]';
    this.firstPlanNameLink = page.locator(
      '.ag-center-cols-container .ag-row:first-child [col-id="basePlanName"] bpl-plan-name-link'
    );
  }

  public async basePlansListIsVisible_Test(): Promise<any> {
    await this.basePlanGridPagination.waitFor({ state: 'visible' });
    await expect(this.basePlanGridPagination).toBeVisible();
  }

  public async selectFilterOptions(carrier: string, benefitType: string): Promise<any> {
    await test.step(`select benefit type ${benefitType}`, async () => {
      await this.selectBenefitType(benefitType);
    });
    await test.step(`select carrier ${carrier}`, async () => {
      await this.selectCarrier(carrier);
    });
  }

  private async selectDropdownOption(
    dropdownElement: Locator,
    filterElement: Locator,
    value: string
  ): Promise<void> {
    await dropdownElement.click();
    await commonUtils.verifyIfCdkVisibleOrElseRetry(filterElement, value);
    await this.selectCdkOption(value);
  }

  public async selectCarrier(value: string): Promise<void> {
    await this.selectDropdownOption(this.carrierDropdownIcon, this.carrierFilter, value);
  }

  public async selectBenefitType(value: string): Promise<void> {
    await this.selectDropdownOption(
      this.benefitTypeDropdownIcon,
      this.benefitTypeDropdownIcon,
      value
    );
  }

  public async clearBenefitTypeSelection(value: string): Promise<void> {
    const benefitTypeElement = this.benefitTypeInput(value);
    await benefitTypeElement.locator('t1-icon').click();
  }

  public async setPlanNameSearchText(value: string, isWrongText: boolean = false): Promise<void> {
    await test.step(`search required plan ${value}`, async () => {
      const searchInput = this.planNameSearchInput;
      await searchInput.focus();

      if (!isWrongText) {
        await searchInput.clear();
      }

      await searchInput.fill(value, { timeout: 1000 });

      if (isWrongText) {
        await this.page.keyboard.press('Enter');
      }
    });
  }

  public async clickSearchFilterButton(): Promise<any> {
    await test.step('click on select button to display plans', async () => {
      await this.selectFiltersButton.click();
      await this.page.waitForLoadState('networkidle');
      await expect(this.page.locator('.ag-cell').first()).toBeVisible();
    });
  }

  public async validateTimeLineDetails(basePlanNameFilter: string): Promise<any> {
    await test.step('click on plan to display the timeLine', async () => {
      await this.selectFiltersButton.click();
      await expect(this.page.locator('.ag-cell').first()).toBeVisible();
      const element = this.page.locator(
        `//div[@row-id="0"]//div[@col-id="basePlanName"]//span[@class='label ng-star-inserted']`
      );
      await element.click();
      await this.page.getByText('Timeline').first();
      await this.page.getByText('Timeline').click();
      await expect(this.page.locator('#dialog-header').getByText('Timeline')).toBeVisible();
      await expect(this.page.getByLabel('Close dialog button')).toBeVisible();
      await this.page.getByLabel('Close dialog button').click();
    });
  }

  public async clickAddPlanButton(): Promise<any> {
    await test.step('click on add plan link to go to add plan flow', async () => {
      await this.addPlanButton.click();
      await expect(this.page).toHaveURL(/.*\/manage-plan/);
    });
  }

  public async getRows(planName: string): Promise<any[]> {
    let rows = await this.page.$$('.ag-row');
    return await Promise.all(
      rows.map(async (row: any) => {
        const textContent = await row.textContent();
        if (textContent?.includes(planName)) {
          return row;
        }
      })
    ).then(results => results.filter((row: any) => row !== undefined));
  }

  private async setSearchValue(searchInput: Locator, value: string): Promise<void> {
    await searchInput.fill(value);
  }

  public async setValueToPlanTypeSearch(value: string): Promise<void> {
    await this.setSearchValue(this.planTypeInputSearch, value);
  }

  public async setValueToExchangeSearch(value: string): Promise<void> {
    await this.setSearchValue(this.planTypeInputSearch, value);
  }

  private async isFilterIconVisible(filterLocator: Locator): Promise<void> {
    await expect(filterLocator).toBeVisible();
  }

  public async isFilterIconVisibleOnPlanTypeColumn(): Promise<void> {
    await this.isFilterIconVisible(this.gridPlanTypeFilter);
  }

  public async isFilterIconVisibleOnExchangeColumn(): Promise<void> {
    await this.isFilterIconVisible(this.gridExchangeFilter);
  }

  public async isFilterIconVisibleOnStatusColumn(): Promise<void> {
    await this.isFilterIconVisible(this.gridStatusFilter);
  }

  public async validatePlanNameLink(): Promise<any> {
    await expect(this.firstPlanNameLink).toBeVisible();
    // Verify link text matches plan name
    const planName = await this.firstPlanNameLink.textContent();
    expect(planName).toBeTruthy();

    // Verify link is clickable
    await expect(this.firstPlanNameLink).toBeEnabled();

    // Click link and verify navigation
    await this.firstPlanNameLink.click();
    await expect(this.page).toHaveURL(/.*\/manage-plan/);
  }

  public async refreshPlanNameLink(): Promise<void> {
    await this.page.evaluate(selector => {
      const cell = document.querySelector(selector);
      if (cell) {
        const event = new Event('refresh');
        cell.dispatchEvent(event);
      }
    }, this.firstPlanNameGridCellSelector);
  }

  public async clickOnPlanTypeFilter(): Promise<any> {
    await this.gridPlanTypeFilter.click();
  }

  public async clickOnExchangeFilter(): Promise<any> {
    await this.gridExchangeFilter.click();
  }

  public async clickOnStatusFilter(): Promise<any> {
    await this.gridStatusFilter.click();
  }

  public async clickOnElementByName(label: string): Promise<any> {
    await this.page.getByText(label).first().click();
  }

  public async noRecordsFoundInGrid(): Promise<any> {
    await expect(this.basePlanGridPagination).toContainText('of 0');
  }

  public async recordsFoundInGrid(): Promise<any> {
    await expect(this.basePlanGridPagination).not.toContainText('of 0');
  }

  public async getCells(row: any): Promise<any> {
    return await row.$$('.ag-cell');
  }

  public async escapeInput(): Promise<any> {
    await this.page.keyboard.press('Escape');
  }

  public async clickFirstPlanYearForPlanName(
    basePlanName: string,
    planYearStr?: string
  ): Promise<any> {
    await test.step('click on first plan displayed post filter', async () => {
      const gridRowLocator = this.page.locator('.ag-row');
      const gridRowNameFilter = this.page.locator('.ag-cell', {
        hasText: basePlanName,
      });

      const planYearLocator = planYearStr
        ? this.page.locator(`//bpl-plan-year//a[contains(text(), '${planYearStr}')]`).first()
        : this.page.locator(`//bpl-plan-year//a`).first();

      await planYearLocator.waitFor({ state: 'visible' });
      await this.basePlanGrid
        .locator(gridRowLocator)
        .filter({ has: gridRowNameFilter })
        .locator(planYearLocator)
        .first()
        .click();
    });
  }

  private async selectCdkOption(value: string): Promise<void> {
    const option = this.page.getByRole('option', { name: value, exact: true });
    const cdkPanelOverlay = this.cdkPanelOverlay.filter({ has: option }).first();

    await expect(cdkPanelOverlay).toBeVisible();
    await cdkPanelOverlay.locator(option).click();
    await this.page.keyboard.press('Escape');
  }

  public async validateBenefitTypeDropdownValues() {
    const respose = await this.page.request.get(
      credentials.APIURI + '/api-bs-hw-benplanlib-plan/v1/industry-category/PEO'
    );
    const respBody = JSON.parse(await respose.text());
    await this.benefitTypeDropdownIcon.click();
    for (const response of respBody.data) {
      await test.step(`Validate Benefit type displayed - ${response.benefitType}`, async () => {
        console.log('response.data.benefitType>>>>' + (await response.benefitType));
        await expect(this.benefitTypes(response.benefitType)).toBeVisible();
      });
    }
  }

  async navigateBackAndClickManageCarriers() {
    await this.page.getByText('Plan Library Gateway').click();
    await this.page.getByText('Manage Carriers').click();
  }

  async validateIfAllPlansSelected() {
    await this.page.waitForTimeout(1000);
    const rows = await this.page.$$('css=.ag-row');
    let allSelected = true;

    for (const row of rows) {
      const isSelected = await row.evaluate((node: any) =>
        node.classList.contains('ag-row-selected')
      );
      if (!isSelected) {
        allSelected = false;
        break;
      }
    }
    assert(allSelected, 'Not all rows are selected.');
  }

  async clickFirstPlanNameLink() {
    this.firstPlanNameLink.click();
  }
}
