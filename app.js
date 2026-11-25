/**
 * ROHINI METALS - PREMIUM INDUSTRIAL EXPERIENCE
 * High-performance motion design, particle simulation, and 3D interactions.
 */

// Force the page to always start at the top (scroll position 0) on open or refresh, unless a hash anchor is explicitly targeted
if (typeof window !== "undefined") {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  if (!window.location.hash && window.scrollY > 0) {
    window.scrollTo(0, 0);
  }
}

const navigation = [
  ["Home", "index.html", "home"],
  ["About us", "about.html", "about"],
  ["Products", "products.html", "products"],
  ["Applications", "applications.html", "applications"],
  ["Quality", "quality.html", "quality"],
  ["Contact", "contact.html", "contact"],
];

const companyIntro = "Established in 1999 in Tamil Nadu, India, Rohini Metals manufactures specialized aluminium powders for AAC block, pyrotechnic and industrial applications.";

/* ============================================================
   1. SITE CHROME (HEADER & FOOTER) & GLOBAL ELEMENTS
   ============================================================ */
function renderChrome() {
  const page = document.body.dataset.page || "home";
  const header = document.querySelector("#site-header");
  const footer = document.querySelector("#site-footer");

  // Inject top vibrant announcement bar if not present
  if (!document.querySelector(".announcement-bar")) {
    const bar = document.createElement("div");
    bar.className = "announcement-bar";
    bar.innerHTML = `
      <div class="announcement-inner">
        <span class="announcement-badge">DIRECT FACTORY</span>
        <span class="announcement-text"><svg class="announcement-icon" viewBox="0 0 16 16" width="13" height="13" fill="#48A9E6" aria-hidden="true" style="display:inline-block;vertical-align:-1px;margin-right:6px"><path d="M9 1L2 9h5l-1 6 7-8H8l1-6z"/></svg>High-Purity Aluminium Powders for AAC Block, Pyrotechnic & Industrial Applications • Established 1999</span>
        <a href="contact.html" class="announcement-link">Request Quote <span>→</span></a>
      </div>`;
    document.body.prepend(bar);
  }

  const links = navigation.map(([label, href, key]) =>
    `<a href="${href}"${key === page ? ' aria-current="page"' : ""}${key === "contact" ? ' class="nav-cta"' : ""}>${label}</a>`
  ).join("");

  const brand = `<a class="brand" href="index.html" aria-label="Rohini Metals home">
    <svg class="brand-mark" viewBox="0 0 40 40" aria-hidden="true">
      <path d="M20 2.5 37.5 20 20 37.5 2.5 20Z"/>
      <path d="M20 7.5 32.5 20 20 32.5 7.5 20Z"/>
      <path class="mark-core" d="m20 13 7 7-7 7-7-7z"/>
      <text x="20" y="22.2">RM</text>
    </svg>
    <span class="brand-word">Rohini Metals<span>Aluminium powders</span></span>
  </a>`;

  if (header) {
    header.innerHTML = `
      <a class="skip-link" href="#main-content">Skip to content</a>
      <div class="header-inner">
        ${brand}
        <button class="menu-toggle" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="primary-navigation">
          <span></span><span></span>
        </button>
        <nav class="main-nav" id="primary-navigation" aria-label="Primary navigation">
          ${links}
        </nav>
      </div>`;
  }

  if (footer) {
    const currentYear = new Date().getFullYear();
    footer.innerHTML = `
      <div class="wrap footer-main">
        <div class="footer-about">
          ${brand}
          <p>${companyIntro} Serving customers across India and preparing to extend its international market presence.</p>
        </div>
        <div class="footer-column">
          <h3>Navigation</h3>
          <div class="footer-links">
            ${navigation.map(([label, href]) => `<a href="${href}">${label}</a>`).join("")}
          </div>
        </div>
        <div class="footer-column">
          <h3>Product Range</h3>
          <div class="footer-links">
            <a href="products.html#aac">AAC Block Aluminium Powder</a>
            <a href="products.html#pyro">Pyrotechnic Aluminium Powder</a>
            <a href="products.html#industrial">Atomised Aluminium Powder</a>
            <a href="quality.html">Technical Specifications</a>
          </div>
        </div>
        <div class="footer-column footer-contact">
          <h3>Contact</h3>
          <p><a href="tel:+914562280105">+91 4562 280105</a><br><a href="tel:+914562280150">+91 4562 280150</a></p>
          <p><a href="mailto:rohini@tksp.in">rohini@tksp.in</a></p>
          <p>Virudhunagar – 626 001<br>Tamil Nadu, India</p>
        </div>
      </div>
      <div class="wrap footer-bottom">
        <span>© 1999–${currentYear} Rohini Metals. All rights reserved.</span>
        <span>Precision In Every Particle · Virudhunagar, India</span>
      </div>`;
  }
}

/* ============================================================
   2. CINEMATIC INITIAL LOADER
   ============================================================ */
