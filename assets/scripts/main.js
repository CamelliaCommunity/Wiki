// Variable constants to be used throughout program
const header = document.querySelector("header");
const main = document.querySelector("main");
const scrollToTop = document.getElementById("scrollToTop");
const sidebarWrapper = document.querySelector(".sidebar-wrapper");
const navSidebar = document.getElementById("navSidebar");
const hamburgerBtn = document.getElementById("hamburgerBtn");
const sidebarX = document.getElementById("sidebarX");

// If scrollToTop element is found, run this code
// the code is less fucky ~ codertek
if (scrollToTop) {
  let prevScrollPosition = 0;
  let isReturning = false;

  scrollToTop.style.display = "none"; // fix button loading in when page first loads

  // function to change the caret & title text better, since we change it multiple times.
  const changeScrollBtn = (isToTop) => {
    scrollToTop.querySelector("i").className = `ph-bold ph-caret-${
      !isToTop ? "down" : "up"
    }`;
    scrollToTop.querySelector(".buttonDefault").title = `Go to ${
      !isToTop ? "previous position" : "top"
    }`;
  };

  // show/hide the button based on scroll position
  const showButton = () => {
    const currentScrollPosition = window.scrollY;

    if (!isReturning) {
      scrollToTop.style.display =
        currentScrollPosition > 400 ? "block" : "none";

      // if the scroll Y is not the previous position, we'll reset(TM)
      if (window.scrollY != prevScrollPosition) {
        changeScrollBtn(true);
        prevScrollPosition = 0;
      } else changeScrollBtn(false);
    }
  };

  window.addEventListener("scroll", showButton);

  // event listener when the user clicks on the button to scroll to the top
  scrollToTop.addEventListener("click", () => {
    if (prevScrollPosition > 0 || prevScrollPosition == window.scrollY) {
      window.scrollTo({ top: prevScrollPosition, behavior: "smooth" });
      prevScrollPosition = 0;
      changeScrollBtn(true);
      isReturning = false;
    } else {
      prevScrollPosition = window.scrollY;
      window.scrollTo({ top: 0, behavior: "smooth" });
      changeScrollBtn(false);
      isReturning = true;
      setTimeout(() => {
        isReturning = false;
      }, 1000);
    }
    return false;
  });
}

// Add the sticky class to header when user scrolls (also adds to the sidebar,
// remove later?)
// Created by thecodingguy
const scrollDetect = () => {
  header.classList.toggle("sticky", main.getBoundingClientRect().top <= 0);
  navSidebar.classList.toggle("sticky", main.getBoundingClientRect().top <= 0);

  // Check if user has scrolled a certain amount of pixels to the top
  // Used to be 200 then 198... not anymore, its 222 !!!
  if (window.scrollY <= 222) {
    header.classList.remove("sticky");
    navSidebar.classList.remove("sticky");
  }
};

window.addEventListener("scroll", scrollDetect);

// Select all h2 elements within the cardContents class and apply the cardHeader
// class
const h2Elements = document.querySelectorAll(".cardContents h2");
h2Elements.forEach((h2) => {
  const div = document.createElement("div");
  div.classList.add("cardHeader");
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
  for (const image of document.querySelectorAll("p > img")) {
    const figure = document.createElement("figure");
    const figcaption = document.createElement("figcaption");
    figcaption.textContent = image.alt;

    figure.appendChild(image.cloneNode(true));
    figure.appendChild(figcaption);

    figure.classList.add(image.width > 370 ? "centerImage" : "floatImage"); // jack shit
    image.replaceWith(figure);
  }
});

/* add event listener to toggle 'active' class when clicking the hamburger
 * button */
hamburgerBtn.addEventListener("click", function (event) {
  navSidebar.classList.toggle("active");
  sidebarWrapper.classList.toggle("active");
  stopScrolling();

  // stop click event from propagating to the document body
  event.stopPropagation();
});

// add shortcut for sidebar
// written by papertek, fixed by thecodingguy
// note: we are simulating clicking the hamburger button, because
// its a LOT easier to do. plus if you update the code there, you dont
// need to do it here. :)

