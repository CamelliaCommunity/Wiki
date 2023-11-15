// Variable constants to be used throughout program
const header = document.querySelector('header');
const main = document.querySelector('main');
const scrollToTop = document.getElementById('scrollToTop');

// Eaten from https://www.w3schools.com/howto/howto_js_scroll_to_top.asp
// If scrollToTop element is found, run this code
if (scrollToTop) {
  // When the user scrolls down 400px(?) from the top of the document, show the
  // button

  scrollToTop.style.display = 'none';  // Fix button showing when page is loaded

  const showButton = () => {
    scrollToTop.style.display = (window.scrollY > 400) ? 'block' : 'none';
  };

  window.addEventListener('scroll', showButton);

  // When the user clicks on the button, scroll to the top of the page
  scrollToTop.addEventListener('click', () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  });
}

// Eaten from https://codepen.io/bramus/pen/ExaEqMJ
// Highlight of Contents wedge when user is in a new section of the page
// Combined pieces of code to display new sections and to highlight them
window.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('h2[id]');
  const wedgeItems = document.getElementById('wedgeItems');
  // Scroll to item
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((sectionEntry) => {
      const id = sectionEntry.target.getAttribute('id');
      const wedgeLink =
          document.querySelector(`nav li a[href="#${id}"]`).parentElement;
      if (sectionEntry.isIntersecting) {
        wedgeLink.classList.add('active');
      } else {
        wedgeLink.classList.remove('active');
      }
    });
  });

  // Display the sections in the content wedge
  sections.forEach(section => {
    const id = section.getAttribute('id');
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    link.href = `#${id}`;
    link.textContent = section.textContent;
    listItem.appendChild(link);
    wedgeItems.querySelector('ul').appendChild(listItem);

    const vertLine = document.createElement('div');
    vertLine.classList.add('vertLine');
    listItem.appendChild(vertLine);

    // Track all sections that have an id applied
    observer.observe(section);
  });
});

// Add the sticky class to header when user scrolls
// Created by matt
const scrollDetect = () => {
  header.classList.toggle('sticky', main.getBoundingClientRect().top <= 0);
};

window.addEventListener('scroll', scrollDetect);

// Test code
window.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('h2[id]');

  sections.forEach(section => {
    const id = section.getAttribute('id');
    console.log(id);
  });
});
