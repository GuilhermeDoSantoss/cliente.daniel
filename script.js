/* ══════════════════════════════════════════════
   INSIDE FOOTBALL — script.js
   Daniel Martins · Sports Agent
══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── NAVBAR ─────────────────────────────── */
  const navbar   = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu  = document.getElementById('nav-menu');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    highlightActiveLink();
  }, { passive: true });

  hamburger?.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    hamburger.classList.toggle('active');
  });

  // Close mobile menu on link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      hamburger?.classList.remove('active');
    });
  });

  // Smooth scroll for ALL anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  /* ─── ACTIVE LINK HIGHLIGHT ──────────────── */
  function highlightActiveLink() {
    const sections  = document.querySelectorAll('section[id]');
    const navLinks  = document.querySelectorAll('.nav-link');
    let current     = '';

    sections.forEach(sec => {
      const top = sec.offsetTop - (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) + 20);
      if (window.scrollY >= top) current = sec.getAttribute('id');
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  }


  /* ─── HERO COUNTER ANIMATION ─────────────── */
  function animateCounter(el, target, duration = 1800) {
    const start     = performance.now();
    const ease      = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // easeInOut

    const frame = now => {
      const elapsed  = Math.min((now - start) / duration, 1);
      const value    = Math.floor(ease(elapsed) * target);
      el.textContent = value;
      if (elapsed < 1) requestAnimationFrame(frame);
      else el.textContent = target;
    };
    requestAnimationFrame(frame);
  }

  let countersTriggered = false;
  const heroStats = document.querySelector('.hero-stats');

  if (heroStats) {
    const counterObs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !countersTriggered) {
        countersTriggered = true;
        document.querySelectorAll('.hstat-n[data-target]').forEach(el => {
          animateCounter(el, parseInt(el.dataset.target));
        });
      }
    }, { threshold: 0.5 });
    counterObs.observe(heroStats);
  }


  /* ─── SCROLL REVEAL ──────────────────────── */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  const revealSelectors = [
    '.svc-card', '.athlete-card', '.about-text-col', '.about-img-col',
    '.contact-left', '.contact-right', '.partner-item',
    '.section-header', '.about-pillars', '.contact-details'
  ];

  revealSelectors.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('reveal');
      // Stagger siblings
      if (i < 4) el.classList.add(`reveal-delay-${i + 1}`);
      revealObserver.observe(el);
    });
  });


  /* ─── ATHLETE FILTER ─────────────────────── */
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const athleteCards = document.querySelectorAll('.athlete-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      athleteCards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        if (match) {
          card.classList.remove('hidden');
          card.style.animation = 'none';
          void card.offsetWidth;
          card.style.animation = '';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });


  /* ─── CONTACT FORM ───────────────────────── */
  const contactForm = document.getElementById('contactForm');

  contactForm?.addEventListener('submit', async e => {
    e.preventDefault();

    const btn       = contactForm.querySelector('.btn-submit');
    const origHTML  = btn.innerHTML;
    btn.innerHTML   = '<span>Sending…</span><i class="fas fa-spinner fa-spin"></i>';
    btn.disabled    = true;

    // Simulate async submission (replace with real fetch if needed)
    await new Promise(r => setTimeout(r, 1800));

    btn.innerHTML = '<span>Message Sent!</span><i class="fas fa-check"></i>';
    btn.style.background = '#2ecc71';

    setTimeout(() => {
      contactForm.reset();
      btn.innerHTML = origHTML;
      btn.style.background = '';
      btn.disabled = false;
    }, 3000);
  });


  /* ─── PARALLAX HERO ──────────────────────── */
  const heroImg = document.querySelector('.hero-img');

  if (heroImg && window.matchMedia('(min-width: 768px)').matches) {
    window.addEventListener('scroll', () => {
      const y = window.pageYOffset;
      if (y < window.innerHeight) {
        heroImg.style.transform = `scale(1) translateY(${y * 0.25}px)`;
      }
    }, { passive: true });
  }


  /* ─── LOADING STATE ──────────────────────── */
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
  });

});


/* ─── WHATSAPP / INSTAGRAM ───────────────── */
function abrirWhatsapp() {
  const numero  = '+5521983969272';
  const message = 'Olá Daniel! Vi seu site e gostaria de conversar sobre representação esportiva.';
  const url     = `https://wa.me/${numero}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

function abrirInstagram() {
  window.open('https://www.instagram.com/insidefootball.service', '_blank', 'noopener,noreferrer');
}