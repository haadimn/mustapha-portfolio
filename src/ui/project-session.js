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
// Handlers are registered once and no-op unless a session is open, so they
// never interfere with the flat (parts.length === 0) show/hide path.
export function createProjectSession(k, player, textbox, gifOverlay) {
  let project = null;
  let sizePreset = "large";
  let mode = null; // "list" | "topic" | null
  let index = 0;
  let topicIndex = -1;

  function render() {
    textbox.show(mode === "list" ? renderList(project, index) : renderTopic(project.parts[topicIndex]), sizePreset);
  }

  function open(proj, preset = "large") {
    project = proj;
    sizePreset = preset;
    mode = "list";
    index = 0;
    player.locked = true;
    render();
  }

  function close() {
    project = null;
    mode = null;
    player.locked = false;
    textbox.hide();
    gifOverlay.hide();
  }

  function isActive() {
    return mode !== null;
  }

  k.onButtonPress("up", () => {
    if (mode !== "list") return;
    index = (index - 1 + project.parts.length) % project.parts.length;
    render();
  });

  k.onButtonPress("down", () => {
    if (mode !== "list") return;
    index = (index + 1) % project.parts.length;
    render();
  });

  k.onButtonPress("interact", () => {
    if (!isActive()) return;
    if (mode === "list") {
      mode = "topic";
      topicIndex = index;
      render();
      return;
    }
    if (topicIndex + 1 < project.parts.length) {
      topicIndex += 1;
      index = topicIndex;
      render();
    }
  });

  k.onButtonPress("left", () => {
    if (!isActive()) return;
    if (mode === "topic") {
      mode = "list";
      render();
      return;
    }
    close();
  });

  return { open, close, isActive };
}
