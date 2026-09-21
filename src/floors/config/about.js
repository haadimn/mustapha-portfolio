import karachiGif from "../../../art/8bit karachi.gif";
import soundcloudIcon from "../../../art/soundcloud-ar21.svg";

export const propConfig = {
  window: { size: "oneliner", gif: karachiGif },
};

export const dashboardConfig = {
  "dj-setup": {
    cols: 1,
    tiles: [{ image: soundcloudIcon, label: "SoundCloud" }],
  },
};
