// //   AI Chatbot Pop-up


// Toggle chat
let isMuted = false;
let currentSpeech = null;

// Toggle chat open
function toggleAsta() {
    const box = document.getElementById("astaBox");
    const helpText = document.getElementById("astaHelpText");
    const status = document.getElementById("astaStatus");

    box.classList.toggle("active");

    if (helpText && localStorage.getItem("astaHelpSeen") !== "true") {
        helpText.classList.add("fade-out");

        setTimeout(() => {
            helpText.style.display = "none";
            status.style.display = "flex";
        }, 400);

        localStorage.setItem("astaHelpSeen", "true");
    }

    if (box.classList.contains("active")) {
        document.getElementById("astaInput").focus();
    }
}

// Check the backend is running or not with green dot status indicator

const BACKEND_URL = "https://porfolio-backend-z36m.onrender.com";
async function checkAstaStatus() {
    const dot = document.getElementById("statusDot");
    const text = document.getElementById("statusText");

    dot.classList.remove("status-online", "status-offline", "status-waking");

    text.innerText = "Checking...";
    text.style.color = "#9ca3af";

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    try {
        const start = Date.now();

        const response = await fetch(`${BACKEND_URL}/health`, {
            signal: controller.signal
        });

        clearTimeout(timeout);

        const responseTime = Date.now() - start;

        if (response.ok) {

            // If response is slow (>2.5s), assume waking
            if (responseTime > 2500) {
                dot.classList.add("status-waking");
                text.innerText = "Waking up...";
                text.style.color = "#facc15";

                // Recheck in 5 sec
                setTimeout(checkAstaStatus, 5000);
            } else {
                dot.classList.add("status-online");
                text.innerText = "Online";
                text.style.color = "#22c55e";
            }

        } else {
            throw new Error("Bad response");
        }

    } catch (error) {
        dot.classList.add("status-offline");
        text.innerText = "Offline";
        text.style.color = "#ef4444";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    checkAstaStatus();
    setInterval(checkAstaStatus, 30000);
});

// Check on load
document.addEventListener("DOMContentLoaded", () => {
    checkAstaStatus();

    // Recheck every 30 seconds
    setInterval(checkAstaStatus, 30000);
});
document.addEventListener("DOMContentLoaded", () => {
    checkAstaStatus();

    if (localStorage.getItem("astaHelpSeen") === "true") {
        document.getElementById("astaHelpText").style.display = "none";
    }
});

// Close chat and STOP speaking
function closeAsta() {
    const box = document.getElementById("astaBox");
    box.classList.remove("active");

    speechSynthesis.cancel(); // 🔥 stop speaking immediately
}

// Mute toggle
function toggleMute() {
    const muteBtn = document.getElementById("muteBtn");
    isMuted = !isMuted;

    muteBtn.innerText = isMuted ? "🔇" : "🔊";

    if (isMuted) {
        speechSynthesis.cancel();
    }
}

// Enter key support
document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("astaInput");

    input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            sendAsta();
        }
    });
});

// Anime style voice (browser based)
function speakAsta(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.rate = 1;
    speech.pitch = 1;
    speech.volume = 1;
    speechSynthesis.speak(speech);
}

// Send message

async function sendAsta() {
    const input = document.getElementById("astaInput");
    const body = document.getElementById("astaBody");

    if (input.value.trim() === "") return;

    const userMessage = input.value;

    body.innerHTML += `<div class="user-msg">${userMessage}</div>`;
    input.value = "";

    body.innerHTML += `<div class="typing" id="typing">ASTA is thinking...</div>`;
    body.scrollTop = body.scrollHeight;

    try {
        const response = await fetch("https://porfolio-backend-z36m.onrender.com/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: userMessage })
        });

        const data = await response.json();

        document.getElementById("typing").remove();

        body.innerHTML += `<div class="bot-msg">${data.reply}</div>`;
        body.scrollTop = body.scrollHeight;

        speakAsta(data.reply); // if voice enabled

    } catch (error) {
        document.getElementById("typing").remove();
        body.innerHTML += `<div class="bot-msg">⚔ Connection error.</div>`;
    }
}