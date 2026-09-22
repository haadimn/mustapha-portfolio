import { createTextBox } from "./textbox.js";
import { escapeHtml } from "./markdown.js";

function renderSlide(tile) {
  const description = tile.description
    ? `<p class="gallery-description">${escapeHtml(tile.description)}</p>`
    : "";
  const redirect = tile.url
    ? `<a class="gallery-redirect" href="${escapeHtml(tile.url)}" target="_blank" rel="noopener">${escapeHtml(tile.linkLabel ?? "Open link")} ↗</a>`
    : "";
  return `<div class="gallery-slide"><img src="${tile.image}" /><h2 class="gallery-caption">${escapeHtml(tile.label)}</h2>${description}${redirect}</div>`;
}

// One big image + caption at a time, not a grid — Left/Right flips between
// pieces. Separate from Dashboard, which is a tile grid for link-style tiles.
export class Gallery {
  constructor(k, player) {
    this.k = k;
    this.player = player;
    this.textbox = createTextBox();
    this.tiles = [];
    this.index = 0;

    k.onButtonPress("left", () => this.move(-1));
    k.onButtonPress("right", () => this.move(1));
    k.onButtonPress("interact", () => this.select());
  }

  select() {
    if (!this.isActive()) return;
    const url = this.tiles[this.index]?.url;
    if (url) window.open(url, "_blank", "noopener");
  }

  move(delta) {
    if (!this.isActive()) return;
    const total = this.tiles.length;
    this.index = ((this.index + delta) % total + total) % total;
    this.render();
  }

  render() {
    this.textbox.show(renderSlide(this.tiles[this.index]), "dashboard");
  }

  open(tiles) {
    this.tiles = tiles;
    this.index = 0;
    this.player.locked = true;
    this.render();
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
