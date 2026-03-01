import { chromium } from "playwright";

const seeds = [88,89,90,91,92,93,94,95,96,97];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let grandTotal = 0;

  for (const seed of seeds) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    await page.goto(url);

    // Wait for table to load
    await page.waitForSelector("table");

    // Extract all numbers inside tables
    const numbers = await page.$$eval("table td", tds =>
      tds.map(td => parseFloat(td.innerText))
         .filter(n => !isNaN(n))
    );

    const sum = numbers.reduce((a,b) => a + b, 0);
    grandTotal += sum;

    console.log(`Seed ${seed} sum: ${sum}`);
  }

  console.log("=================================");
  console.log(`FINAL TOTAL SUM: ${grandTotal}`);
  console.log("=================================");

  await browser.close();
})();
