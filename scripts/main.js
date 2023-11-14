// Adding sticky to the header when user scrolls
// Created by matt
const nav = document.getElementsByTagName('header')[0];
const main = document.getElementsByTagName('main')[0];
const scrollDetect = () => {
  const mTop = main.getBoundingClientRect().top + 10;
  nav.classList[(mTop <= 0) ? 'add' : 'remove']('sticky');
};

// Add a 'scroll to top' button
// Eaten from https://www.w3schools.com/howto/howto_js_scroll_to_top.asp
// Get the button
const scrollToTop = document.getElementById('scrollToTop');

// Check if theres a id with scrollToTop
if (scrollToTop) {
  // When the user scrolls down 400px(?) from the top of the document, show the
  // button
  window.addEventListener('scroll', showButton);

  function showButton() {
    if (document.body.scrollTop > 400 ||
        document.documentElement.scrollTop > 400) {
      scrollToTop.style.display = 'block';
    } else {
      scrollToTop.style.display = 'none';
    }
  }

  // When the user clicks on the button, scroll to the top of the document
  scrollToTop.addEventListener('click', function() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });
}

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