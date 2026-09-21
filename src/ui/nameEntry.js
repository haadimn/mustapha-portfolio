const STORAGE_KEY = "playerName";
const FORMSPREE_ENDPOINT = "https://formspree.io/f/maenoobd";

export function getPlayerName() {
  return localStorage.getItem(STORAGE_KEY);
}

// ponytail: fire-and-forget POST, doesn't block game start on network latency/failure.
function submitToFormspree(name) {
  fetch(FORMSPREE_ENDPOINT, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  }).catch((err) => console.error("Formspree submission failed:", err));
}

// ponytail: skips the prompt entirely if a name is already stored, so returning
// players aren't asked twice. Clear localStorage (or add a "change name" UI) to reset.
export function promptPlayerName() {
  const existing = getPlayerName();
  if (existing) return Promise.resolve(existing);

  const root = document.getElementById("name-entry-root");

  return new Promise((resolve) => {
    root.innerHTML = `
      <form id="name-entry-form">
        <p>What's your name?</p>
        <input id="name-entry-input" type="text" maxlength="30" autocomplete="off" autofocus />
        <button type="submit">Start</button>
      </form>
    `;
    root.classList.add("visible");

    root.querySelector("#name-entry-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const name = root.querySelector("#name-entry-input").value.trim() || "Guest";
      localStorage.setItem(STORAGE_KEY, name);
      submitToFormspree(name);
      root.classList.remove("visible");
      root.innerHTML = "";
      resolve(name);
    });
  });
}
