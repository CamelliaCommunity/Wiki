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
// Created by thecodingguy
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
// - john

// a better way of doing this. maybe.
// ('for' tip provided by jiminp)
// this uses the same "workaround" idea paper did,
// however, this was edited to actually excute per image has loaded
// - thecodingguy
window.addEventListener("load", () => {
  for (const image of document.querySelectorAll('p > img')) {
    const figure = document.createElement('figure');
    const figcaption = document.createElement('figcaption');
    figcaption.textContent = image.alt;

    figure.appendChild(image.cloneNode(true));
    figure.appendChild(figcaption);

    figure.classList.add(
      image.width > 370 ? 'centerImage' : 'floatImage');  // jack shit
    image.replaceWith(figure);
  };
});

// searchbar code for hiding and showing search container
// made by papertek and reinoblassed, fixed by thecodingguy
const searchInput = document.querySelector('#search-input');
const resultsFixstuff = document.getElementById(
    'results-fixstuff');  // Get the results-fixstuff element by its id
const resultsContainer = document.getElementById('results-container');

searchInput.addEventListener('keyup', () => {
  // Get all li elements inside the results-container
  const resultListedItems = resultsContainer.innerHTML;

  // Check if there are any li elements
  // show, otherwise hide if none
  resultsFixstuff.style.display = !resultListedItems == '' ? 'flex' : 'none';
});

// better ux(?) for the search container
// made by papertek, fixed by thecodingguy
// add event listener to hide results-fixstuff when search input loses focus
document.addEventListener('click', (evt) => {
  if (!evt || !evt.target) return;

  // For search bar
  const isSearchStuff =
      (el) => [searchInput, resultsFixstuff, resultsContainer].includes(el);
  const isSearchOpen = (resultsFixstuff.style.display != 'none');
  if (isSearchOpen && !isSearchStuff(evt.target))
    resultsFixstuff.style.display = 'none';
  else if (!isSearchOpen && isSearchStuff(evt.target))
    resultsFixstuff.style.display = 'flex';
})

/* add functionality to the navigation sidebar */
// made by papertek, cleaned by thecodingguy
const sideBarControl = (open) => {
	const sidebarModal = document.getElementById('sidebarModal');
	sidebarModal.style.display = (open) ? "block" : "none";
	sidebarModal.style.zIndex = (!open) ? "1" : "0";
};
/* add event listener to toggle 'active' class when clicking the hamburger
 * button */
hamburgerBtn.addEventListener('click', function(event) {
  navSidebar.classList.toggle('active');
  stopScrolling();

  sideBarControl(navSidebar.classList.contains('active'));

  // stop click event from propagating to the document body
  event.stopPropagation();
});

/* when a user click the x close the sidebar */
sidebarX.addEventListener('click', function() {
  navSidebar.classList.remove('active');
  doScrolling();

  sideBarControl(false);
});

/* add global click event listener to hide navSidebar when clicking outside of
 * it */
document.addEventListener('click', function(event) {
  // check if clicked element is not inside the navSidebar or is not the
  // hamburgerBtn
  if (!navSidebar.contains(event.target) && event.target !== hamburgerBtn) {
    navSidebar.classList.remove('active');
    doScrolling();

    sideBarControl(false);
  }
});

/* modal images for each images in card contents */
/* eaten from
 * https://www.w3schools.com/howto/howto_css_modal_images.asp
 * https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal_img */


// Get all elements with the class .cardContents
const cardContentsElements = document.querySelectorAll('.cardContents');

window.addEventListener('load', () => {
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
      modalImg.classList.add(
          'modal-content');  // Apply the 'modal-content' class

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

        stopScrolling();
      };
    });
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

// Function to close and hide the modal
function closeAndHideModal() {
  const modal = document.getElementById('myModal');
  modal.style.display = 'none';
  doScrolling();
}

// scrolling functions for the page
function stopScrolling() {
  document.body.classList.toggle('stop-scrolling');

  // mobile stuff
  document.body.addEventListener('touchmove', function(e) {
    e.preventDefault();
  });
}

function doScrolling() {
  document.body.classList.remove('stop-scrolling');

  // mobile stuff
  document.body.removeEventListener('touchmove', function(e) {
    e.preventDefault();
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