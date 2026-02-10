// Navigation functionality
document.addEventListener("DOMContentLoaded", function () {
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const hamburger = document.querySelector(".hamburger");
  const dropdownMenu = document.querySelector(".dropdown-menu");

  // Toggle dropdown menu
  hamburger.addEventListener("click", function (e) {
    e.stopPropagation();
    hamburger.classList.toggle("active");
    dropdownMenu.classList.toggle("active");
  });

  // Close menu when clicking on a link
  document.querySelectorAll(".dropdown-items a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      dropdownMenu.classList.remove("active");
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (e) {
    if (!hamburgerMenu.contains(e.target)) {
      hamburger.classList.remove("active");
      dropdownMenu.classList.remove("active");
    }
  });

  // Close menu with ESC key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && dropdownMenu.classList.contains("active")) {
      hamburger.classList.remove("active");
      dropdownMenu.classList.remove("active");
    }
  });

  // Floating logo click to go home
  const floatingLogo = document.querySelector(".floating-logo");
  if (floatingLogo) {
    floatingLogo.addEventListener("click", function () {
      scrollToSection("home");
    });
  }
});

// Smooth scrolling function
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
    }
  });
}, observerOptions);

// Observe timeline items
document.querySelectorAll(".timeline-item").forEach((item) => {
  observer.observe(item);
});

// Observe fade-in elements
document
  .querySelectorAll(".fade-in, .slide-in-left, .slide-in-right, .scale-in")
  .forEach((item) => {
    observer.observe(item);
  });

// Team filter functionality
document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const teamPhotos = document.querySelectorAll(".team-photo");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      this.classList.add("active");

      const filterYear = this.getAttribute("data-year");

      teamPhotos.forEach((photo) => {
        if (
          filterYear === "all" ||
          photo.getAttribute("data-year") === filterYear
        ) {
          photo.classList.remove("hidden");
          photo.style.display = "block";
        } else {
          photo.classList.add("hidden");
          photo.style.display = "none";
        }
      });
    });
  });
});

// Projects carousel functionality
document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector(".projects-carousel");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const cardWidth = 370; // card width + gap

  if (prevBtn && nextBtn && carousel) {
    prevBtn.addEventListener("click", function () {
      carousel.scrollBy({
        left: -cardWidth,
        behavior: "smooth",
      });
    });

    nextBtn.addEventListener("click", function () {
      carousel.scrollBy({
        left: cardWidth,
        behavior: "smooth",
      });
    });
  }
});

// Counter animation for statistics
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number");

  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-count"));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60 FPS
    let current = 0;

    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };

    updateCounter();
  });
}

// Intersection Observer for counter animation
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCounters();
      counterObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe impact section for counter animation
const impactSection = document.querySelector(".impact-section");
if (impactSection) {
  counterObserver.observe(impactSection);
}

// Typing effect for hero title
document.addEventListener("DOMContentLoaded", function () {
  const typingElement = document.querySelector(".typing-text");
  if (typingElement) {
    const text = typingElement.getAttribute("data-text");
    let index = 0;
    let isDeleting = false;

    function typeEffect() {
      if (!isDeleting && index < text.length) {
        typingElement.textContent = text.slice(0, index + 1);
        index++;
        setTimeout(typeEffect, 100);
      } else if (isDeleting && index > 0) {
        typingElement.textContent = text.slice(0, index - 1);
        index--;
        setTimeout(typeEffect, 50);
      } else if (!isDeleting && index === text.length) {
        setTimeout(() => {
          isDeleting = true;
          typeEffect();
        }, 2000);
      } else if (isDeleting && index === 0) {
        setTimeout(() => {
          isDeleting = false;
          typeEffect();
        }, 500);
      }
    }

    // Start typing effect after a delay
    setTimeout(typeEffect, 1000);
  }
});

// Navbar scroll effect
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(0, 15, 34, 0.98)";
    navbar.style.backdropFilter = "blur(15px)";
  } else {
    navbar.style.background = "rgba(0, 15, 34, 0.95)";
    navbar.style.backdropFilter = "blur(10px)";
  }
});

// Parallax effect for hero section
window.addEventListener("scroll", function () {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector(".hero-background");
  if (parallax) {
    const speed = scrolled * 0.5;
    parallax.style.transform = `translateY(${speed}px)`;
  }
});

// Award cards hover effect with sound (optional)
document.querySelectorAll(".award-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Project cards 3D tilt effect
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mousemove", function (e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
  });
});

// Add scroll indicator animation
document.addEventListener("DOMContentLoaded", function () {
  const scrollIndicator = document.querySelector(".scroll-indicator");
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", function () {
      document.getElementById("timeline").scrollIntoView({
        behavior: "smooth",
      });
    });
  }
});

// Lazy loading for images
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll("img");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.remove("lazy");
          imageObserver.unobserve(img);
        }
      }
    });
  });

  images.forEach((img) => {
    if (img.dataset.src) {
      imageObserver.observe(img);
    }
  });
});

// Easter egg: Konami code
let konamiCode = false;
let konamiSequence = [];
const konamiPattern = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A

document.addEventListener("keydown", function (e) {
  konamiSequence.push(e.keyCode);

  if (konamiSequence.length > konamiPattern.length) {
    konamiSequence.shift();
  }

  if (konamiSequence.length === konamiPattern.length) {
    let isKonami = true;
    for (let i = 0; i < konamiPattern.length; i++) {
      if (konamiSequence[i] !== konamiPattern[i]) {
        isKonami = false;
        break;
      }
    }

    if (isKonami && !konamiCode) {
      konamiCode = true;
      // Add special animation or effect
      document.body.style.animation = "rainbow 2s infinite";
      setTimeout(() => {
        document.body.style.animation = "";
        konamiCode = false;
      }, 5000);
    }
  }
});

// Add rainbow animation for easter egg
const style = document.createElement("style");
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Add loading animation
window.addEventListener("load", function () {
  const loader = document.querySelector(".loader");
  if (loader) {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }
});

// Add smooth reveal animation for sections
function revealOnScroll() {
  const reveals = document.querySelectorAll(
    ".fade-in, .slide-in-left, .slide-in-right, .scale-in"
  );

  reveals.forEach((element) => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      element.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);

// Performance optimization: throttle scroll events
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Apply throttling to scroll events
window.addEventListener("scroll", throttle(revealOnScroll, 100));

// Add preloader
document.addEventListener("DOMContentLoaded", function () {
  // Create preloader if it doesn't exist
  if (!document.querySelector(".preloader")) {
    const preloader = document.createElement("div");
    preloader.className = "preloader";
    preloader.innerHTML = `
            <div class="preloader-content">
                <div class="dna-animation">🧬</div>
                <p>Carregando experiência científica...</p>
            </div>
        `;

    const preloaderStyles = `
            .preloader {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: var(--gradient-dark);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                transition: opacity 0.5s ease;
            }
            
            .preloader-content {
                text-align: center;
                color: var(--white);
            }
            
            .dna-animation {
                font-size: 4rem;
                animation: spin 2s linear infinite;
                margin-bottom: 1rem;
            }
            
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `;

    const styleSheet = document.createElement("style");
    styleSheet.textContent = preloaderStyles;
    document.head.appendChild(styleSheet);

    document.body.appendChild(preloader);

    // Remove preloader when page is loaded
    window.addEventListener("load", function () {
      setTimeout(() => {
        preloader.style.opacity = "0";
        setTimeout(() => {
          preloader.remove();
        }, 500);
      }, 1000);
    });
  }
});
