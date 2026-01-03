import { expect, testStep } from '../../common/helpers/pw';

export class ProfilePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.editProfileSettingsLink = page
      .getByRole('link', { name: ' Edit Profile Settings' });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async clickEditProfileSettingsLink() {
    await this.step(`Click the 'Edit Profile Settings' link`, async () => {
      await this.editProfileSettingsLink.click();
    });
  }

  async assertProfilePageTitleIsVisible(username) {
    await this.step(`Assert the profile page title is visible`, async () => {
      const profilePageTitle = this.page
        .getByRole('heading', { name: username });
      await expect(profilePageTitle).toBeVisible();
    });
  }

    async assertBioIsUpdated(bio) {
    await this.step(`Assert the bio is updated`, async () => {
      const bioElement = this.page.getByText(bio);
      await expect(bioElement).toBeVisible();
    });
  }
}
