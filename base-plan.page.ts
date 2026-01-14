import assert from 'assert';
import { expect, test, type Locator, type Page } from '@playwright/test';
import { CommonUtils } from 'Integration-E2E/utilities/common.utils';
import credentials from '../fixtures/credentials.json';
import { HomePageMockData } from '../mocks/baseplanMockData';

let homePageMockData: HomePageMockData;
let commonUtils: CommonUtils;
export class BasePlanPage {
  readonly page: Page;
  readonly basePlansList: Locator;
  readonly exchangeFilter: Locator;
  readonly carrierFilter: Locator;
  readonly selectFiltersButton: Locator;
  readonly planNameSearchInput: Locator;
  readonly basePlanGridPagination: Locator;
  private readonly basePlanGrid: Locator;
  private readonly cdkPanelOverlay: Locator;
  readonly gridRowExpandClosedIcon: Locator;
  readonly gridRowExpandOpenedIcon: Locator;
  readonly gridPlanTypeFilter: Locator;
  readonly sbcLinkInGrid: Locator;
  readonly gridPlanTypeFilterSearch: Locator;
  readonly planTypeInputSearch: Locator;
  readonly plantTypeInputSearchNoMatch: Locator;
  readonly planTypeFilterSelectAll: Locator;
  readonly planTypeFilterSelect;
  readonly planTypeFilterSelectHmo;
  readonly basePlanNameInput: Locator;
  basePlanNameInputData: Locator;
  readonly basePlanNameInputErrorIcon: Locator;
  readonly basePlanNameInputSaveIcon: Locator;
  readonly basePlanNameInputCancelIcon: Locator;
  readonly basePlanNameInputSaveIconDisable: Locator;
  readonly basePlanNameUpdateError: Locator;
  readonly basePlanNameUpdateSuccess: Locator;
  readonly successCloseButton: Locator;
  readonly errorCloseButton: Locator;
  readonly paginationNext: Locator;
  readonly paginationPrevious: Locator;
  readonly searchResultBasePlan;
  readonly basePlanName;
  readonly benefitType;
  readonly carriers;
  readonly planType;
  readonly planYear;
  readonly sbc: Locator;
  readonly expandIcon: Locator;
  readonly nestedFuturePlan;
  readonly nestedPastPlan;
  readonly sbcNotDisp: Locator;
  readonly benefitTypes;
  readonly exchanges;
  readonly selectAllPlans: Locator;
  readonly benefitTypeDropdownIcon: Locator;
  readonly carrierDropdownIcon: Locator;
  readonly benefitTypeInput;

