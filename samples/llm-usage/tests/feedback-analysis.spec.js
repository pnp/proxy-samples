// playwright/test-feedback-analysis.spec.js
// Test: Feedback analysis UI end-to-end

import { test, expect } from '@playwright/test';

test.describe('Session Evaluations Analysis', () => {
  test('loads feedback, analyzes, and displays pills', async ({ page, baseURL }) => {

    // log network requests for debugging
    page.on('request', request => {
      console.log(`Request: ${request.method()} ${request.url()}`);
    });
    page.on('response', async response => {
      console.log(`Response: ${response.status()} ${response.url()}`);
    });

    // increase timeout to handle retries
    test.slow();

    // 1. Load the webpage using its baseUrl
    await page.goto(baseURL);

    // 2. Wait for feedback to load (wait for at least one evaluation item)
    await page.waitForSelector('.evaluation-item');

    // 3. When feedback has loaded, press the Analyze button
    await page.waitForSelector('#analyze-button');
    const analyzeButton = page.locator('#analyze-button');
    await analyzeButton.click();

    // 4. Wait for button text to eventually become "Analysis Complete"
    await expect(analyzeButton).toHaveText(/Analysis Complete/, { timeout: 120000 });

    // 5. Verify that all feedbacks contain an evaluation pill that contains a value
    const evaluationItems = await page.$$('.evaluation-item');
    const pillTexts = [];

    for (const item of evaluationItems) {
      const pill = await item.$('.evaluation-pill');
      const pillText = await pill?.innerText();
      expect(pillText && pillText.trim().length).toBeGreaterThan(0);
      pillTexts.push(pillText?.trim());
    }

    // Fail if all pills contain "Unknown"
    const allUnknown = pillTexts.every(text => text === 'Unknown');
    expect(allUnknown).toBe(false);
  });
});
