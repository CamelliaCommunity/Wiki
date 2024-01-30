/*
	Discord OAuth Script
	Created by thecodingguy
	Please, do not bother this, unless you know what it does - this took TOO long to write :sob:
*/

const commentSection = document.getElementById("commentSection");
const commentInput = document.getElementById("comment-input");
const commentInputForm = document.getElementById("my-comment-form");
const commentLoader = document.getElementById("comment-loader");

const Functions = {
	Cookie: {		
		get: (cname) => {
			let name = cname + "=";
			let decodedCookie = decodeURIComponent(document.cookie);
			let ca = decodedCookie.split(';');
			for(let i = 0; i <ca.length; i++) {
				let c = ca[i];
				while (c.charAt(0) == ' ') { c = c.substring(1); };
				if (c.indexOf(name) == 0) { return c.substring(name.length, c.length); };
			}
			return "";
		},

		set: (cname, cvalue, exdays) => {
			const d = new Date();
			d.setTime(d.getTime() + (exdays*24*60*60*1000));
			let expires = "expires="+ d.toUTCString();
			document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
		}
	},
	sendAPIRequest: async(url, headers) => {
		if (!headers) headers = {};
		if (!headers["Content-Type"]) headers["Content-Type"] = "application/json";

		try {
			const response = await fetch(`https://backend.camellia.wiki/${url}`, { headers });
			if (!response.ok) {
				console.log(response);
				throw new Error("API Error!");
			};
			const data = await response.json();

			if (data.code != 0) throw new Error(data.message)
			return data;
		} catch (error) {
			return { error };
		};
	},
	convertTimestamp: (timeStamp, format = "MM/DD/YYYY HH:II:SS") => {
		if (typeof timeStamp !== "number" || isNaN(timeStamp)) throw new Error("That timestamp is not valid!");
		const dateStamp = new Date(timeStamp);

		const pad = (n) => n < 10 ? `0${n}` : n;
		const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
		const formats = {
			// Date
			"m": (dateStamp.getMonth() + 1),
			"M": pad((dateStamp.getMonth() + 1)),
			"mm": months[dateStamp.getMonth()],
			"MM": months[dateStamp.getMonth()],
			"dd": dateStamp.getDate(),
			"DD": pad(dateStamp.getDate()),
			"yyyy": dateStamp.getFullYear(),
			"YYYY": dateStamp.getFullYear(),
			"yy": dateStamp.getFullYear().toString().slice(-2),
			"YY": dateStamp.getFullYear().toString().slice(-2),

			// Time
			"hh": dateStamp.getHours(),
			"HH": pad(dateStamp.getHours()),
			"ii": dateStamp.getMinutes(),
			"II": pad(dateStamp.getMinutes()),
			"ss": dateStamp.getSeconds(),
			"SS": pad(dateStamp.getSeconds()),
		};

		return format.replace(/mm|MM|m|M|dd|DD|yyyy|YYYY|yy|YY|hh|HH|ii|II|ss|SS/g, match => formats[match]);
	},
	sleep: (ms) => new Promise(resolve => setTimeout(resolve, ms))
};
let userDefaults = {
	name: "Not Logged in!",
	avatar: "/assets/images/avatar.png",
	color: "var(--colorWhite)"
};

