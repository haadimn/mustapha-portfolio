import { TextboxConfig } from "./textbox-config.js";

const ROOT_ID = "textbox-root";

export class TextboxManager {
  constructor() {
    this.el = document.getElementById(ROOT_ID);
    this.currentConfig = null;
  }

  show(html, config = "large") {
    this.cleanup();

    const textboxConfig = typeof config === "string"
      ? TextboxConfig.fromString(config)
      : TextboxConfig.fromString(config);

    this.el.innerHTML = html;
    const layout = textboxConfig.getLayout();
    const cssClass = textboxConfig.getCssClass();

    Object.assign(this.el.style, {
      position: "absolute",
      width: layout.width,
      height: layout.height,
      bottom: layout.bottom,
      left: layout.left,
      right: layout.right,
      top: layout.top,
    });

    if (layout.maxHeight) {
      this.el.style.maxHeight = layout.maxHeight;
    }

    this.el.classList.add(cssClass, "visible");
    this.currentConfig = textboxConfig;
  }

  hide() {
    this.el.classList.remove("visible");
    this.cleanup();
  }

  cleanup() {
    if (this.currentConfig) {
      const oldCss = this.currentConfig.getCssClass();
      this.el.classList.remove(oldCss);
      this.currentConfig = null;
    }
    Object.assign(this.el.style, {
      maxHeight: "",
      overflow: "",
    });
  }

  isVisible() {
    return this.el.classList.contains("visible");
  }
}

let manager = null;

export function getTextboxManager() {
  if (!manager) {
    manager = new TextboxManager();
  }
  return manager;
}
