import { expect, type Locator, type Page } from '@playwright/test';

export class TrinetAdminApps {
    readonly page: Page;
    readonly linkTrinetadminapps: Locator;

    constructor(page: Page) {
        this.page = page;
        this.linkTrinetadminapps = page.locator('xpath=//a[@id=\'triNetAdminApps\' and normalize-space(.)=\'TriNet Admin Apps will open in a new window\']');
    }

    // Description : Click on Trinet Admin Apps
    public async clickOnTrinetAdminApps(): Promise<void> {
        await this.linkTrinetadminapps.waitFor({ state: 'visible' });
        await expect(this.linkTrinetadminapps).toBeVisible();
        await this.linkTrinetadminapps.click();
    }

}