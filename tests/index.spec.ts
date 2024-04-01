import { expect, test } from "@playwright/test";
import { faker } from "@faker-js/faker";

test("auth", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("GaaB: Github as a Blog");

  await page.click("text=Start blogging now");

  await page.waitForLoadState("networkidle");
  await expect(page).toHaveURL(/\/posts/);
});

test("create post", async ({ page }) => {
  await page.goto("/posts");
  await page.waitForLoadState("networkidle");

  await page.click("text=Create");
  await page.waitForLoadState("networkidle");

  await expect(page).toHaveURL(/\/posts\/create/);

  const { title, body } = randomPost();

  await page.fill('input[name="title"]', title);
  await page.fill('textarea[name="body"]', body);

  await page.click("text=Submit");
  await page.waitForLoadState("networkidle");

  await expect(page).toHaveURL(/\/posts\/[0-9]+/);
  await expect(page).toHaveTitle(title);
});

function randomPost() {
  return {
    title: `Test post by ${faker.person.fullName()} in ${faker.location.city()}`,
    body: faker.lorem.words({
      min: 30,
      max: 100,
    }),
  };
}
