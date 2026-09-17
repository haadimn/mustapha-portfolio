import "./textbox.css";
import { mergePreset } from "./textbox-types.js";

const ROOT_ID = "textbox-root";

// ponytail: one box, no queue/animation — fine until Phase 2/3 wire real
// show/hide triggers in. Upgrade path: add a transition or a display queue
// here without changing the show()/hide() contract callers use.
export function createTextBox() {
  const el = document.getElementById(ROOT_ID);

  function show(html, config = "large") {
    const cfg =
      typeof config === "string"
        ? mergePreset(config)
        : mergePreset(config.preset ?? "large", config);

    el.innerHTML = html;
    el.classList.toggle("textbox-root--small", cfg.position === "bottom");
    el.classList.toggle("textbox-root--oneliner", cfg.position === "top");
    const styleObj = {
      position: "absolute",
      width: cfg.width,
      height: cfg.height,
      bottom: cfg.bottom,
      left: cfg.left,
      right: cfg.right,
      top: cfg.top,
    };
    if (cfg.maxHeight) styleObj.maxHeight = cfg.maxHeight;
    Object.assign(el.style, styleObj);
    el.classList.add("visible");
  }

  function hide() {
    el.classList.remove("visible");
  }

  return { show, hide };
}