// Update user data to reflect
const updateUserData = async() => {

	let cookieData = Functions.Cookie.get("wiki_auth");

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
		const profileLoginIcon = profileCard.querySelector(".buttonLogin i");

		// Checking for all pfp references of the user
		const selfCards = document.body.querySelectorAll(".my-card");
		selfCards.forEach(selfCard => {
			selfCard.querySelector("#pfp").src = user.avatar ? user.avatar : userDefaults.avatar;
			selfCard.style.setProperty("--profile-accent", user.color ? user.color : userDefaults.color);
		});

		profileHeader.innerText = user.name ? user.name : userDefaults.name;
		// TODO: Once we check how many comments by the user has made been in the API, we use it here: profileSubHeader.innerText = 
		profileSubHeader.innerText = user.name ? `Joined ${Functions.convertTimestamp((user.join * 1000), "M/DD/yy")} - ${user.comments} Comments` : "Login to access more features...";
		profileLoginIcon.className = `ph-bold ph-sign-${user.name ? "out" : "in"}`;
	};
	await setData();

	if (dh) {
		const data = await Functions.sendAPIRequest("account", { Authorization: dh });
		if (data.error) {
			// custom error handling here...
			return;
		};

		Functions.Cookie.set("wiki_auth", JSON.stringify({
			dh,
			user: data.data
		}), 7);

		user = data.data;
		await setData(); // recall because yes.
	};
};

const updateCommentInput = () => {
	let cookieData = Functions.Cookie.get("wiki_auth");

	let dh;
	let user;
	if (cookieData) {
		cookieData = JSON.parse(cookieData);

		dh = cookieData.dh;
		user = cookieData.user;
	};
	console.log(cookieData)
	if (dh && user) {
		commentInput.placeholder = "Type some text here! Press enter to post. Use shift+enter for a new line.";
		commentInput.disabled = false;
		commentInput.style.cursor = "text";
		commentInput.parentElement.querySelector(".buttonPost").style.display = "flex";
	} else {
		commentInput.placeholder = "Please login to comment.";
		commentInput.disabled = true;
		commentInput.style.cursor = "not-allowed";
		commentInput.parentElement.querySelector(".buttonPost").style.display = "none";
	};
};

const updateSite = async() => {
	updateUserData();
	if (commentSection) {
		updateCommentInput();
	};
};


// Login & Logout stuff
const loginBtn = document.querySelector(".profile-card .buttonLogin");
let popupWindow;
loginBtn.addEventListener("click", (event) => {
	// Redirect to Discord... but in a popup :)
	event.preventDefault();

	if (loginBtn.querySelector("i").className == "ph-bold ph-sign-out") {
		Functions.Cookie.set("wiki_auth", JSON.stringify({}), 0);
		updateSite();
	} else {
		const DISCORD_CLIENT_ID = "1169155506988929024";
		const popupParams = "scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=833,height=654";
		popupWindow = window.open(
			`https://discord.com/oauth2/authorize?response_type=token&client_id=${DISCORD_CLIENT_ID}&scope=identify&redirect_uri=${window.location.protocol}//${window.location.host}/oauthComplete`,
			"popup",
			popupParams
		);
		popupWindow.focus();

		const popupMsgAlert = setInterval(() => { popupWindow.postMessage('', `${window.location.protocol}//${window.location.host}/`); }, 500);

		// This stupid thing will wait for the oauth complete page to send back our required data :)
		window.addEventListener("message", async(event) => {
			if (popupWindow && !popupWindow.closed && event.data.token) {
				popupWindow.close();

				// we should have the data now.
				clearInterval(popupMsgAlert);

				Functions.Cookie.set("wiki_auth", JSON.stringify({
					dh: event.data.token,
					user: {}
				}), 7);

				// Now that we are logged in, let's GOOOOOOOOOOOOOOOOOOOOOO
				updateSite();
			};
		});

		window.addEventListener("beforeunload", (event) => {
			if (popupWindow && !popupWindow.closed) {
				popupWindow.close();
			};
		});
	};
});


// Attempt to laod in the site stuff (this requires the script to be executed last in the body)
updateSite();


