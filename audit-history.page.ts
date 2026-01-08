
import { expect, type Locator, type Page } from '@playwright/test';
import { Utilities } from '../utilities/actions';

export class AuditHistoryPage {
  private readonly utilities = new Utilities();

  readonly page: Page;
  readonly auditHistoryHeader: Locator;
  readonly breadcrumbs: Locator;
  readonly planYearsContainer: Locator;
  readonly planYearSyncedChip: Locator;
  readonly historyContainer: Locator;
  readonly historyItems: Locator;
  readonly changedFromSection: Locator;

  constructor(page: Page) {
    this.page = page;

    // Core locators
    this.auditHistoryHeader = page.locator('.audit-history__header-container h2');
    this.breadcrumbs = page.locator('bpl-common-header .breadcrumbs');
    this.planYearsContainer = page.locator('.audit-history__plan-years-container');
    this.planYearSyncedChip = this.planYearsContainer.locator('t1-chip.primary');

    // History & document
    this.historyContainer = page.locator('.audit-history__history-container');
    this.historyItems = page.locator('.audit-history__history-item');
    this.changedFromSection = page.locator('.audit-history__changed-from');
  }

  async validateAuditHistoryHeader(): Promise<void> {
    await expect(this.auditHistoryHeader).toBeVisible();
    await expect(this.auditHistoryHeader).toHaveText('Audit History');
  }

  async validateBreadcrumbs(planName: string): Promise<void> {
    await this.utilities.assertStep(
      this.breadcrumbs.locator('span', { hasText: planName }),
      'text',
      'Plan name should be displayed in breadcrumbs',
      planName
    );
  }

  async validatePlanYearsVisible(): Promise<void> {
    await expect(this.planYearsContainer).toBeVisible();
    await expect(this.planYearSyncedChip).toBeVisible();
  }

  async validateHistoryVisible(): Promise<void> {
    await expect(this.historyContainer).toBeVisible();
    await expect(this.historyItems.first()).toBeVisible();
  }

  async validateChangedFromDocument(documentName: string): Promise<void> {
    const documentLocator = this.changedFromSection
      .locator('li.document-item')
      .filter({ hasText: documentName });

    await expect(documentLocator).toBeVisible();
    await expect(documentLocator.locator('.pdf-icon')).toBeVisible();
  }
}
