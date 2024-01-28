// Variable constants to be used throughout program
const header = document.querySelector('header');
const main = document.querySelector('main');
const scrollToTop = document.getElementById('scrollToTop');
const sidebarWrapper = document.querySelector('.sidebar-wrapper');
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
window.addEventListener('load', () => {
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

/* add event listener to toggle 'active' class when clicking the hamburger
 * button */
hamburgerBtn.addEventListener('click', function(event) {
  navSidebar.classList.toggle('active');
  sidebarWrapper.classList.toggle('active');
  stopScrolling();

  // stop click event from propagating to the document body
  event.stopPropagation();
});

// add shortcut for sidebar
// written by papertek, fixed by thecodingguy
// note: we are simulating clicking the hamburger button, because
// its a LOT easier to do. plus if you update the code there, you dont
// need to do it here. :)

document.addEventListener("keyup", function(event) {
	const searchBar = document.getElementById("search-input");
	const searchWrapper = document.getElementById("results-fixstuff");
	const modalImg = document.getElementById("imageModal");

	if (event.key === "Escape") { // Escape out of the sidebar & search bar
		if (modalImg.parentElement.classList.contains("active")) {
			const closeBtn = modalImg.parentElement.querySelector(".close");
			if (closeBtn) closeBtn.click();
		} else if (document.activeElement === searchBar) {
			searchWrapper.style.display = "none";
			searchBar.blur();
		} else if (navSidebar.classList.contains("active")) {
			hamburgerBtn.click();
		};
	} else if (event.key === "q") { // Open the sidebar
		if (!navSidebar.classList.contains("active") && document.activeElement !== searchBar && !modalImg.parentElement.classList.contains("active")) {
			hamburgerBtn.click();
		};
	} else if (event.key === "s") { // Open the search bar
		if (document.activeElement !== searchBar && !modalImg.parentElement.classList.contains("active")) {
			searchBar.focus();
			event.stopPropagation();
		};
	};
});


/* when a user click the x close the sidebar */
sidebarX.addEventListener('click', function() {
  navSidebar.classList.remove('active');
  sidebarWrapper.classList.remove('active');
  doScrolling();
});

/* add global click event listener to hide navSidebar when clicking outside of
 * it */
document.addEventListener('click', function(event) {
  // check if clicked element is not inside the navSidebar or is not the
  // hamburgerBtn
  if ((!navSidebar.contains(event.target) && event.target !== hamburgerBtn) &&
      navSidebar.classList.contains('active')) {
    navSidebar.classList.remove('active');
    sidebarWrapper.classList.remove('active');
    doScrolling();
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
      image.onclick = function(event) {
        const modal = document.getElementById('myModal');
        const modalImg = document.getElementById('imageModal');
        const captionText = document.getElementById('caption');

        // Set the modal content based on the clicked image
        modalImg.src = image.src;
        captionText.innerHTML = image.alt;

        // Set the modal to display
        modal.classList.toggle('active');
        stopScrolling();
        event.stopPropagation();
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
  modal.classList.remove('active');
  doScrolling();
}

// scrolling functions for the page
function stopScrolling() {
  document.body.classList.toggle('stop-scrolling');

  // mobile stuff
  document.body.addEventListener('touchmove', function(e) {
    e.stopPropagation();
  });
}

function doScrolling() {
  document.body.classList.remove('stop-scrolling');

  // mobile stuff
  document.body.removeEventListener('touchmove', function(e) {
    e.stopPropagation();
  });
}



// Stupid Discord OAuth
// Created by thecodingguy
const loginBtn = document.querySelector(".profile-card .buttonLogin");
let popupWindow;
loginBtn.addEventListener("click", (event) => {
	// Redirect to Discord... but in a popup :)
	event.preventDefault();

	if (loginBtn.querySelector("i").className == "ph-bold ph-sign-out") {
		setCookie("wiki_auth", JSON.stringify({}), 0);
		updateUserData();
	} else {
		const DISCORD_CLIENT_ID = "1169155506988929024";
		const popupParams = "scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=833,height=654";
		popupWindow = window.open(
			`https://discord.com/oauth2/authorize?response_type=token&client_id=${DISCORD_CLIENT_ID}&scope=identify&redirect_uri=http://${window.location.host}/oauthComplete`,
			"popup",
			popupParams
		);
		popupWindow.focus();

		const popupMsgAlert = setInterval(() => { popupWindow.postMessage('', `http://${window.location.host}/`); }, 500);

		window.addEventListener("message", async(event) => {
			if (popupWindow && !popupWindow.closed && event.data.token) {
				popupWindow.close();

				// we should have the data now.
				clearInterval(popupMsgAlert);

				setCookie("wiki_auth", JSON.stringify({
					dh: event.data.token,
					user: {}
				}), 7);

				// Now that we are logged in, let's GOOOOOOOOOOOOOOOOOOOOOO
				updateUserData();
			};
		});
	};
});

window.addEventListener("beforeunload", (event) => {
	if (popupWindow && !popupWindow.closed) {
		popupWindow.close();
	};
});

window.addEventListener("load", async() => {
	updateUserData();
});

const updateUserData = async() => {
	let defaults = {
		name: "Not Logged in!",
		avatar: "/assets/images/avatar.png",
		color: "var(--colorWhite)"
	};

	let cookieData = getCookie("wiki_auth");

	let dh;
	let user;
	if (cookieData) {
		cookieData = JSON.parse(cookieData);

		dh = cookieData.dh;
		user = cookieData.user;
	} else user = {};

	setData = () => {
		const profileCard = document.querySelector(".profile-card");
		const profileHeader = profileCard.querySelector("#profile-details #profile-header");
		const profileSubHeader = profileCard.querySelector("#profile-details #profile-subheader");
		const profilePfp = profileCard.querySelector(".profile-left #pfp");
		const profileLoginIcon = profileCard.querySelector(".buttonLogin i");

		profileCard.style.setProperty("--profile-accent", user.color ? user.color : defaults.color);
		profileHeader.innerText = user.name ? user.name : defaults.name;
		// TODO: Once we check how many comments by the user has made been in the API, we use it here: profileSubHeader.innerText = 
		profileSubHeader.innerText = user.name ? "Joined N/A - 0 Comments Posted" : "Login to access more features...";
		profilePfp.src = user.avatar ? user.avatar : defaults.avatar;
		profileLoginIcon.className = `ph-bold ph-sign-${user.name ? "out" : "in"}`;
	};
	await setData();

	if (dh) {
		const data = await sendAPIRequest("account", dh);
		if (data.error) {
			// custom error handling here...
			return;
		};

		setCookie("wiki_auth", JSON.stringify({
			dh,
			user: data.data
		}), 7);

		user = data.data;
		await setData(); // recall because yes.
	};
};

const sendAPIRequest = async(url, auth) => {
	try {
		const response = await fetch(`https://backend.camellia.wiki/${url}`, { headers: { "Content-Type": "application/json", "Authorization": auth }});
		if (!response.ok) {
			console.log(response);
			throw new Error("API Error!");
		};
		const data = await response.json();

		if (data.status > 204) throw new Error(data.message)
		return data;
	} catch (error) {
		return { error };
	};
};

function setCookie(cname, cvalue, exdays) {
	const d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	let expires = "expires="+ d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};

function getCookie(cname) {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for(let i = 0; i <ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') {
		c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
		return c.substring(name.length, c.length);
		}
	}
	return "";
};