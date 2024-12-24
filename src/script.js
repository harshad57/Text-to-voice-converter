let speech = new SpeechSynthesisUtterance();
let voices = [];

let voiceSelect = document.querySelector("select");

window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();

    voiceSelect.innerHTML = '';

    voices.forEach((voice, i) => {
        voiceSelect.options[i] = new Option(voice.name, i);
    });

    if (voices.length > 0) {
        speech.voice = voices[0];
        voiceSelect.selectedIndex = 0;
    }
};

voiceSelect.addEventListener("change", () => {
    if (voices.length > 0) {
        speech.voice = voices[voiceSelect.value];
    }
});

document.querySelector("button").addEventListener("click", () => {
    speech.text = document.querySelector("textarea").value;
    window.speechSynthesis.speak(speech);
});