const files = import.meta.glob("/content/projects/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

export const projects = Object.entries(files).map(([path, raw]) => ({
  slug: path.split("/").pop().replace(".md", ""),
  raw,
}));
