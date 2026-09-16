const files = import.meta.glob("/content/projects/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

export const projects = Object.entries(files).map(([path, raw]) => ({
  slug: path.split("/").pop().replace(".md", ""),
  raw,
}));

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug);
}