function initCinematicLoader() {
  const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (isReduced) return;

  // Once seen in this session, do not show again
  if (sessionStorage.getItem("rm_loader_seen")) return;

  let loader = document.querySelector("#site-loader");
  if (!loader) {
    loader = document.createElement("div");
    loader.id = "site-loader";
    loader.className = "site-loader";
    loader.innerHTML = `
      <canvas id="loader-canvas" class="loader-canvas"></canvas>
      <div class="loader-content">
        <div class="loader-mark-wrap">
          <svg class="loader-mark" viewBox="0 0 40 40" aria-hidden="true">
            <path class="loader-path" d="M20 2.5 37.5 20 20 37.5 2.5 20Z"/>
            <path class="loader-path-inner" d="M20 7.5 32.5 20 20 32.5 7.5 20Z"/>
            <path class="loader-core" d="m20 13 7 7-7 7-7-7z"/>
            <text x="20" y="22.2">RM</text>
          </svg>
        </div>
        <div class="loader-title">ROHINI METALS</div>
        <div class="loader-tagline">Precision In Every Particle</div>
        <div class="loader-progress-wrap">
          <div class="loader-bar"><div class="loader-bar-fill" id="loader-bar-fill"></div></div>
          <div class="loader-counter"><span id="loader-pct">0</span>%</div>
        </div>
      </div>`;
    document.body.prepend(loader);
  }

  // Failsafe: permanently remove loader element after 800ms
  const cleanUpLoader = () => {
    sessionStorage.setItem("rm_loader_seen", "true");
    if (loader) {
      loader.classList.add("loader-hidden");
      setTimeout(() => {
        try { loader.remove(); } catch (e) {}
      }, 350);
    }
  };

  const failsafeTimeout = setTimeout(cleanUpLoader, 850);

  // Animate Loader Canvas
  const canvas = document.getElementById("loader-canvas");
  let ctx, animId;
  let particles = [];

  if (canvas) {
    ctx = canvas.getContext("2d");
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 0.8,
        vx: (Math.random() - 0.5) * 0.8,
        vy: -Math.random() * 0.9 - 0.3,
        alpha: Math.random() * 0.6 + 0.2,
      });
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < 0) p.y = canvas.height;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(226, 232, 240, ${p.alpha})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(drawParticles);
    };
    drawParticles();
  }

  // Fast progress counter - 550ms
  const fill = document.getElementById("loader-bar-fill");
  const pct = document.getElementById("loader-pct");
  const duration = 550;
  const start = performance.now();

  const updateProgress = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(eased * 100);

    if (fill) fill.style.width = `${value}%`;
    if (pct) pct.textContent = value;

    if (progress < 1) {
      requestAnimationFrame(updateProgress);
    } else {
      clearTimeout(failsafeTimeout);
      if (animId) cancelAnimationFrame(animId);
      cleanUpLoader();
    }
  };

  requestAnimationFrame(updateProgress);
}


/* ============================================================
   4. INTERACTIVE ALUMINIUM POWDER PARTICLE CANVAS (HERO)
   ============================================================ */
function initHeroParticleCanvas() {
  const hero = document.querySelector(".hero");
  if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let canvas = hero.querySelector(".hero-particle-canvas");
  if (!canvas) {
    canvas = document.createElement("canvas");
    canvas.className = "hero-particle-canvas";
    canvas.setAttribute("aria-hidden", "true");
    hero.insertBefore(canvas, hero.firstChild);
  }

  const ctx = canvas.getContext("2d");
  let width, height;
  let particles = [];
  let mouse = { x: -1000, y: -1000, radius: 140 };
  let isVisible = true;

  const resize = () => {
    width = canvas.width = hero.offsetWidth || window.innerWidth;
    height = canvas.height = hero.offsetHeight || 800;
  };
  resize();
  window.addEventListener("resize", resize);

  // Generate physical aluminium powder flakes with silver and blue spectrum
  const particleCount = Math.min(Math.floor(window.innerWidth / 22), 70);
  for (let i = 0; i < particleCount; i++) {
    const rnd = Math.random();
    let colorType = "silver";
    if (rnd < 0.22) colorType = "sky-blue";
    else if (rnd < 0.38) colorType = "royal-blue";

    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      baseRadius: Math.random() * 2.2 + 0.8,
      r: Math.random() * 2.2 + 0.8,
      vx: (Math.random() - 0.5) * 0.5,
      vy: -Math.random() * 0.6 - 0.2, // Gentle rising air current
      alpha: Math.random() * 0.55 + 0.2,
      shimmerSpeed: Math.random() * 0.03 + 0.01,
      shimmerPhase: Math.random() * Math.PI * 2,
      colorType: colorType,
    });
  }

  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  }, { passive: true });

  hero.addEventListener("mouseleave", () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  // Pause when offscreen
  const observer = new IntersectionObserver((entries) => {
    isVisible = entries[0].isIntersecting;
  }, { threshold: 0.1 });
  observer.observe(hero);

  const draw = () => {
    if (!isVisible) {
      requestAnimationFrame(draw);
      return;
    }

    ctx.clearRect(0, 0, width, height);

    particles.forEach((p) => {
      // Brownian drift + vertical air current
      p.x += p.vx + Math.sin(p.shimmerPhase) * 0.25;
      p.y += p.vy;
      p.shimmerPhase += p.shimmerSpeed;

      // Wrap around bounds
      if (p.y < 0) p.y = height;
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;

      // Mouse repulsion / vortex effect
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < mouse.radius) {
        const force = (1 - dist / mouse.radius) * 2.5;
        p.x += (dx / dist) * force;
        p.y += (dy / dist) * force;
      }

      // Shimmering metallic flake reflection
      const shimmer = Math.sin(p.shimmerPhase);
      const currentAlpha = Math.max(0.12, Math.min(p.alpha + shimmer * 0.25, 0.85));

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);

      if (p.colorType === "royal-blue") {
        ctx.fillStyle = `rgba(23, 105, 170, ${currentAlpha * 0.85})`;
      } else if (p.colorType === "sky-blue") {
        ctx.fillStyle = `rgba(72, 169, 230, ${currentAlpha * 0.9})`;
      } else {
        // Metallic Silver (#C0C8D2) / Cool White (#F7FAFC)
        ctx.fillStyle = `rgba(192, 200, 210, ${currentAlpha})`;
      }
      ctx.fill();
    });

    requestAnimationFrame(draw);
  };
  requestAnimationFrame(draw);
}

