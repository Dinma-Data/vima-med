/* ============================================================
   VIMA MED — script.js
   All interactive behaviours: navigation, scroll effects,
   mobile menu, contact form validation, and footer year.
   ============================================================ */


/* ------------------------------------------------------------
   1. AUTO-UPDATE FOOTER COPYRIGHT YEAR
   ------------------------------------------------------------ */
(function setFooterYear() {
  const yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();


/* ------------------------------------------------------------
   2. STICKY HEADER — add shadow on scroll
   ------------------------------------------------------------ */
(function stickyHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  function onScroll() {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
})();


/* ------------------------------------------------------------
   3. MOBILE NAVIGATION TOGGLE
      Opens / closes the nav-links menu on small screens.
   ------------------------------------------------------------ */
(function mobileNav() {
  const toggle  = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', function () {
    const isOpen = navLinks.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu when a link is clicked (smooth scroll will handle the rest)
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', function (e) {
    if (!navLinks.contains(e.target) && !toggle.contains(e.target)) {
      navLinks.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
})();


/* ------------------------------------------------------------
   4. ACTIVE NAV LINK — highlight current section
      Uses IntersectionObserver to watch sections as you scroll.
   ------------------------------------------------------------ */
(function activeNavLink() {
  const sections  = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');
  if (!sections.length || !navAnchors.length) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navAnchors.forEach(function (a) {
            if (a.getAttribute('href') === '#' + id) {
              a.style.color = 'var(--color-primary)';
            } else {
              a.style.color = '';
            }
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach(function (section) {
    observer.observe(section);
  });
})();


/* ------------------------------------------------------------
   5. SCROLL REVEAL — fade-in sections as they enter the viewport
      Adds a CSS class that triggers a CSS transition.
   ------------------------------------------------------------ */
(function scrollReveal() {
  // Inject the base styles needed for the animation
  const style = document.createElement('style');
  style.textContent = `
    .reveal {
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 0.55s ease, transform 0.55s ease;
    }
    .reveal.visible {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);

  // Which elements to animate
  const targets = document.querySelectorAll(
    '.blog-card, .service-card, .about-card, .hero-text, .contact-inner'
  );

  targets.forEach(function (el) {
    el.classList.add('reveal');
  });

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // only animate once
        }
      });
    },
    { threshold: 0.12 }
  );

  targets.forEach(function (el) {
    observer.observe(el);
  });
})();


/* ------------------------------------------------------------
   6. DROPDOWN NAVIGATION
      Desktop: hover is handled by CSS (:hover in style.css).
      All screens: clicking the caret button toggles .open.
      Clicking outside closes all open dropdowns.
   ------------------------------------------------------------ */
(function dropdownNavs() {
  const dropdowns = document.querySelectorAll('.has-dropdown');
  if (!dropdowns.length) return;

  dropdowns.forEach(function (dropdown) {
    const btn = dropdown.querySelector('.dropdown-btn');
    if (!btn) return;

    btn.addEventListener('click', function (e) {
      e.stopPropagation(); // prevent document click from immediately closing
      const isOpen = dropdown.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(isOpen));

      // Close all other open dropdowns
      dropdowns.forEach(function (other) {
        if (other !== dropdown && other.classList.contains('open')) {
          other.classList.remove('open');
          const otherBtn = other.querySelector('.dropdown-btn');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        }
      });
    });
  });

  // Stop clicks inside a dropdown panel from bubbling to document
  document.querySelectorAll('.nav-dropdown').forEach(function (panel) {
    panel.addEventListener('click', function (e) {
      e.stopPropagation();
    });
  });

  // Close everything when clicking anywhere outside the nav
  document.addEventListener('click', function () {
    dropdowns.forEach(function (dropdown) {
      if (dropdown.classList.contains('open')) {
        dropdown.classList.remove('open');
        const btn = dropdown.querySelector('.dropdown-btn');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      }
    });
  });
})();


/* ------------------------------------------------------------
   7. CONTACT FORM — client-side validation and feedback
      This form does NOT send emails (no backend).
      To enable sending, connect a service like Formspree:
        1. Sign up at https://formspree.io (free tier available).
        2. Create a form and copy your endpoint URL.
        3. Replace the fetch URL below with your Formspree endpoint.
   ------------------------------------------------------------ */
(function contactForm() {
  const form     = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');
  if (!form || !feedback) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Basic validation
    const name    = form.querySelector('#name').value.trim();
    const email   = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();

    if (!name || !email || !message) {
      showFeedback('Please fill in your name, email, and message.', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showFeedback('Please enter a valid email address.', 'error');
      return;
    }

    /* ----------------------------------------------------------
       OPTION A (default): Show a polite "coming soon" message.
       ---------------------------------------------------------- */
    showFeedback(
      'Thank you, ' + name + '! Your message has been received. I\'ll be in touch shortly.',
      'success'
    );
    form.reset();

    /* ----------------------------------------------------------
       OPTION B: Uncomment the block below to submit via Formspree.
       Replace YOUR_FORM_ID with the ID from your Formspree dashboard.

    const data = new FormData(form);
    fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    })
    .then(function (res) {
      if (res.ok) {
        showFeedback('Thank you! Your message has been sent.', 'success');
        form.reset();
      } else {
        showFeedback('Something went wrong. Please try emailing directly.', 'error');
      }
    })
    .catch(function () {
      showFeedback('Network error. Please try emailing directly.', 'error');
    });
    ---------------------------------------------------------- */
  });

  function showFeedback(msg, type) {
    feedback.textContent  = msg;
    feedback.className    = 'form-feedback ' + type;
    // Clear after 6 seconds
    setTimeout(function () {
      feedback.textContent = '';
      feedback.className   = 'form-feedback';
    }, 6000);
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
})();
