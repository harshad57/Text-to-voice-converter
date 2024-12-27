import { useState, useEffect } from "react";
import "./index.css";

function App() {
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [text, setText] = useState("");

  useEffect(() => {
    const fetchVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0) setSelectedVoice(availableVoices[0]);
    };

    // Fetch voices on component mount
    window.speechSynthesis.onvoiceschanged = fetchVoices;
    fetchVoices();
  }, []);

  const handleListen = () => {
    if (!text.trim()) return;
    const speech = new SpeechSynthesisUtterance(text);
    speech.voice = selectedVoice;
    window.speechSynthesis.speak(speech);
  };

  return (
    <div className="conver">
      <h1>
        Convert text to <span>Voice</span>
      </h1>
      <div id="fix">
        <textarea
          cols="40"
          rows="10"
          placeholder="Write anything here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </div>
      <br />
      <div className="row">
        <select
          onChange={(e) =>
            setSelectedVoice(voices[e.target.selectedIndex])
          }
        >
          {voices.map((voice, index) => (
            <option key={index} value={voice.name}>
              {voice.name}
            </option>
          ))}
        </select>
        <button onClick={handleListen}>Listen</button>
      </div>
    </div>
  );
}

export default App;