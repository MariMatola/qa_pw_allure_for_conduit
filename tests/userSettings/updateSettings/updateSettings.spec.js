import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { SettingsPage } from '../../../src/ui/pages/SettingsPage';
import { ProfilePage } from '../../../src/ui/pages/ProfilePage';
import { SignInPage } from '../../../src/ui/pages/auth/SignInPage';

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test('Update username from settings', async ({
  homePage, page
}) => {
    const settingsPage = new SettingsPage(page);
    const profilePage = new ProfilePage(page);
    const newUsername = Math.random().toString(36).substring(2, 6);
    await homePage.clickSettingsButton();

    await settingsPage.assertSettingsPageTitleIsVisible();
    await settingsPage
       .fillInUserName(newUsername);
    await settingsPage.clickUpdateSettingsButton();
    await profilePage.assertProfilePageTitleIsVisible(newUsername);
});

test('Update email from settings', async ({
  homePage, page, user
}) => {
    const settingsPage = new SettingsPage(page);
    const profilePage = new ProfilePage(page);
    const newEmail = Math.random().toString(36).substring(2, 6) 
      + '@example.com';
    await homePage.clickSettingsButton();

    await settingsPage.assertSettingsPageTitleIsVisible();
    await settingsPage
       .fillInEmail(newEmail);
    await settingsPage.clickUpdateSettingsButton();
    await profilePage.assertProfilePageTitleIsVisible(user.username);
    await profilePage.clickEditProfileSettingsLink();
    await settingsPage.assertSettingsPageTitleIsVisible();
    await settingsPage.assertEmailIsUpdated(newEmail);
});

test('Update password from settings', async ({
  homePage, page, user
}) => {
    const settingsPage = new SettingsPage(page);
    const profilePage = new ProfilePage(page);
    const signInPage = new SignInPage(page);
    const newPassword = Math.random().toString(36).substring(2, 10);
    await homePage.clickSettingsButton();

    await settingsPage.assertSettingsPageTitleIsVisible();
    await settingsPage.fillInPassword(newPassword);
    await settingsPage.clickUpdateSettingsButton();
    await profilePage.assertProfilePageTitleIsVisible(user.username);
    await profilePage.clickEditProfileSettingsLink();
    await settingsPage.assertSettingsPageTitleIsVisible();
    await settingsPage.clickLogoutButton();
    await homePage.assertUserIsLoggedOut();
    await homePage.clickSignInLink();
    await signInPage.assertSignInPageTitleIsVisible();
    await signInPage.fillEmailField(user.email);
    await signInPage.fillPasswordField(newPassword);
    await signInPage.clickSignInButton();
    await homePage.assertUserIsLoggedIn(user.username);
});