document.addEventListener("keyup", function (event) {
  const searchBar = document.getElementById("search-input");
  const searchWrapper = document.getElementById("results-fixstuff");
  const modalImg = document.getElementById("imageModal");

  if (event.key === "Escape") {
    // Escape out of the sidebar & search bar
    if (modalImg.parentElement.classList.contains("active")) {
      const closeBtn = modalImg.parentElement.querySelector(".close");
      if (closeBtn) closeBtn.click();
    } else if (document.activeElement === searchBar) {
      searchWrapper.style.display = "none";
      searchBar.blur();
    } else if (navSidebar.classList.contains("active")) {
      hamburgerBtn.click();
    }
  } else if (event.key === "q") {
    // Open & close the sidebar
    if (
      document.activeElement.tagName !== "INPUT" &&
      document.activeElement.tagName !== "TEXTAREA" &&
      !modalImg.parentElement.classList.contains("active")
    ) {
      hamburgerBtn.click();
    }
  } else if (event.key === "s") {
    // Open the search bar
    if (
      document.activeElement.tagName !== "INPUT" &&
      document.activeElement.tagName !== "TEXTAREA" &&
      !modalImg.parentElement.classList.contains("active")
    ) {
      searchBar.focus();
      event.stopPropagation();
    }
  }
});

/* when a user click the x close the sidebar */
sidebarX.addEventListener("click", function () {
  navSidebar.classList.remove("active");
  sidebarWrapper.classList.remove("active");
  doScrolling();
});

/* add global click event listener to hide navSidebar when clicking outside of
 * it */
document.addEventListener("click", function (event) {
  // check if clicked element is not inside the navSidebar or is not the
  // hamburgerBtn
  if (
    !navSidebar.contains(event.target) &&
    event.target !== hamburgerBtn &&
    navSidebar.classList.contains("active")
  ) {
    navSidebar.classList.remove("active");
    sidebarWrapper.classList.remove("active");
    doScrolling();
  }
});

/* modal images for each images in card contents */
/* eaten from
 * https://www.w3schools.com/howto/howto_css_modal_images.asp
 * https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal_img */

// Get all elements with the class .cardContents
const cardContentsElements = document.querySelectorAll(".cardContents");

window.addEventListener("load", () => {
  // Iterate through each .cardContents element
  cardContentsElements.forEach((cardContentsElement) => {
    // Get all images within the current .cardContents element
    const images = cardContentsElement.querySelectorAll("img");

    // Iterate through each image and assign a unique ID
    images.forEach((image, index) => {
      // Generate unique IDs for the modal and its components
      const uniqueModalId = `myModal${index}`;
      const uniqueImgId = `img${index}`;
      const uniqueCaptionId = `caption${index}`;

      // Assign the unique IDs to the image and modal components
      image.id = uniqueImgId;

      // Create the modal, image, and caption elements
      const modal = document.createElement("div");
      modal.id = uniqueModalId;
      modal.classList.add("modal");

      const modalImg = document.createElement("img");
      modalImg.classList.add("modal-content"); // Apply the 'modal-content' class

      const captionText = document.createElement("div");
      captionText.id = uniqueCaptionId;
      captionText.classList.add("caption"); // Apply the 'caption' class

      // Set up the modal elements
      modal.appendChild(modalImg);
      modal.appendChild(captionText);

      // Append the modal to the document body
      document.body.appendChild(modal);

      // Add a click event listener to each image
      image.onclick = function (event) {
        const modal = document.getElementById("myModal");
        const modalImg = document.getElementById("imageModal");
        const captionText = document.getElementById("caption");

        // Set the modal content based on the clicked image
        modalImg.src = image.src;
        captionText.innerHTML = image.alt;

        // Set the modal to display
        modal.classList.toggle("active");
        stopScrolling();
        event.stopPropagation();
      };
    });
  });
});

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Add click event listener to close the modal when <span> is clicked
span.onclick = function () {
  closeAndHideModal();
};

// Add click event listener to close the modal when clicking outside the modal
// content
window.onclick = function (event) {
  const modal = document.getElementById("myModal");
  if (event.target === modal) {
    closeAndHideModal();
  }
};

// Function to close and hide the modal
function closeAndHideModal() {
  const modal = document.getElementById("myModal");
  modal.classList.remove("active");
  doScrolling();
}

// scrolling functions for the page
function stopScrolling() {
  document.body.classList.toggle("stop-scrolling");

  // mobile stuff
  document.body.addEventListener("touchmove", function (e) {
    e.stopPropagation();
  });
}

function doScrolling() {
  document.body.classList.remove("stop-scrolling");

  // mobile stuff
  document.body.removeEventListener("touchmove", function (e) {
    e.stopPropagation();
  });
}
