/**
 * iGEM EEL-USP-BRAZIL — Wiki/Sandbox
 * JS intentionally kept simple + defensive (elements are optional).
 */
document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // ----------------------------
  // Mobile menu (hamburger)
  // ----------------------------
  const hamburgerMenu = $(".hamburger-menu");
  const hamburger = $(".hamburger");
  const dropdownMenu = $(".dropdown-menu");

  if (hamburgerMenu && hamburger && dropdownMenu) {
    hamburger.addEventListener("click", (e) => {
      e.stopPropagation();
      hamburger.classList.toggle("active");
      dropdownMenu.classList.toggle("active");
    });

    $$(".dropdown-items a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        dropdownMenu.classList.remove("active");
      });
    });

    document.addEventListener("click", (e) => {
      if (!hamburgerMenu.contains(e.target)) {
        hamburger.classList.remove("active");
        dropdownMenu.classList.remove("active");
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        hamburger.classList.remove("active");
        dropdownMenu.classList.remove("active");
      }
    });
  }

  // ----------------------------
  // Smooth scroll for internal anchors
  // ----------------------------
  if (!prefersReducedMotion) {
    $$('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const href = a.getAttribute("href");
        if (!href || href === "#") return;
        const target = $(href);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  // ----------------------------
  // Typing effect (optional)
  // ----------------------------
  const typingEl = $(".typing-text");
  if (typingEl && !prefersReducedMotion) {
    const fullText = typingEl.getAttribute("data-text") || typingEl.textContent || "";
    let i = 0;
    typingEl.textContent = "";
    const tick = () => {
      i += 1;
      typingEl.textContent = fullText.slice(0, i);
      if (i < fullText.length) setTimeout(tick, 60);
    };
    tick();
  }

  // ----------------------------
  // Team filter
  // ----------------------------
  const filterBtns = $$(".filter-btn");
  const teamPhotos = $$(".team-photo");

  if (filterBtns.length && teamPhotos.length) {
    const applyFilter = (year) => {
      teamPhotos.forEach((photo) => {
        const photoYear = photo.getAttribute("data-year");
        const show = year === "all" || photoYear === year;
        photo.classList.toggle("hidden", !show);
      });
    };

    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        applyFilter(btn.getAttribute("data-year") || "all");
      });
    });
  }

  // ----------------------------
  // Stats counters (Impact)
  // ----------------------------
  const impactSection = $(".impact-section");
  const counters = $$(".stat-number");

  const animateCounters = () => {
    counters.forEach((counter) => {
      const target = Number(counter.getAttribute("data-count"));
      if (!Number.isFinite(target)) return;

      const durationMs = 1200;
      const start = performance.now();
      const from = 0;

      const step = (t) => {
        const p = Math.min(1, (t - start) / durationMs);
        const value = Math.round(from + (target - from) * p);
        counter.textContent = String(value);
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  };

  if (impactSection && counters.length) {
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      animateCounters();
    } else {
      const obs = new IntersectionObserver(
        (entries) => {
          const visible = entries.some((e) => e.isIntersecting);
          if (!visible) return;
          animateCounters();
          obs.disconnect();
        },
        { threshold: 0.25 }
      );
      obs.observe(impactSection);
    }
  }

  // ----------------------------
  // Timeline reveal animations (optional)
  // ----------------------------
  const timelineItems = $$(".timeline-item");
  if (timelineItems.length && "IntersectionObserver" in window && !prefersReducedMotion) {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("animate");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    timelineItems.forEach((el) => obs.observe(el));
  }

  // ----------------------------
  // Projects carousel (optional)
  // ----------------------------
  const carousel = $(".projects-carousel");
  const prevBtn = $(".prev-btn");
  const nextBtn = $(".next-btn");

  if (carousel && (prevBtn || nextBtn)) {
    const scrollByCards = (dir) => {
      const firstCard = $(".project-card", carousel);
      const cardWidth = firstCard ? firstCard.getBoundingClientRect().width : 320;
      carousel.scrollBy({ left: dir * (cardWidth + 24), behavior: prefersReducedMotion ? "auto" : "smooth" });
    };
    if (prevBtn) prevBtn.addEventListener("click", () => scrollByCards(-1));
    if (nextBtn) nextBtn.addEventListener("click", () => scrollByCards(1));
  }

  // ----------------------------
  // Hero parallax (optional)
  // ----------------------------
  const heroBg = $(".hero-background");
  if (heroBg && !prefersReducedMotion) {
    let ticking = false;
    window.addEventListener(
      "scroll",
      () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          const y = window.scrollY || 0;
          heroBg.style.transform = `translateY(${y * 0.15}px)`;
          ticking = false;
        });
      },
      { passive: true }
    );
  }
});
