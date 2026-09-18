import "./textbox.css";
import { getTextboxManager } from "./textbox-manager.js";

export function createTextBox() {
  const manager = getTextboxManager();

  return {
    show: (html, config = "large") => manager.show(html, config),
    hide: () => manager.hide(),
  };
}
