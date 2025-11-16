// script.js - full site behavior (typing, data-driven skills & projects, certificate carousel)

// ---------- Configuration / Data ----------
const TYPING_LIST = ['Java','Spring Boot','MySQL','Microservices','Thymeleaf','Docker']; // exact order required

// Skills (only resume-listed)
const SKILLS = {
  "Languages": [
    { name: "Java", icon: "assets/icons/java.svg", value: 90 },
    { name: "SQL", icon: "assets/icons/sql.svg", value: 75 }
  ],
  "Frameworks & Tools": [
    { name: "Spring Boot", icon: "assets/icons/springboot.svg", value: 85 },
    { name: "Maven", icon: "assets/icons/maven.svg", value: 70 },
    { name: "Git", icon: "assets/icons/git.svg", value: 80 },
    { name: "Thymeleaf", icon: "assets/icons/thymeleaf.svg", value: 70 }
  ],
  "Databases": [
    { name: "MySQL", icon: "assets/icons/mysql.svg", value: 80 },
    { name: "RDBMS", icon: "assets/icons/rdbms.svg", value: 78 }
  ],
  "Soft / Other Skills": [
    { name: "Teamwork" },
    { name: "Adaptability" },
    { name: "Problem Solving" },
    { name: "Creativity" }
  ]
};

// Projects data (exact content per your instruction)
const PROJECTS = [
  {
    title: "E-Commerce Application — Spring Boot, MySQL, Thymeleaf",
    screenshot: "assets/project-ecom.jpg",
    description: "Features: User registration, product browsing, cart, order placement, secure authentication, transaction management, backend APIs.",
    github: "https://github.com/Varadharajan579/e-commerce-app",
    demoLine: "One-line demo: Shop product catalog, add to cart, create order."
  },
  {
    title: "JobConnect — Spring Boot, MySQL, Thymeleaf",
    screenshot: "assets/project-jobconnect.jpg",
    description: "Features: Job portal for seekers and employers, role-based access control, dynamic UI, backend API integration.",
    github: "https://github.com/Varadharajan579/jobconnect",
    demoLine: "One-line demo: Employers post jobs; seekers search and apply."
  },
  {
    title: "Movie Ticket Booking System — Spring Boot, MySQL, Thymeleaf",
    screenshot: "assets/project-movie.jpg",
    description: "Features: Browse movies, select seats, book tickets, user registration, booking management, real-time updates.",
    github: "https://github.com/Varadharajan579/movie-ticket-booking",
    demoLine: "One-line demo: Select movie, choose seats, confirm booking."
  }
];

// ---------- Helpers ----------
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

// ---------- Typing animation (respect reduced motion) ----------
(function typing() {
  const container = $('#typed');
  if (!container) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    container.textContent = TYPING_LIST.join(' • ');
    return;
  }
  let i = 0, j = 0, deleting = false;
  function tick() {
    const word = TYPING_LIST[i];
    if (!deleting) {
      container.textContent = word.slice(0, j + 1);
      j++;
      if (j === word.length) {
        deleting = true;
        setTimeout(tick, 1500);
        return;
      }
    } else {
      container.textContent = word.slice(0, j - 1);
      j--;
      if (j === 0) {
        deleting = false;
        i = (i + 1) % TYPING_LIST.length;
      }
    }
    setTimeout(tick, deleting ? 55 : 100);
  }
  tick();
})();

// ---------- Render Skills (data-driven) ----------
(function renderSkills() {
  const list = $('#skills-list');
  if (!list) return;
  list.innerHTML = '';
  Object.keys(SKILLS).forEach(group => {
    const card = document.createElement('div');
    card.className = 'skill-card';
    card.innerHTML = `<h3>${group}</h3>`;
    const ul = document.createElement('ul');
    ul.className = 'skill-list';
    SKILLS[group].forEach(s => {
      const li = document.createElement('li');
      li.className = 'skill-row';
      const iconWrap = document.createElement('div');
      iconWrap.className = 'skill-icon';
      if (s.icon) {
        const img = document.createElement('img');
        img.src = s.icon;
        img.alt = s.name + ' icon';
        img.style.width = '100%';
        img.style.height = '100%';
        iconWrap.appendChild(img);
      } else {
        iconWrap.textContent = s.name.charAt(0);
      }
      li.appendChild(iconWrap);
      const txt = document.createElement('div');
      txt.innerHTML = `<strong>${s.name}</strong>`;
      if (s.value) {
        const prog = document.createElement('div');
        prog.className = 'progress';
        const bar = document.createElement('span');
        bar.style.width = '0%';
        prog.appendChild(bar);
        txt.appendChild(prog);
        setTimeout(() => bar.style.width = s.value + '%', 200);
      }
      li.appendChild(txt);
      ul.appendChild(li);
    });
    card.appendChild(ul);
    list.appendChild(card);
  });
})();

