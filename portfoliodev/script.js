// JavaScript for Portfolio Website

// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const themeToggle = document.getElementById('theme-icon');
const typingText = document.getElementById('typing-text');
const contactForm = document.getElementById('contactForm');

// Typing Animation
const skills = ['Java', 'Spring Boot', 'MySQL', 'Microservices', 'Thymeleaf', 'Docker'];
let currentSkillIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeWriter() {
    const currentSkill = skills[currentSkillIndex];
    
    if (isDeleting) {
        typingText.textContent = currentSkill.substring(0, currentCharIndex - 1);
        currentCharIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentSkill.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && currentCharIndex === currentSkill.length) {
        typingSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentSkillIndex = (currentSkillIndex + 1) % skills.length;
        typingSpeed = 500; // Pause before next word
    }
    
    setTimeout(typeWriter, typingSpeed);
}

// Theme Toggle
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update theme icon
    themeToggle.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Load saved theme
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Mobile Navigation Toggle
function toggleMobileNav() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
}

// Smooth Scrolling for Navigation Links
function smoothScroll(targetId) {
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
        const offsetTop = targetElement.offsetTop - 70; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Scroll Animations
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Navbar Background on Scroll
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        if (document.documentElement.getAttribute('data-theme') === 'dark') {
            navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        }
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        if (document.documentElement.getAttribute('data-theme') === 'dark') {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        }
    }
}

// Contact Form Handling
function handleContactForm(event) {
    event.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Basic validation
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
    contactForm.reset();
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Add scroll animations to elements
function addScrollAnimations() {
    const sections = document.querySelectorAll('section');
    const skillCategories = document.querySelectorAll('.skill-category');
    const projectCards = document.querySelectorAll('.project-card');
    const contactItems = document.querySelectorAll('.contact-item');
    
    sections.forEach((section, index) => {
        section.classList.add('fade-in');
    });
    
    skillCategories.forEach((category, index) => {
        category.classList.add('slide-in-left');
        category.style.transitionDelay = `${index * 0.1}s`;
    });
    
    projectCards.forEach((card, index) => {
        card.classList.add('slide-in-right');
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    contactItems.forEach((item, index) => {
        item.classList.add('fade-in');
        item.style.transitionDelay = `${index * 0.1}s`;
    });
}

// Intersection Observer for animations
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Parallax effect for hero section
function handleParallax() {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
}

// Active navigation link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Particle system for hero section
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particleCount = 50;
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            pointer-events: none;
            animation: float ${3 + Math.random() * 4}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 2}s;
        `;
        hero.appendChild(particle);
        particles.push(particle);
    }
}

// Add floating animation keyframes
function addParticleAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }
        
        .particle {
            animation: float 6s linear infinite;
        }
    `;
    document.head.appendChild(style);
}

// Enhanced scroll animations
function addEnhancedScrollAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        .skill-item {
            animation: slideInFromLeft 0.6s ease forwards;
            opacity: 0;
            transform: translateX(-50px);
        }
        
        .skill-item:nth-child(1) { animation-delay: 0.1s; }
        .skill-item:nth-child(2) { animation-delay: 0.2s; }
        .skill-item:nth-child(3) { animation-delay: 0.3s; }
        .skill-item:nth-child(4) { animation-delay: 0.4s; }
        
        @keyframes slideInFromLeft {
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .project-card {
            animation: slideInFromBottom 0.8s ease forwards;
            opacity: 0;
            transform: translateY(50px);
        }
        
        .project-card:nth-child(1) { animation-delay: 0.1s; }
        .project-card:nth-child(2) { animation-delay: 0.3s; }
        .project-card:nth-child(3) { animation-delay: 0.5s; }
        
        @keyframes slideInFromBottom {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Start typing animation
    typeWriter();
    
    // Load saved theme
    loadTheme();
    
    // Add scroll animations
    addScrollAnimations();
    
    // Add enhanced animations
    addEnhancedScrollAnimations();
    
    // Create particles
    createParticles();
    addParticleAnimation();
    
    // Setup intersection observer
    setupIntersectionObserver();
    
    // Event listeners
    navToggle.addEventListener('click', toggleMobileNav);
    themeToggle.addEventListener('click', toggleTheme);
    contactForm.addEventListener('submit', handleContactForm);
    
    // Navigation link clicks
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            smoothScroll(targetId);
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                toggleMobileNav();
            }
        });
    });
    
    // Scroll events
    window.addEventListener('scroll', function() {
        handleScrollAnimations();
        handleNavbarScroll();
        handleParallax();
        updateActiveNavLink();
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
});

// Add CSS for active nav link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
`;
document.head.appendChild(style);
