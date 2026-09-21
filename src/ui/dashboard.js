import { createTextBox } from "./textbox.js";
import { escapeHtml } from "./markdown.js";

function renderTile(tile, i, index) {
  const cls = i === index ? "dashboard-tile selected" : "dashboard-tile";
  return `<div class="${cls}"><img src="${tile.image}" /><span>${escapeHtml(tile.label)}</span></div>`;
}

export class Dashboard {
  constructor(k, player) {
    this.k = k;
    this.player = player;
    this.textbox = createTextBox();
    this.tiles = [];
    this.cols = 3;
    this.index = 0;
    this.title = "";

    k.onButtonPress("up", () => this.move(-this.cols));
    k.onButtonPress("down", () => this.move(this.cols));
    k.onButtonPress("left", () => this.move(-1));
    k.onButtonPress("right", () => this.move(1));
    k.onButtonPress("interact", () => this.select());
  }

  move(delta) {
    if (!this.isActive()) return;
    const total = this.tiles.length;
    this.index = ((this.index + delta) % total + total) % total;
    this.render();
  }

  render() {
    const tiles = this.tiles
      .map((tile, i) => renderTile(tile, i, this.index))
      .join("\n");
    const title = this.title
      ? `<p class="dashboard-title">${escapeHtml(this.title)}</p>`
      : "";
    const html = `${title}<div class="dashboard-grid" style="grid-template-columns: repeat(${this.cols}, 1fr)">${tiles}</div>`;
    this.textbox.show(html, "dashboard");
  }

  open(tiles, cols = 3, title = "") {
    this.tiles = tiles;
    this.cols = cols;
    this.title = title;
    this.index = 0;
    this.player.locked = true;
    this.render();
  }

  select() {
    if (!this.isActive()) return;
    const url = this.tiles[this.index]?.url;
    if (url) window.open(url, "_blank", "noopener");
  }

  close() {
    this.tiles = [];
    this.player.locked = false;
    this.textbox.hide();
  }

  isActive() {
    return this.tiles.length > 0;
  }
}
