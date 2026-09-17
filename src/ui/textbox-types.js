// Textbox presets: size, position, and style configuration
export const textboxPresets = {
  large: {
    size: "large",
    position: "fullscreen",
    width: "100%",
    height: "100%",
    bottom: "auto",
    left: "auto",
    right: "auto",
    top: "auto",
  },
  small: {
    size: "small",
    position: "bottom",
    width: "calc(100% - 32px)",
    height: "140px",
    bottom: "16px",
    left: "16px",
    right: "16px",
    top: "auto",
  },
  oneliner: {
    size: "oneliner",
    position: "top",
    width: "calc(100% - 32px)",
    height: "auto",
    maxHeight: "50px",
    bottom: "auto",
    left: "16px",
    right: "16px",
    top: "16px",
  },
};

// Merge preset with overrides
export function mergePreset(presetName, overrides = {}) {
  const preset = textboxPresets[presetName];
  if (!preset) {
    console.warn(`Unknown textbox preset: ${presetName}`);
    return textboxPresets.large;
  }
  return { ...preset, ...overrides };
}
