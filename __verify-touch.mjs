import { chromium, devices } from "playwright";

const iPhone = devices["iPhone 12"];

const browser = await chromium.launch({ args: ["--no-sandbox"] });
const context = await browser.newContext({ ...iPhone, hasTouch: true });
const page = await context.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});

await page.goto("http://localhost:5173", { waitUntil: "networkidle" });
await page.waitForSelector("#touch-controls-root.visible", { timeout: 10000 });
await page.waitForTimeout(500);

// Check 1: layout screenshot
await page.screenshot({ path: "/tmp/touch-1-layout.png" });

const boxes = {};
for (const sel of [".dpad", ".interact-btn", ".cancel-btn"]) {
  boxes[sel] = await page.locator(sel).boundingBox();
}
console.log("BOXES", JSON.stringify(boxes));

function overlap(a, b) {
  return !(a.x + a.width <= b.x || b.x + b.width <= a.x || a.y + a.height <= b.y || b.y + b.height <= a.y);
}
const pairs = [[".dpad", ".interact-btn"], [".dpad", ".cancel-btn"], [".interact-btn", ".cancel-btn"]];
for (const [a, b] of pairs) {
  console.log(`overlap(${a}, ${b}) =`, overlap(boxes[a], boxes[b]));
}

// Check 2: initial "phone is ringing" rpg textbox should be visible at load; tap cancel closes it
const textboxVisibleBefore = await page.locator("#textbox-root.visible").count();
console.log("textbox visible before cancel tap:", textboxVisibleBefore);
await page.screenshot({ path: "/tmp/touch-2-before-cancel.png" });

await page.locator(".cancel-btn").tap();
await page.waitForTimeout(300);
const textboxVisibleAfter = await page.locator("#textbox-root.visible").count();
console.log("textbox visible after cancel tap:", textboxVisibleAfter);
await page.screenshot({ path: "/tmp/touch-3-after-cancel.png" });

// Check 3: try walking with the D-pad to see if we can trigger a project marker / session,
// then verify cancel fully closes it too.
const right = page.locator('[data-button="right"]');
const box = await right.boundingBox();
async function holdDirection(selector, ms) {
  const loc = page.locator(selector);
  const b = await loc.boundingBox();
  await page.touchscreen.tap(b.x + b.width / 2, b.y + b.height / 2);
  await loc.dispatchEvent("pointerdown");
  await page.waitForTimeout(ms);
  await loc.dispatchEvent("pointerup");
}

let sessionSeen = false;
for (let i = 0; i < 6 && !sessionSeen; i++) {
  await holdDirection("right", 400);
  await holdDirection("down", 200);
  const visible = await page.locator("#textbox-root.visible").count();
  if (visible) {
    const isLarge = await page.locator("#textbox-root.textbox-root--large").count();
    const hasTopicList = await page.locator(".topic-list").count();
    if (isLarge && hasTopicList) {
      sessionSeen = true;
    }
  }
}
console.log("project session found while walking:", sessionSeen);
await page.screenshot({ path: "/tmp/touch-4-walked.png" });

if (sessionSeen) {
  await page.locator(".cancel-btn").tap();
  await page.waitForTimeout(300);
  const stillVisible = await page.locator("#textbox-root.visible").count();
  console.log("project session still visible after cancel tap:", stillVisible);
  await page.screenshot({ path: "/tmp/touch-5-session-cancelled.png" });
}

console.log("console/page errors:", JSON.stringify(errors));

await browser.close();
