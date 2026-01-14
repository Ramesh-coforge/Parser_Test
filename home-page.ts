import { expect, test, type Locator, type Page } from '@playwright/test';
import { AuthUserRoleDetailsMockData } from 'Integration-E2E/mocks/authuserroledetailsMockData';
import { ExportPageMockData } from 'Integration-E2E/mocks/exportMockData';
import { HomePageMockData } from '../mocks/baseplanMockData';
import { BasePlansV2MockData } from '../mocks/baseplanV2MockData';
import { SyncGroupMockData } from '../mocks/syncgroupfiltersMockData';
import { SyncIssuesMockData } from '../mocks/syncIssuesMockData';
import { Utilities } from '../utilities/actions';

let homePageMockData: HomePageMockData;
let syncIssues: SyncIssuesMockData;
let syncGroupMockData: SyncGroupMockData;
let exportMockData: ExportPageMockData;
let authUserRoleDetailsMockData: AuthUserRoleDetailsMockData;
let basePlansV2MockData: BasePlansV2MockData;

export class HomePage {
  readonly page: Page;
  readonly managePlanAttributes: Locator;
  readonly managePlans: Locator;
  readonly viewSyncIssues: Locator;
  readonly tileContent: Locator;
  readonly tileHeader: Locator;
  readonly benefitGateway: Locator;
  readonly policyUpdate: Locator;
  readonly expand: Locator;
  readonly menuContainer: Locator;
  readonly syncGroupNumbersLink: Locator;
  readonly export: Locator;
  utilities = new Utilities();
  // Mock app config features data
  featuresConfig: { [key: string]: string } = {
    syncGroupNumbers: 'True',
    enableCarrierManagement: 'True',
    export: 'True',
    enablePlanManagement: 'True',
  };

  constructor(page: Page) {
    this.page = page;
    homePageMockData = new HomePageMockData(this.page);
    basePlansV2MockData = new BasePlansV2MockData(this.page);
    syncIssues = new SyncIssuesMockData(this.page);
    syncGroupMockData = new SyncGroupMockData(this.page);
    exportMockData = new ExportPageMockData(this.page);
    authUserRoleDetailsMockData = new AuthUserRoleDetailsMockData(this.page);

    this.managePlanAttributes = page.getByText('Manage Plan Attributes');
    this.managePlans = page.getByText('Manage Plans');
    this.viewSyncIssues = page.getByText('BCR Sync Status');
    this.syncGroupNumbersLink = page.getByText('sync_altSync Group Numbers');
    this.export = page.getByText('Export', { exact: true });
    this.tileContent = page.locator(
      '//t1-card/t1-card-content//t1-card-content[contains(.,"Check Benefits Plan Central Repository Tool sync status.")]'
    );
    this.tileHeader = page.getByText('BCR Sync Status');
    this.benefitGateway = page.locator('//a[text()="Benefits Gateway"]');
    this.policyUpdate = page.locator('//span[@aria-label="close-policy-update"]');
    this.expand = page.getByRole('button', { name: 'click to menu expand' });
    this.menuContainer = page.locator('.menu-container').first();
  }

  public async isFeatureEnabled(featurePropName: string): Promise<boolean> {
    return (
      !this.featuresConfig ||
      (this.featuresConfig.hasOwnProperty(featurePropName)
        ? this.featuresConfig[featurePropName] !== 'False'
        : true)
    );
  }

  public async clickManageAttributesButton(): Promise<void> {
    if (process.env['RUN_TIME'] !== 'stage') {
      await homePageMockData.getBasePlansAndFilters();
    }

    await this.page.waitForLoadState();

    const isFeatureEnabled = await this.isFeatureEnabled('manageAttributes');

    if (isFeatureEnabled) {
      await this.page.waitForLoadState();
      await this.managePlanAttributes.waitFor({ state: 'visible' });
      await expect(this.managePlanAttributes).toBeVisible();
      await this.managePlanAttributes.click();
      await this.page.waitForLoadState();
    } else {
      await expect(this.managePlanAttributes).toBeHidden();
    }
  }

  public async clickManagePlansButton(): Promise<void> {
    if (process.env['RUN_TIME'] !== 'stage') {
      await basePlansV2MockData.getBasePlansV2AndFilters();
    }

    await this.page.waitForLoadState();

    const isFeatureEnabled = await this.isFeatureEnabled('enablePlanManagement');

    if (isFeatureEnabled) {
      await this.managePlans.waitFor({ state: 'visible' });
      await expect(this.managePlans).toBeVisible();
      await this.managePlans.click();
      await this.page.waitForLoadState();
    } else {
      await expect(this.managePlans).toBeHidden();
    }
  }

  public async clickOnExportButton(): Promise<any> {
    if (process.env['RUN_TIME'] !== 'stage') {
      await exportMockData.getExportFiltersData();
    }

    await this.page.waitForLoadState();

    const isFeatureEnabled = await this.isFeatureEnabled('export');

    if (isFeatureEnabled) {
      await this.export.waitFor({ state: 'visible' });
      await expect(this.export).toBeVisible();
      await Promise.all([
        this.page.waitForResponse(
          response =>
            response.url().includes('/assets/data/exchange.json') && response.status() === 200
        ),
        await this.export.click(),
      ]);
      await this.page.waitForLoadState();
    } else {
      await expect(this.export).toBeHidden();
    }
  }

