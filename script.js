// ═══════════════════════════════════════════
// SMOOTH PAGE INTRO
// ═══════════════════════════════════════════
(function () {
  const intro     = document.getElementById('pageIntro');
  const logoWrap  = document.getElementById('introLogoWrap');
  const bar       = document.getElementById('introBar');
  if (!intro || !logoWrap) return;

  document.body.classList.add('intro-lock');

  // Step 1 — Blur-in the logo (small delay so transition is seen)
  requestAnimationFrame(() => {
    setTimeout(() => {
      logoWrap.classList.add('visible');
    }, 80);
  });

  // Step 2 — Fill the progress bar
  setTimeout(() => bar && bar.classList.add('fill'), 300);

  // Step 3 — Logo exits (scale up + blur out)
  setTimeout(() => logoWrap.classList.add('exit'), 2000);

  // Step 4 — Whole overlay fades away
  setTimeout(() => {
    intro.classList.add('fade-out');
    document.body.classList.remove('intro-lock');
  }, 2500);

  // Step 5 — Remove from DOM entirely
  setTimeout(() => intro.remove(), 3700);
})();

// ═══════════════════════════════════════════

// ============================================================
// ✅ ADD YOUR WORK HERE
// category: must match exactly one of the categories below
// For videos, use a thumbnail image (videos can't preview directly)
// ============================================================
const projects = [

  // ── EDITED IMAGES ──
  {
    category: 'Edited Images',
    image: 'images/pic1.jpg',
    title: 'Portrait Retouch',
    info: 'Professional skin retouching and color correction.'
  },
  {
    category: 'Edited Images',
    image: 'images/pic2.jpg',
    title: 'Product Photo Edit',
    info: 'Background removal and shadow enhancement for e-commerce.'
  },

  // ── EDITED VIDEOS ──
  {
    category: 'Edited Videos',
    image: 'images/pic3.jpg',   // use a thumbnail image for videos
    title: 'YouTube Vlog Edit',
    info: 'Fast-paced cuts, transitions and music sync for travel vlog.'
  },
  {
    category: 'Edited Videos',
    image: 'images/pic1.jpg',
    title: 'Brand Ad Video',
    info: 'Product reveal with cinematic color grade and motion text.'
  },

  // ── COLOR GRADING ──
  {
    category: 'Color Grading',
    image: 'images/pic2.jpg',
    title: 'Cinematic LUT',
    info: 'Orange & teal grade applied to wedding footage.'
  },

  // ── THUMBNAILS ──
  {
    category: 'Thumbnails',
    image: 'images/pic3.jpg',
    title: 'YouTube Thumbnail',
    info: 'High CTR thumbnail design for tech channel.'
  },

  // ── TO ADD MORE — copy this block ──
  // {
  //   category: 'Edited Images',   // or: Edited Videos / Color Grading / Thumbnails
  //   image: 'images/yourfile.jpg',
  //   title: 'Your Title',
  //   info: 'Short description.'
  // },
];
// ============================================================

let activeCategory = null;

// Build category tabs dynamically from project data
function buildTabs() {
  const tabsEl = document.getElementById('categoryTabs');
  if (!tabsEl) return;

  // Get unique categories in order they appear
  const seen = [];
  projects.forEach(p => {
    if (!seen.includes(p.category)) seen.push(p.category);
  });

  tabsEl.innerHTML = '';

  seen.forEach((cat, i) => {
    const btn = document.createElement('button');
    btn.className = 'tab-btn' + (i === 0 ? ' active' : '');
    btn.textContent = cat;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = cat;
      buildGallery(cat);
    });
    tabsEl.appendChild(btn);
  });

  // Set first category active by default
  activeCategory = seen[0];
}

// Build gallery filtered by category
function buildGallery(category) {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;

  const filtered = projects.filter(p => p.category === category);

  // Fade out
  grid.style.opacity = '0';
  grid.style.transform = 'translateY(10px)';

  setTimeout(() => {
    grid.innerHTML = '';

    if (filtered.length === 0) {
      grid.innerHTML = '<p style="color:rgba(255,255,255,0.3);text-align:center;grid-column:1/-1;padding:40px">No projects in this category yet.</p>';
    } else {
      filtered.forEach((project, index) => {
        // Find global index for lightbox
        const globalIndex = projects.indexOf(project);
        const card = document.createElement('div');
        card.className = 'gallery-card';
        card.innerHTML = `
          <div class="gallery-card-img">
            <img
              src="${project.image}"
              alt="${project.title}"
              onerror="this.style.display='none'; this.parentElement.querySelector('.gallery-placeholder').style.display='flex';"
            />
            <div class="gallery-placeholder" style="display:none;">🎬</div>
          </div>
          <div class="gallery-card-info">
            <h3>${project.title}</h3>
            <p>${project.info}</p>
          </div>
        `;
        card.addEventListener('click', () => openLightbox(globalIndex));
        grid.appendChild(card);
      });
    }

    // Fade in
    grid.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    grid.style.opacity = '1';
    grid.style.transform = 'translateY(0)';
  }, 200);
}

