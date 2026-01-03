import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { SettingsPage } from '../../../src/ui/pages/SettingsPage';

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test('Log out user', async ({
  homePage, page
}) => {
    const settingsPage = new SettingsPage(page);
    await homePage.clickSettingsButton();

    await settingsPage.assertSettingsPageTitleIsVisible();
    await settingsPage.clickLogoutButton();
    await homePage.assertUserIsLoggedOut();
});
