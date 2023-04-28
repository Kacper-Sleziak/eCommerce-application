import { test, expect } from '@playwright/test'

test('find local page', async ({ page }) => {
  // await page.goto('https://playwright.dev/')
  await page.goto('http://localhost:3000')
})

test('find playwright page ', async ({ page }) => {
  await page.goto('https://playwright.dev/')
})