/* ============================================================
   5. 3D CARD TILT & SPECULAR GLARE
   ============================================================ */
function init3DCardTilt() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (window.innerWidth <= 768) return; // Skip on mobile for performance

  const cards = document.querySelectorAll(".product-card, .category-card, .industry-card, .feature-band");

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate tilt angles (subtle & professional: max 6 degrees)
      const rotateX = ((y - centerY) / centerY) * -5.5;
      const rotateY = ((x - centerX) / centerX) * 5.5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(6px)`;
    }, { passive: true });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)";
    });
  });
}

/* ============================================================
   6. MAGNETIC CTA BUTTONS
   ============================================================ */
function initMagneticButtons() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (window.innerWidth <= 768) return;

  const buttons = document.querySelectorAll(".button, .nav-cta, .back-top");

  buttons.forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate3d(${x * 0.22}px, ${y * 0.22}px, 0)`;
    }, { passive: true });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translate3d(0, 0, 0)";
    });
  });
}

/* ============================================================
   7. NAVIGATION & SCROLL EVENTS
   ============================================================ */
function initNavigation() {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  const backTop = document.querySelector(".back-top");

  const updateScroll = () => {
    const scrolled = window.scrollY > 24;
    header?.classList.toggle("scrolled", scrolled);
    backTop?.classList.toggle("visible", window.scrollY > 420);
  };

  window.addEventListener("scroll", updateScroll, { passive: true });
  updateScroll();

  toggle?.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    nav.classList.toggle("open", open);
    document.body.classList.toggle("menu-open", open);
  });

  nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle?.setAttribute("aria-expanded", "false");
    toggle?.setAttribute("aria-label", "Open navigation");
    document.body.classList.remove("menu-open");
  }));

  backTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

/* ============================================================
   8. SCROLL REVEAL & COUNTERS
   ============================================================ */
function initReveal() {
  const elements = document.querySelectorAll(".reveal, .reveal-slide-up, .reveal-slide-left, .reveal-slide-right, .reveal-scale, .image-slide-mask");
  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: "0px 0px 50px 0px" });

  elements.forEach((element) => observer.observe(element));

  // Immediate visibility guarantee for elements in or near initial viewport
  setTimeout(() => {
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight + 100) {
        el.classList.add("is-visible");
      }
    });
  }, 250);
}

