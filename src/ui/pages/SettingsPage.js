import { expect, testStep } from '../../common/helpers/pw';

export class SettingsPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.settingsPageTitle = page
      .getByRole('heading', { name: 'Your Settings' });
    this.profilePictureUrlInput = page
      .getByRole('textbox', { name: 'URL of profile picture' });
    this.userNameInput = page.getByRole('textbox', { name: 'Username' });
    this.bioInput = page.getByRole('textbox', { name: 'Short bio about you' });
    this.emailInput = page.getByRole('textbox', { name: 'Email' });
    this.passwordInput = page.getByRole('textbox', { name: 'New Password' });
    this.updateSettingsButton = page
      .getByRole('button', { name: 'Update Settings' });
    this.logoutButton = page
      .getByRole('button', { name: 'Or click here to logout.' });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async fillInUserName(userName) {
    await this.step(`Fill in the 'Username' input`, async () => {
      await this.userNameInput.fill(userName);
    });
  }

  async fillInEmail(email) {
    await this.step(`Fill in the 'Email' input`, async () => {
      await this.emailInput.fill(email);
    });
  }

  async fillInPassword(password) {
    await this.step(`Fill in the 'Password' input`, async () => {
      await this.passwordInput.fill(password);
    });
  }
  
  async fillInProfilePictureUrl(profilePictureUrl) {
    await this.step(`Fill in the 'Profile Picture URL' input`, async () => {
      await this.profilePictureUrlInput.fill(profilePictureUrl);
    });
  }

  async fillInBio(bio) {
    await this.step(`Fill in the 'Bio' input`, async () => {
      await this.bioInput.fill(bio);
    });
  }

  async clickLogoutButton() {
    await this.step(`Click the 'Logout' button`, async () => {
      await this.logoutButton.click();
    });
  }

  async clickUpdateSettingsButton() {
    await this.step(`Click the 'Update Settings' button`, async () => {
      await this.updateSettingsButton.click();
    });
  }

  async assertSettingsPageTitleIsVisible() {
    await this.step(`Assert the 'Your Settings' title is visible`, async () => {
      await expect(this.settingsPageTitle).toBeVisible();
    });
  }

  async assertEmailIsUpdated(email) {
    await this.step(`Assert the email is updated`, async () => {
      await expect(this.emailInput).toHaveValue(email);
    });
  }
  async assertProfilePictureUrlIsUpdated(profilePictureUrl) {
    await this.step(`Assert the profile picture URL is updated`, async () => {
      await expect(this.profilePictureUrlInput).toHaveValue(profilePictureUrl);
    });
  }
}