  public async clickViewSyncIssuesButton(): Promise<any> {
    await syncIssues.getSyncIssues();
    await syncIssues.reRunSyncIssues();
    await syncIssues.getAttributeFromSync();
    await this.viewSyncIssues.click();
    await this.page.waitForTimeout(2000);
  }

  public async clickOnSyncGroupNumbers() {
    const responsePromise = this.page.waitForResponse(resp =>
      resp.url().includes('data/exchange.json')
    );
    await this.page.waitForLoadState();

    const isFeatureEnabled = await this.isFeatureEnabled('syncGroupNumbers');

    if (isFeatureEnabled) {
      if (process.env['RUN_TIME'] !== 'stage') {
        await syncGroupMockData.getBasePlansAndFilters();
      }
      await this.syncGroupNumbersLink.waitFor({ state: 'visible' });
      await expect(this.syncGroupNumbersLink).toBeVisible();
      await this.utilities.executeStep(
        this.syncGroupNumbersLink,
        'click',
        'clicking on syncGroupNumbersLink'
      );

      await this.page.waitForLoadState();
      await this.page.waitForTimeout(1000);
      await responsePromise;
    } else {
      await expect(this.syncGroupNumbersLink).toBeHidden();
    }
  }

  public async goto(enableRoleMock = true): Promise<any> {
    if (enableRoleMock) {
      await authUserRoleDetailsMockData.authUserDetails();
    }
    await test.step('Navigate to BPL', async () => {
      await this.page.goto('/');
    });
    await this.managePlanAttributes.isVisible();
  }

  async loginNavigateToBPL(username: string, password: string) {
    test.setTimeout(100000);
    await this.page.goto('/');
    await this.page.getByLabel('Please enter your Login ID').fill(username);
    await this.page.waitForTimeout(500);
    await this.page.getByLabel('Password').fill(password);
    await this.page.waitForTimeout(500);
    await this.page.getByRole('button', { name: 'Log In' }).click();
    await this.page.waitForTimeout(6000);
    // await this.policyUpdate.click();
    const page1Promise = this.page.waitForEvent('popup');
    await this.utilities.assertStep(this.menuContainer, 'visible', 'Menu must be visible');

    if (await this.expand.isVisible()) {
      await this.expand.click();
      console.log('Expanded Menu');
    } else {
      console.log('The menu already Expanded!');
    }
    await this.page
      .getByRole('link', {
        name: 'ꅦ TriNet Admin Apps will open in a new window',
      })
      .click();
    const page1 = await page1Promise;
    await page1.waitForLoadState();
    await page1.goto('/ui-superadmin/#/dashboard');
    await page1.waitForLoadState();
    const page2Promise = page1.waitForEvent('popup');
    await page1.locator('#Benefits').getByRole('link', { name: 'Benefits Gateway' }).click();
    const page2 = await page2Promise;
    const [newTab] = await Promise.all([
      page2.waitForEvent('popup'),
      await page2
        .locator('//div[text()="Plan Library Gateway "]/../div/following-sibling::div/a')
        .click(),
    ]);
    await newTab.reload();
    return newTab;
  }

  public async validateAdminRoleUserDetails() {
    await this.page.getByText('Manage Plan Attributes');
    await expect(this.page.locator('bpl-home')).toContainText('Manage Plan Attributes');
    await this.page.getByText('BCR Sync Status');

    await expect(this.page.locator('bpl-home')).toContainText('BCR Sync Status');
    await this.page.getByText('Sync Group Numbers');

    await expect(this.page.locator('bpl-home')).toContainText('Sync Group Numbers');
    await expect(this.page.getByText('Manage Carriers')).toBeVisible();
    await expect(this.page.locator('bpl-home')).toContainText('Manage Carriers');
    await this.page.getByText('Export', { exact: true });
    await expect(this.page.locator('bpl-home')).toContainText('Export');
    await expect(this.page.getByText('Manage Plans')).toBeVisible();
    await expect(this.page.locator('bpl-home')).toContainText('Manage Plans');
  }

  public async validateAllRolesUserDetails() {
    await this.page.getByText('Manage Plan Attributes');
    await expect(this.page.locator('bpl-home')).toContainText('Manage Plan Attributes');
    await this.page.getByText('BCR Sync Status');

    await expect(this.page.locator('bpl-home')).toContainText('BCR Sync Status');
    await this.page.getByText('Sync Group Numbers');

    await expect(this.page.locator('bpl-home')).toContainText('Sync Group Numbers');
    await expect(this.page.getByText('Manage Carriers')).toBeVisible();
    await expect(this.page.locator('bpl-home')).toContainText('Manage Carriers');
    await this.page.getByText('Export', { exact: true });
    await expect(this.page.locator('bpl-home')).toContainText('Export');
    await expect(this.page.getByText('Manage Plans')).toBeVisible();
    await expect(this.page.locator('bpl-home')).toContainText('Manage Plans');
  }

  public async validateViewRoleUserDetails() {
    await this.page.getByText('Export', { exact: true });
    await expect(this.page.locator('bpl-home')).toContainText('Export');
  }

  public async validateNullRoleUserDetails() {
    await test.step('Navigate to BPL', async () => {
      await this.page.goto('/');
    });
  }

  public async validateErrorCodeUserDetails() {
    await test.step('Navigate to BPL', async () => {
      await this.page.goto('/');
    });
  }
}