function initCounters() {
  const counters = document.querySelectorAll("[data-count]");
  if (!counters.length) return;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const animate = (element) => {
    const target = Number(element.dataset.count);
    if (reducedMotion) {
      element.textContent = target.toLocaleString();
      return;
    }
    const duration = 1200;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = Math.round(target * eased).toLocaleString();
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animate(entry.target);
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach((counter) => observer.observe(counter));
}

/* ============================================================
   9. EXACT PRODUCT DATA & CATALOG ENGINE
   ============================================================ */
const productData = [
  {
    id: "rmdg", category: "aac", grade: "AAC block powder", name: "RMDG 60",
    desc: "Aluminium powder for AAC block manufacturing with controlled gas volumetry and DEG solvent.",
    image: "assets/images/atomising-plant-building.jpg",
    specs: [
      ["Screen Analysis <45 µm", "65–75%"],
      ["Metallic Aluminium (Gas Volumetry)", "92% Min."],
      ["Average Particle Size D50", "45–55 µm Typical"],
      ["Miscibility in Water", "Miscible"],
      ["Non-Volatile Matter", "80 ± 2%"],
      ["Solvent", "DEG"],
    ]
  },
  {
    id: "rmc", category: "aac", grade: "AAC block powder", name: "RMC 60",
    desc: "Aluminium powder grade developed for AAC block manufacturing with high active metal content.",
    image: "assets/images/atomisation-ball-mill.jpg",
    specs: [
      ["Particle Size <45 µm", "65–78%"],
      ["Bulk Density", "0.18–0.25 g/cm³"],
      ["Specific Surface Area", "12,000–15,000 cm²/g"],
      ["Average Particle Size D50", "35–45 µm"],
      ["Active Metal Content", "92.0% Min."],
      ["Miscibility in Water", "Miscible"],
    ]
  },
  {
    id: "rma", category: "pyro", grade: "Pyrotechnic powder", name: "RMA",
    desc: "A defined particle-size and physical-property grade in the pyrotechnic range.",
    image: "assets/images/pyrotechnic-powder-drums.jpg",
    specs: [
      ["−45 µm", "%", "75–88"],
      ["+45 µm", "%", "12–25"],
      ["Aluminium Content", "%", "98 min"],
      ["Bulk Density", "g/cc", "0.24 max"],
      ["Additive / Fatty Matter", "%", "1.2 max"],
      ["Acid Insolubles", "%", "0.1 max"],
      ["Iron", "%", "0.2 max"],
      ["Wettability", "—", "Non-Wettable"],
    ]
  },
  {
    id: "rmr", category: "pyro", grade: "Pyrotechnic powder", name: "RMR",
    desc: "A defined particle-size and physical-property grade in the pyrotechnic range.",
    image: "assets/images/pyrotechnic-burn-test.jpg",
    specs: [
      ["−45 µm", "%", "60–70"],
      ["+45 µm", "%", "30–40"],
      ["Aluminium Content", "%", "98 min"],
      ["Bulk Density", "g/cc", "0.18 max"],
      ["Additive / Fatty Matter", "%", "1.2 max"],
      ["Acid Insolubles", "%", "0.1 max"],
      ["Iron", "%", "0.2 max"],
      ["Wettability", "—", "Non-Wettable"],
    ]
  },
  {
    id: "rmf", category: "pyro", grade: "Pyrotechnic powder", name: "RMF",
    desc: "A defined particle-size and physical-property grade in the pyrotechnic range with wettable formulation.",
    image: "assets/images/powder-drum-inventory.jpg",
    specs: [
      ["−45 µm", "%", "40–50"],
      ["+45 µm", "%", "50–60"],
      ["Aluminium Content", "%", "99 min"],
      ["Bulk Density", "g/cc", "0.24 max"],
      ["Additive / Fatty Matter", "%", "0.7 max"],
      ["Acid Insolubles", "%", "0.1 max"],
      ["Iron", "%", "0.2 max"],
      ["Wettability", "—", "Wettable"],
    ]
  },
  {
    id: "coarse", category: "industrial", grade: "Atomised powder", name: "Coarse",
    desc: "Coarse atomised aluminium powder for metallurgy, chemical and industrial requirements.",
    image: "assets/images/raw-aluminium-ingots.jpg",
    specs: [
      ["+25 BSS Mesh", "Nil"],
      ["+60 BSS Mesh", "40% Max"],
      ["+100 BSS Mesh", "70% Max"],
      ["+200 BSS Mesh", "—"],
      ["+350 BSS Mesh", "—"],
      ["−100 BSS Mesh", "5% Max"],
      ["−350 BSS Mesh", "—"],
      ["Bulk Density", "1.1–1.2 g/cc"],
    ]
  },
  {
    id: "fine", category: "industrial", grade: "Atomised powder", name: "Fine",
    desc: "Fine atomised aluminium powder for industrial requirements.",
    image: "assets/images/powder-collection-station.jpg",
    specs: [
      ["+25 BSS Mesh", "—"],
      ["+60 BSS Mesh", "—"],
      ["+100 BSS Mesh", "2% Max"],
      ["+200 BSS Mesh", "30% Max"],
      ["+350 BSS Mesh", "30% Max"],
      ["−100 BSS Mesh", "—"],
      ["−350 BSS Mesh", "45% Min"],
      ["Bulk Density", "1.15–1.25 g/cc"],
    ]
  },
  {
    id: "super-fine", category: "industrial", grade: "Atomised powder", name: "Super Fine",
    desc: "Super fine atomised aluminium powder for specialized industrial applications.",
    image: "assets/images/cyclone-classifier-tower.jpg",
    specs: [
      ["+25 BSS Mesh", "—"],
      ["+60 BSS Mesh", "—"],
      ["+100 BSS Mesh", "—"],
      ["+200 BSS Mesh", "2% Max"],
      ["+350 BSS Mesh", "40% Max"],
      ["−100 BSS Mesh", "—"],
      ["−350 BSS Mesh", "60% Min"],
      ["Bulk Density", "1.2–1.4 g/cc"],
    ]
  },
  {
    id: "dust", category: "industrial", grade: "Atomised powder", name: "Dust",
    desc: "Dust grade atomised aluminium powder with high sub-350 mesh distribution.",
    image: "assets/images/sieve-shaker-room.jpg",
    specs: [
      ["+25 BSS Mesh", "—"],
      ["+60 BSS Mesh", "—"],
      ["+100 BSS Mesh", "—"],
      ["+200 BSS Mesh", "—"],
      ["+350 BSS Mesh", "20% Max"],
      ["−100 BSS Mesh", "—"],
      ["−350 BSS Mesh", "80% Min"],
      ["Bulk Density", "1.2–1.4 g/cc"],
    ]
  },
];

const categories = {
  aac: {
    name: "AAC Block Aluminium Powder",
    eyebrow: "AAC block applications",
    description: "Grades for AAC block manufacturing with defined particle-size, active metal and gas volumetry specifications."
  },
  pyro: {
    name: "Pyrotechnic Aluminium Powder",
    eyebrow: "Pyrotechnic applications",
    description: "RMA, RMR and RMF grades with defined particle-size and physical-property specifications."
  },
  industrial: {
    name: "Atomised Aluminium Powder",
    eyebrow: "Industrial applications",
    description: "Technical specifications across our Coarse, Fine, Super Fine and Dust grades."
  },
};

function renderProducts() {
  const root = document.querySelector("#product-catalog");
  if (!root) return;

  root.innerHTML = Object.entries(categories).map(([category, details]) => {
    const cards = productData
      .filter((product) => product.category === category)
      .map((product, index) => `
        <article class="product-card reveal reveal-delay-${Math.min(index + 1, 3)}" data-category="${category}">
          <div class="product-visual">
            <img class="product-visual-img" src="${product.image}" alt="${product.name} – ${details.eyebrow}" loading="lazy">
            <div class="product-visual-overlay"></div>
            <span class="product-visual-tag">${details.eyebrow}</span>
          </div>
          <div class="product-card-body">
            <span class="product-grade-pill">${product.grade}</span>
            <h3>${product.name}</h3>
            <p>${product.desc}</p>
            <button class="spec-button" type="button" data-product="${product.id}" aria-haspopup="dialog">
              View specifications <span aria-hidden="true">→</span>
            </button>
          </div>
        </article>`).join("");

    return `
      <section class="product-section" id="${category}" data-product-section="${category}">
        <div class="product-section-heading reveal">
          <div>
            <p class="eyebrow ${category === 'pyro' ? 'eyebrow-blue' : category === 'industrial' ? 'eyebrow-teal' : ''}">${details.eyebrow}</p>
            <h2>${details.name}</h2>
            <p class="lead">${details.description}</p>
          </div>
          <span class="product-count-badge">${productData.filter((p) => p.category === category).length} Available Grades</span>
        </div>
        <div class="product-grid">${cards}</div>
      </section>`;
  }).join("");

  initReveal();
  initProductInteractions();
  init3DCardTilt();
}

function initProductInteractions() {
  const dialog = document.querySelector("#spec-dialog");
  const filterButtons = document.querySelectorAll("[data-filter]");
  const sections = document.querySelectorAll("[data-product-section]");

  filterButtons.forEach((button) => button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
    sections.forEach((section) => {
      section.hidden = filter !== "all" && section.dataset.productSection !== filter;
    });
  }));

  document.querySelectorAll(".spec-button").forEach((button) => button.addEventListener("click", () => {
    const product = productData.find((item) => item.id === button.dataset.product);
    if (!product || !dialog) return;
    const category = categories[product.category];

    const rows = product.specs.map((row) => row.length === 3
      ? `<tr><td>${row[0]}</td><td>${row[1]}</td><td>${row[2]}</td></tr>`
      : `<tr><td>${row[0]}</td><td>${row[1]}</td></tr>`).join("");

    const headers = product.specs[0].length === 3
      ? "<tr><th>Parameter</th><th>Unit</th><th>Published Value</th></tr>"
      : "<tr><th>Specification Parameter</th><th>Published Value</th></tr>";

    dialog.querySelector(".dialog-content").innerHTML = `
      <p class="eyebrow">${category.eyebrow}</p>
      <h2 id="dialog-title">${product.name}</h2>
      <p>${product.desc}</p>
      <div class="spec-table-wrap">
        <table class="spec-table">
          <thead>${headers}</thead>
          <tbody>${rows}</tbody>
        </table>
      </div>`;

    // Add direct enquiry button linking to contact page with pre-filled grade
    const dialogBody = dialog.querySelector(".dialog-body");
    if (dialogBody) {
      dialogBody.innerHTML = `
        <p>Technical values are reproduced from published manufacturing data. For quotes, batch certificates, or custom particle specifications, contact our team.</p>
        <div class="dialog-actions">
          <a class="button" href="contact.html?grade=${encodeURIComponent(product.name)}">
            Enquire about ${product.name} <span class="button-arrow" aria-hidden="true">→</span>
          </a>
        </div>`;
    }

    dialog.showModal();
  }));

  dialog?.querySelector(".dialog-close")?.addEventListener("click", () => dialog.close());
  dialog?.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
}

