// Speak function
let currentVoice = null;

function loadBestVoice() {
    const voices = speechSynthesis.getVoices();

    // Try to find a natural female voice
    currentVoice =
        voices.find(v =>
            v.name.includes("Zira") ||
            v.name.includes("Samantha") ||
            v.name.toLowerCase().includes("female")
        ) || voices[0];
}

window.speechSynthesis.onvoiceschanged = loadBestVoice;

function speakAsta(text) {
    if (isMuted) return;

    speechSynthesis.cancel();

    const cleanedText = cleanSpeechText(text);

    const speech = new SpeechSynthesisUtterance(cleanedText);

    speech.rate = 1.05;
    speech.pitch = 1.2;
    speech.volume = 1;

    speechSynthesis.speak(speech);
    
    function cleanSpeechText(text) {

        text = text.replace(/&/g, 'and');
        text = text.replace(/\+/g, 'plus');

        text = text.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '');

        text = text.replace(/[^\w\s.,!?'-]/g, '');

        text = text.replace(/\s+/g, ' ').trim();

        return text;
    }
}

if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";
    recognition.interimResults = true;

    recognition.onresult = function (event) {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
        }
        document.getElementById("astaInput").value = transcript;
    };

    recognition.onerror = function (event) {
        console.error("Voice error:", event.error);
    };
}

function startListening() {
    if (!recognition) return;

    recognition.start();
    isListening = true;
    document.getElementById("micBtn").style.background = "#ef4444"; // red while recording
}

function stopListening() {
    if (!recognition || !isListening) return;

    recognition.stop();
    isListening = false;
    document.getElementById("micBtn").style.background = "#9333ea"; // back to purple

    setTimeout(() => {
        sendAsta();
    }, 500);
}