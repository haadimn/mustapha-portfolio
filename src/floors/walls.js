const EDGE_THICKNESS = 16;

// ponytail: border walls only cover the map's rectangular bounds, not interior shape.
// upgrade path: mark interior tiles "solid" in Tiled, wallTileRules() picks them up automatically.
export function addFloorBounds(k, mapData) {
  const w = mapData.width * mapData.tilewidth;
  const h = mapData.height * mapData.tileheight;

  const edges = [
    [0, -EDGE_THICKNESS, w, EDGE_THICKNESS], // top
    [0, h, w, EDGE_THICKNESS], // bottom
    [-EDGE_THICKNESS, 0, EDGE_THICKNESS, h], // left
    [w, 0, EDGE_THICKNESS, h], // right
  ];

  for (const [x, y, ew, eh] of edges) {
    k.add([k.pos(x, y), k.rect(ew, eh), k.area(), k.body({ isStatic: true }), k.opacity(0), "wall"]);
  }
}

export function wallTileRules(k) {
  return [
    {
      match: { properties: { solid: true } },
      comps: () => [k.area(), k.body({ isStatic: true }), "wall"],
    },
  ];
}
