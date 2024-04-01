import { expect, test } from "@playwright/test";

test("auth", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("GaaB: Github as a Blog");

  await page.click("text=Start blogging now");

  await page.waitForLoadState("networkidle");
  await expect(page).toHaveURL(/\/posts/);
});
