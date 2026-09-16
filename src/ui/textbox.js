import "./textbox.css";

const ROOT_ID = "textbox-root";

// ponytail: one box, no queue/animation — fine until Phase 2/3 wire real
// show/hide triggers in. Upgrade path: add a transition or a display queue
// here without changing the show()/hide() contract callers use.
export function createTextBox() {
  const el = document.getElementById(ROOT_ID);

  function show(html) {
    el.innerHTML = html;
    el.classList.add("visible");
  }

  function hide() {
    el.classList.remove("visible");
  }

  return { show, hide };
}