// ---------- Render Projects (data-driven) ----------
(function renderProjects() {
  const grid = $('#projects-grid');
  if (!grid) return;
  grid.innerHTML = '';
  PROJECTS.forEach(p => {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.innerHTML = `
      <div class="project-header">
        <div class="project-title">${p.title}</div>
        <div class="project-links"><a href="${p.github}" target="_blank" rel="noopener">Repo</a></div>
      </div>
      <img src="${p.screenshot}" alt="${p.title} screenshot" class="project-screenshot">
      <div class="project-content">
        <p class="project-description">${p.description}</p>
        <div class="project-tech">${['Spring Boot','MySQL','Thymeleaf','Java'].map(t=>`<span class="tech-tag">${t}</span>`).join('')}</div>
        <p class="muted" style="margin-top:8px;font-weight:700">${p.demoLine}</p>
      </div>
    `;
    grid.appendChild(card);
  });
})();

// ---------- Certificate Carousel ----------
// This version loads (in order):
// 1) Drive image (ID 1x_uAi... if available), 2) Drive profile image (ID 1yn2...), 3) Google Doc exported as PDF (ID 1Z7y...),
// then local fallbacks assets/certificates/certificate1..6.jpg
(function certificates() {
  const wrapper = $('#cert-carousel');
  if (!wrapper) return;
  wrapper.innerHTML = '';

  // Drive image IDs you gave earlier (two images)
  const driveImageIds = [
    '1x_uAiMOzAGiSnhScYGnTf4u4yQjniPgt', // earlier certificate link (if public)
    '1yn2R7RkZFlSh1ZYcCcBzRczU6cLKVKsU'  // profile/photo link you provided
  ];

  // Google Doc id (export as PDF)
  const docId = '1Z7yD4XGpcDlWKB26P1e2770tHQM8FaoVM7yCnwipSYM';

  // Helper to add an image slide by URL
  function addImageSlide(url, altText) {
    const slide = document.createElement('div');
    slide.className = 'cert-slide';
    const img = document.createElement('img');
    img.src = url;
    img.alt = altText || 'Certificate image';
    img.loading = 'lazy';
    img.onerror = function() {
      // replace with friendly placeholder
      const placeholder = document.createElement('div');
      placeholder.style.minHeight = '160px';
      placeholder.style.display = 'flex';
      placeholder.style.alignItems = 'center';
      placeholder.style.justifyContent = 'center';
      placeholder.style.background = 'linear-gradient(135deg,#f1f5f9,#e2e8f0)';
      placeholder.style.color = '#0f172a';
      placeholder.style.padding = '12px';
      placeholder.textContent = 'Certificate image not available — check sharing settings';
      if (img.parentNode) img.parentNode.replaceChild(placeholder, img);
    };
    slide.appendChild(img);
    wrapper.appendChild(slide);
    return slide;
  }

  // 1) Add drive images (if public)
  driveImageIds.forEach(id => {
    const url = `https://drive.google.com/uc?export=view&id=${id}`;
    addImageSlide(url, 'Certificate from Google Drive');
  });

  // 2) Add Google Doc exported as PDF embedded
  (function addDocPdf() {
    const slide = document.createElement('div');
    slide.className = 'cert-slide';
    slide.style.minHeight = '180px';
    const iframe = document.createElement('iframe');
    iframe.src = `https://docs.google.com/document/d/${docId}/export?format=pdf`;
    iframe.title = 'Certificate Document (PDF)';
    iframe.style.width = '100%';
    iframe.style.height = '320px';
    iframe.style.border = '0';
    iframe.loading = 'lazy';
    iframe.onerror = function() {
      const linkBox = document.createElement('div');
      linkBox.style.padding = '12px';
      linkBox.style.background = 'linear-gradient(135deg,#fff,#f3f4f6)';
      linkBox.innerHTML = `<p>Cannot display document inline (permission blocked). <a href="https://docs.google.com/document/d/${docId}/view" target="_blank" rel="noopener">Open certificate on Google Docs</a></p>`;
      if (iframe.parentNode) iframe.parentNode.replaceChild(linkBox, iframe);
    };
    slide.appendChild(iframe);
    wrapper.appendChild(slide);
  })();

  // 3) Local fallback images (certificate1..6)
  for (let i = 1; i <= 6; i++) {
    const src = `assets/certificates/certificate${i}.jpg`;
    const slide = document.createElement('div');
    slide.className = 'cert-slide';
    const img = document.createElement('img');
    img.src = src;
    img.alt = `Certificate ${i}`;
    img.loading = 'lazy';
    img.onerror = function() {
      this.style.display = 'none';
    };
    slide.appendChild(img);
    wrapper.appendChild(slide);
  }

  // Navigation and show logic
  const slides = Array.from(wrapper.querySelectorAll('.cert-slide'));
  if (slides.length === 0) return;
  let current = 0;

  function show(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    current = index;
    wrapper.scrollTo({
      left: slides[current].offsetLeft - wrapper.offsetLeft,
      behavior: 'smooth'
    });
    slides.forEach((s, idx) => s.setAttribute('aria-hidden', idx === current ? 'false' : 'true'));
  }

  const prevBtn = document.getElementById('cert-prev');
  const nextBtn = document.getElementById('cert-next');
  prevBtn && prevBtn.addEventListener('click', () => show(current - 1));
  nextBtn && nextBtn.addEventListener('click', () => show(current + 1));

  // keyboard navigation
  wrapper.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });

  // focusable
  wrapper.setAttribute('tabindex', '0');

  // show first slide
  setTimeout(() => show(0), 200);
})();

