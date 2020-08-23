import React, { useState, useEffect, useRef } from "react";

export default function App() {
  const [text, setText] = useState("");
  const [time, setTime] = useState(10);
  const [wordCount, setWordCount] = useState(0);
  const [isTimeRunning, setIsTimeRunning] = useState(false);
  const inputRef = useRef(null);

  function startGame() {
    setTime(10);
    setIsTimeRunning(true);
    inputRef.current.focus();
    setText("");
  }

  function endGame() {
    setIsTimeRunning(false);
    countWords(text);
  }

  useEffect(() => {
    if (time && isTimeRunning > 0) {
      setTimeout(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else {
      endGame();
    }
  }, [time, isTimeRunning]);

  function countWords(text) {
    const sanitizedWords = text.trim().split(" ");
    const filteredWords = sanitizedWords.filter((word) => word !== "").length;
    setWordCount(filteredWords);
  }

  const handleChange = (e) => {
    const { value } = e.target;
    setText(value);
  };

  return (
    <div>
      <h1>How Fast Can You Type?</h1>
      <textarea
        disabled={!isTimeRunning}
        ref={inputRef}
        value={text}
        onChange={handleChange}
      />
      <h3>Time remaining: {time}</h3>
      <h2>Word Count: {wordCount}</h2>
      <button disabled={isTimeRunning} onClick={startGame}>
        Start Game
      </button>
    </div>
  );
}
