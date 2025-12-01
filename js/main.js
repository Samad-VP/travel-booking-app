// Card Images Optimization
const cardImages = document.querySelectorAll('.card-img');
cardImages.forEach((img, index) => {
  // Ensure image is visible by default
  img.style.opacity = '1';
  img.style.display = 'block';
  
  // Handle image loading
  img.addEventListener('load', () => {
    img.setAttribute('data-loaded', 'true');
    img.style.opacity = '1';
    console.log(`Card image ${index + 1} loaded successfully`);
  });
  
  // Handle image error with fallback
  img.addEventListener('error', () => {
    console.warn(`Card image ${index + 1} failed to load from ${img.src}`);
    // Create gradient backgrounds for each destination
    const gradients = [
      'linear-gradient(135deg, #0b6d91 0%, #1a9cc9 100%)', // Maldives - ocean blue
      'linear-gradient(135deg, #fff5e6 0%, #e8f4f8 100%)', // Swiss Alps - snow white
      'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)'  // Kyoto - warm orange/sunset
    ];
    img.parentElement.style.background = gradients[index] || gradients[0];
    img.style.opacity = '0.3';
  });
  
  // Set initial state
  img.setAttribute('data-loaded', 'false');
});



const heroImg = document.querySelector('.hero-img');
if (heroImg) {
  // Set loading attribute for better performance
  heroImg.loading = 'eager';
  
  // Handle image loading
  heroImg.addEventListener('load', () => {
    heroImg.setAttribute('data-loaded', 'true');
  });
  
  // Handle image error with fallback
  heroImg.addEventListener('error', () => {
    console.warn('Hero image failed to load');
    // Add a background color as fallback
    document.querySelector('.hero').style.background = 'linear-gradient(135deg, #0b6d91 0%, #1a9cc9 100%)';
  });
}

// Hamburger Menu Toggle & Auth Buttons Management
const hamburger = document.getElementById('hamburger');
const mainNav = document.getElementById('main-nav');
const authButtons = document.querySelector('.auth-buttons');
const navLinks = mainNav.querySelectorAll('a');

// Toggle menu on hamburger click
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mainNav.classList.toggle('active');
  hamburger.setAttribute('aria-expanded', hamburger.classList.contains('active'));
  
  // Move auth buttons into nav on mobile when menu opens
  if (window.innerWidth <= 768) {
    if (mainNav.classList.contains('active')) {
      if (!mainNav.contains(authButtons)) {
        mainNav.appendChild(authButtons);
      }
    }
  }
});

// Close menu when a link is clicked
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mainNav.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// Handle auth button clicks in mobile menu
const authBtns = document.querySelectorAll('.auth-btn');
authBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Only close menu if clicked from mobile menu
    if (mainNav.contains(btn)) {
      hamburger.classList.remove('active');
      mainNav.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  const header = document.querySelector('.site-header');
  if (!header.contains(e.target) && mainNav.classList.contains('active')) {
    hamburger.classList.remove('active');
    mainNav.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  }
});

// Contact Form Validation & Message
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Basic client-side validation
    if (name.length < 2) {
      alert('Please enter a valid name (at least 2 characters)');
      return;
    }
    if (!email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }
    if (message.length < 10) {
      alert('Message must be at least 10 characters long');
      return;
    }
    
    // Show success message
    alert(`Thank you, ${name}! We've received your message and will get back to you soon.`);
    
    // Reset form
    contactForm.reset();
  });
}

// Update footer year
const yearElement = document.getElementById('year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Smooth scroll behavior for anchor links
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
