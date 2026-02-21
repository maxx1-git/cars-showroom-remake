// ================================================
// 1. DOM READY & INITIALIZATION
// ================================================

document.addEventListener("DOMContentLoaded", function () {
  initNavbar();
  initScrollAnimations();
  initMobileMenu();
  initLightbox();
  initGalleryTabs();
  initFilters();
  initSmoothScroll();
});

// ================================================
// 2. NAVBAR FUNCTIONALITY
// ================================================

function initNavbar() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  let lastScroll = 0;

  window.addEventListener("scroll", function () {
    const currentScroll = window.pageYOffset;

    // Add scrolled class when scrolling down
    if (currentScroll > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    lastScroll = currentScroll;
  });
}

// ================================================
// 3. MOBILE MENU
// ================================================

function initMobileMenu() {
  const toggle = document.querySelector(".navbar-toggle");
  const menu = document.querySelector(".navbar-menu");

  if (!toggle || !menu) return;

  toggle.addEventListener("click", function () {
    menu.classList.toggle("active");
    toggle.classList.toggle("active");
  });

  // Close menu when clicking a link
  menu.querySelectorAll(".navbar-link").forEach((link) => {
    link.addEventListener("click", function () {
      menu.classList.remove("active");
      toggle.classList.remove("active");
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (e) {
    if (!menu.contains(e.target) && !toggle.contains(e.target)) {
      menu.classList.remove("active");
      toggle.classList.remove("active");
    }
  });
}

// ================================================
// 4. SCROLL ANIMATIONS
// ================================================

function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    ".fade-in, .fade-in-left, .fade-in-right, .scale-in, .stagger-children",
  );

  if (animatedElements.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -100px 0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach((el) => {
    observer.observe(el);
  });
}

// ================================================
// 5. LIGHTBOX
// ================================================

function initLightbox() {
  const galleryItems = document.querySelectorAll(".gallery-item");
  const lightbox = document.querySelector(".lightbox");
  const lightboxImg = lightbox ? lightbox.querySelector("img") : null;
  const lightboxClose = document.querySelector(".lightbox-close");

  if (!lightbox || galleryItems.length === 0) return;

  galleryItems.forEach((item) => {
    item.addEventListener("click", function () {
      const img = this.querySelector("img");
      if (img && lightboxImg) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add("active");
        document.body.style.overflow = "hidden";
      }
    });
  });

  // Close lightbox
  function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }

  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Close on escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && lightbox.classList.contains("active")) {
      closeLightbox();
    }
  });
}

// ================================================
// 6. GALLERY TABS
// ================================================

function initGalleryTabs() {
  const tabs = document.querySelectorAll(".gallery-tab");
  const galleries = document.querySelectorAll(".gallery-content");

  if (tabs.length === 0 || galleries.length === 0) return;

  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const target = this.dataset.tab;

      // Update active tab
      tabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");

      // Show corresponding gallery
      galleries.forEach((gallery) => {
        if (gallery.dataset.gallery === target) {
          gallery.style.display = "grid";
          // Re-trigger animations
          gallery.querySelectorAll(".gallery-item").forEach((item, index) => {
            item.style.opacity = "0";
            item.style.transform = "scale(0.95)";
            setTimeout(() => {
              item.style.transition = "all 0.4s ease-out";
              item.style.opacity = "1";
              item.style.transform = "scale(1)";
            }, index * 100);
          });
        } else {
          gallery.style.display = "none";
        }
      });
    });
  });
}

// ================================================
// 7. STORE FILTERS
// ================================================

