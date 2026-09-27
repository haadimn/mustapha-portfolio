import { chromium } from "playwright";

const OUT = "/tmp/claude-1000/-mnt-c-Users-naqvi-OneDrive-Documents-mustapha-portfolio-mustapha-portfolio/9b07ee4e-7313-49c7-9310-8f6236ea97ee/scratchpad/phone-shots";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 960, height: 640 } });

const consoleErrors = [];
page.on("console", (msg) => { if (msg.type() === "error") consoleErrors.push(msg.text()); });
page.on("pageerror", (err) => consoleErrors.push("pageerror: " + err.message));

// Never actually hit the real Formspree endpoint from an automated test run.
await page.route("**/formspree.io/**", (route) => route.fulfill({ status: 200, body: "{}" }));

await page.goto("http://localhost:5173");
await page.waitForSelector("#name-entry-input", { timeout: 15000 });
await page.fill("#name-entry-input", "QA Bot");
await page.click("#name-entry-form button[type=submit]");

await page.waitForSelector("canvas", { timeout: 15000 });
await page.waitForTimeout(300); // let scene finish loading
await page.click("canvas");

await page.screenshot({ path: `${OUT}/01-load.png` });
await page.waitForTimeout(250);
await page.screenshot({ path: `${OUT}/02-load-250ms-later.png` });

async function moveKey(key, ms) {
  await page.keyboard.down(key);
  await page.waitForTimeout(ms);
  await page.keyboard.up(key);
}

// Path from spawn (24,72) world-px to the phone (205.57,11.18) world-px,
// staying clear of the desk/window/elevator/info-board colliders.
await moveKey("ArrowRight", 1300); // -> approx x195, y72
await page.screenshot({ path: `${OUT}/03-after-right.png` });
await moveKey("ArrowUp", 400); // -> approx x195, y20
await page.screenshot({ path: `${OUT}/04-after-up.png` });
await moveKey("ArrowRight", 500); // walk into the phone marker

await page.screenshot({ path: `${OUT}/05-at-phone.png` });
await page.waitForTimeout(250);
await page.screenshot({ path: `${OUT}/06-at-phone-250ms-later.png` });

console.log("CONSOLE_ERRORS:", JSON.stringify(consoleErrors));

await browser.close();
