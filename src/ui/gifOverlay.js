import "./gifOverlay.css";

const ROOT_ID = "gif-overlay-root";

export function createGifOverlay() {
  const el = document.getElementById(ROOT_ID);

  function show(src) {
    if (el.dataset.src !== src) {
      el.innerHTML = `<div class="gif-container"><img src="${src}" alt="" /></div>`;
      el.dataset.src = src;
    }
    el.classList.add("visible");
  }

  function hide() {
    el.classList.remove("visible");
  }

  return { show, hide };
}
