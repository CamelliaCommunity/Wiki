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

// Add the sticky class to header when user scrolls
// Created by matt
const scrollDetect = () => {
  header.classList.toggle('sticky', main.getBoundingClientRect().top <= 0);

  // Check if user has scrolled a certain amount of pixels to the top
  // Used to be 200 then 198
  if (window.scrollY <= 60) {
    header.classList.remove('sticky');
  }
};

window.addEventListener('scroll', scrollDetect);

// Select all h2 elements within the cardContents class and apply the cardHeader
// class
const h2Elements = document.querySelectorAll('.cardContents h2');
h2Elements.forEach((h2) => {
  const div = document.createElement('div');
  div.classList.add('cardHeader');
  h2.parentNode.insertBefore(div, h2);
  div.appendChild(h2);
});


// Look for images within a "p" element, give them a figure and figcaption
// element. the alt text will display as figcaption
// We will also look for images within figures, if the image is wider than
// 370 pixels, it will remove the float and margins.
const images = document.querySelectorAll('p > img');

if (images) {
  images.forEach((image) => {
    const figure = document.createElement('figure');
    const figcaption = document.createElement('figcaption');
    figcaption.textContent = image.alt;
    figure.appendChild(image.cloneNode(true));
    figure.appendChild(figcaption);

    // Event listener so this runs *after* the page is loaded, a bit hacky but
    // oh well
    window.addEventListener('load', () => {
      figure.classList.add(image.width > 370 ? 'centerImage' : 'floatImage');
    });

    image.replaceWith(figure);
  });
}

// Test code
// const IMAGES = document.querySelectorAll('img');

// for (let i = 0; i < IMAGES.length; i++) {
//   let imgSrc = IMAGES[i].getAttribute('src');
//   imgSrc = imgSrc.slice(0, -8)

//   console.log(imgSrc);
// }

// function makeSrcset(imgSrc) {
//   let markup = [];
// }