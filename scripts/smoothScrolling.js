// Eaten from https://codepen.io/bramus/pen/ExaEqMJ
// Code is a bit jank after testing. I'll prob find another method myself later

window.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    // For each loop (array-like thing)
    entries.forEach((sectionEntry) => {
      const id = sectionEntry.target.getAttribute('id');

      if (sectionEntry.intersectionRatio > 0) {
        document.querySelector(`nav li a[href="#${id}"]`)
            .parentElement.classList.add('active');
      } else {
        document.querySelector(`nav li a[href="#${id}"]`)
            .parentElement.classList.remove('active');
      }
    });
  });

  // Track all sections that have an id applied
  document.querySelectorAll('section[id]').forEach((section) => {
    observer.observe(section);
  });
});
