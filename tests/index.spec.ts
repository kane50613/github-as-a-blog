import { expect, type Page, test } from "@playwright/test";
import { faker } from "@faker-js/faker";

test.describe.configure({ mode: "serial" });

let page: Page;

test.beforeAll(async ({ browser }) => (page = await browser.newPage()));
test.afterAll(async () => await page.close());

test("auth", async () => {
  await page.goto("/");

  await expect(page).toHaveTitle("GaaB: Github as a Blog");

  await page.click("text=Start blogging now");

  await page.waitForLoadState("networkidle");
  await expect(page).toHaveURL(/\/posts/);
});

const { title, body } = randomPost();

test("create post", async () => {
  await page.click("text=Create");
  await page.waitForLoadState("networkidle");

  await expect(page).toHaveURL(/\/posts\/create/);

  await page.fill('input[name="title"]', title);
  await page.fill('textarea[name="body"]', body);

  await page.click("text=Submit");
  await page.waitForLoadState("networkidle");

  await expect(page).toHaveURL(/\/posts\/[0-9]+/);
  await expect(page).toHaveTitle(title);
});

test("edit post", async () => {
  await page.click("text=Edit");
  await page.waitForLoadState("networkidle");

  await expect(page).toHaveURL(/\/posts\/[0-9]+\/edit/);

  const newTitle = `Updated ${title}`;
  const newBody = `${body}\n\nUpdated!`;

  await page.fill('input[name="title"]', newTitle);
  await page.fill('textarea[name="body"]', newBody);

  await page.click("text=Submit");
  await page.waitForLoadState("networkidle");

  await expect(page).toHaveURL(/\/posts\/[0-9]+/);
  await expect(page).toHaveTitle(newTitle);
});

test("delete post", async () => {
  await page.click("text=Delete");
  await page.waitForLoadState("networkidle");

  await expect(page).toHaveURL(/\/posts\/[0-9]+\/delete/);
  await page.click("text=Yes");

  await page.waitForLoadState("networkidle");
  await expect(page).toHaveURL(/\/posts/);
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
