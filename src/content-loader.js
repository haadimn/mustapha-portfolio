const files = import.meta.glob("/content/projects/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

// ponytail: regex split, not a real markdown parser — mirrors renderMarkdown's
// approach. Only exactly "## " starts a new part; deeper headings (###+) stay
// inside a part's body.
function splitParts(raw) {
  const text = raw.replace(/\r\n/g, "\n");
  const matches = [...text.matchAll(/^##[ \t]+(.*)$/gm)];
  if (matches.length === 0) return { intro: text.trim(), parts: [] };

  const intro = text.slice(0, matches[0].index).trim();
  const parts = matches.map((m, i) => {
    const start = m.index + m[0].length;
    const end = i + 1 < matches.length ? matches[i + 1].index : text.length;
    return { title: m[1].trim(), body: text.slice(start, end).trim() };
  });
  return { intro, parts };
}

export const projects = Object.entries(files).map(([path, raw]) => ({
  slug: path.split("/").pop().replace(".md", ""),
  raw,
  ...splitParts(raw),
}));

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug);
}
