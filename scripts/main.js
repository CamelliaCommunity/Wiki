// Adding sticky to the header when user scrolls
// Created by matt
const nav = document.getElementsByTagName('header')[0];
const main = document.getElementsByTagName('main')[0];
const scrollDetect = () => {
  const mTop = main.getBoundingClientRect().top + 10;
  nav.classList[(mTop <= 0) ? 'add' : 'remove']('sticky');
};

// Eaten from https://codepen.io/bramus/pen/ExaEqMJ
// Code is a bit jank after testing. I'll prob find another method myself later
// This highlights sections of a document
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

  // for scroll detection for making nav sticky
  scrollDetect();
});
document.addEventListener('scroll', scrollDetect);