// Lightbox
function openLightbox(index) {
  const p = projects[index];
  document.getElementById('lbImage').src = p.image;
  document.getElementById('lbTitle').textContent = p.title;
  document.getElementById('lbInfo').textContent = p.info;
  document.getElementById('lightbox').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = '';
}

document.addEventListener('click', (e) => {
  if (e.target.id === 'lightbox') closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// Smooth scroll + nav active animation
function scrollToSection(selector) {
  const target = document.querySelector(selector);
  if (!target) return;

  target.scrollIntoView({ behavior: 'smooth' });

  // Flash the clicked nav link
  document.querySelectorAll('.nav-links li').forEach(li => {
    const oc = li.getAttribute('onclick') || '';
    if (oc.includes(selector)) {
      li.classList.add('nav-active');
      setTimeout(() => li.classList.remove('nav-active'), 800);
    }
  });

  // Section entrance pop
  target.classList.add('section-flash');
  setTimeout(() => target.classList.remove('section-flash'), 600);
}

// Auto-highlight nav on scroll
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = '#' + entry.target.id;
      document.querySelectorAll('.nav-links li').forEach(li => {
        const oc = li.getAttribute('onclick') || '';
        li.classList.toggle('nav-current', oc.includes(id));
      });
    }
  });
}, { threshold: 0.45 });

['hero','services','portfolio','about','contact'].forEach(id => {
  const el = document.getElementById(id);
  if (el) navObserver.observe(el);
});

// Init
buildTabs();
buildGallery(activeCategory);

// ═══════════════════════════════════════════
// UNIVERSAL SCROLL ANIMATION SYSTEM
// ═══════════════════════════════════════════

// Hero elements — add anim class with stagger delays
const heroTargets = [
  { sel: '.hero-label',   delay: 0   },
  { sel: '.hero h1',      delay: 0.1 },
  { sel: '.hero p',       delay: 0.2 },
  { sel: '.hero-actions', delay: 0.3 },
  { sel: '.hero-stats',   delay: 0.4 },
];
heroTargets.forEach(({ sel, delay }) => {
  const el = document.querySelector(sel);
  if (el) {
    el.classList.add('anim-up');
    el.style.transitionDelay = delay + 's';
  }
});

// All other animatable elements
document.querySelectorAll('.section-label, .section-title').forEach((el, i) => {
  el.classList.add('anim-up');
  el.style.transitionDelay = (i % 2 * 0.08) + 's';
});
document.querySelectorAll('.service-card').forEach((el, i) => {
  el.classList.add('anim-up');
  el.style.transitionDelay = (i * 0.08) + 's';
});
document.querySelectorAll('.tab-btn').forEach((el, i) => {
  el.classList.add('anim-up');
  el.style.transitionDelay = (i * 0.06) + 's';
});
document.querySelectorAll('.reveal-left, .contact-card').forEach((el, i) => {
  el.classList.add('anim-left');
  el.style.transitionDelay = (i * 0.08) + 's';
});
document.querySelectorAll('.reveal-right').forEach(el => el.classList.add('anim-right'));
document.querySelectorAll('.reveal-up').forEach(el => el.classList.add('anim-up'));
document.querySelectorAll('.tool-tag').forEach((el, i) => {
  el.classList.add('anim-up');
  el.style.transitionDelay = (i * 0.07) + 's';
});

// Single observer — re-animates EVERY time element enters/leaves viewport
const animObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.remove('in-view');
      void entry.target.offsetWidth; // force reflow to restart transition
      entry.target.classList.add('in-view');

      // Skill bars re-fill on enter
      if (entry.target.closest && entry.target.closest('.about')) {
        document.querySelectorAll('.skill-bar-fill').forEach(bar => {
          bar.style.width = '0%';
          setTimeout(() => { bar.style.width = bar.dataset.w + '%'; }, 60);
        });
      }
    } else {
      // Reset when leaving — so it animates fresh next time
      entry.target.classList.remove('in-view');
      if (entry.target.closest && entry.target.closest('.about')) {
        document.querySelectorAll('.skill-bar-fill').forEach(bar => {
          bar.style.width = '0%';
        });
      }
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

// Observe everything including hero elements
document.querySelectorAll('.anim-up, .anim-left, .anim-right').forEach(el => {
  animObserver.observe(el);
});

// ═══════════════════════════════════════════
// CONTACT FORM SUBMIT
// ═══════════════════════════════════════════
function handleFormSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.btn-submit');
  const successEl = document.getElementById('formSuccess');

  btn.disabled = true;
  btn.querySelector('.btn-submit-text').textContent = 'Sending...';

  setTimeout(() => {
    btn.style.display = 'none';
    successEl.style.display = 'block';
    e.target.reset();
    setTimeout(() => {
      btn.style.display = 'flex';
      btn.disabled = false;
      btn.querySelector('.btn-submit-text').textContent = 'Send Message';
      successEl.style.display = 'none';
    }, 4000);
  }, 1200);
}
