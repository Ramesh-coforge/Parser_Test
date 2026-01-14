import { expect, test, type Page } from '@playwright/test';
import { data } from '../assets/sync-group-syncStatus.json';
import credentials from '../fixtures/credentials.json';
import { SyncGroupMockData } from '../mocks/syncgroupfiltersMockData';
import { Utilities } from '../utilities/actions';

const moment = require('moment-timezone');

let syncGroupMockData: SyncGroupMockData;

export class SyncGroupNumbersPage {
  readonly page: Page;
  //creating object to use utility class functions
  utilities = new Utilities();

  constructor(page: Page) {
    this.page = page;
    this.page.setViewportSize({ width: 1500, height: 700 });
    syncGroupMockData = new SyncGroupMockData(this.page);
  }

  async documentAndValidateFilters() {
    await test.step('Selecting the exchange and validating the value selected', async () => {
      await this.page.waitForTimeout(3000);
      await this.page.getByText('Select Exchange').click();
      await this.page.getByRole('option', { name: 'TriNet III' }).locator('span').click();
      await this.page.waitForTimeout(1000);
      await expect(this.page.getByLabel('TriNet III').getByText('TriNet III')).toBeVisible();
    });
    await test.step('Validating the multiselect benefit type by unchecking and checking', async () => {
      await this.page.getByLabel('Benefit Type').getByRole('img').click();
      await this.page
        .getByRole('option', { name: 'Medical' })
        .locator('mat-pseudo-checkbox')
        .click();
      await this.page
        .getByRole('option', { name: 'Medical' })
        .locator('mat-pseudo-checkbox')
        .click();
      await this.page.keyboard.press('Escape');
    });
    await test.step('Selecting the Quarters and validating the value selected', async () => {
      await this.page.getByText('Select Quarter').click();
      await this.page.getByRole('option', { name: 'Q4' }).locator('span').click();
    });
    await test.step('Validating the sync button is disabled', async () => {
      await expect(this.page.getByRole('button', { name: 'Sync' })).toBeDisabled();
    });
    await test.step('Selecting the plan year from the plan year dropdown', async () => {
      await this.page.getByText('Select Plan Year').click();
      await this.page.locator('t1-option').first().click();
    });

    await test.step('Validate multi select carriers dropdown and selecting the carriers', async () => {
      await this.page.waitForTimeout(1000);
      await this.page.locator('//t1-select[@name="carrier"]/div').click();
      await this.page.getByText('Aetna close').click();
      await this.page.keyboard.press('Escape');
    });
    await test.step('Validate the sync button is enabled as all filters were documented', async () => {
      await expect(this.page.getByRole('button', { name: 'Sync' })).toBeEnabled();
    });
    await test.step('click on sync button', async () => {
      if (process.env['RUN_TIME'] == 'stage') {
        await this.page.getByRole('button', { name: 'Sync' }).click();
      } else {
        syncGroupMockData.syncTable();
        await this.page.getByRole('button', { name: 'Sync' }).click();
        await this.page.waitForTimeout(1000);
      }
      await this.validateBannerShowHide();
    });
    await test.step('Validate sync events is visible and inprogress event is visible', async () => {
      await expect(this.page.locator('//div[@ref="eBodyViewport"]')).toBeVisible();
      await expect(
        this.page.locator(
          '//bpl-sync-status//div[@class="sync-status-indicator sync-status-in-progress"]'
        )
      ).not.toBeNull();
    });

    await test.step('Validate Download button is enabled and visible', async () => {
      await expect(this.page.getByRole('button', { name: 'Download' })).toBeEnabled();
      await expect(this.page.getByRole('button', { name: 'Download' })).toBeVisible();
      await this.page.getByRole('button', { name: 'Download' }).click();
    });
  }