if (commentSection) {
	// Comments
	const postBtn = commentInputForm.querySelector(".buttonPost");
	const theSendIcon = commentInputForm.querySelector(".buttonPost i");

	commentInputForm.addEventListener("submit", async(event) => {
		event.preventDefault();
		event.stopPropagation();
		if (this.submitting) return;
		const handleError = async(txt) => {
			theSendIcon.style.setProperty("animation", "none");
			theSendIcon.className = "ph-bold ph-x-circle";

			await Functions.sleep(100);
			alert(txt);

			// After closing the error, please set things back.
			theSendIcon.style.setProperty("animation", "none");
			theSendIcon.className = "ph-bold ph-paper-plane-right";
		};

		// Processing
		postBtn.disabled = true;
		postBtn.cursor = "not-allowed";
		theSendIcon.style = "display: inline-block; animation: spin-spin-spin 1.2s linear infinite;";
		theSendIcon.className = "ph-bold ph-arrow-clockwise";
		commentInput.disabled = true;
		commentInput.cursor = "not-allowed";
		this.submitting = true;
		await Functions.sleep(100); // give a few moments to catch up.

		let cookieData = Functions.Cookie.get("wiki_auth");

		let dh;
		let user;
		if (cookieData) {
			cookieData = JSON.parse(cookieData);

			dh = cookieData.dh;
			user = cookieData.user;
		};
		if (!dh || !user) return await handleError("You are not logged in. Please login.");
		alert("almost there. :)")
	});
	postBtn.addEventListener("click", (event) => {
		commentInputForm.dispatchEvent(new Event("submit", { cancelable: true }));
		event.preventDefault();
	});
	commentInput.addEventListener("keydown", (event) => {
		if (!event.shiftKey && event.key === "Enter") {
			postBtn.click();
			event.preventDefault();
			return;
		};
	});
	commentInput.addEventListener("input", (event) => {
		// Check if this is new line crap
		commentInput.style.height = "auto";
		commentInput.style.height = (commentInput.clientHeight) + "px";
	});

	const fetchComments = async() => {
		const commentSection = document.getElementById("commentSection");

		const slug = window.location.pathname.replace("/", "").replaceAll("/","-");

		const data = await Functions.sendAPIRequest(`posts/${slug}/comments`);

		commentLoader.style.display = "none";

		if (data.data.length < 1) {
			console.log("The slug has no comments.");
			return;
		};

		data.data.forEach(comment => {
			const commentWrapper = document.createElement("div");
			commentWrapper.className = "comment-wrapper";
			commentWrapper.id = `comment-${comment.id}`;

			const commentForm = document.createElement("form");
			commentForm.method = "POST";
			commentForm.action = "#";
			commentForm.id = `comment-form-${comment.id}`;

			const commentCard = document.createElement("div");
			commentCard.className = "comment-card";
			commentCard.style = `--profile-accent: ${comment.author.color ? comment.author.color : userDefaults.color}`;

			const commentProfile = document.createElement("div");
			commentProfile.className = "profile-left";

			const commentProfileImg = document.createElement("img");
			commentProfileImg.id = "pfp";
			commentProfileImg.src = `${comment.author.avatar ? comment.author.avatar : userDefaults.avatar}`;
			commentProfile.appendChild(commentProfileImg);

			// TODO: Nested

			commentCard.appendChild(commentProfile);

			const commentHolder = document.createElement("div");
			commentHolder.className = "comment-holder";

			const commentDetailsHeader = document.createElement("div");
			commentDetailsHeader.className = "comment-details-header";
			commentDetailsHeader.innerHTML = `<p id="username">${comment.author.name}</p><p id="data">${Functions.convertTimestamp(comment.time * 1000, "mm dd, YYYY")}</p>`
			commentHolder.appendChild(commentDetailsHeader);

			const commentDetailsContent = document.createElement("div");
			commentDetailsContent.className = "content";
			commentDetailsContent.innerHTML = `<p>${comment.content}</p>`;
			commentHolder.appendChild(commentDetailsContent);

			// Build-A-Comment(TM)
			commentCard.appendChild(commentHolder);
			commentForm.appendChild(commentCard);
			commentWrapper.appendChild(commentForm);
			commentSection.appendChild(commentWrapper);
		});
	};
	fetchComments();
};