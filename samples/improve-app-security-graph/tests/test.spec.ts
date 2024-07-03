import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  // load the page
  await page.goto('http://localhost:3000');

  // check if the page contains the splash screen text
  await expect(page.getByRole('paragraph')).toContainText('Product Support Tickets');

  // check that the login button is visible
  const button = page.getByRole('button', { name: 'Login' });
  await expect(button).toBeVisible();

  // set the popup promise
  const popupPromise = page.waitForEvent('popup');

  // click the login button
  await button.click();

  // handle the auth popup
  const popup = await popupPromise;

  // handle username field
  const username = popup.getByPlaceholder('Email or phone');
  await username.click();
  await username.fill(process.env.TEST_USERNAME as string);
  const next = popup.getByRole('button', { name: 'Next' });
  await next.click();

  // handle password field
  const password = popup.getByPlaceholder('Password');
  await password.click();
  await password.fill(process.env.TEST_PASSWORD as string);
  const signIn = popup.getByRole('button', { name: 'Sign in' });
  await signIn.click();

  // handle sign in reminder
  const yes = popup.getByRole('button', { name: 'Yes' });
  await yes.click();

  // after the popup is closed, check if the page contains the last ticket returned in the table
  await expect(page.locator('tbody')).toContainText('Eagle Air Range Limitation Inquiry');
});