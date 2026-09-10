/** One hue per tile, cycled by index. Drawn from the same palette as the hero
 * shapes so the tinted surfaces across the page belong to each other.
 * `tint` washes the surface, `glow` colours the shadow it casts. */
export const tileHues = [
  { tint: "rgba(102,112,255,0.16)", glow: "rgba(102,112,255,0.55)" },
  { tint: "rgba(102,255,217,0.20)", glow: "rgba(0,204,153,0.45)" },
  { tint: "rgba(249,71,6,0.13)", glow: "rgba(249,71,6,0.38)" },
  { tint: "rgba(176,125,232,0.18)", glow: "rgba(176,125,232,0.50)" },
  { tint: "rgba(79,155,240,0.17)", glow: "rgba(79,155,240,0.48)" },
  { tint: "rgba(245,191,63,0.20)", glow: "rgba(233,169,44,0.45)" },
];
