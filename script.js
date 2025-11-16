// script.js - improved visibility, certificate carousel, data-driven projects & skills

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
// Behavior: looks for images in assets/certificates/certificate1.jpg ... certificate6.jpg
(function certificates() {
  const wrapper = $('#cert-carousel');
  if (!wrapper) return;
  wrapper.innerHTML = '';
  const slides = [];
  // Try up to 6 images (user can add more named certificate1.jpg etc)
  for (let i = 1; i <= 6; i++) {
    const src = `assets/certificates/certificate${i}.jpg`;
    const slide = document.createElement('div');
    slide.className = 'cert-slide';
    const img = document.createElement('img');
    img.src = src;
    img.alt = `Certificate ${i}`;
    slide.appendChild(img);
    wrapper.appendChild(slide);
    slides.push(slide);
  }

  // If no images exist in the repo, browsers will show broken images.
  // We still provide prev/next controls and keyboard support.
  let current = 0;
  function show(index) {
    // clamp
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    current = index;
    // translate wrapper
    wrapper.scrollTo({
      left: slides[current].offsetLeft - wrapper.offsetLeft,
      behavior: 'smooth'
    });
  }

  const prevBtn = document.getElementById('cert-prev');
  const nextBtn = document.getElementById('cert-next');
  prevBtn && prevBtn.addEventListener('click', ()=> show(current - 1));
  nextBtn && nextBtn.addEventListener('click', ()=> show(current + 1));

  // keyboard navigation
  wrapper.addEventListener('keydown', (e)=> {
    if(e.key === 'ArrowLeft') show(current - 1);
    if(e.key === 'ArrowRight') show(current + 1);
  });

  // show first visible slide on load
  setTimeout(()=> show(0), 250);
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