  constructor(page: Page) {
    this.page = page;
    homePageMockData = new HomePageMockData(this.page);
    commonUtils = new CommonUtils(this.page);

    this.basePlanName = (basePlanNameFilter: string) =>
      page.locator(
        `//div[contains(@class,"ag-row")]//div[@col-id="basePlanName"]//span[translate(text(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz')="${basePlanNameFilter.toLowerCase()}"]`
      );
    this.benefitType = (benefitType: string) =>
      page.locator(
        `//div[contains(@class,"ag-row")]//div[@col-id="benefitType"]//span[translate(text(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz')="${benefitType.toLowerCase()}"]`
      );
    this.carriers = (carrier: string) =>
      page.locator(
        `//div[contains(@class,"ag-row")]//div[@col-id="carrier"]//span[translate(text(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz')="${carrier.toLowerCase()}"]`
      );
    this.planType = (planType: string) =>
      page.locator(
        `//div[contains(@class,"ag-row")]//div[@col-id="planType"]//span[translate(text(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz')="${planType.toLowerCase()}"]`
      );
    this.planYear = (currentPlanYear: string) =>
      page.locator(
        `//div[contains(@class,"ag-row")]//div[@col-id="currentPlanYear"]//span//bpl-plan-year[contains(.,"${currentPlanYear}")]`
      );
    this.sbc = this.page
      .locator(
        '//div[contains(@class,"ag-row")]//div[@col-id="currentPlanYear_1"]//span//bpl-document-link//a'
      )
      .first();
    this.basePlansList = this.page.locator('bpl-base-plans');
    this.exchangeFilter = page.locator('t1-select[name="exchange"][role="combobox"]');
    this.carrierFilter = page.locator('t1-select[name="carrier"][role="combobox"]');
    this.carrierDropdownIcon = page.getByLabel('Carrier').locator('svg');
    this.benefitTypeDropdownIcon = page.getByLabel('Benefit Type').locator('svg');
    this.benefitTypeInput = (benefitType: string) =>
      page
        .locator('div')
        .filter({ hasText: 'Benefit Type' + benefitType + 'close' })
        .nth(1);
    this.selectFiltersButton = page.getByRole('button', { name: 'Select' });
    this.planNameSearchInput = page.getByPlaceholder('Search by plan name');
    this.cdkPanelOverlay = page.locator('.cdk-overlay-container').getByRole('listbox');
    this.basePlanGrid = page.locator('bpl-base-plans-list t1-grid');
    this.basePlanGridPagination = this.basePlanGrid.locator('.mat-mdc-paginator-container');
    this.gridRowExpandClosedIcon = page.locator(
      '//span[@class="ag-group-contracted"]//span[@role="presentation"]'
    );
    this.gridRowExpandOpenedIcon = page.locator(
      '//span[@class="ag-group-expanded"]//span[@role="presentation"]'
    );
    this.gridPlanTypeFilter = page.locator('.ag-cell-label-container > span > .ag-icon');
    this.planTypeInputSearch = page.getByPlaceholder('Search...');
    this.plantTypeInputSearchNoMatch = page.locator('.ag-filter-no-matches');
    this.planTypeFilterSelectAll = page.getByLabel('(Select All)');
    this.planTypeFilterSelect = (planType: string) => page.getByLabel(planType).first();
    this.planTypeFilterSelectHmo = (planType: string) =>
      page.locator(`//span[normalize-space()="${planType}"]`);
    this.sbcLinkInGrid = page.getByRole('link', { name: 'Carrier SBC' });
    this.gridPlanTypeFilterSearch = page.getByPlaceholder('Search...');
    this.basePlanNameInputData = page.getByText('AETNA ACO 1000 AZ');
    this.basePlanNameInput = page.locator('//input[@id="mat-input-2"]');
    this.basePlanNameInputErrorIcon = page.locator(
      '.mat-icon.notranslate.mat-error.material-icons.mat-ligature-font.mat-icon-no-color.ng-tns-c109-14.ng-star-inserted'
    );
    this.basePlanNameInputSaveIconDisable = page.getByText('checkclose');
    this.basePlanNameInputSaveIcon = page.getByText('check');
    this.basePlanNameInputCancelIcon = page.getByText('close').last();
    this.basePlanNameUpdateError = page.getByText(
      'The plan name could not be saved. Please refresh and try again.'
    );
    this.basePlanNameUpdateSuccess = page.getByText('Your plan name was successfully updated.');
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
    this.expandIcon = page.locator(
      '//div[@row-id="0"]//span[@class="ag-icon ag-icon-tree-closed"]'
    );
    this.nestedPastPlan = (nestedPastPlan: string) =>
      page.locator(
        `//div[contains(@class, "ag-row-odd ag-row ag-row-level-1 ag-full-width-row white-par ag-row-position-absolute")]//a[text()="${nestedPastPlan} "]`
      );
    this.nestedFuturePlan = (nestedFuturePlan: string) =>
      page.locator(
        `//div[contains(@class, "ag-row-odd ag-row ag-row-level-1 ag-full-width-row white-par ag-row-position-absolute")]//a[text()="' + ${nestedFuturePlan} + '"]`
      );

    this.sbcNotDisp = page.locator(
      '//div[@class="ag-row-odd ag-row-no-focus ag-row ag-row-level-1 ag-full-width-row white-par ag-row-position-absolute ag-row-last"]//bpl-document-link/span[contains(text(),"Carrier SBC not available")]'
    );
    this.benefitTypes = (id: string) => page.locator(`//t1-option//span[contains(text(),"${id}")]`);
    this.exchanges = (id: string) => page.locator(`//t1-option//span[text()=' ${id} ']`);
    this.selectAllPlans = page.getByLabel('Press Space to toggle all').first();
  }

  public async basePlansListIsVisible(): Promise<any> {
    await this.basePlanGridPagination.waitFor({ state: 'visible' });
    await expect(this.basePlanGridPagination).toBeVisible();
  }

  public async selectFilterOptions(
    exchange: string,
    carrier: string,
    benefitType: string
  ): Promise<any> {
    await test.step(`select exchange ${exchange}`, async () => {
      await this.selectExchange(exchange);
    });
    await test.step(`select benefit type ${benefitType}`, async () => {
      await this.page.waitForLoadState('domcontentloaded');
      await this.selectBenefitType(benefitType);
    });
    await test.step(`select carrier ${carrier}`, async () => {
      await this.page.waitForLoadState('networkidle');
      await this.selectCarrier(carrier);
    });
  }

