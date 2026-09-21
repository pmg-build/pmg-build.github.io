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

const galleryPanel = document.getElementById("gallery-panel");
const filterButtons = [...document.querySelectorAll(".gallery-filter")];
const galleryItems = [...document.querySelectorAll(".gallery-grid li")];
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxCaption = document.getElementById("lightbox-caption");
const lightboxClose = document.getElementById("lightbox-close");
const lightboxPrev = document.getElementById("lightbox-prev");
const lightboxNext = document.getElementById("lightbox-next");

let activeFilter = "all";
let lightboxIndex = 0;
let lightboxLastFocus = null;

function visibleCards() {
  return galleryItems
    .filter((item) => !item.hidden)
    .map((item) => item.querySelector(".gallery-card"))
    .filter(Boolean);
}

function setFilter(nextFilter) {
  activeFilter = nextFilter;
  filterButtons.forEach((button) => {
    const selected = button.dataset.filter === nextFilter;
    button.setAttribute("aria-selected", String(selected));
  });
  galleryItems.forEach((item) => {
    item.hidden = activeFilter !== "all" && item.dataset.category !== activeFilter;
  });
  if (galleryPanel) {
    const activeTab = filterButtons.find((button) => button.dataset.filter === nextFilter);
    galleryPanel.setAttribute("aria-labelledby", activeTab ? activeTab.id : "filter-all");
  }
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => setFilter(button.dataset.filter));
  button.addEventListener("keydown", (event) => {
    const current = filterButtons.indexOf(button);
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      const delta = event.key === "ArrowRight" ? 1 : -1;
      const next = filterButtons[(current + delta + filterButtons.length) % filterButtons.length];
      next.focus();
      setFilter(next.dataset.filter);
    }
  });
});

function openLightbox(index) {
  const cards = visibleCards();
  if (!cards.length) return;
  lightboxIndex = (index + cards.length) % cards.length;
  const card = cards[lightboxIndex];
  const img = card.querySelector("img");
  lightboxImage.src = card.dataset.src || img.src;
  lightboxImage.alt = img.alt || "";
  lightboxCaption.textContent = card.dataset.caption || img.alt || "";
  lightbox.hidden = false;
  document.body.classList.add("lightbox-open");
  lightboxClose.focus();
}

function closeLightbox() {
  if (lightbox.hidden) return;
  lightbox.hidden = true;
  lightboxImage.removeAttribute("src");
  document.body.classList.remove("lightbox-open");
  if (lightboxLastFocus) lightboxLastFocus.focus();
}

function stepLightbox(delta) {
  openLightbox(lightboxIndex + delta);
}

galleryItems.forEach((item) => {
  const card = item.querySelector(".gallery-card");
  if (!card) return;
  card.addEventListener("click", () => {
    lightboxLastFocus = card;
    const cards = visibleCards();
    openLightbox(cards.indexOf(card));
  });
});

lightboxClose.addEventListener("click", closeLightbox);
lightboxPrev.addEventListener("click", () => stepLightbox(-1));
lightboxNext.addEventListener("click", () => stepLightbox(1));
lightbox.querySelector("[data-lightbox-close]").addEventListener("click", closeLightbox);

lightbox.addEventListener("keydown", (event) => {
  if (lightbox.hidden) return;
  if (event.key === "Tab") {
    const focusable = [lightboxClose, lightboxPrev, lightboxNext];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLightbox();
    closeModal();
    setNav(false);
  }
  if (lightbox.hidden) return;
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    stepLightbox(-1);
  }
  if (event.key === "ArrowRight") {
    event.preventDefault();
    stepLightbox(1);
  }
});
