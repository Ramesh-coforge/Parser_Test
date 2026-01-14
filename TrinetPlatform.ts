import { expect, type Locator, type Page } from '@playwright/test';

export class TrinetPlatform {
    readonly page: Page;
    readonly loginIdInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginIdInput = page.locator('xpath=//input[@id=\'input30\']');
        this.passwordInput = page.locator('xpath=//input[@id=\'input38\']');
        this.loginButton = page.locator('xpath=//form[@id=\'form22\']/div[2]/input[@type=\'submit\']');
    }

    // Description : Enter valid login credentials and login
    public async enterValidLoginCredentialsAndLogin(loginidinput: string, passwordinput: string): Promise<void> {
        await this.loginIdInput.waitFor({ state: 'visible' });
        await expect(this.loginIdInput).toBeVisible();
        await this.loginIdInput.fill(loginidinput);
        await this.passwordInput.waitFor({ state: 'visible' });
        await expect(this.passwordInput).toBeVisible();
        await this.passwordInput.fill(passwordinput);
        await this.loginButton.waitFor({ state: 'visible' });
        await expect(this.loginButton).toBeVisible();
        await this.loginButton.click();
    }

}