  async retrySyncGroupNumbers() {
    const firstFailedRecordCol = await this.page.getByRole('gridcell', { name: 'Failed' }).first();
    (await firstFailedRecordCol.isVisible()) &&
      (await test.step('Validate if retry is enabled for Failed', async () => {
        const retryLinkLocator = await firstFailedRecordCol
          .locator('..')
          .locator('bpl-sync-group-retry');
        await this.utilities.assertStep(
          retryLinkLocator,
          'visible',
          `Validating if retry link is visible for Failed row`
        );
        await this.utilities.assertStep(
          retryLinkLocator,
          'enabled',
          `Validating if retry link enabled for Failed row`
        );
      }));

    const firstSuccessRecordCol = await this.page
      .getByRole('gridcell', { name: 'Success' })
      .first();
    (await firstSuccessRecordCol.isVisible()) &&
      (await test.step('Validate if retry is not visible for Success', async () => {
        const retryLinkLocator = await firstSuccessRecordCol
          .locator('..')
          .locator('bpl-sync-group-retry');
        await expect(retryLinkLocator).not.toBeVisible();
      }));

    const firstInProgressRecordCol = await this.page
      .getByRole('gridcell', { name: 'In Progress' })
      .first();
    (await firstInProgressRecordCol.isVisible()) &&
      (await test.step('Validate if retry is not visible for Success Records', async () => {
        const retryLinkLocator = await firstInProgressRecordCol
          .locator('..')
          .locator('bpl-sync-group-retry');
        await expect(retryLinkLocator).not.toBeVisible();
      }));

    const failedRecordColByTs = await this.page
      .getByRole('gridcell', { name: '2024-04-19 12:13:12' })
      .first();
    (await failedRecordColByTs.isVisible()) &&
      (await test.step('Validate if clicking on retry should refresh the table with latest data', async () => {
        const retryLinkLocator = await failedRecordColByTs
          .locator('..')
          .locator('bpl-sync-group-retry');
        await expect(retryLinkLocator).toBeVisible();
        await syncGroupMockData.retrySyncGroupNumbers();
        await retryLinkLocator.click();
        await this.page.waitForLoadState();
        await expect(retryLinkLocator).not.toBeVisible();
        await this.validateBannerShowHide();
      }));
  }

  async validateBannerShowHide() {
    await expect(this.page.getByText('Sync request received')).toBeVisible();
    await this.page.waitForTimeout(5500);
    await expect(this.page.getByText('Sync request received')).toBeHidden();
  }

  async apirequestOnSyncStatus() {
    await test.step('Documenting filters in sync group numbers page', async () => {
      await this.page.waitForLoadState();
      await this.page.waitForTimeout(3000);
      await this.page.getByText('Select Exchange').click();
      await this.page.getByRole('option', { name: 'TriNet III' }).locator('span').click();
      await this.page.getByText('Select Quarter').click();
      await this.page.getByRole('option', { name: 'Q4' }).locator('span').click();
      await this.page.getByText('Select Plan Year').click();
      await this.page.locator('t1-option').first().click();
    });

    await test.step('Click on sync button', async () => {
      if (process.env['RUN_TIME'] == 'stage') {
        await this.page.getByRole('button', { name: 'Sync' }).click();
      } else {
        syncGroupMockData.syncTable();
        await this.page.getByRole('button', { name: 'Sync' }).click();
        await this.page.waitForTimeout(1000);
      }
    });
    await test.step('Wait for 30seconds as refresh interval', async () => {
      await this.page.waitForTimeout(30000);
    });
    await test.step('Invoke sync status api and validate response status to ensure polling happens if inprogress records available', async () => {
      const elements = '//div[@class="sync-status-indicator sync-status-in-progress"]';
      if (await this.page.waitForSelector(elements, { state: 'visible' })) {
        if (process.env['RUN_TIME'] == 'stage') {
          const respose = await this.page.request.get(
            credentials.APIURI + '/api-bs-hw-benplanlib-plan/v1/carrier/groupnumber/sync-status'
          );
          console.log('status>>>>>>>>>>>' + (await respose.status()));
          await expect(respose.status()).toEqual(200);
        } else {
          console.log('Test passed in CI');
        }
      } else {
        console.log('test passed as no in progress records are available');
      }
    });
  }

  async validateTimezoneConversion() {
    if (process.env['RUN_TIME'] == 'stage') {
      return;
    }
    const utcTime = data[0].timestamp;
    const timeZoneId = await this.page.evaluate(
      () => Intl.DateTimeFormat().resolvedOptions().timeZone
    );
    const localTime = moment(utcTime).tz(timeZoneId).format('MM/DD/YY h:mm A');
    const formattedLocalTime = `${localTime}`;
    const timeElement = await this.page.locator(
      '//ag-grid-angular//div[@row-index="0"]//div[@aria-colindex="8"]'
    );
    const displayedTime = await timeElement.textContent();
    expect(displayedTime).toContain(formattedLocalTime);
  }
}
