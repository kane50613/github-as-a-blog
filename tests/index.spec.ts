import { expect, type Page, test } from "@playwright/test";
import { faker } from "@faker-js/faker";

test.describe.configure({ mode: "serial" });

let page: Page;

test.beforeAll(async ({ browser }) => (page = await browser.newPage()));
test.afterAll(async () => {
  await page.waitForLoadState("networkidle");
  await page.close();
});

test("auth", async () => {
  await page.goto("/");

  await expect(page).toHaveTitle("GaaB: Github as a Blog");
  await expect(page.locator("text=Loading posts...")).not.toBeVisible({
    timeout: 10_000,
  });

  await page.click("text=Start blogging now");

  await expect(page).toHaveURL(/\/posts/);
});

let { title, body } = randomPost();

test("create post", async () => {
  await page.click("text=Create");

  await expect(page).toHaveURL(/\/posts\/create/);

  await page.fill('input[name="title"]', title);
  await page.fill(".tiptap", body);

  await page.click("text=Submit");

  await expect(page).toHaveURL(/\/posts\/[0-9]+/);
  await expect(page).toHaveTitle(title);
});

test("edit post", async () => {
  await page.click("text=Edit");

  await expect(page).toHaveURL(/\/posts\/[0-9]+\/edit/, {
    timeout: 10_000,
  });

  title = `Updated ${title}`;
  body = `${body}\n\nUpdated!`;

  await page.fill('input[name="title"]', title);
  await page.fill(".tiptap", body);

  await page.click("text=Submit");

  await expect(page).toHaveURL(/\/posts\/[0-9]+/);
  await expect(page).toHaveTitle(title);
});

test("delete post", async () => {
  await page.click("text=Delete");

  await expect(page).toHaveURL(/\/posts\/[0-9]+\/delete/);
  await page.click("text=Yes");

  await expect(page).toHaveURL(/\/posts/);
  await expect(page).toHaveTitle("GaaB: Github as a Blog");

  await expect(page.locator("text=Loading posts...")).not.toBeVisible({
    timeout: 10_000,
  });
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
