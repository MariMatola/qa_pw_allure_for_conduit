import { expect, testStep } from '../../../common/helpers/pw';

export class SignInPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.signInPageTitle = page.getByRole('heading', { name: 'Sign in' });
    this.emailField = page.getByPlaceholder('Email');
    this.passwordField = page.getByPlaceholder('Password');
    this.signInButton = page.getByRole('button', { name: 'Sign in' });
    this.errorMessage = page.getByRole('list').nth(1);
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open 'Sign In' page`, async () => {
      await this.page.goto('/user/login');
    });
  }

  async assertSignInPageTitleIsVisible() {
    await this.step(`Assert the 'Sign in' page title is visible`, async () => {
      await expect(this.signInPageTitle).toBeVisible();
    });
  }

  async fillEmailField(email) {
    await this.step(`Fill the 'Email' field`, async () => {
      await this.emailField.fill(email);
    });
  }

  async fillPasswordField(password) {
    await this.step(`Fill the 'Password' field`, async () => {
      await this.passwordField.fill(password);
    });
  }

  async clickSignInButton() {
    await this.step(`Click the 'Sign in' button`, async () => {
      await this.signInButton.click();
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await this.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }
}