  private async selectDropdownOption(
    dropdownElement: Locator,
    filterElement: Locator,
    value: string
  ): Promise<void> {
    await this.page.waitForLoadState();
    await dropdownElement.click();
    await commonUtils.verifyIfCdkVisibleOrElseRetry(filterElement, value);
    await this.selectCdkOption(value);
  }

  public async selectExchange(value: string): Promise<void> {
    await this.selectDropdownOption(this.exchangeFilter, this.exchangeFilter, value);
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

  public async clearBenefitTypeSelection(value: string): Promise<any> {
    await this.benefitTypeDropdownIcon.click();
    await this.selectCdkOption(value);
  }

  public async setPlanNameSearchText(value: string, isWrongText: boolean = false): Promise<void> {
    await test.step(`search required plan ${value}`, async () => {
      const searchInput = this.planNameSearchInput;
      await searchInput.focus();

      if (!isWrongText) {
        await searchInput.clear();
      }

      await searchInput.pressSequentially(value);

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

  public async getRows(planName: string): Promise<any[]> {
    let rows = await this.page.$$('.ag-row');
    return await Promise.all(
      rows.map(async (row: any) => {
        const textContent = await row.textContent();
        if (textContent && textContent.includes(planName)) {
          return row;
        }
      })
    ).then(results => results.filter((row: any) => row !== undefined));
  }

  public async setValueToPlanTypeSearch(value: string): Promise<any> {
    await this.planTypeInputSearch.fill(value);
  }

  public async isFilterIconVisibleOnPlanTypeColumn(): Promise<any> {
    await expect(this.gridPlanTypeFilter).toBeVisible();
  }

  public async clickOnPlanTypeFilter(): Promise<any> {
    await this.gridPlanTypeFilter.click();
  }

  public async clickOnElementByName(label: string): Promise<any> {
    // Use case-insensitive text matching
    await this.page.getByText(label, { exact: false }).first().click();
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
      const gridRowNameFilter = this.page.locator('.ag-cell').filter({
        hasText: new RegExp(basePlanName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'),
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
    // Case insensitive option selection - use regex with 'i' flag
    const option = this.page.getByRole('option', { name: new RegExp(`^${value}$`, 'i') });
    const cdkPanelOverlay = this.cdkPanelOverlay.filter({ has: option }).first();

    await expect(cdkPanelOverlay).toBeVisible();
    await cdkPanelOverlay.locator(option).click();
    await this.page.keyboard.press('Escape');
  }

  public async selectSearchResult(): Promise<void> {
    const PLAN_YEAR_DATE_RANGE = '10/01/2023 - 09/30/2024';
    const searchResult = this.searchResultBasePlan(PLAN_YEAR_DATE_RANGE);

    await searchResult.isVisible();
    await searchResult.click();
  }

  public async validateBenefitTypeDropdownValues() {
    const respose = await this.page.request.get(
      credentials.APIURI + '/api-bs-hw-benplanlib-plan/v1/industry-category/PEO'
    );
    // await console.log("Response = " + respose.status());
    const respBody = JSON.parse(await respose.text());
    //console.log('length>>>>>>>>>>>' + await respBody.data.length);
    await this.benefitTypeDropdownIcon.click();
    for (const response of respBody.data) {
      await test.step(`Validate Benefit type displayed - ${response.benefitType}`, async () => {
        console.log('response.data.benefitType>>>>' + (await response.benefitType));
        await expect(this.benefitTypes(response.benefitType)).toBeVisible();
      });
    }
  }

  public async validateExchangeDropdownValues(value: string) {
    const respose = await this.page.request.get(
      credentials.APIURI + '/ui-hw-benplanlib/assets/data/exchange.json'
    );
    const respBody = JSON.parse(await respose.text());
    await this.exchangeFilter.click();
    for (const response of respBody.data) {
      await test.step(`Validate Benefit type displayed - ${response.name}`, async () => {
        console.log('response.data.benefitType>>>>' + response.name);
        console.log('response.data.benefitType>>>>' + this.exchanges(response.name));
        await expect(this.exchanges(response.name)).toBeVisible();
      });
    }
    await this.selectCdkOption(value);
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

  async editPlanName(planName: string) {
    await this.editPlanNameClick();
    // Use case-insensitive text matching
    this.basePlanNameInputData = this.page.getByText(planName, { exact: false }).first();
    await this.basePlanNameInputData.click();
    await this.basePlanNameInput.fill(planName);
    await this.basePlanNameInputSaveIcon.click();
    await expect(this.basePlanNameUpdateSuccess).toBeVisible();
  }

  public async editPlanNameClick(): Promise<any> {
    if (process.env['RUN_TIME'] != 'stage') {
      await homePageMockData.getBasePlansAndFilters();
    }
  }
}