function initProductAnchors() {
  const links = document.querySelectorAll(".product-subnav a");
  if (!links.length || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        links.forEach((link) => link.classList.toggle("active", link.hash === `#${entry.target.id}`));
      }
    });
  }, { rootMargin: "-30% 0px -60% 0px" });

  document.querySelectorAll(".product-section").forEach((section) => observer.observe(section));
}

/* ============================================================
   10. CONTACT FORM WITH AUTO-PREFILL & VALIDATION
   ============================================================ */
function initContactForm() {
  const form = document.querySelector("#contact-form");
  if (!form) return;

  // Auto pre-fill product grade if passed in query param (?grade=RMDG 60)
  const urlParams = new URLSearchParams(window.location.search);
  const requestedGrade = urlParams.get("grade") || urlParams.get("product");
  const productSelect = form.querySelector("#product");
  const messageInput = form.querySelector("#message");

  if (requestedGrade && productSelect) {
    const options = Array.from(productSelect.options);
    const match = options.find((opt) => opt.value.toLowerCase() === requestedGrade.toLowerCase() || opt.text.toLowerCase().includes(requestedGrade.toLowerCase()));
    if (match) {
      productSelect.value = match.value;
      if (messageInput && !messageInput.value) {
        messageInput.value = `I would like to inquire about specifications, pricing, and availability for ${requestedGrade}.`;
      }
    }
  }

  const response = form.querySelector(".form-response");
  const fields = [...form.querySelectorAll("[required]")];

  const validate = (field) => {
    const valid = field.checkValidity();
    field.setAttribute("aria-invalid", String(!valid));
    const error = form.querySelector(`[data-error-for="${field.name}"]`);
    if (error) {
      error.textContent = valid ? "" : field.validity.typeMismatch ? "Enter a valid email address." : "This field is required.";
    }
    return valid;
  };

  fields.forEach((field) => {
    field.addEventListener("blur", () => validate(field));
    field.addEventListener("input", () => {
      if (field.getAttribute("aria-invalid") === "true") validate(field);
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const valid = fields.map(validate).every(Boolean);
    if (!valid) {
      fields.find((field) => !field.checkValidity())?.focus();
      return;
    }

    const submitBtn = form.querySelector("button[type='submit']");
    const originalText = submitBtn ? submitBtn.innerHTML : "";
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `Sending enquiry...`;
    }

    setTimeout(() => {
      form.reset();
      fields.forEach((field) => field.setAttribute("aria-invalid", "false"));
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
      if (response) {
        response.hidden = false;
        response.focus();
        response.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }, 450);
  });
}

/* ============================================================
   11. FULL-WIDTH CINEMATIC HERO SLIDESHOW
   ============================================================ */
function initHeroSlideshow() {
  const slider = document.querySelector("#hero-slider");
  if (!slider) return;

  const slides = Array.from(slider.querySelectorAll(".hero-slide"));
  const indicators = Array.from(slider.querySelectorAll(".hero-indicator"));
  const prevBtn = slider.querySelector("#hero-prev-btn");
  const nextBtn = slider.querySelector("#hero-next-btn");

  if (!slides.length) return;

  let currentIndex = 0;
  let autoplayTimer = null;
  let isPaused = false;
  const slideDuration = 6000; // 6 seconds per slide

  const resetKenBurns = (slideEl) => {
    const img = slideEl.querySelector(".hero-slide-bg img");
    if (img) {
      img.style.animation = "none";
      void img.offsetWidth; // Force CSS reflow
      img.style.animation = "heroKenBurns 10s ease-out forwards";
    }
  };

  const goToSlide = (targetIndex) => {
    if (targetIndex < 0) {
      targetIndex = slides.length - 1;
    } else if (targetIndex >= slides.length) {
      targetIndex = 0;
    }

    // Deactivate previous slide
    slides[currentIndex].classList.remove("active");
    slides[currentIndex].setAttribute("aria-hidden", "true");
    if (indicators[currentIndex]) {
      indicators[currentIndex].classList.remove("active");
      indicators[currentIndex].setAttribute("aria-selected", "false");
    }

    // Activate target slide
    currentIndex = targetIndex;
    slides[currentIndex].classList.add("active");
    slides[currentIndex].setAttribute("aria-hidden", "false");
    resetKenBurns(slides[currentIndex]);

    if (indicators[currentIndex]) {
      indicators[currentIndex].classList.add("active");
      indicators[currentIndex].setAttribute("aria-selected", "true");
    }

    resetAutoplayTimer();
  };

  const startAutoplay = () => {
    if (autoplayTimer) clearInterval(autoplayTimer);
    autoplayTimer = setInterval(() => {
      if (!isPaused) {
        goToSlide(currentIndex + 1);
      }
    }, slideDuration);
  };

  const resetAutoplayTimer = () => {
    if (autoplayTimer) clearInterval(autoplayTimer);
    startAutoplay();
  };

  // Previous and Next buttons
  if (prevBtn) {
    prevBtn.addEventListener("click", () => goToSlide(currentIndex - 1));
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", () => goToSlide(currentIndex + 1));
  }

  // Minimalist Indicator dots
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => goToSlide(index));
  });

  // Pause on hover or focus
  slider.addEventListener("mouseenter", () => {
    isPaused = true;
  });

  slider.addEventListener("mouseleave", () => {
    isPaused = false;
  });

  slider.addEventListener("focusin", () => {
    isPaused = true;
  });

  slider.addEventListener("focusout", () => {
    isPaused = false;
  });

  // Keyboard navigation when slider is active
  window.addEventListener("keydown", (e) => {
    const rect = slider.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    if (!isVisible) return;

    if (e.key === "ArrowLeft") {
      goToSlide(currentIndex - 1);
    } else if (e.key === "ArrowRight") {
      goToSlide(currentIndex + 1);
    }
  });

  // Touch Swipe Support on mobile
  let touchStartX = 0;
  let touchEndX = 0;

  slider.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  slider.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        goToSlide(currentIndex - 1); // Swiped right
      } else {
        goToSlide(currentIndex + 1); // Swiped left
      }
    }
  }, { passive: true });

  // Initialize first slide
  goToSlide(0);
  startAutoplay();
}

