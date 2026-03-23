import { test, expect } from '@playwright/test';

test.describe('Login scene', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should render login form', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    await expect(page.locator('input[name="user"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });

  test('should render empty form initially', async ({ page }) => {
    await expect(page.locator('input[name="user"]')).toHaveValue('');
    await expect(page.locator('input[name="password"]')).toHaveValue('');
  });

  test('should allow typing user and password', async ({ page }) => {
    await page.locator('input[name="user"]').fill('admin');
    await page.locator('input[name="password"]').fill('test');

    await expect(page.locator('input[name="user"]')).toHaveValue('admin');
    await expect(page.locator('input[name="password"]')).toHaveValue('test');
  });

  test('should navigate to submodule list when credentials are valid', async ({ page }) => {
    await page.locator('input[name="user"]').fill('admin');
    await page.locator('input[name="password"]').fill('test');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/#\/submodule-list$/);
  });

  test('should stay on login when credentials are invalid', async ({ page }) => {
    await page.locator('input[name="user"]').fill('wrong-user');
    await page.locator('input[name="password"]').fill('wrong-password');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/\/$/);
  });

  test('should show validation errors when submitting empty form', async ({ page }) => {
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.locator('input[name="user"]')).toHaveAttribute(
      'aria-invalid',
      'true'
    );
    await expect(page.locator('input[name="password"]')).toHaveAttribute(
      'aria-invalid',
      'true'
    );

    await expect(page.getByText('Debe informar el campo')).toHaveCount(2);
  });

  test('should submit form when pressing Enter', async ({ page }) => {
    await page.locator('input[name="user"]').fill('admin');
    await page.locator('input[name="password"]').pressSequentially('test');
    await page.locator('input[name="password"]').press('Enter');

    await expect(page).toHaveURL(/#\/submodule-list$/);
  });

  test('should focus user input when clicked', async ({ page }) => {
    const userInput = page.locator('input[name="user"]');
    await userInput.click();
    await expect(userInput).toBeFocused();
  });

  test('should render password input as password type', async ({ page }) => {
    await expect(page.locator('input[name="password"]')).toHaveAttribute(
      'type',
      'password'
    );
  });
});