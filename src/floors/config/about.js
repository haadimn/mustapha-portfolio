import karachiGif from "../../../art/8bit karachi.gif";
import soundcloudIcon from "../../../art/soundcloud-ar21.svg";
import linktreeIcon from "../../../art/linktree-logo.png";
import instagramIcon from "../../../art/instagram-logo.png";

export const propConfig = {
  window: { size: "oneliner", gif: karachiGif },
};

export const dashboardConfig = {
  "dj-setup": {
    cols: 2,
    tiles: [
      { image: soundcloudIcon, label: "SoundCloud", url: "https://soundcloud.com/user-479337630" },
      { image: linktreeIcon, label: "Linktree", url: "https://linktr.ee/mu.sta.ph.a" },
      { image: instagramIcon, label: "Instagram", url: "https://www.instagram.com/mu.sta.ph.a/" },
    ],
  },
};
