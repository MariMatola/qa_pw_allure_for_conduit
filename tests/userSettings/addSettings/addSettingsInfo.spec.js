import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { SettingsPage } from '../../../src/ui/pages/SettingsPage';
import { ProfilePage } from '../../../src/ui/pages/ProfilePage';
import { SignInPage } from '../../../src/ui/pages/auth/SignInPage';

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test('Add profile picture URL from settings', async ({
    homePage, page
  }) => {
      const settingsPage = new SettingsPage(page);
      const profilePage = new ProfilePage(page);
      const profilePictureUrl = 'https://example.com/profile.jpg';
      await homePage.clickSettingsButton();
  
      await settingsPage.assertSettingsPageTitleIsVisible();
      await settingsPage
         .fillInProfilePictureUrl(profilePictureUrl);
      await settingsPage.clickUpdateSettingsButton();
      await settingsPage.assertProfilePictureUrlIsUpdated(profilePictureUrl);
  });
  
//   Add short bio from settings
test('Add short bio from settings', async ({
    homePage, page
  }) => {
      const settingsPage = new SettingsPage(page);
      const profilePage = new ProfilePage(page);
      const shortBio = 'This is a short bio about me';
      await homePage.clickSettingsButton();
      await settingsPage.assertSettingsPageTitleIsVisible();
      await settingsPage.fillInBio(shortBio);
      await settingsPage.clickUpdateSettingsButton();
      await profilePage.assertBioIsUpdated(shortBio);
  });