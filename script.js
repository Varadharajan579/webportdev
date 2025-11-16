// script.js - portfolio behavior (client-side only)

// ---------- Config / Data (edit here if you need to change text/screenshots) ----------
const TYPING_LIST = ['Java','Spring Boot','MySQL','Microservices','Thymeleaf','Docker']; // exact order required

// Skills: only those from resume (exact names)
const SKILLS = {
  "Languages": [
    {name: "Java", icon: "assets/icons/java.svg", value: 90},
    {name: "SQL", icon: "assets/icons/sql.svg", value: 75}
  ],
  "Frameworks & Tools": [
    {name: "Spring Boot", icon: "assets/icons/springboot.svg", value: 85},
    {name: "Maven", icon: "assets/icons/maven.svg", value: 70},
    {name: "Git", icon: "assets/icons/git.svg", value: 80},
    {name: "Thymeleaf", icon: "assets/icons/thymeleaf.svg", value: 70}
  ],
  "Databases": [
    {name: "MySQL", icon: "assets/icons/mysql.svg", value: 80},
    {name: "RDBMS", icon: "assets/icons/rdbms.svg", value: 78}
  ],
  "Soft / Other Skills": [
    {name: "Teamwork"},
    {name: "Adaptability"},
    {name: "Problem Solving"},
    {name: "Creativity"}
  ]
};

// Projects (exact content copied from your instructions)
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

// ---------- Utility / small components ----------
const el = (sel) => document.querySelector(sel);
const els = (sel) => Array.from(document.querySelectorAll(sel));

/* Typing animation (simple, reduced-motion aware) */
(function typingAnimation(){
  const container = el('#typed');
  if(!container) return;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(prefersReduced){
    container.textContent = TYPING_LIST.join(' • ');
    return;
  }
  let list = TYPING_LIST;
  let i = 0, j = 0, deleting = false;
  const tick = () => {
    const word = list[i];
    if(!deleting){
      container.textContent = word.slice(0, j+1);
      j++;
      if(j === word.length){
        deleting = true;
        setTimeout(tick, 1600);
        return;
      }
    } else {
      container.textContent = word.slice(0, j-1);
      j--;
      if(j === 0){
        deleting = false;
        i = (i+1) % list.length;
      }
    }
    setTimeout(tick, deleting ? 60 : 120);
  };
  tick();
})();

/* Render skills into #skills-list */
(function renderSkills(){
  const wrapper = el('#skills-list');
  if(!wrapper) return;
  wrapper.innerHTML = '';
  Object.keys(SKILLS).forEach(group => {
    const card = document.createElement('div');
    card.className = 'skill-card';
    const h3 = document.createElement('h3'); h3.textContent = group;
    card.appendChild(h3);
    const ul = document.createElement('ul'); ul.className = 'skill-list';
    SKILLS[group].forEach(s => {
      const li = document.createElement('li');
      li.className = 'skill-row';
      const icon = document.createElement('div');
      icon.className = 'skill-icon';
      if(s.icon){
        const img = document.createElement('img');
        img.src = s.icon;
        img.alt = s.name + ' icon';
        img.style.width = '100%';
        img.style.height = '100%';
        icon.appendChild(img);
      } else {
        icon.textContent = s.name.charAt(0);
        icon.style.display='flex'; icon.style.alignItems='center'; icon.style.justifyContent='center';
        icon.style.background='#eef'; icon.style.borderRadius='8px';
      }
      li.appendChild(icon);
      const span = document.createElement('div'); span.style.flex='1';
      span.innerHTML = `<strong>${s.name}</strong>`;
      if(typeof s.value === 'number'){
        const prog = document.createElement('div'); prog.className='progress';
        const bar = document.createElement('span'); bar.style.width='0%';
        prog.appendChild(bar);
        span.appendChild(prog);
        // animate after small delay
        setTimeout(()=> bar.style.width = s.value + '%', 200);
      }
      li.appendChild(span);
      ul.appendChild(li);
    });
    card.appendChild(ul);
    wrapper.appendChild(card);
  });
})();

/* Render projects (data-driven) */
(function renderProjects(){
  const container = el('#projects-grid');
  if(!container) return;
  container.innerHTML = '';
  PROJECTS.forEach((p, idx) => {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.innerHTML = `
      <div class="project-header">
        <div class="project-title">${p.title}</div>
        <div class="project-links">
          <a href="${p.github}" target="_blank" rel="noopener" aria-label="GitHub link">Repo</a>
        </div>
      </div>
      <img src="${p.screenshot}" alt="${p.title} screenshot" class="project-screenshot" />
      <div class="project-content">
        <p class="project-description">${p.description}</p>
        <div class="project-tech">${['Spring Boot','MySQL','Thymeleaf','Java'].map(t => `<span class="tech-tag">${t}</span>`).join('')}</div>
        <p class="muted" style="margin-top:10px;font-weight:700">${p.demoLine}</p>
      </div>
    `;
    container.appendChild(card);
  });
})();

/* Certificates carousel: load images from assets/certificates/ named certificate1.jpg, certificate2.jpg... */
(function setupCertificates(){
  const wrapper = el('#cert-carousel');
  if(!wrapper) return;
  const images = [];
  for(let i=1;i<=6;i++){
    const path = `assets/certificates/certificate${i}.jpg`;
    // we cannot check existence without network access — just create <img> tags and let user replace files
    const img = document.createElement('img');
    img.src = path;
    img.alt = `Certificate ${i}`;
    wrapper.appendChild(img);
  }
  // If user wants a real carousel: replace with a small slider plugin or simple prev/next logic.
})();

/* Theme toggle persisted */
(function themeToggle(){
  const btn = document.getElementById('theme-toggle');
  if(!btn) return;
  const saved = localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', saved);
  btn.textContent = saved === 'dark' ? '☀️' : '🌙';
  btn.addEventListener('click', ()=> {
    const cur = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    btn.textContent = next === 'dark' ? '☀️' : '🌙';
  });
})();

/* Nav toggle for mobile */
(function navToggle(){
  const btn = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');
  if(!btn || !links) return;
  btn.addEventListener('click', ()=> {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    links.classList.toggle('active');
  });
})();

/* Smooth scroll & active nav link highlighting */
(function scrollSpy(){
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  function onScroll(){
    const sections = navLinks.map(a => document.querySelector(a.getAttribute('href')));
    let active = null;
    sections.forEach((sec,i)=>{
      if(!sec) return;
      const top = sec.getBoundingClientRect().top;
      if(top <= 120) active = i;
    });
    navLinks.forEach((a,i)=> a.classList.toggle('active', i === active));
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  document.addEventListener('DOMContentLoaded', onScroll);
  // smooth scroll for clicks
  navLinks.forEach(a=>{
    a.addEventListener('click', (e)=>{
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if(target) target.scrollIntoView({behavior:'smooth',block:'start'});
    });
  });
})();

/* Contact form: client-side validation + friendly message (static form) */
(function contactForm(){
  const form = document.getElementById('contactForm');
  if(!form) return;
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get('name')?.trim();
    const email = data.get('email')?.trim();
    const subject = data.get('subject')?.trim();
    const message = data.get('message')?.trim();
    if(!name || !email || !subject || !message){
      alert('Please fill all fields.');
      return;
    }
    // static: show success message — replace with real endpoint in form action
    alert('Message captured. This is a static demo — replace form action with your endpoint to enable messages.');
    form.reset();
  });
})();

/* Small helpers */
document.getElementById('year') && (document.getElementById('year').textContent = new Date().getFullYear());
