import karachiGif from "../../../art/8bit karachi.gif";
import soundcloudIcon from "../../../art/soundcloud-ar21.svg";
import linktreeIcon from "../../../art/linktree-logo.png";
import instagramIcon from "../../../art/instagram-logo.png";
import reachingHandsImg from "../../../art/reaching-hands.png";

export const propConfig = {
  window: { size: "oneliner", gif: karachiGif },
  satellite: { topicGalleries: { "Visual Art": "visual-art" } },
};

export const dashboardConfig = {
  "dj-setup": {
    cols: 2,
    title: "Find my sets, mixes, and artist socials here:",
    tiles: [
      { image: soundcloudIcon, label: "SoundCloud", url: "https://soundcloud.com/user-479337630" },
      { image: linktreeIcon, label: "Linktree", url: "https://linktr.ee/mu.sta.ph.a" },
      { image: instagramIcon, label: "Instagram", url: "https://www.instagram.com/mu.sta.ph.a/" },
    ],
  },
};

export const galleryConfig = {
  // ponytail: placeholder image/copy — swap in the real painting + description later.
  "visual-art": {
    tiles: [
      {
        image: reachingHandsImg,
        label: "Reaching Hands",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        url: "https://hydra.ojack.xyz/?code=aHlkcmElM0ElMjAlMEFzMC5pbml0SW1hZ2UoJTIyaHR0cHMlM0ElMkYlMkZ0NC5mdGNkbi5uZXQlMkZqcGclMkYwNCUyRjc3JTJGMzYlMkY1NSUyRjM2MF9GXzQ3NzM2NTU5Ml9LYk02RDlBOXpHMGJhZ2pxenV3b3VQTjdiY2ZjUkpUMi5qcGclMjIpJTBBc3JjKHMwKSUwQSUyMCUyMC5tb2R1bGF0ZShvc2MoMjAlMkMlMjAwLjElMkMlMjAxKSklMEElMjAlMjAucm90YXRlKDAuOCklMEElMjAlMjAucm90YXRlKCgpJTIwJTNEJTNFJTIwYS5mZnQlNUIxJTVEJTIwKiUyMDAuMDUpJTIwJTIwJTIwJTIwJTIwJTIwJTJGJTJGJTIwUm90YXRlJTIwd2l0aCUyMG1pZC1yYW5nZSUyMGZyZXF1ZW5jaWVzJTBBJTIwJTIwLnNjYWxlKCgpJTIwJTNEJTNFJTIwYS5mZnQlNUIwJTVEJTIwKiUyMDAuNSUyMCUyQiUyMDEpJTIwJTIwJTIwJTJGJTJGJTIwU2NhbGUlMjB3aXRoJTIwYmFzcyUwQSUyMCUyMC5jb2xvciglMEElMjAlMjAlMjAlMjAoKSUyMCUzRCUzRSUyMDAuNSUyMCUyQiUyME1hdGguc2luKHRpbWUlMjAqJTIwMC41KSUyMColMjAwLjMlMjAlMkIlMjBhLmZmdCU1QjAlNUQlMjAqJTIwMC41JTJDJTIwJTJGJTJGJTIwQmFzZSUyMCUyQiUyMHNpbiUyMG1vZCUyMCUyQiUyMHNvdW5kJTBBJTIwJTIwJTIwJTIwKCklMjAlM0QlM0UlMjAwLjMlMjAlMkIlMjBNYXRoLnNpbih0aW1lJTIwKiUyMDAuMyklMjAqJTIwMC4zJTIwJTJCJTIwYS5mZnQlNUIxJTVEJTIwKiUyMDAuNSUyQyUwQSUyMCUyMCUyMCUyMCgpJTIwJTNEJTNFJTIwMC44JTIwJTJCJTIwTWF0aC5zaW4odGltZSUyMColMjAwLjIpJTIwKiUyMDAuMyUyMCUyQiUyMGEuZmZ0JTVCMiU1RCUyMColMjAwLjUlMEElMjAlMjApJTBBJTIwJTIwLm91dCgp",
      },
    ],
  },
};
