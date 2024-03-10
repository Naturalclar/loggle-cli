import { Page } from "playwright";

export async function fillEmail(page: Page, email: string) {
  const emailInput = await page.$('input[name="email"]');

  if (!emailInput) {
    throw new Error("email input not found");
  }

  await emailInput.fill(email);
}

export async function fillPassword(page: Page, password: string) {
  const passwordInput = await page.$('input[name="password"]');
  if (!passwordInput) {
    throw new Error("password input not found");
  }

  await passwordInput.fill(password);
}

export async function checkRemember(page: Page) {
  const remember = await page.$('input[name="remember"]');

  if (remember) {
    await remember.check();
  }
}