function initFilters() {
  const searchInput = document.querySelector("#search-input");
  const brandCheckboxes = document.querySelectorAll(".brand-filter");
  const conditionRadios = document.querySelectorAll(".condition-filter");
  const priceSlider = document.querySelector("#price-slider");
  const priceValue = document.querySelector("#price-value");
  const carCards = document.querySelectorAll(".car-card");
  const filterToggle = document.querySelector(".filter-toggle");
  const filtersSidebar = document.querySelector(".filters-sidebar");
  const filtersClose = document.querySelector(".filters-close");

  // Mobile filter toggle
  if (filterToggle && filtersSidebar) {
    filterToggle.addEventListener("click", function () {
      filtersSidebar.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  }

  if (filtersClose && filtersSidebar) {
    filtersClose.addEventListener("click", function () {
      filtersSidebar.classList.remove("active");
      document.body.style.overflow = "";
    });
  }

  if (carCards.length === 0) return;

  function applyFilters() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";

    // Get selected brands
    const selectedBrands = [];
    brandCheckboxes.forEach((cb) => {
      if (cb.checked) selectedBrands.push(cb.value.toLowerCase());
    });

    // Get selected condition
    let selectedCondition = "all";
    conditionRadios.forEach((radio) => {
      if (radio.checked) selectedCondition = radio.value;
    });

    // Get max price
    const maxPrice = priceSlider ? parseInt(priceSlider.value) : 999999;

    // Filter cars
    carCards.forEach((card) => {
      const name = (card.dataset.name || "").toLowerCase();
      const brand = (card.dataset.brand || "").toLowerCase();
      const condition = card.dataset.condition || "all";
      const price = parseInt(card.dataset.price) || 0;

      // Check all filters
      const matchesSearch =
        name.includes(searchTerm) || brand.includes(searchTerm);
      const matchesBrand =
        selectedBrands.length === 0 || selectedBrands.includes(brand);
      const matchesCondition =
        selectedCondition === "all" || condition === selectedCondition;
      const matchesPrice = price <= maxPrice;

      // Show/hide card with animation
      if (matchesSearch && matchesBrand && matchesCondition && matchesPrice) {
        card.style.display = "";
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        setTimeout(() => {
          card.style.transition = "all 0.4s ease-out";
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        }, 50);
      } else {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        setTimeout(() => {
          card.style.display = "none";
        }, 300);
      }
    });

    // Update results count
    updateResultsCount();
  }

  function updateResultsCount() {
    const visibleCards = document.querySelectorAll(
      '.car-card[style*="display: none"]',
    );
    const totalCards = carCards.length;
    const hiddenCount = visibleCards.length;
    const resultsCount = document.querySelector(".results-count");

    if (resultsCount) {
      resultsCount.textContent = `${totalCards - hiddenCount} vehicles found`;
    }
  }

  // Event listeners
  if (searchInput) {
    searchInput.addEventListener("input", debounce(applyFilters, 300));
  }

  brandCheckboxes.forEach((cb) => {
    cb.addEventListener("change", applyFilters);
  });

  conditionRadios.forEach((radio) => {
    radio.addEventListener("change", applyFilters);
  });

  if (priceSlider && priceValue) {
    priceSlider.addEventListener("input", function () {
      priceValue.textContent = formatPrice(this.value);
      applyFilters();
    });
  }
}

// ================================================
// 8. SMOOTH SCROLL
// ================================================

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navbarHeight =
          document.querySelector(".navbar")?.offsetHeight || 0;
        const targetPosition =
          target.getBoundingClientRect().top +
          window.pageYOffset -
          navbarHeight -
          20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// ================================================
// 9. UTILITY FUNCTIONS
// ================================================

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

function formatNumber(num) {
  return new Intl.NumberFormat("en-US").format(num);
}

// ================================================
// 10. SVG ICONS (Inline for easy use)
// ================================================

const icons = {
  arrowRight: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`,
  arrowLeft: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>`,
  check: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  search: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
  filter: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>`,
  close: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`,
  engine: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>`,
  gauge: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>`,
  zap: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  fuel: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="15" y1="22" y2="22"/><line x1="4" x2="14" y1="9" y2="9"/><path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18"/><path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5"/></svg>`,
  car: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2"/><circle cx="6.5" cy="16.5" r="2.5"/><circle cx="16.5" cy="16.5" r="2.5"/></svg>`,
  settings: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>`,
  timer: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="10" x2="14" y1="2" y2="2"/><line x1="12" x2="15" y1="14" y2="11"/><circle cx="12" cy="14" r="8"/></svg>`,
  navigation: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>`,
  shield: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>`,
  sofa: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3"/><path d="M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H6v-2a2 2 0 0 0-4 0Z"/><path d="M4 18v2"/><path d="M20 18v2"/><path d="M12 4v9"/></svg>`,
  cpu: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>`,
  menu: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>`,
  images: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 22H4a2 2 0 0 1-2-2V6"/><path d="m22 13-1.296-1.296a2.41 2.41 0 0 0-3.408 0L11 18"/><circle cx="12" cy="8" r="2"/><rect width="16" height="16" x="6" y="2" rx="2"/></svg>`,
};

// Export for external use
window.showroomIcons = icons;
window.formatPrice = formatPrice;
window.formatNumber = formatNumber;