/* ============================================================
   12. FULL-SCREEN FACILITY & INFRASTRUCTURE SHOWCASE SLIDESHOW
   ============================================================ */
function initFacilityShowcase() {
  const container = document.querySelector("#facility-viewer-container");
  if (!container) return;

  const slides = Array.from(container.querySelectorAll(".facility-slide"));
  const thumbs = Array.from(container.querySelectorAll(".facility-thumb"));
  const thumbsStrip = container.querySelector("#facility-thumbs-strip") || container.querySelector(".facility-thumbs-scroll");
  const prevBtn = container.querySelector("#facility-prev-btn");
  const nextBtn = container.querySelector("#facility-next-btn");
  const fsBtn = container.querySelector("#facility-fs-btn");
  const stageTag = container.querySelector("#facility-stage-tag");
  const counterEl = container.querySelector("#facility-counter");
  const captionTitle = container.querySelector("#facility-caption-title");
  const captionDesc = container.querySelector("#facility-caption-desc");

  if (!slides.length) return;

  const facilityData = [
    {
      title: "Factory Campus & Main Entrance Gate",
      tag: "Plant Infrastructure",
      desc: "Official factory entrance and administrative office in Virudhunagar, welcoming commercial partners and logistics fleet since 1999."
    },
    {
      title: "Factory Campus Grounds & Security Entrance",
      tag: "Site Infrastructure",
      desc: "Sprawling industrial campus in Virudhunagar with security gatehouse, paved driveways, and facility administration."
    },
    {
      title: "Internal Plant Roadways & Loading Bays",
      tag: "Logistics Infrastructure",
      desc: "Paved intra-facility roadways facilitating seamless forklift transport and heavy commercial vehicle loading operations."
    },
    {
      title: "High-Voltage Electrical Substation",
      tag: "Power Infrastructure",
      desc: "Dedicated on-site power transformation station ensuring steady, uninterrupted high-voltage current for induction melting furnaces."
    },
    {
      title: "Raw Material Intake & Virgin Ingots",
      tag: "Raw Materials",
      desc: "Stacks of high-purity primary aluminium ingots staged for electric induction melting and controlled molten metal preparation."
    },
    {
      title: "Heavy-Duty Milling Drive & Motor Assembly",
      tag: "Mechanical Power",
      desc: "Industrial-grade electric motor, heavy gearbox, and mechanical drive assembly powering our primary processing lines."
    },
    {
      title: "Molten Atomisation & Milling Plant",
      tag: "Thermal Milling",
      desc: "Horizontal rotary milling cylinder and high-pressure atomisation system delivering controlled particle morphology."
    },
    {
      title: "Multi-Stage Cyclone Classifier Tower",
      tag: "Aerodynamic Classification",
      desc: "Vertical cyclone classification system separating atomised powder streams by precise particle density and size brackets."
    },
    {
      title: "Multi-Tier Industrial Processing Plant",
      tag: "Processing Facility",
      desc: "Multi-level processing structure housing secondary screening, air cyclone classifiers, and dust mitigation systems."
    },
    {
      title: "Manufacturing Plant Structure & Elevation",
      tag: "Production Facility",
      desc: "Exterior perspective of the main manufacturing plant building, showing heavy material handling sheds and dock elevations."
    },
    {
      title: "Atomising Plant Primary Facility",
      tag: "Atomisation Plant",
      desc: "Dedicated high-temperature facility housing gas nozzles, pressure vessels, and primary collection bins."
    },
    {
      title: "Analytical & Quality Testing Laboratory",
      tag: "Quality Control",
      desc: "In-house analytical testing laboratory conducting active metal gas volumetry (92%–99%), sieve mesh analysis, and lot verification."
    },
    {
      title: "Sieve Shaker Separation Hall",
      tag: "Precision Sieving",
      desc: "Multi-deck vibrating screen decks sizing atomised powder fractions from +25 down to sub-350 BSS mesh specifications."
    },
    {
      title: "Finished Powder Collection Station",
      tag: "Powder Collection",
      desc: "Precision cyclone collection station filling sealed steel drums under controlled atmospheric conditions."
    },
    {
      title: "Pyrotechnic Ignition & Burn Testing",
      tag: "Combustion Assays",
      desc: "Direct burn rate characterization and ignition verification guaranteeing pyrotechnic grade safety and specification compliance."
    },
    {
      title: "Batch-Certified Pyrotechnic Powder Drums",
      tag: "Certified Products",
      desc: "Factory-sealed drums stamped Grade RMA with visible high-purity powder ready for specialized pyrotechnic applications."
    },
    {
      title: "Weatherproof Steel Drum Inventory Yard",
      tag: "Finished Inventory",
      desc: "Covered inventory staging warehouse with batch-tested sealed steel drums ready for immediate pan-India logistics."
    },
    {
      title: "Palletized Packaging & Dispatch Warehouse",
      tag: "Packaging & Dispatch",
      desc: "Moisture-sealed corrugated cartons stacked securely on pallets ready for freight containerization and nationwide distribution."
    },
    {
      title: "Campus Green Belt & Environmental Buffer",
      tag: "Eco Management",
      desc: "Natural tree cover and greenery surrounding the facility perimeter, supporting environmental stewardship and dust suppression."
    }
  ];

  let currentIndex = 0;
  let autoplayTimer = null;
  let isAutoplay = true;
  const slideDuration = 5000; // 5 seconds per slide

  const goToSlide = (targetIndex) => {
    if (targetIndex < 0) {
      targetIndex = slides.length - 1;
    } else if (targetIndex >= slides.length) {
      targetIndex = 0;
    }

    // Toggle active slide
    slides[currentIndex].classList.remove("active");
    if (thumbs[currentIndex]) {
      thumbs[currentIndex].classList.remove("active");
      thumbs[currentIndex].setAttribute("aria-selected", "false");
    }

    currentIndex = targetIndex;
    slides[currentIndex].classList.add("active");

    if (thumbs[currentIndex]) {
      thumbs[currentIndex].classList.add("active");
      thumbs[currentIndex].setAttribute("aria-selected", "true");
      // Scroll ONLY the horizontal thumbnail strip inside its container; NEVER scroll the webpage window
      if (thumbsStrip) {
        const thumb = thumbs[currentIndex];
        const scrollTarget = thumb.offsetLeft - (thumbsStrip.clientWidth / 2) + (thumb.clientWidth / 2);
        thumbsStrip.scrollTo({ left: Math.max(0, scrollTarget), behavior: "smooth" });
      }
    }

    // Update Captions and Badges
    const data = facilityData[currentIndex];
    if (data) {
      if (captionTitle) captionTitle.textContent = data.title;
      if (captionDesc) captionDesc.textContent = data.desc;
      if (stageTag) stageTag.textContent = data.tag;
      if (counterEl) {
        counterEl.textContent = `${String(currentIndex + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
      }
    }

    resetTimer();
  };

  const startAutoplay = () => {
    if (autoplayTimer) clearInterval(autoplayTimer);
    autoplayTimer = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, slideDuration);
  };

  const resetTimer = () => {
    if (autoplayTimer) clearInterval(autoplayTimer);
    startAutoplay();
  };

  // Nav buttons
  if (prevBtn) {
    prevBtn.addEventListener("click", () => goToSlide(currentIndex - 1));
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", () => goToSlide(currentIndex + 1));
  }

  // Thumbnails click
  thumbs.forEach((thumb, index) => {
    thumb.addEventListener("click", () => goToSlide(index));
  });

  // Full-screen mode toggle
  if (fsBtn) {
    fsBtn.addEventListener("click", () => {
      container.classList.toggle("is-fullscreen");
      const isFs = container.classList.contains("is-fullscreen");
      fsBtn.querySelector("span").textContent = isFs ? "Exit Full Screen" : "Full Screen";

      if (isFs && document.fullscreenEnabled && !document.fullscreenElement) {
        container.requestFullscreen().catch(() => {});
      } else if (!isFs && document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    });
  }

  // Exit full-screen on ESC key
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && container.classList.contains("is-fullscreen")) {
      container.classList.remove("is-fullscreen");
      if (fsBtn) fsBtn.querySelector("span").textContent = "Full Screen";
    }
  });

  // Pause autoplay on mouse hover over viewport
  const viewport = container.querySelector("#facility-viewport");
  if (viewport) {
    viewport.addEventListener("mouseenter", () => {
      if (autoplayTimer) clearInterval(autoplayTimer);
    });
    viewport.addEventListener("mouseleave", () => {
      startAutoplay();
    });

    // Touch swipe support
    let touchStartX = 0;
    viewport.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    viewport.addEventListener("touchend", (e) => {
      const diff = e.changedTouches[0].screenX - touchStartX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) goToSlide(currentIndex - 1);
        else goToSlide(currentIndex + 1);
      }
    }, { passive: true });
  }

  goToSlide(0);
}

/* ============================================================
   INIT ON DOM READY
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  renderChrome();
  initCinematicLoader();
  initHeroParticleCanvas();
  initHeroSlideshow();
  initFacilityShowcase();
  renderProducts();
  initNavigation();
  initReveal();
  initCounters();
  init3DCardTilt();
  initMagneticButtons();
  initProductAnchors();
  initContactForm();

  // Guarantee page stays at the very top (scroll 0) when opened or refreshed
  if (!window.location.hash && window.scrollY > 0) {
    window.scrollTo(0, 0);
  }
});

// Extra safeguard on full window load
window.addEventListener("load", () => {
  if (!window.location.hash && window.scrollY > 0) {
    window.scrollTo(0, 0);
  }
});
