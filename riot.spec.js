const { test, expect, chromium } = require('@playwright/test');

test('Перевірка головної сторінки Riot Games', async () => {
  // Запускаємо Google Chrome
  const browser = await chromium.launch({ channel: 'chrome', headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Крок 1: Відкриваємо вебсайт Riot Games
  await page.goto('https://www.riotgames.com/en');
  console.log('Сайт успішно відкрито');

  // Крок 2: Перевіряємо заголовок сторінки
  await expect(page).toHaveTitle(/Riot Games/);
  console.log('Перевірка заголовка сторінки пройдена успішно');

  // Крок 3: Перевіряємо наявність навігації або основного елемента (наприклад, тегу nav)
  const navElement = page.locator('nav').first();
  await expect(navElement).toBeVisible();
  console.log('Перевірка наявності панелі навігації пройдена успішно');

  // Крок 4: Знаходимо посилання "Who we are" та клікаємо по ньому
  const aboutLink = page.getByRole('link', { name: /Who we are/i }).first();
  await expect(aboutLink).toBeVisible();
  await aboutLink.click();
  console.log('Клік по кнопці/посиланню виконано');

  // Крок 5: Перевіряємо перехід на нову сторінку
  await expect(page).toHaveURL(/who-we-are/);
  console.log('Перевірка переходу на нову сторінку пройдена успішно');

  await browser.close();
});