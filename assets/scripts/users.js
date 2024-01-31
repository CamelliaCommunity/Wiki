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
	sendAPIRequest: async(url, headers, method = "GET", body = null) => {
		if (!headers) headers = {};
		if (!headers["Content-Type"]) headers["Content-Type"] = "application/json";

		if (method == "POST" && !body) return "give me the body.";

		try {
			const response = await fetch(`https://backend.camellia.wiki/${url}`, { headers, method, body});
			if (!response.ok || response.status != 200) {
				Functions.sendToast({ title: "API Request Failed!", content: "Please try reloading. If you keep seeing this, please report to the developers.", style: "error" });
				throw new Error("API Error!");
			};
			const data = await response.json();

			if (data.code != 0) throw new Error(data.message);
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
	convertHumanFromStamp: (secs) => {
		let months = Math.floor(secs / 2592000);
		let days = Math.floor(secs / 86400);
		let hours = Math.floor(secs / 3600);
		let minutes = Math.floor(secs / 60); let seconds = Math.floor(secs % 60);

		if (months > 0) return `${months} month${months > 1 ? "s" : ""}`;
		if (days > 0) return `${days} day${days > 1 ? "s" : ""}`;
		if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""}`;
		if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""}`;
		if (seconds >= 30) return `${seconds} second${seconds > 1 ? "s" : ""}`;
		return "just now";
	},
	sleep: (ms) => new Promise(resolve => setTimeout(resolve, ms)),
	makeSlug: (i) => i.replace("/", "").replaceAll("/","-"),
	basicSanitize: (str) => { const m = { "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;", "/": "&#x2F;"}; const r = /[<>"'/]/ig; return str.replace(r, (ma) => m[ma]); },
	sendToast: (data) => { if (!window.toastMan) alert(data.content); else window.toastMan.push(data); }
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
		if (confirm("Are you sure you want to logout?")) {
			Functions.Cookie.set("wiki_auth", JSON.stringify({}), 0);
			updateSite();
		};
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

		// this js is so stupid
		const resetInputForm = (shouldClearInput) => {
			// please set things back.
			postBtn.disabled = false;
			postBtn.style.cursor = "pointer";
			theSendIcon.style.animation = "none";
			theSendIcon.style.transform = "rotate(0deg)";
			theSendIcon.className = "ph-bold ph-paper-plane-right";
			commentInput.disabled = false;
			commentInput.style.cursor = "text";

			this.submitting = false;
			if (shouldClearInput) {
				commentInput.value = "";
				commentInput.dispatchEvent(new Event("input"));
			};
		}
		const handleError = async(txt) => {
			// this stupid alert thing is so stupid; please save me and let me implement stupid toast notifications
			theSendIcon.style.animation = "none";
			theSendIcon.style.transform = "rotate(0deg)";
			theSendIcon.className = "ph-bold ph-x-circle";

			Functions.sendToast({ title: "Comment Submission Failed!", content: txt, style: "error" });
			await Functions.sleep(250);

			resetInputForm();
		};

		// Processing
		postBtn.disabled = true;
		postBtn.style.cursor = "not-allowed";
		theSendIcon.style = "display: inline-block; animation: spin-spin-spin 1.2s linear infinite;";
		theSendIcon.className = "ph-bold ph-arrow-clockwise";
		commentInput.disabled = true;
		commentInput.style.cursor = "not-allowed";
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

		let comcon = commentInput.value.trim();
		if (comcon == null || comcon == "") return await handleError("Something went wrong while posting.\nCheck to make sure your comment is not empty.");

		const slug = Functions.makeSlug(window.location.pathname);
		const data = await Functions.sendAPIRequest(`posts/${slug}/comments`, { Authorization: dh }, "POST", Functions.basicSanitize(commentInput.value));
		if (data.error) return await handleError("Something went wrong while posting.\nCheck to make sure your comment is not empty.");

		Functions.fetchComments();
		resetInputForm(true);
		updateUserData();
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
		commentInput.style.height = "";
		commentInput.style.height = (commentInput.scrollHeight) + "px";
	});

	Functions.handleIconClick = async(event, commentID) => {
		if (!event || !commentID) return;
		// TODO: make sure function call is from actual comment ID, etc.

		const commentIcon = event.target.id;
		if (!commentIcon) return;

		if (commentIcon == "comment-link") {
			if (navigator.clipboard) {
				navigator.clipboard.writeText(`${window.location.href}#comment-${commentID}`);
				Functions.sendToast({ title: "Success!", content: "Permalink copied to your clipboard!", style: "success" });
			} else Functions.sendToast({ title: "Uh-oh...", content: "Could not copy permalink to your clipboard.", style: "error" });
		}
	}
	Functions.fetchComments = async(doHighlight = false) => {
		const commentSection = document.getElementById("commentSection");

		let cookieData = Functions.Cookie.get("wiki_auth");
		let dh;
		let user;
		if (cookieData) {
			cookieData = JSON.parse(cookieData);

			dh = cookieData.dh;
			user = cookieData.user;
		};

		const slug = Functions.makeSlug(window.location.pathname);
		const data = await Functions.sendAPIRequest(`posts/${slug}/comments`);
		commentLoader.style.display = "none";

		const comments = data.data;

		if (!comments || comments.length < 1) {
			console.log("The slug has no comments.");
			return;
		};

		// Reset the comment section
		commentSection.querySelectorAll(".comment-wrapper form:not(#my-comment-form)").forEach(cs => cs.parentElement.remove());

		comments.sort((a, b) => b.time - a.time).forEach(comment => {
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
			const commentTime = Functions.convertHumanFromStamp((Date.now() / 1000) - comment.time);
			let badges = "";
			if (comment.author.staff) badges += `<div class="badges"><i class="ph-bold ph-gavel" style="color: var(--profile-accent);"></i></div>`;
			commentDetailsHeader.innerHTML = `<p id="username">${comment.author.name}</p>${badges}<p id="data">${Functions.convertTimestamp(comment.time * 1000, "mm dd, YYYY")} - ${commentTime == "just now" ? commentTime : (commentTime + " ago")}</p>`;
			commentHolder.appendChild(commentDetailsHeader);

			const commentDetailsContent = document.createElement("div");
			let comcon = comment.content.replaceAll("\n", "<br>");
			commentDetailsContent.className = "content";
			commentDetailsContent.innerHTML = `<p>${comcon}</p>`;
			commentHolder.appendChild(commentDetailsContent);

			commentCard.appendChild(commentHolder);

			const commentIconsContainer = document.createElement("div");
			commentIconsContainer.className = "comment-icons-container";

			const commentIcons1 = document.createElement("div");
			commentIcons1.className = "comment-icons";
			commentIcons1.innerHTML = `<div class="comment-icon ph-bold ph-arrow-fat-up" id="comment-upvote"></div><p id="comment-upvotecount">0</p><div class="comment-icon ph-bold ph-arrow-fat-down" id="comment-downvote"></div>`;
			commentIconsContainer.appendChild(commentIcons1);

			const commentIcons2 = document.createElement("div");
			const commentIcons2Ex = ((dh && user) && comment.author.id === user.id) ? `<div class="comment-icon ph-bold ph-pencil" id="comment-edit"></div><div class="comment-icon ph-bold ph-trash" id="comment-delete"></div>` : `<div class="comment-icon ph-bold ph-flag" id="comment-report"></div>`;
			commentIcons2.className = "comment-icons";
			commentIcons2.innerHTML = `<div class="comment-icon ph-bold ph-link" id="comment-link"></div><div class="comment-icon ph-bold ph-arrow-bend-up-left" id="comment-reply"></div>${commentIcons2Ex}`;
			commentIconsContainer.appendChild(commentIcons2);

			commentCard.appendChild(commentIconsContainer);

			// Build-A-Comment(TM)
			commentForm.appendChild(commentCard);
			commentWrapper.appendChild(commentForm);
			commentSection.appendChild(commentWrapper);

			// determine if to "Read more"
			if (commentDetailsContent.clientHeight >= 100) {
				const commentDetailsContentData = commentDetailsContent.querySelector("p");
				commentDetailsContentData.style["max-height"] = "76px";
				commentDetailsContentData.classList.add("imFading");

				const readMoreBtn = document.createElement("a");
				readMoreBtn.id = "readMore";
				readMoreBtn.href = "#";
				readMoreBtn.innerHTML = "Read more";
				readMoreBtn.addEventListener("click", (event) => {
					event.preventDefault();

					commentDetailsContentData.style["max-height"] = "none";
					commentDetailsContentData.classList.remove("imFading");
					commentCard.style["max-height"] = "none";
					readMoreBtn.remove();
				});

				document.querySelector(`#comment-${comment.id} .content`).appendChild(readMoreBtn);
			};


			// Handle comment icon presses
			commentIconsContainer.querySelectorAll(".comment-icon").forEach(ic => {
				ic.addEventListener("click", (e) => { e.preventDefault(); return Functions.handleIconClick(e, comment.id); });
			});
		});

		if (doHighlight) {
			// go to the comment that the user wants.
			if (window.location.hash) {
				const theHash = window.location.hash.replace("#", "");
				if (!theHash.startsWith("comment-")) return;
				const theComment = document.getElementById(theHash);
				if (theComment) {
					theComment.scrollIntoView();
					theComment.classList.add("highlight");
				};
			}
		}
	};
	Functions.fetchComments(true);
};