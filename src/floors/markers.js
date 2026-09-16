// Matches the Tiled "computer" prop object and layers an invisible,
// proximity-triggerable marker on top of it — same idiom as wallTileRules()
// adding a collision-only entity alongside a rendered one.
export function markerObjectRules(k) {
  return [
    {
      match: { name: "computer" },
      comps: ({ width, height, properties }) => [
        k.area({ shape: new k.Rect(k.vec2(), width, height) }),
        "project-marker",
        { slug: properties.slug },
      ],
    },
  ];
}
