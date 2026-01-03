import { expect, testStep } from '../../common/helpers/pw';

export class HomePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.yourFeedTab = page.getByText('Your Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.settingsButton = page.getByRole('link', { name: '  Settings' })
    this.globalFeedTab = page.getByText('Global Feed');
    this.signInLink = page.getByRole('link', { name: 'Sign in' });
    this.signUpLink = page.getByRole('link', { name: 'Sign up' });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }
  
  async clickSettingsButton() {
    await this.step(`Click the 'Settings' button`, async () => {
      await this.settingsButton.click();
    });
  }

  async clickNewArticleLink() {
    await this.step(`Click the 'New Article' link`, async () => {
      await this.newArticleLink.click();
    });
  }

  async clickSignInLink() {
    await this.step(`Click the 'Sign in' link`, async () => {
      await this.signInLink.click();
    });
  }

  async assertYourFeedTabIsVisible() {
    await this.step(`Assert the 'Your Feed' tab is visible`, async () => {
      await expect(this.yourFeedTab).toBeVisible();
    });
  }

  async assertUserIsLoggedOut() {
    await this.step(`Assert the user is logged out`, async () => {
      await expect(this.signInLink).toBeVisible();
      await expect(this.signUpLink).toBeVisible();
      await expect(this.globalFeedTab).toBeVisible();
      await expect(this.yourFeedTab).toBeHidden();
    });
  }

  async assertUserIsLoggedIn(username) {
    await this.step(`Assert the user is logged in`, async () => {
      const profileLink = this.page.locator('a', { hasText: username });
      await expect(this.signInLink).toBeHidden();
      await expect(this.signUpLink).toBeHidden();
      await expect(this.globalFeedTab).toBeVisible();
      await expect(this.yourFeedTab).toBeVisible();
      await expect(profileLink).toBeVisible();
    });
  }
}
