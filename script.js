const cube = document.getElementById("cube");
const faceButtons = document.querySelectorAll(".cube-controls button");
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

const faceTransforms = {
  front: "translateZ(calc(var(--size) * -0.5)) rotateY(0deg) rotateX(0deg)",
  right: "translateZ(calc(var(--size) * -0.5)) rotateY(-90deg) rotateX(0deg)",
  back: "translateZ(calc(var(--size) * -0.5)) rotateY(-180deg) rotateX(0deg)",
  left: "translateZ(calc(var(--size) * -0.5)) rotateY(90deg) rotateX(0deg)",
  top: "translateZ(calc(var(--size) * -0.5)) rotateX(-90deg) rotateY(0deg)",
  bottom: "translateZ(calc(var(--size) * -0.5)) rotateX(90deg) rotateY(0deg)"
};

const faceOrder = ["front", "right", "back", "left", "top", "bottom"];
let currentFaceIndex = 0;

function showFace(face) {
  if (!faceTransforms[face]) return;
  currentFaceIndex = faceOrder.indexOf(face);
  cube.style.transform = faceTransforms[face];
  faceButtons.forEach((button) => {
    const selected = button.dataset.face === face;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
}

faceButtons.forEach((button) => {
  button.setAttribute("aria-pressed", String(button.dataset.face === "front"));
  button.addEventListener("click", () => showFace(button.dataset.face));
});

document.addEventListener("keydown", (event) => {
  if (event.altKey || event.ctrlKey || event.metaKey) return;
  if (event.key === "ArrowRight") {
    showFace(faceOrder[(currentFaceIndex + 1) % faceOrder.length]);
  } else if (event.key === "ArrowLeft") {
    showFace(faceOrder[(currentFaceIndex - 1 + faceOrder.length) % faceOrder.length]);
  }
});

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    menuToggle.textContent = "☰";
  });
});

showFace("front");
