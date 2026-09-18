// dpad: bottom 16px + height 132px (touchControls.css) + 8px gap.
const RPG_MOBILE_BOTTOM = "156px";

export class TextboxConfig {
  static PRESETS = {
    large: {
      cssClass: "textbox-root--large",
      position: "fullscreen",
      layout: { width: "100%", height: "100%", bottom: "auto", left: "auto", right: "auto", top: "auto" },
    },
    small: {
      cssClass: "textbox-root--small",
      position: "bottom",
      layout: { width: "calc(100% - 32px)", height: "140px", bottom: "16px", left: "16px", right: "16px", top: "auto" },
    },
    rpg: {
      cssClass: "textbox-root--rpg",
      position: "bottom",
      layout: { width: "100%", height: "110px", bottom: "0", left: "0", right: "0", top: "auto" },
    },
    oneliner: {
      cssClass: "textbox-root--oneliner",
      position: "top",
      layout: { width: "calc(100% - 32px)", height: "auto", maxHeight: "50px", bottom: "auto", left: "16px", right: "16px", top: "16px" },
    },
  };

  constructor(presetName = "large", overrides = {}) {
    const preset = TextboxConfig.PRESETS[presetName];
    if (!preset) {
      console.warn(`Unknown textbox preset: ${presetName}, defaulting to large`);
      this.preset = TextboxConfig.PRESETS.large;
    } else {
      this.preset = preset;
    }
    this.overrides = overrides;
  }

  getCssClass() {
    return this.preset.cssClass;
  }

  getLayout() {
    const layout = { ...this.preset.layout, ...this.overrides };
    // Same detection touchControls.js uses to decide whether to show the pad at all.
    if (this.preset.cssClass === "textbox-root--rpg" && matchMedia("(pointer: coarse)").matches) {
      layout.bottom = RPG_MOBILE_BOTTOM;
    }
    return layout;
  }

  getPosition() {
    return this.preset.position;
  }

  static fromString(configString) {
    if (typeof configString !== "string") {
      return new TextboxConfig(configString.preset ?? "large", configString);
    }
    return new TextboxConfig(configString);
  }
}
