import { expect, type Locator, type Page } from '@playwright/test';

export class BenefitsGateway {
    readonly page: Page;
    readonly linkBenefitsGateway: Locator;

    constructor(page: Page) {
        this.page = page;
        this.linkBenefitsGateway = page.locator('xpath=//a[normalize-space(.)=\'Benefits Gateway\']');
    }

    // Description : Click on the Benefit Gateway
    public async clickOnTheBenefitGateway(): Promise<void> {
        await this.linkBenefitsGateway.waitFor({ state: 'visible' });
        await expect(this.linkBenefitsGateway).toBeVisible();
        await this.linkBenefitsGateway.click();
    }

}