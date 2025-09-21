// NAV: hamburger toggle
const htmlEl = document.documentElement;
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  const expanded = hamburger.getAttribute('aria-expanded') === 'true';
  hamburger.setAttribute('aria-expanded', String(!expanded));
  // toggle a class on <html> to control mobile nav
  htmlEl.classList.toggle('nav-open');
});

// close mobile nav when a link is clicked
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    htmlEl.classList.remove('nav-open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

/* ---------- REVEAL ON SCROLL (enter & leave) ---------- */
/* Use IntersectionObserver to add/remove 'in-view' class */
const reveals = document.querySelectorAll('.reveal');

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    } else {
      // remove so animation plays again when user scrolls back
      entry.target.classList.remove('in-view');
    }
  });
}, {
  threshold: 0.18
});

reveals.forEach(r => io.observe(r));

/* ---------- REVIEW SLIDER ---------- */
const reviews = Array.from(document.querySelectorAll('.review-card'));
let currentReview = 0;
const nextBtn = document.getElementById('rev-next');
const prevBtn = document.getElementById('rev-prev');

function showReview(index){
  reviews.forEach((r,i) => r.classList.toggle('active', i === index));
}
showReview(currentReview);

nextBtn.addEventListener('click', () => {
  currentReview = (currentReview + 1) % reviews.length;
  showReview(currentReview);
});
prevBtn.addEventListener('click', () => {
  currentReview = (currentReview - 1 + reviews.length) % reviews.length;
  showReview(currentReview);
});

// auto-play
let reviewInterval = setInterval(() => {
  currentReview = (currentReview + 1) % reviews.length;
  showReview(currentReview);
}, 4500);

// pause on hover
const reviewWrap = document.querySelector('.review-wrap');
reviewWrap.addEventListener('mouseenter', () => clearInterval(reviewInterval));
reviewWrap.addEventListener('mouseleave', () => {
  reviewInterval = setInterval(() => {
    currentReview = (currentReview + 1) % reviews.length;
    showReview(currentReview);
  }, 4500);
});

/* ---------- SIMPLE CONTACT FORM HANDLER (NO SERVER) ---------- */
const form = document.getElementById('contact-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  // quick local UI feedback
  const btn = form.querySelector('button');
  btn.disabled = true;
  btn.textContent = 'Sending...';

  // simulate sending
  setTimeout(() => {
    btn.disabled = false;
    btn.textContent = 'Send Message';
    alert('Thanks! Message simulated as sent. (Add your backend or email service later.)');
    form.reset();
  }, 900);
});

/* ---------- YEAR in footer ---------- */
document.getElementById('nowYear').textContent = new Date().getFullYear();