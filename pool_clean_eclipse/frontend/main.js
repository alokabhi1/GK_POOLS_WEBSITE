document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  injectServiceAnimationStyles();
  initFloatingNavbar();
  initResponsiveNavigation();
  initGlobalReveal();
  initSmoothScroll();
  initHomeAndAboutInteractions();
  initServicesSection();
  initProductsSection();
  initGallerySection();
  initContactSection();

  function createRevealObserver(options = {}) {
    return new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: options.threshold ?? 0.15,
        rootMargin: options.rootMargin ?? "0px 0px -60px 0px",
      }
    );
  }

  function observeRevealItems(items, options = {}) {
    const observer = createRevealObserver(options);

    items.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index * (options.delayStep ?? 110), options.maxDelay ?? 600)}ms`;

      if (item.classList.contains("reveal-down")) {
        window.addEventListener("load", () => item.classList.add("is-visible"), { once: true });
        return;
      }

      observer.observe(item);
    });
  }

  function addTiltEffect(items, options = {}) {
    if (prefersReducedMotion) return;

    items.forEach((item) => {
      item.addEventListener("mousemove", (event) => {
        const rect = item.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const rotateStrength = options.rotateStrength ?? 2.5;
        const lift = options.lift ?? -3;
        const rotateX = ((y / rect.height) - 0.5) * -rotateStrength;
        const rotateY = ((x / rect.width) - 0.5) * rotateStrength;

        if (options.mouseVars) {
          item.style.setProperty(options.mouseVars.x, `${x}px`);
          item.style.setProperty(options.mouseVars.y, `${y}px`);
        }

        item.style.transform = `translateY(${lift}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });

      item.addEventListener("mouseleave", () => {
        item.style.transform = "";
      });
    });
  }

  function initResponsiveNavigation() {
    const navbar = document.querySelector(".navbar");
    const navLinks = document.querySelector(".nav-links");
    if (!navbar || !navLinks) return;

    const toggle = document.createElement("button");
    toggle.className = "nav-toggle";
    toggle.type = "button";
    toggle.setAttribute("aria-label", "Toggle navigation menu");
    toggle.setAttribute("aria-expanded", "false");
    toggle.textContent = "☰";

    navbar.insertBefore(toggle, navLinks);

    function closeMenu() {
      navbar.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "☰";
    }

    function toggleMenu() {
      const isOpen = navbar.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.textContent = isOpen ? "×" : "☰";
    }

    toggle.addEventListener("click", toggleMenu);

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 980) closeMenu();
    });
  }
  function initGlobalReveal() {
    observeRevealItems(document.querySelectorAll(".reveal-up, .reveal-down"));
  }

  function initFloatingNavbar() {
    const navbar = document.querySelector(".navbar");
    const navLinks = document.querySelectorAll(".nav-links a[href^='#'], .brand[href^='#'], .nav-cta[href^='#']");
    const sectionTargets = Array.from(navLinks)
      .map((link) => link.getAttribute("href"))
      .filter((href) => href && href.length > 1)
      .filter((href, index, list) => list.indexOf(href) === index)
      .map((href) => document.querySelector(href))
      .filter(Boolean);

    if (!navbar) return;

    function updateNavbarState() {
      navbar.classList.toggle("is-scrolled", window.scrollY > 24);
    }

    function setActiveLink(sectionId) {
      document.querySelectorAll(".nav-links a").forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${sectionId}`);
      });
    }

    const activeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setActiveLink(entry.target.id);
        });
      },
      {
        threshold: 0.35,
        rootMargin: "-120px 0px -45% 0px",
      }
    );

    sectionTargets.forEach((section) => activeObserver.observe(section));

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        const href = link.getAttribute("href");
        if (!href || href.length <= 1) return;
        setActiveLink(href.slice(1));
      });
    });

    updateNavbarState();
    window.addEventListener("scroll", updateNavbarState, { passive: true });
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (event) => {
        const href = link.getAttribute("href");
        if (!href || href === "#") return;

        const target = document.querySelector(href);
        if (!target) return;

        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  function initHomeAndAboutInteractions() {
    const interactiveCards = document.querySelectorAll(
      ".hero-panel, .stat, .mini-card, .hero-image-card, .overview-copy, .facts-panel, .strength-card, .capabilities"
    );

    interactiveCards.forEach((card) => {
      card.addEventListener("mousemove", (event) => {
        if (prefersReducedMotion) return;

        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const isHomeCard =
          card.classList.contains("hero-panel") ||
          card.classList.contains("stat") ||
          card.classList.contains("mini-card");
        const rotateStrength = isHomeCard ? 3 : 2;
        const lift = isHomeCard ? -4 : -3;
        const rotateX = ((y / rect.height) - 0.5) * -rotateStrength;
        const rotateY = ((x / rect.width) - 0.5) * rotateStrength;

        card.style.transform = `translateY(${lift}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }

  function initServicesSection() {
    const servicesSection = document.querySelector(".services-section");
    if (!servicesSection) return;

    const serviceCards = servicesSection.querySelectorAll(".service-card");
    const approachSteps = servicesSection.querySelectorAll(".approach-step");
    const heroItems = servicesSection.querySelectorAll(".eyebrow, .hero-copy h1, .hero-copy p, .hero-btn");
    const sectionHeading = servicesSection.querySelector(".section-heading");
    const trusted = servicesSection.querySelector(".trusted");
    const revealObserver = createRevealObserver({ threshold: 0.18 });

    heroItems.forEach((item, index) => {
      item.classList.add("animate-rise");
      item.style.transitionDelay = `${index * 120}ms`;
    });

    window.addEventListener(
      "load",
      () => {
        heroItems.forEach((item) => item.classList.add("is-visible"));
      },
      { once: true }
    );

    if (sectionHeading) {
      sectionHeading.classList.add("animate-rise");
      revealObserver.observe(sectionHeading);
    }

    serviceCards.forEach((card, index) => {
      card.classList.add("animate-rise");
      card.style.transitionDelay = `${index * 90}ms`;
      revealObserver.observe(card);
    });

    addTiltEffect(serviceCards, {
      rotateStrength: 7,
      lift: -6,
      mouseVars: { x: "--x", y: "--y" },
    });

    approachSteps.forEach((step, index) => {
      step.classList.add("animate-rise");
      step.style.transitionDelay = `${index * 130}ms`;
      revealObserver.observe(step);
    });

    if (trusted) {
      trusted.classList.add("animate-rise");
      revealObserver.observe(trusted);
    }
  }

  function initProductsSection() {
    const productsSection = document.querySelector(".products-section");
    if (!productsSection) return;

    const productCards = productsSection.querySelectorAll(".product-card");
    const productDetailModal = document.getElementById("productDetailModal");
    const pumpList = document.getElementById("pumpList");
    const closeDetailModal = productDetailModal?.querySelector(".product-detail-close");
    const detailHeadAction = productDetailModal?.querySelector(".detail-head-action");

    const poolPumps = [
      {
        name: "AquaFlow Domestic Pool Pump",
        model: "GP-AF 075",
        price: "Rs. 28,500",
        power: "0.75 HP",
        flow: "8,000-10,000 LPH",
        usage: "Small residential pools up to 25,000 litres",
        details: "Compact, quiet, and suitable for daily circulation with standard sand filter systems.",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Schwimmbadpumpe_IMGP6571.jpg",
        imageCredit: "Johann H. Addicks / Wikimedia Commons",
      },
      {
        name: "AquaFlow Plus Pool Pump",
        model: "GP-AF 100",
        price: "Rs. 34,500",
        power: "1 HP",
        flow: "11,000-13,000 LPH",
        usage: "Residential pools and compact villa pools",
        details: "Balanced option for filtration, circulation, and regular water turnover requirements.",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Swimming_pool_filtration_(3).jpg",
        imageCredit: "Pavel Sevela / Wikimedia Commons",
      },
      {
        name: "CrystalRun High Flow Pump",
        model: "GP-CR 150",
        price: "Rs. 44,000",
        power: "1.5 HP",
        flow: "15,000-18,000 LPH",
        usage: "Medium pools, societies, farmhouses",
        details: "Designed for stronger circulation, improved filter performance, and dependable runtime.",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Swimming_pool_filtration_(1).jpg",
        imageCredit: "Pavel Sevela / Wikimedia Commons",
      },
      {
        name: "HydroPrime Heavy Duty Pump",
        model: "GP-HP 200",
        price: "Rs. 58,000",
        power: "2 HP",
        flow: "20,000-24,000 LPH",
        usage: "Large residential and commercial pools",
        details: "Heavy-duty motor body with stable operation for higher water volume pools.",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Swimming_pool_filtration_(2).jpg",
        imageCredit: "Pavel Sevela / Wikimedia Commons",
      },
      {
        name: "BlueLine Energy Saver Pump",
        model: "GP-BL 110E",
        price: "Rs. 49,500",
        power: "1.1 HP",
        flow: "10,000-14,000 LPH",
        usage: "Energy-conscious home pools",
        details: "Efficient daily-use pump for owners who want lower operating cost and quiet performance.",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Poolequip_Pool_Equipment_Display.jpg",
        imageCredit: "Wikimedia Commons",
      },
      {
        name: "SilentWave Low Noise Pump",
        model: "GP-SW 100",
        price: "Rs. 42,000",
        power: "1 HP",
        flow: "10,500-12,500 LPH",
        usage: "Indoor, terrace, and premium residential pools",
        details: "Low-noise design suited for villas and homes where equipment sound matters.",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Muntlix-Salt_controll_pump_(pool)-01ASD.jpg",
        imageCredit: "Asurnipal / Wikimedia Commons",
      },
      {
        name: "TurboJet Spa & Jacuzzi Pump",
        model: "GP-TJ 150J",
        price: "Rs. 52,000",
        power: "1.5 HP",
        flow: "Jet pressure focused",
        usage: "Jacuzzi, spa jets, water massage systems",
        details: "Pressure-focused pump for spa jets, hydrotherapy seating, and water feature support.",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Small_waterpump.JPG",
        imageCredit: "Wikimedia Commons",
      },
      {
        name: "Waterfall Feature Pump",
        model: "GP-WF 125",
        price: "Rs. 46,500",
        power: "1.25 HP",
        flow: "12,000-16,000 LPH",
        usage: "Waterfalls, fountains, and decorative features",
        details: "Built for smooth water movement in visual features and poolside attractions.",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Submersible_pump_0.75HP.jpg",
        imageCredit: "Wikimedia Commons",
      },
      {
        name: "Commercial Circulation Pump",
        model: "GP-CC 300",
        price: "Rs. 86,000",
        power: "3 HP",
        flow: "30,000-36,000 LPH",
        usage: "Hotels, clubs, resorts, and society pools",
        details: "High-capacity pump option for demanding commercial filtration cycles.",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Piscina_comunale_di_Nuoro_-_Locale_caldaia_3.jpg",
        imageCredit: "Air fans / Wikimedia Commons",
      },
      {
        name: "Variable Speed Smart Pump",
        model: "GP-VS 200S",
        price: "Rs. 1,18,000",
        power: "2 HP variable speed",
        flow: "Programmable",
        usage: "Premium smart pools and automation-ready systems",
        details: "Programmable speed control for filtration, backwash support, and energy optimization.",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Piscina_comunale_di_Nuoro_-_Locale_caldaia_1.jpg",
        imageCredit: "Air fans / Wikimedia Commons",
      },
    ];

    addTiltEffect(productCards, {
      rotateStrength: 5,
      lift: -5,
      mouseVars: { x: "--mx", y: "--my" },
    });

    function renderPumpList() {
      if (!pumpList) return;

      pumpList.innerHTML = poolPumps
        .map(
          (pump, index) => `
            <article class="pump-detail-card">
              <div class="pump-photo">
                <img src="${pump.image}" alt="${pump.name}" loading="lazy">
                <span>${pump.imageCredit}</span>
              </div>
              <div class="pump-card-top">
                <span class="pump-count">${String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>${pump.name}</h3>
                  <p>${pump.model}</p>
                </div>
              </div>
              <div class="pump-spec-grid">
                <div><span>Price</span><strong>${pump.price}</strong></div>
                <div><span>Power</span><strong>${pump.power}</strong></div>
                <div><span>Flow</span><strong>${pump.flow}</strong></div>
              </div>
              <p class="pump-usage">${pump.usage}</p>
              <p class="pump-details">${pump.details}</p>
              <button class="pump-enquiry-btn" type="button" data-pump="${pump.name}" data-model="${pump.model}">Request Quote</button>
            </article>
          `
        )
        .join("");

      pumpList.querySelectorAll(".pump-enquiry-btn").forEach((button) => {
        button.addEventListener("click", () => {
          const pumpName = button.dataset.pump;
          const model = button.dataset.model;
          hideProductDetails();
          prefillPumpInquiry(pumpName, model);
        });
      });
    }

    function showProductDetails() {
      renderPumpList();
      productDetailModal?.classList.add("open");
      productDetailModal?.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-open");
    }

    function hideProductDetails() {
      productDetailModal?.classList.remove("open");
      productDetailModal?.setAttribute("aria-hidden", "true");
      document.body.classList.remove("modal-open");
    }

    function prefillPumpInquiry(pumpName, model) {
      const contactForm = document.getElementById("contactForm");
      if (!contactForm) return;

      const serviceField = contactForm.querySelector('[name="service"]');
      const messageField = contactForm.querySelector('[name="message"]');

      if (serviceField) {
        serviceField.value = "Equipment Supply & Installation";
      }

      if (messageField) {
        messageField.value = `I am interested in ${pumpName} (${model}). Please share availability, final price, installation details, and warranty information.`;
      }

      contactForm.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    productsSection.querySelectorAll(".product-footer button").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        const card = button.closest(".product-card");
        if (!card) return;

        const name = card.querySelector("h2")?.textContent ?? "Product";

        if (card.dataset.product === "pool-pumps") {
          showProductDetails();
          return;
        }

        button.textContent = "Selected";
        card.classList.add("is-selected");

        window.setTimeout(() => {
          button.textContent = "View Details";
          card.classList.remove("is-selected");
        }, 1200);

        console.log(`Product selected: ${name}`);
      });
    });

    productCards.forEach((card) => {
      card.addEventListener("click", () => {
        if (card.dataset.product && productCatalog[card.dataset.product]) {
          showProductDetails(card.dataset.product);
        }
      });
    });

    closeDetailModal?.addEventListener("click", hideProductDetails);

    detailHeadAction?.addEventListener("click", (event) => {
      event.preventDefault();
      hideProductDetails();
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    productDetailModal?.addEventListener("click", (event) => {
      if (event.target === productDetailModal) hideProductDetails();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && productDetailModal?.classList.contains("open")) {
        hideProductDetails();
      }
    });
  }

  function initGallerySection() {
    const grid = document.getElementById("galleryGrid");
    const lightbox = document.getElementById("lightbox");
    if (!grid || !lightbox) return;

    const filterButtons = document.querySelectorAll(".filter-bar button");
    const lightboxImage = lightbox.querySelector("img");
    const lightboxCaption = lightbox.querySelector(".lightbox-caption");
    const closeLightbox = lightbox.querySelector(".close-lightbox");

    const galleryItems = [
      {
        title: "Excavation Stage",
        category: "construction",
        image: "https://source.unsplash.com/900x700/?pool,construction,excavation",
        note: "Site preparation and pool layout work",
      },
      {
        title: "RCC Pool Structure",
        category: "construction",
        image: "https://source.unsplash.com/900x720/?concrete,construction,swimming,pool",
        note: "Reinforced concrete planning and structure",
      },
      {
        title: "Waterproofing Work",
        category: "construction",
        image: "https://source.unsplash.com/900x710/?construction,waterproofing,pool",
        note: "Leak protection and surface preparation",
      },
      {
        title: "Tile Finishing",
        category: "renovation",
        image: "https://source.unsplash.com/900x730/?swimming,pool,tiles",
        note: "Premium tile and edge finishing",
      },
      {
        title: "Villa Pool",
        category: "completed",
        image: "https://source.unsplash.com/900x760/?villa,swimming,pool",
        note: "Private residential pool completion",
      },
      {
        title: "Luxury Resort Pool",
        category: "completed",
        image: "https://source.unsplash.com/900x740/?luxury,resort,pool",
        note: "Hospitality and resort pool inspiration",
      },
      {
        title: "Modern Poolside",
        category: "completed",
        image: "https://source.unsplash.com/900x715/?modern,poolside,architecture",
        note: "Clean modern pool environment",
      },
      {
        title: "Night Lighting",
        category: "renovation",
        image: "https://source.unsplash.com/900x735/?swimming,pool,night,lighting",
        note: "LED lighting and evening ambience",
      },
      {
        title: "Pool Renovation",
        category: "renovation",
        image: "https://source.unsplash.com/900x745/?pool,renovation",
        note: "Surface, lighting and system upgrades",
      },
      {
        title: "Water Feature",
        category: "completed",
        image: "https://source.unsplash.com/900x755/?pool,waterfall,feature",
        note: "Decorative water feature integration",
      },
      {
        title: "Filtration Setup",
        category: "equipment",
        image: "https://source.unsplash.com/900x705/?pool,filter,pump,equipment",
        note: "Pump, filter and circulation systems",
      },
      {
        title: "Equipment Room",
        category: "equipment",
        image: "https://source.unsplash.com/900x725/?pool,equipment,room",
        note: "Organized machinery and utility setup",
      },
      {
        title: "Pool Pump System",
        category: "equipment",
        image: "https://source.unsplash.com/900x735/?water,pump,equipment",
        note: "Reliable circulation machinery",
      },
      {
        title: "Underwater Lights",
        category: "equipment",
        image: "https://source.unsplash.com/900x720/?underwater,pool,light",
        note: "Lighting installation and ambience",
      },
      {
        title: "Society Pool",
        category: "completed",
        image: "https://source.unsplash.com/900x750/?apartment,swimming,pool",
        note: "Residential society pool spaces",
      },
      {
        title: "Hotel Pool",
        category: "completed",
        image: "https://source.unsplash.com/900x760/?hotel,swimming,pool",
        note: "Commercial hospitality pool projects",
      },
      {
        title: "Infinity Pool",
        category: "completed",
        image: "https://source.unsplash.com/900x740/?infinity,pool",
        note: "Premium architectural pool design",
      },
      {
        title: "Lap Pool",
        category: "completed",
        image: "https://source.unsplash.com/900x730/?lap,pool",
        note: "Long-format swimming pool concept",
      },
      {
        title: "Pool Deck Work",
        category: "construction",
        image: "https://source.unsplash.com/900x720/?pool,deck,construction",
        note: "Decking and surrounding work",
      },
      {
        title: "Landscape Integration",
        category: "completed",
        image: "https://source.unsplash.com/900x745/?pool,landscape,garden",
        note: "Pool with landscape planning",
      },
      {
        title: "Cleaning & Maintenance",
        category: "equipment",
        image: "https://source.unsplash.com/900x735/?pool,cleaning,maintenance",
        note: "Routine care and water clarity",
      },
      {
        title: "Smart Pool Controls",
        category: "equipment",
        image: "https://source.unsplash.com/900x725/?smart,home,pool",
        note: "Automation and remote control systems",
      },
      {
        title: "Commercial Pool",
        category: "completed",
        image: "https://source.unsplash.com/900x715/?commercial,swimming,pool",
        note: "Large scale pool project inspiration",
      },
      {
        title: "Final Handover",
        category: "completed",
        image: "https://source.unsplash.com/900x755/?beautiful,swimming,pool",
        note: "Completed pool ready for use",
      },
    ];

    function renderGallery(filter = "all") {
      const visibleItems =
        filter === "all"
          ? galleryItems
          : galleryItems.filter((item) => item.category === filter);

      grid.innerHTML = visibleItems
        .map(
          (item, index) => `
            <button class="gallery-item reveal-up is-visible" type="button" data-title="${item.title}" data-image="${item.image}" style="transition-delay:${Math.min(index * 35, 360)}ms">
              <img src="${item.image}" alt="${item.title}" loading="lazy">
              <span class="gallery-caption">
                <strong>${item.title}</strong>
                <span>${item.note}</span>
              </span>
            </button>
          `
        )
        .join("");

      grid.querySelectorAll(".gallery-item").forEach((item) => {
        item.addEventListener("click", () => openLightbox(item.dataset.image, item.dataset.title));
      });
    }

    function openLightbox(image, title) {
      if (!lightboxImage || !lightboxCaption) return;

      lightboxImage.src = image;
      lightboxImage.alt = title;
      lightboxCaption.textContent = title;
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
    }

    function hideLightbox() {
      lightbox.classList.remove("open");
      lightbox.setAttribute("aria-hidden", "true");
    }

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        filterButtons.forEach((item) => item.classList.remove("active"));
        button.classList.add("active");
        renderGallery(button.dataset.filter);
      });
    });

    closeLightbox?.addEventListener("click", hideLightbox);

    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) hideLightbox();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") hideLightbox();
    });

    renderGallery();
  }

  function getApiBaseUrl() {
    if (window.GURUKRUPA_API_BASE_URL) {
      return window.GURUKRUPA_API_BASE_URL.replace(/\/$/, "");
    }

    const host = window.location.hostname;
    const isLocalHost = host === "localhost" || host === "127.0.0.1" || host === "";
    const apiHost = isLocalHost ? "localhost" : host;
    return `http://${apiHost}:8080`;
  }

  function initContactSection() {
    const contactForm = document.getElementById("contactForm");
    const formStatus = document.getElementById("formStatus");
    const infoItems = document.querySelectorAll(".info-item, .hero-card, .contact-form");

    addTiltEffect(infoItems, {
      rotateStrength: 2.5,
      lift: -3,
    });

    if (!contactForm || !formStatus) return;

    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const formData = new FormData(contactForm);
      const name = formData.get("name")?.trim();
      const email = formData.get("email")?.trim();
      const phone = formData.get("phone")?.trim();
      const service = formData.get("service")?.trim();
      const message = formData.get("message")?.trim();

      if (!name || !email || !phone || !message) {
        formStatus.textContent = "Please fill all required fields before submitting.";
        formStatus.style.color = "#b45309";
        return;
      }

      const submitButton = contactForm.querySelector(".submit-btn");
      const originalButtonText = submitButton?.innerHTML;

      try {
        if (submitButton) {
          submitButton.disabled = true;
          submitButton.innerHTML = "Submitting...";
        }

        const response = await fetch(`${getApiBaseUrl()}/api/inquiries`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, phone, service, message }),
        });

        if (!response.ok) {
          throw new Error("Inquiry submission failed");
        }

        formStatus.textContent = "Thank you. Your inquiry has been prepared successfully.";
        formStatus.style.color = "#005d6f";
        contactForm.reset();
      } catch (error) {
        formStatus.textContent = "Unable to submit right now. Please try again or contact us directly.";
        formStatus.style.color = "#b45309";
        console.error(error);
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.innerHTML = originalButtonText;
        }
      }
    });
  }

  function injectServiceAnimationStyles() {
    const style = document.createElement("style");
    style.textContent = `
      .animate-rise {
        opacity: 0;
        transform: translateY(28px);
        transition:
          opacity 700ms ease,
          transform 700ms cubic-bezier(.2, .7, .2, 1);
        will-change: opacity, transform;
      }

      .animate-rise.is-visible {
        opacity: 1;
        transform: translateY(0);
      }

      .service-card {
        transform-style: preserve-3d;
        transition:
          opacity 700ms ease,
          transform 250ms ease,
          box-shadow 250ms ease,
          border-color 250ms ease;
      }

      .service-card::after {
        content: "";
        position: absolute;
        inset: 0;
        background: radial-gradient(
          circle at var(--x, 50%) var(--y, 50%),
          rgba(0, 136, 154, .18),
          transparent 34%
        );
        opacity: 0;
        transition: opacity 220ms ease;
        pointer-events: none;
      }

      .service-card:hover::after {
        opacity: 1;
      }

      .service-icon {
        transition: transform 280ms ease, box-shadow 280ms ease;
      }

      .service-card:hover .service-icon {
        transform: translateZ(18px) scale(1.08);
        box-shadow: 0 12px 26px rgba(0, 91, 106, .25);
      }

      .service-card h3,
      .service-card p,
      .service-card a {
        position: relative;
        z-index: 1;
      }

      .approach-step.is-visible .step-icon {
        animation: softPulse 1.8s ease both;
      }

      @keyframes softPulse {
        0% {
          transform: scale(.88);
          box-shadow: 0 0 0 0 rgba(0, 136, 154, .22);
        }

        55% {
          transform: scale(1.04);
          box-shadow: 0 0 0 12px rgba(0, 136, 154, 0);
        }

        100% {
          transform: scale(1);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .animate-rise,
        .service-card,
        .service-icon {
          animation: none !important;
          transition: none !important;
          transform: none !important;
        }
      }
    `;

    document.head.appendChild(style);
  }
});
