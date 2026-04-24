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

// Smooth scroll
function scrollToSection(selector) {
  const target = document.querySelector(selector);
  if (target) target.scrollIntoView({ behavior: 'smooth' });
}

// Init
buildTabs();
buildGallery(activeCategory);

// ═══════════════════════════════════════════
// SCROLL REVEAL — Intersection Observer
// ═══════════════════════════════════════════
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');

      // Trigger skill bars when about section enters view
      if (entry.target.closest('.about')) {
        document.querySelectorAll('.skill-bar-fill').forEach(bar => {
          bar.style.width = bar.dataset.w + '%';
        });
      }
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up').forEach(el => {
  revealObserver.observe(el);
});

// Stagger tool tags on about entry
const aboutSection = document.querySelector('.about');
if (aboutSection) {
  const toolObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      document.querySelectorAll('.tool-tag').forEach((tag, i) => {
        tag.style.opacity = '0';
        tag.style.transform = 'translateY(16px)';
        setTimeout(() => {
          tag.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          tag.style.opacity = '1';
          tag.style.transform = 'none';
        }, 600 + i * 80);
      });
      toolObserver.unobserve(aboutSection);
    }
  }, { threshold: 0.2 });
  toolObserver.observe(aboutSection);
}

// Stagger contact cards
const contactSection = document.querySelector('.contact');
if (contactSection) {
  const cardObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      document.querySelectorAll('.contact-card').forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-20px)';
        setTimeout(() => {
          card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.3s, background 0.3s';
          card.style.opacity = '1';
          card.style.transform = 'none';
        }, 300 + i * 120);
      });
      cardObserver.unobserve(contactSection);
    }
  }, { threshold: 0.15 });
  cardObserver.observe(contactSection);
}

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
