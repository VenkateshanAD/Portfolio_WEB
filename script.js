// ===== LOADING SCREEN =====
window.addEventListener('load', () => {
  const loading = document.getElementById('loading');
  loading.classList.add('hide');
  setTimeout(() => { loading.style.display = 'none'; }, 500);
});

// ===== TYPING EFFECT =====
const typedStrings = [
  'MCA Student',
  'Full Stack Developer',
  'MERN Stack Developer',
  'UI Designer'
];

let stringIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingText = document.querySelector('.typing-text');
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 2000;

function typeEffect() {
  const current = typedStrings[stringIndex];
  if (!isDeleting) {
    typingText.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeEffect, pauseTime);
      return;
    }
    setTimeout(typeEffect, typingSpeed);
  } else {
    typingText.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      stringIndex = (stringIndex + 1) % typedStrings.length;
      setTimeout(typeEffect, 300);
      return;
    }
    setTimeout(typeEffect, deletingSpeed);
  }
}

typeEffect();

// ===== NAVBAR =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ===== NAVBAR SHADOW ON SCROLL =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
  } else {
    navbar.style.boxShadow = '0 1px 10px rgba(0,0,0,0.05)';
  }
});

// ===== SCROLL TO TOP BUTTON =====
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== RIPPLE BUTTON EFFECT =====
document.querySelectorAll('.ripple-btn').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// ===== SCROLL REVEAL =====
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach(el => {
    const windowHeight = window.innerHeight;
    const revealTop = el.getBoundingClientRect().top;
    const revealPoint = 100;
    if (revealTop < windowHeight - revealPoint) {
      el.classList.add('active');
    }
  });
}

// Add reveal class to section titles and subtitles
document.querySelectorAll('.section-title, .section-subtitle').forEach(el => {
  el.classList.add('reveal');
});

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ===== ANIMATED COUNTERS =====
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const increment = target / 60;
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.ceil(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };
    updateCounter();
  });
}

// Trigger counters when about section is visible
const aboutSection = document.getElementById('about');
let countersAnimated = false;

function checkCounters() {
  if (countersAnimated) return;
  const rect = aboutSection.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100) {
    animateCounters();
    countersAnimated = true;
  }
}

window.addEventListener('scroll', checkCounters);
window.addEventListener('load', checkCounters);

// ===== TIMELINE ITEMS: ANIMATE ON SCROLL =====
const timelineItems = document.querySelectorAll('.timeline-item');
const certCards = document.querySelectorAll('.cert-card');

function animateTimeline() {
  timelineItems.forEach(item => {
    const rect = item.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      item.classList.add('show');
    }
  });
}

function animateCertCards() {
  certCards.forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      card.classList.add('show');
    }
  });
}

function onScrollAnimations() {
  animateTimeline();
  animateCertCards();
  revealOnScroll();
}

window.addEventListener('scroll', onScrollAnimations);
window.addEventListener('load', onScrollAnimations);

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// ===== PARALLAX SHAPES IN HERO =====
document.addEventListener('mousemove', (e) => {
  const shapes = document.querySelectorAll('.shape');
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  shapes.forEach((shape, index) => {
    const speed = 20 * (index + 1);
    const moveX = (x - 0.5) * speed;
    const moveY = (y - 0.5) * speed;
    shape.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
});