// Variable constants to be used throughout program
const header = document.querySelector('header');
const main = document.querySelector('main');
const scrollToTop = document.getElementById('scrollToTop');
const navSidebar = document.getElementById('navSidebar');
const hamburgerBtn = document.getElementById('hamburgerBtn');
const sidebarX = document.getElementById('sidebarX');

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

// Add the sticky class to header when user scrolls (also adds to the sidebar,
// remove later?)
// Created by matt
const scrollDetect = () => {
  header.classList.toggle('sticky', main.getBoundingClientRect().top <= 0);
  navSidebar.classList.toggle('sticky', main.getBoundingClientRect().top <= 0);

  // Check if user has scrolled a certain amount of pixels to the top
  // Used to be 200 then 198... not anymore, its 222 !!!
  if (window.scrollY <= 222) {
    header.classList.remove('sticky');
    navSidebar.classList.remove('sticky');
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

// searchbar code for hiding and showing search container
// made by papertek and reinoblassed
const searchInput = document.querySelector('#search-input');
const resultsFixstuff = document.getElementById(
    'results-fixstuff');  // Get the results-fixstuff element by its id
const resultsContainer = document.getElementById('results-container');

searchInput.addEventListener('keyup', () => {
  // Get all li elements inside the results-container
  const resultListedItems = resultsContainer.innerHTML;

  // Check if there are any li elements
  if (!resultListedItems == '') {
    // If there are li elements, show the results-fixstuff element
    resultsFixstuff.style.display = 'flex';
  } else {
    // If there are no li elements, hide the results-fixstuff element
    resultsFixstuff.style.display = 'none';
  }
});

// better ux(?) for the search container
// made by papertek

/* this is pretty jank, i know. one issue im having is when the user still
 * clicks results-fixstuff, the container still hides. i have tried other
 * methods but i think this one is the one that works best. if theres any other
 * contributor willing to fix this please do lol */

// when a user clicks the searchbar it will display the search container
searchInput.addEventListener('click', () => {
  resultsFixstuff.style.display = 'flex';
});

// add event listener to hide results-fixstuff when search input loses focus
searchInput.addEventListener('blur', () => {
  // delay hiding results-fixstuff. this is to allow time for click events being
  // processed
  setTimeout(() => {
    // check if clicked element is not within search input or results
    // container
    if (!searchInput.contains(document.activeElement) &&
        !resultsFixstuff.contains(document.activeElement)) {
      resultsFixstuff.style.display = 'none';
    }
  }, 100);
});

/* add functionality to the navigation sidebar */
// made by papertek

/* add event listener to toggle 'active' class when clicking the hamburger
 * button */
hamburgerBtn.addEventListener('click', function(event) {
  navSidebar.classList.toggle('active');

  // if (navSidebar.classList.contains('active')) {
  //   // document.body.style.overflowY = 'hidden';
  //   document.getElementById('myModal').style.display = 'block';
  //   document.getElementById('myModal').style.zIndex = '0';
  // } else {
  //   // document.body.style.overflowY = 'visible';
  //   document.getElementById('myModal').style.display = 'none';
  //   document.getElementById('myModal').style.zIndex = '1';
  // }

  // stop click event from propagating to the document body
  event.stopPropagation();
});

/* when a user click the x close the sidebar */
sidebarX.addEventListener('click', function() {
  navSidebar.classList.remove('active');
});

/* add global click event listener to hide navSidebar when clicking outside of
 * it */
document.addEventListener('click', function(event) {
  // check if clicked element is not inside the navSidebar or is not the
  // hamburgerBtn
  if (!navSidebar.contains(event.target) && event.target !== hamburgerBtn) {
    navSidebar.classList.remove('active');
  }
});

/* when a user scrolls hide the nav sidebar */
window.addEventListener('scroll', function() {
  navSidebar.classList.remove('active');
});

/* modal images for each images in card contents */
/* eaten from
 * https://www.w3schools.com/howto/howto_css_modal_images.asp
 * https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal_img */

// Get all elements with the class .cardContents
const cardContentsElements = document.querySelectorAll('.cardContents');

// Iterate through each .cardContents element
cardContentsElements.forEach((cardContentsElement) => {
  // Get all images within the current .cardContents element
  const images = cardContentsElement.querySelectorAll('img');

  // Iterate through each image and assign a unique ID
  images.forEach((image, index) => {
    // Generate unique IDs for the modal and its components
    const uniqueModalId = `myModal${index}`;
    const uniqueImgId = `img${index}`;
    const uniqueCaptionId = `caption${index}`;

    // Assign the unique IDs to the image and modal components
    image.id = uniqueImgId;

    // Create the modal, image, and caption elements
    const modal = document.createElement('div');
    modal.id = uniqueModalId;
    modal.classList.add('modal');

    const modalImg = document.createElement('img');
    modalImg.classList.add('modal-content');  // Apply the 'modal-content' class

    const captionText = document.createElement('div');
    captionText.id = uniqueCaptionId;
    captionText.classList.add('caption');  // Apply the 'caption' class

    // Set up the modal elements
    modal.appendChild(modalImg);
    modal.appendChild(captionText);

    // Append the modal to the document body
    document.body.appendChild(modal);

    // Add a click event listener to each image
    image.onclick = function() {
      const modal = document.getElementById('myModal');
      const modalImg = document.getElementById('imageModal');
      const captionText = document.getElementById('caption');

      // Set the modal content based on the clicked image
      modalImg.src = image.src;
      captionText.innerHTML = image.alt;

      // Set the modal to display
      modal.style.display = 'block';
    };
  });
});

// Get the <span> element that closes the modal
var span = document.getElementsByClassName('close')[0];

// Add click event listener to close the modal when <span> is clicked
span.onclick = function() {
  closeAndHideModal();
};

// Add click event listener to close the modal when clicking outside the modal
// content
window.onclick = function(event) {
  const modal = document.getElementById('myModal');
  if (event.target === modal) {
    closeAndHideModal();
  }
};

// When the user scrolls, close the modal
window.addEventListener('scroll', closeAndHideModal);

// Function to close and hide the modal
function closeAndHideModal() {
  const modal = document.getElementById('myModal');
  modal.style.display = 'none';
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