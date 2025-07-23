import React, { useState } from "react";
import './Style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHand } from '@fortawesome/free-solid-svg-icons';

function SayHelloApp() {
  const [name, setName] = useState('');
  const [submitName, setSubmitName] = useState('');
  const [nameList, setNameList] = useState([]); // ✅ isim listesi

  function submitHandler(e) {
    e.preventDefault();
    const trimmedName = name.trim().toLowerCase();

    if (trimmedName) {
      setSubmitName(name);

      if (!nameList.includes(trimmedName)) {
        setNameList([...nameList, trimmedName]);
      }
    }
  }

  return (
    <div className="Background">
      
      {/* ✅ Sayaç kutusu */}
      <div className="Name-Counter">
        👥 Farklı İsim Sayısı: {nameList.length}
      </div>

      <h1 className="Text-Style">
        Hello World <span className="wave">
          <FontAwesomeIcon icon={faHand} style={{ color: "#004c8c" }} />
        </span>
      </h1>
      
      <form className="Form-Container" onSubmit={submitHandler}>
        <div className="Input-Row">
          <label className="Text-Style" htmlFor="nameInput">
            Who Are You?
          </label>
          <input
            id="nameInput"
            className="Input-Box"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <button className="Input-Button" type="submit">
          Gönder
        </button>
      </form>

      {submitName && (
        <p className="Text-Style Message-Text">
          {submitName} says hello!{" "}
          <span className="wave">
            <FontAwesomeIcon icon={faHand} style={{ color: "#004c8c" }} />
          </span>
        </p>
      )}
    </div>
  );
}

export default SayHelloApp;

// Note: Ensure you have the necessary FontAwesome icons installed and imported correctly.
// You can install FontAwesome by running: npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons
// Also, make sure to create a Style.css file with the appropriate styles for the classes used
// in this component.