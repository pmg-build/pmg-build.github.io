document.getElementById("year").textContent = new Date().getFullYear();

const nav = document.getElementById("site-nav");
const toggle = document.querySelector(".nav-toggle");

function setNav(open) {
  nav.classList.toggle("open", open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.textContent = open ? "Close" : "Menu";
}

if (toggle && nav) {
  toggle.addEventListener("click", () => setNav(!nav.classList.contains("open")));
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setNav(false));
  });
}

const modal = document.getElementById("preview-modal");
const title = document.getElementById("modal-title");
const desc = document.getElementById("modal-desc");
const platform = document.getElementById("modal-platform");
const openBtn = document.getElementById("modal-open");
const closeBtn = document.getElementById("modal-close");

const previews = {
  linkedin: {
    platform: "LinkedIn",
    title: "preet-desai26",
    desc: "Professional profile, experience, and education."
  },
  instagram: {
    platform: "Instagram",
    title: "@pmg.preet",
    desc: "Open the Instagram profile in a new tab."
  },
  youtube: {
    platform: "YouTube",
    title: "@pmg-preet",
    desc: "Open the YouTube channel in a new tab."
  },
  bloom: {
    platform: "BLOOM",
    title: "Keep growing",
    desc: "Buildathon product site presented at CMU Heinz / Replit."
  }
};

document.querySelectorAll("[data-preview]").forEach((el) => {
  el.addEventListener("click", (event) => {
    if (window.matchMedia("(max-width: 640px)").matches) return;
    event.preventDefault();
    const key = el.getAttribute("data-preview");
    const meta = previews[key] || { platform: "Link", title: "Open", desc: "Continue to the external site." };
    platform.textContent = meta.platform;
    title.textContent = meta.title;
    desc.textContent = meta.desc;
    openBtn.href = el.href;
    modal.hidden = false;
    modal.classList.add("open");
    closeBtn.focus();
  });
});

function closeModal() {
  modal.classList.remove("open");
  modal.hidden = true;
}

closeBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
    setNav(false);
  }
});