// ---------- Profile image override (optional) ----------
// If you want to load a Drive image into the profile spots, uncomment/modify here.
// Example profile Drive ID (from your link): '1yn2R7RkZFlSh1ZYcCcBzRczU6cLKVKsU'
// The script will set the profile img src to Drive URL if it is desired.
(function maybeLoadDriveProfile() {
  // Uncomment and set id if you want the profile image loaded from Drive:
  const profileDriveId = '1yn2R7RkZFlSh1ZYcCcBzRczU6cLKVKsU'; // provided by you
  if (!profileDriveId) return;
  const url = `https://drive.google.com/uc?export=view&id=${profileDriveId}`;
  const profileImg = document.getElementById('profile-img');
  const aboutPhoto = document.getElementById('about-photo');
  if (profileImg) profileImg.src = url;
  if (aboutPhoto) aboutPhoto.src = url;
})();

// ---------- Theme toggle (persisted) ----------
(function themeToggle() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  const stored = localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', stored);
  btn.textContent = stored === 'dark' ? '☀️' : '🌙';
  btn.addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    btn.textContent = next === 'dark' ? '☀️' : '🌙';
  });
})();

// ---------- Mobile nav toggle ----------
(function navToggle() {
  const btn = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');
  if (!btn || !links) return;
  btn.addEventListener('click', ()=> {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    links.classList.toggle('active');
  });
})();

// ---------- Smooth scroll and active link highlight ----------
(function scrollSpy() {
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  function highlight() {
    const fromTop = window.scrollY + 120;
    navLinks.forEach(link => {
      const section = document.querySelector(link.getAttribute('href'));
      if (!section) return;
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      link.classList.toggle('active', fromTop >= top && fromTop < bottom);
    });
  }
  window.addEventListener('scroll', highlight, { passive: true });
  document.addEventListener('DOMContentLoaded', highlight);

  navLinks.forEach(l => {
    l.addEventListener('click', (e) => {
      e.preventDefault();
      const t = document.querySelector(l.getAttribute('href'));
      if(t) t.scrollIntoView({ behavior: 'smooth' });
    });
  });
})();

// ---------- Contact form (static demo) ----------
(function contactForm(){
  const form = document.getElementById('contactForm');
  if(!form) return;
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();
    if(!name || !email || !subject || !message){ alert('Please fill all fields'); return; }
    alert('Message collected locally (demo). To receive messages, set form action to a server endpoint or Formspree/Netlify.');
    form.reset();
  });
})();

// ---------- Footer year ----------
document.getElementById('year') && (document.getElementById('year').textContent = new Date().getFullYear());
