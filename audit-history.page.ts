import { expect, type Locator, type Page } from '@playwright/test';
import { Utilities } from '../utilities/actions';

export class AuditHistoryPage {
  private readonly utilities = new Utilities();

  readonly page: Page;
  readonly auditHistoryHeader: Locator;
  readonly breadcrumbs: Locator;
  readonly planYearsContainer: Locator;
  readonly planYearSyncedChip: Locator;
  readonly planYearSyncedChipIcon: Locator;
  readonly planYearNotSyncedChip: Locator;
  readonly planYearNotSyncedChipIcon: Locator;
  readonly planYearSyncFailedChip: Locator;
  readonly planYearSyncFailedChipIcon: Locator;
  readonly backButton: Locator;
  readonly basePlansBreadcrumb: Locator;

  // Document-related locators
  readonly historyContainer: Locator;
  readonly historyItems: Locator;
  readonly documentItem: Locator;
  readonly documentPdfIcon: Locator;
  readonly documentLink: Locator;
  readonly documentInactiveIndicator: Locator;
  readonly documentInactiveIcon: Locator;
  readonly changedFromSection: Locator;
  readonly changedToSection: Locator;

  constructor(page: Page) {
    this.page = page;
    this.auditHistoryHeader = page.locator('.audit-history__header-container h2');
    this.breadcrumbs = page.locator('bpl-common-header .breadcrumbs');
    this.planYearsContainer = page.locator('.audit-history__plan-years-container');
    this.planYearSyncedChip = this.planYearsContainer.locator('t1-chip.primary');
    this.planYearSyncedChipIcon = this.planYearSyncedChip.getByText('check');
    this.planYearNotSyncedChip = this.planYearsContainer.locator('t1-chip.warning').first();
    this.planYearNotSyncedChipIcon = this.planYearNotSyncedChip.getByText('error_outline');
    this.planYearSyncFailedChip = this.planYearsContainer.locator('t1-chip.error');
    this.planYearSyncFailedChipIcon = this.planYearSyncFailedChip.getByText('close');
    this.backButton = this.page.locator('button.audit-history__back-button');
    this.basePlansBreadcrumb = this.page.locator('bpl-common-header a').first();

    // Initialize document-related locators with BEM structure
    this.historyContainer = page.locator('.audit-history__history-container');
    this.historyItems = page.locator('.audit-history__history-item');
    this.documentItem = page.locator('li.document-item');
    this.documentPdfIcon = page.locator('li.document-item .pdf-icon');
    this.documentLink = page.locator('li.document-item a');
    this.documentInactiveIndicator = page.locator('.inactive-indicator');
    this.documentInactiveIcon = page.locator('.inactive-indicator .inactive-icon');
    this.changedFromSection = page.locator('.audit-history__changed-from');
    this.changedToSection = page.locator('.audit-history__changed-to');
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

  async validatePlanYears(): Promise<void> {
    await expect(this.planYearsContainer).toBeVisible();
    await expect(this.planYearSyncedChip).toBeVisible();
    await expect(this.planYearSyncedChipIcon).toHaveText('check');
    await expect(this.planYearNotSyncedChip).toBeVisible();
    await expect(this.planYearNotSyncedChipIcon).toHaveText('error_outline');
    await expect(this.planYearSyncFailedChip).toBeVisible();
    await expect(this.planYearSyncFailedChipIcon).toHaveText('close');
  }

  async clickPlanYearChip(chipType: string): Promise<void> {
    let chip: Locator;
    switch (chipType) {
      case 'synced':
        chip = this.planYearSyncedChip;
        break;
      case 'notSynced':
        chip = this.planYearNotSyncedChip;
        break;
      case 'syncFailed':
        chip = this.planYearSyncFailedChip;
        break;
      default:
        throw new Error(`Invalid chip type: ${chipType}`);
    }
    await chip.click();
  }

  async validateHistoryDataVisible(): Promise<void> {
    await expect(this.historyContainer).toBeVisible();
    await expect(this.historyItems.first()).toBeVisible();
  }

  async validateDocumentItem(
    documentName: string,
    section: 'changedFrom' | 'changedTo'
  ): Promise<void> {
    const sectionLocator =
      section === 'changedFrom' ? this.changedFromSection : this.changedToSection;
    const documentLocator = sectionLocator
      .locator('li.document-item')
      .filter({ hasText: documentName });

    await expect(documentLocator).toBeVisible();
    await expect(documentLocator.locator('.pdf-icon')).toBeVisible();
    await expect(documentLocator.locator('.pdf-icon')).toHaveText('picture_as_pdf');
  }

  async validateDocumentLink(documentName: string): Promise<void> {
    const link = this.documentLink.filter({ hasText: documentName });
    await expect(link).toBeVisible();

    const href = await link.getAttribute('href');
    expect(href).toContain('/document/download/');
  }

  async validateInactiveDocument(
    documentName: string,
    section: 'changedFrom' | 'changedTo'
  ): Promise<void> {
    const sectionLocator =
      section === 'changedFrom' ? this.changedFromSection : this.changedToSection;
    const documentLocator = sectionLocator
      .locator('li.document-item')
      .filter({ hasText: documentName });

    const inactiveIndicator = documentLocator.locator('.inactive-indicator');
    await expect(inactiveIndicator).toBeVisible();
    await expect(inactiveIndicator.locator('.inactive-icon')).toHaveText('radio_button_unchecked');
    await expect(inactiveIndicator).toContainText('Inactive');
  }

  async getDocumentCount(section: 'changedFrom' | 'changedTo'): Promise<number> {
    const sectionLocator =
      section === 'changedFrom' ? this.changedFromSection : this.changedToSection;
    return await sectionLocator.locator('li.document-item').count();
  }
}
