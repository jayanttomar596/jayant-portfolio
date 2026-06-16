const header = document.querySelector(".site-header");
const revealTargets = document.querySelectorAll(
  ".about-section, .mission-grid article, .project-card, .education-card, .achievement-grid > *, .skills-grid article, .contact"
);

const updateHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 18);
};

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();
revealTargets.forEach((target) => revealObserver.observe(target));

// -- Interactive mouse glow --
const mouseGlow = document.createElement('div');
mouseGlow.className = 'mouse-glow';
document.body.appendChild(mouseGlow);

let gx = -9999, gy = -9999;
let tx = gx, ty = gy;
const lerp = (a, b, n) => a + (b - a) * n;

window.addEventListener('mousemove', (e) => {
  tx = e.clientX;
  ty = e.clientY;
});

function animateGlow() {
  gx = lerp(gx, tx, 0.14);
  gy = lerp(gy, ty, 0.14);
  if (gx > -9000 && gy > -9000) {
    mouseGlow.style.transform = `translate3d(${gx - 210}px, ${gy - 210}px, 0)`;
  }
  requestAnimationFrame(animateGlow);
}
requestAnimationFrame(animateGlow);

// -- Active nav tracking (click + scroll) --
const navLinks = Array.from(document.querySelectorAll('nav a.nav-link'));
const sections = Array.from(document.querySelectorAll('main[id], section[id]'));

navLinks.forEach((link) => {
  link.addEventListener('click', (ev) => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      ev.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        navLinks.forEach((l) => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id ? `#${entry.target.id}` : null;
        if (!id) return;
        navLinks.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === id));
      }
    });
  },
  { threshold: 0.5 }
);

sections.forEach((s) => sectionObserver.observe(s));
