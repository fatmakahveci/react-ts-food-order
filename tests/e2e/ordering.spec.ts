import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.beforeEach(async ({ page }) => {
  await page.goto("./");
});

test("browses, adjusts quantities and completes a demo order", async ({
  page,
}) => {
  const runtimeErrors: string[] = [];
  page.on("pageerror", (error) => runtimeErrors.push(error.message));
  await page.getByRole("button", { name: "Pizza", exact: true }).click();
  await expect(page.getByRole("article")).toHaveCount(1);
  await page
    .getByRole("button", { name: "Margherita Pizza add to cart" })
    .click();
  await page.getByRole("button", { name: "View order summary" }).click();
  const dialog = page.getByRole("dialog");
  await page.getByRole("button", { name: "Margherita Pizza increase" }).click();
  await expect(dialog.getByText(/TRY\s*570/)).toHaveCount(2);
  await page.getByRole("button", { name: "Margherita Pizza decrease" }).click();
  await expect(dialog.getByText(/TRY\s*285/)).toHaveCount(2);
  await page.getByRole("button", { name: "Continue to checkout" }).click();
  await expect(page.getByLabel("Full name")).toBeFocused();
  await page.getByRole("button", { name: "Complete demo order" }).click();
  await expect(dialog.getByRole("alert")).toHaveCount(3);
  await expect(page.getByLabel("Full name")).toBeFocused();
  await page.getByLabel("Full name").fill("Alex Taylor");
  await page.getByLabel("Phone number").fill("+44 (7700) 900-000");
  await page.getByLabel("Delivery address").fill("1 Example Street, London");
  await page.getByRole("button", { name: "Complete demo order" }).click();
  await expect(page.getByRole("heading", { name: "Thank you!" })).toBeFocused();
  await expect(dialog).toContainText(
    "No payment was taken and no real order was placed.",
  );
  await page.getByRole("button", { name: "Back to menu" }).click();
  await expect(page.getByRole("button", { name: /My cart/ })).toBeFocused();
  await page.getByRole("button", { name: /My cart/ }).click();
  await expect(dialog).toContainText("Your next great bite awaits.");
  expect(runtimeErrors).toEqual([]);
});

test("supports keyboard skip links, modal focus containment and Escape", async ({
  page,
}) => {
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("main")).toBeFocused();
  const trigger = page.getByRole("button", { name: /My cart/ });
  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("heading", { name: "My cart" })).toBeFocused();
  // Native dialogs may hand focus to browser chrome, but never to page controls.
  for (let i = 0; i < 6; i++) {
    await page.keyboard.press("Tab");
    expect(
      await page
        .getByRole("dialog")
        .evaluate(
          (dialog) =>
            document.activeElement === document.body ||
            dialog.contains(document.activeElement),
        ),
    ).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

test("fits the viewport and keeps navigation and checkout usable", async ({
  page,
}, testInfo) => {
  const fits = () =>
    page.evaluate(() => document.documentElement.scrollWidth <= innerWidth);
  expect(await fits()).toBe(true);
  if ((page.viewportSize()?.width ?? 0) < 760) {
    await page.getByRole("button", { name: "Open navigation" }).click();
    await page.getByRole("link", { name: "Why Lokma?" }).click();
    await expect(
      page.getByRole("button", { name: "Open navigation" }),
    ).toHaveAttribute("aria-expanded", "false");
  }
  await page
    .getByRole("button", { name: "Margherita Pizza add to cart" })
    .click();
  await page.getByRole("button", { name: "View order summary" }).click();
  await page.getByRole("button", { name: "Continue to checkout" }).click();
  expect(await fits()).toBe(true);
  expect(
    await page
      .getByRole("dialog")
      .evaluate((dialog) => dialog.scrollWidth <= dialog.clientWidth),
  ).toBe(true);
  await expect(
    page.getByRole("button", { name: "Complete demo order" }),
  ).toBeVisible();
  await testInfo.attach("checkout", {
    body: await page.screenshot(),
    contentType: "image/png",
  });
});

test("has no axe WCAG A/AA violations across the ordering states", async ({
  page,
}) => {
  const audit = async () => {
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  };
  await audit();
  await page
    .getByRole("button", { name: "Margherita Pizza add to cart" })
    .click();
  await page.getByRole("button", { name: "View order summary" }).click();
  await audit();
  await page.getByRole("button", { name: "Continue to checkout" }).click();
  await page.getByRole("button", { name: "Complete demo order" }).click();
  await audit();
});

test("exports English metadata and loads local assets without runtime errors", async ({
  page,
  request,
  baseURL,
}) => {
  const errors: string[] = [];
  const failures: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("requestfailed", (request) => failures.push(request.url()));
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page).toHaveTitle("Lokma — Happiness in every bite");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /No real orders or payments/,
  );
  const canonical = await page
    .locator('link[rel="canonical"]')
    .getAttribute("href");
  expect(canonical).toMatch(/^https?:\/\/.+\/$/);
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
    "content",
    canonical!,
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    `${canonical}og.png`,
  );
  await expect(page.locator('meta[name="twitter:image:alt"]')).toHaveAttribute(
    "content",
    /Lokma/,
  );
  const sitemap = await request.get(new URL("sitemap.xml", baseURL!).href);
  expect(sitemap.ok()).toBe(true);
  expect(await sitemap.text()).toContain(`<loc>${canonical}</loc>`);
  const images = page.locator("main img");
  for (const image of await images.all()) {
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        image.evaluate(
          (element: HTMLImageElement) =>
            element.complete && element.naturalWidth > 0,
        ),
      )
      .toBe(true);
    expect(await image.getAttribute("width")).toBeTruthy();
    expect(await image.getAttribute("height")).toBeTruthy();
    expect(
      await image.evaluate(
        (element: HTMLImageElement) => new URL(element.currentSrc).origin,
      ),
    ).toBe(new URL(baseURL!).origin);
  }
  await page.evaluate(() => document.fonts.ready);
  expect(errors).toEqual([]);
  expect(failures).toEqual([]);
});
