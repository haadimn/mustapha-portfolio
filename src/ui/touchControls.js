import "./touchControls.css";

const ROOT_ID = "touch-controls-root";

// ponytail: 4-button D-pad + one interact button, no analog joystick math.
// Only shown on coarse-pointer (touch) devices, checked once at load —
// good enough for a portfolio site; revisit if a hybrid touch+mouse
// device needs it to react live.
export function createTouchControls(k) {
  const root = document.getElementById(ROOT_ID);
  if (!matchMedia("(pointer: coarse)").matches) return;

  root.innerHTML = `
    <div class="dpad">
      <button data-button="up" class="dpad-btn dpad-up">▲</button>
      <button data-button="left" class="dpad-btn dpad-left">◀</button>
      <button data-button="right" class="dpad-btn dpad-right">▶</button>
      <button data-button="down" class="dpad-btn dpad-down">▼</button>
    </div>
    <button data-button="interact" class="interact-btn">●</button>
  `;
  root.classList.add("visible");

  for (const btn of root.querySelectorAll("[data-button]")) {
    const name = btn.dataset.button;
    const press = (e) => {
      e.preventDefault();
      k.pressButton(name);
    };
    const release = (e) => {
      e.preventDefault();
      k.releaseButton(name);
    };
    btn.addEventListener("pointerdown", press);
    btn.addEventListener("pointerup", release);
    btn.addEventListener("pointercancel", release);
    btn.addEventListener("pointerleave", release);
  }
}
