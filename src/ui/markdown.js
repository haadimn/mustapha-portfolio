function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function linkify(str) {
  return str.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>');
}

// ponytail: regex/line-based conversion, not a real markdown parser — only
// handles ATX headings (# .. ######), blank-line-separated paragraphs, and
// [text](url) links (kept simple on purpose, just enough to not mangle link
// syntax for later). Upgrade path: swap this function's body for a real
// markdown lib (e.g. `marked`) if project content grows past this.
export function renderMarkdown(raw) {
  const blocks = raw.replace(/\r\n/g, "\n").trim().split(/\n\s*\n+/);

  return blocks
    .map((block) => {
      const headingMatch = block.match(/^(#{1,6})\s+(.*)$/);
      if (headingMatch) {
        const level = headingMatch[1].length;
        const text = linkify(escapeHtml(headingMatch[2].trim()));
        return `<h${level}>${text}</h${level}>`;
      }

      const text = block
        .split("\n")
        .map((line) => escapeHtml(line.trim()))
        .join(" ");
      return `<p>${linkify(text)}</p>`;
    })
    .join("\n");
}
