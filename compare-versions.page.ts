import { Locator, Page } from '@playwright/test';
import { TimeLineMockData } from 'Integration-E2E/mocks/timelineMockData';

export class CompareVersionsPage {
  BASE_PLANS_BREADCRUMB_ID = 'plan-attributes-base-plan-link';
  readonly page: Page;
  private readonly timeLineMockData: TimeLineMockData;

  constructor(page: Page) {
    this.page = page;
    this.timeLineMockData = new TimeLineMockData(page);
  }

  // Locators
  get header(): Locator {
    return this.page.locator('h2');
  }

  async setupMockTimeLineData(): Promise<void> {
    await this.timeLineMockData.getTimeLineData();
  }

  async setupTimeLineWithInvalidDateFormat(): Promise<void> {
    await this.timeLineMockData.getTimeLineWithInvalidDateFormat();
  }

  async mockPlanDocumentsWithDifferentDates(): Promise<void> {
    await this.timeLineMockData.mockPlanDocumentsWithDifferentDates();
  }

  async mockPlanDetailsWithStatus(status: 'Synced' | 'Failed' | 'Successful'): Promise<void> {
    // Mock the timeline API to return specific status
    await this.page.route('**/api/plan/v2/time-lines**', async route => {
      const response = await route.fetch();
      const json = await response.json();

      // Override the status for all timeline items
      if (json && Array.isArray(json)) {
        json.forEach((item: any) => {
          if (item.publishDetail && Array.isArray(item.publishDetail)) {
            item.publishDetail.forEach((detail: any) => {
              detail.status = status;
              detail.action = status === 'Synced' ? 'PUBLISHSYNC' : 'PUBLISH';
            });
          }
          item.status = status;
        });
      }

      await route.fulfill({ json });
    });
  }

  get singlePlanYearRadio(): Locator {
    return this.page.locator('input[type="radio"][value="singlePlanYear"]');
  }

  get multiPlanYearsRadio() {
    return this.page.locator('input[type="radio"][value="multiplePlanYears"]');
  }

  get planYearDropdown(): Locator {
    return this.page.locator('t1-select[placeholder="Select Plan Year"]');
  }

  get multiPlanYearsDropdown(): Locator {
    return this.page.locator('t1-select[placeholder="Select Two Plan Years"]');
  }

  get timelineVersionsDropdown(): Locator {
    return this.page.locator('t1-select[placeholder="Select Two Versions"]');
  }

  get timelineVersionsDropdownOptions(): Locator {
    return this.page.locator('t1-select[placeholder="Select Two Versions"] t1-option');
  }

  get planYearError(): Locator {
    return this.page.locator("t1-error:has-text('You can select a maximum of 2 plan years.')");
  }

  get versionError(): Locator {
    return this.page.locator("t1-error:has-text('You can select a maximum of 2 versions.')");
  }

  // Methods
  async selectPlanYear(optionText: string): Promise<void> {
    await this.planYearDropdown.click();
    await this.page.locator(`t1-option:has-text("${optionText}")`).click();
  }

  async selectMultiplePlanYears(optionText: string): Promise<void> {
    // Click on the form field container instead of the select element
    await this.page
      .locator('t1-form-field:has(t1-select[formControlName="selectedCheckboxGroups"])')
      .click();

    // Wait for the dropdown to open
    await this.page.waitForTimeout(500);

    // Now click the option
    await this.page.locator(`t1-option:has-text("${optionText}")`).click();
  }

  async selectTimelineVersion(optionText: string): Promise<void> {
    await this.timelineVersionsDropdown.click();
    await this.page.locator(`t1-option:has-text("${optionText}")`).click();
  }

  async getSelectedPlanYears(): Promise<string[]> {
    return await this.multiPlanYearsDropdown.allTextContents();
  }

  async getTimelineVersionOptions(): Promise<string[]> {
    return await this.timelineVersionsDropdownOptions.allTextContents();
  }
  get backButton(): Locator {
    return this.page.locator('button.back-button');
  }

  get basePlansBreadcrumb(): Locator {
    return this.page.locator('bpl-common-header a').first();
  }

  get planLeft(): Locator {
    return this.page.locator('bpl-plan-detail.plan-left');
  }

  get planRight(): Locator {
    return this.page.locator('bpl-plan-detail.plan-right');
  }

  // Add these methods to CompareVersionsPage class
  async selectPlanYearByIndex(index: number): Promise<void> {
    await this.planYearDropdown.click();
    await this.page.locator('t1-option').nth(index).click();
  }

  async selectMultiplePlanYearsByIndex(index: number): Promise<void> {
    // Use the form field container approach that worked before
    await this.page
      .locator('t1-form-field:has(t1-select[formControlName="selectedCheckboxGroups"])')
      .click();
    await this.page.waitForTimeout(500);
    await this.page.locator('t1-option').nth(index).click();
  }

  async selectTimelineVersionByIndex(index: number): Promise<void> {
    await this.timelineVersionsDropdown.click();
    if (await this.page.locator('t1-option').nth(index).isVisible()) {
      await this.page.locator('t1-option').nth(index).click();
    }
  }

  public async getRegionNames(): Promise<void> {}
}
