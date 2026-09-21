import { createTextBox } from "./textbox.js";
import { renderMarkdown, escapeHtml } from "./markdown.js";

function renderList(project, index) {
  const intro = project.intro ? renderMarkdown(project.intro) : "";
  const items = project.parts
    .map((part, i) => {
      const cls = i === index ? "topic-item selected" : "topic-item";
      return `<li class="${cls}">${escapeHtml(part.title)}</li>`;
    })
    .join("\n");
  return `${intro}\n<ul class="topic-list">${items}</ul>`;
}

function renderTopic(part) {
  const body = part.body ? renderMarkdown(part.body) : "";
  return `<h2>${escapeHtml(part.title)}</h2>\n${body}`;
}

// Owns the interactive list/topic state for a project with `##` parts.
// Renders through its own text box (same shared TextboxManager singleton
// underneath, so font/sizing/positioning stay identical to plain textboxes).
export class InteractiveTextBox {
  constructor(k, player, gifOverlay) {
    this.k = k;
    this.player = player;
    this.gifOverlay = gifOverlay;
    this.textbox = createTextBox();
    this.project = null;
    this.sizePreset = "large";
    this.mode = null; // "list" | "topic" | null
    this.index = 0;
    this.topicIndex = -1;

    k.onButtonPress("up", () => this.up());
    k.onButtonPress("down", () => this.down());
    k.onButtonPress("interact", () => this.interact());
    k.onButtonPress("left", () => this.back());
  }

  render() {
    const html = this.mode === "list"
      ? renderList(this.project, this.index)
      : renderTopic(this.project.parts[this.topicIndex]);
    this.textbox.show(html, this.sizePreset);
  }

  open(project, preset = "large") {
    this.project = project;
    this.sizePreset = preset;
    this.mode = "list";
    this.index = 0;
    this.player.locked = true;
    this.render();
  }

  close() {
    this.project = null;
    this.mode = null;
    this.player.locked = false;
    this.textbox.hide();
    this.gifOverlay.hide();
  }

  isActive() {
    return this.mode !== null;
  }

  up() {
    if (this.mode !== "list") return;
    this.index = (this.index - 1 + this.project.parts.length) % this.project.parts.length;
    this.render();
  }

  down() {
    if (this.mode !== "list") return;
    this.index = (this.index + 1) % this.project.parts.length;
    this.render();
  }

  interact() {
    if (!this.isActive()) return;
    if (this.mode === "list") {
      this.mode = "topic";
      this.topicIndex = this.index;
      this.render();
      return;
    }
    if (this.topicIndex + 1 < this.project.parts.length) {
      this.topicIndex += 1;
      this.index = this.topicIndex;
      this.render();
    }
  }

  back() {
    if (!this.isActive()) return;
    if (this.mode === "topic") {
      this.mode = "list";
      this.render();
      return;
    }
    this.close();
  }
}
