const header = document.querySelector(".site-header");
const revealTargets = document.querySelectorAll(
  ".mission-grid article, .project-card, .education-card, .achievement-grid > *, .skills-grid article, .contact"
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
