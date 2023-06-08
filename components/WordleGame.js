"use client";

import { useState, useEffect, useRef } from "react";
import WordleRow from "../components/WordleRow";
import WordleKeyboard from "@/components/WordleKeyboard";
import "./WordleGame.css";

export default function WordleGame() {
  const [overlay, setOverlay] = useState({ visible: false, text: "" });
  const [toast, setToast] = useState({ visible: false, text: "" });
  const toastTimeout = useRef(null);
  const [guesses, setGuesses] = useState(["", "", "", "", "", ""]);
  const [evaluation, setEvaluation] = useState([[], [], [], [], [], []]);
  const [guess, setGuess] = useState(0);
  const [words, setWords] = useState(null);
  const [wordToGuess, setWordToGuess] = useState(null);
  let myObj = {};
  "QWERTYUIOPASDFGHJKLZXCVBNMĄĆĘŁŃÓŚŹŻ".split('').map((x) => {
    myObj[x] = -1;
  });
  const [keyboardState, setKeyboardState] = useState(myObj);
  const [loading, setLoading] = useState(true);

  function pickWordToGuess(data) {
    const word = data[Math.floor(Math.random() * data.length)].word;
    const wordCounter = {};
    for (const letter of word) {
      if (wordCounter[letter] === undefined) wordCounter[letter] = 0;
      wordCounter[letter]++;
    }
    setWordToGuess({ word: word, counter: wordCounter });
  }
  function playerPick() {
    if (!words.some((word) => word.word === guesses[guess])) return -1;

    const currentGuess = [];
    const currentGuessCounter = Object.keys(wordToGuess.counter).reduce(
      (acc, key) => ({ ...acc, [key]: 0 }),
      {}
    );
    for (let i in wordToGuess.word) {
      const a = wordToGuess.word[i];
      const b = guesses[guess][i];
      if (a === b) {
        currentGuess.push(2);
        if (currentGuessCounter[b] === undefined) currentGuessCounter[b] = 0;
        currentGuessCounter[b]++;
      } else {
        currentGuess.push(0);
      }
    }
    for (let i in wordToGuess.word) {
      const a = wordToGuess.word[i];
      const b = guesses[guess][i];
      if (currentGuess[i] === 2) continue;
      if (
        wordToGuess.word.includes(b) &&
        currentGuessCounter[b] !== wordToGuess.counter[b]
      ) {
        currentGuess[i] = 1;
        currentGuessCounter[b]++;
      }
    }
    return currentGuess;
  }
  function giveUp() {
    setGuess(-1);
    setOverlay({
      visible: true,
      text: `Prawidłowym słowem było ${wordToGuess.word.toUpperCase()}`,
    });
  }
  function newGame() {
    setLoading(true);
    pickWordToGuess(words);
    setGuess(0);
    setOverlay((prevState) => ({ ...prevState, visible: false }));
    setGuesses(["", "", "", "", "", ""]);
    setEvaluation([[], [], [], [], [], []]);
    let myObj = {};
    "QWERTYUIOPASDFGHJKLZXCVBNMĄĆĘŁŃÓŚŹŻ".split('').map((x) => {
      myObj[x] = -1;
    });
    setKeyboardState(myObj);
    setLoading(false);
  }
  function updateKeyboardState(word, result) {
    let myObj = {}
    word = word.toUpperCase();
    for (let i = 0; i < result.length; i++) {
      if (myObj[word[i]] === undefined) {
        myObj[word[i]] = Math.max(result[i], keyboardState[word[i]]);
      }
      else {
        myObj[word[i]] = Math.max(myObj[word[i]], result[i], keyboardState[word[i]]);
      }
    }
    setKeyboardState((prevState) => ({...prevState, ...myObj}));
  }
  useEffect(() => {
    if (words !== null) return;
    fetch("/words.json")
      .then((res) => res.json())
      .then((data) => {
        setWords(data);
        pickWordToGuess(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (loading) return;
    const handleKeyDown = (event) => {
      if (guess === -1) return;
      const inputChar = event.key.toLowerCase();
      if (/^[a-ząćęłńóśźż]$/.test(inputChar) && guesses[guess].length < 5) {
        setGuesses((prevGuesses) => {
          const currentGuess = prevGuesses[guess];
          const updatedGuess = currentGuess + inputChar;
          const newGuesses = [...prevGuesses];
          newGuesses[guess] = updatedGuess;
          return newGuesses;
        });
      } else if (inputChar === "backspace" && guesses[guess].length > 0) {
        setGuesses((prevGuesses) => {
          const currentGuess = prevGuesses[guess];
          const updatedGuess = currentGuess.substring(
            0,
            currentGuess.length - 1
          );
          const newGuesses = [...prevGuesses];
          newGuesses[guess] = updatedGuess;
          return newGuesses;
        });
      } else if (inputChar === "enter") {
        if (guesses[guess].length === 5) {
          const result = playerPick();
          updateKeyboardState(guesses[guess], result);
          if (result === -1) {
            setToast({ visible: true, text: "Nie znaleziono słowa" });
            if (toastTimeout.current !== null) {
              clearTimeout(toastTimeout.current);
            }
            toastTimeout.current = setTimeout(() => {
              setToast({ visible: false, text: "Nie znaleziono słowa" });
              toastTimeout.current = null;
            }, 1000);
            return;
          }
          setEvaluation((prevEvaluation) => {
            const newEvaluation = [...prevEvaluation];
            newEvaluation[guess] = result;
            return newEvaluation;
          });
          if (result.every((val) => val === 2)) {
            setGuess(-1);
            setOverlay({
              visible: true,
              text: `${wordToGuess.word.toUpperCase()} jest prawidłowe`,
            });
          } else if (guess === 5) {
            setGuess(-1);
            setOverlay({
              visible: true,
              text: `Prawidłowym słowem było ${wordToGuess.word.toUpperCase()}`,
            });
          } else {
            setGuess((prevGuess) => prevGuess + 1);
          }
        } else {
          setToast({ visible: true, text: "Za krótkie słowo" });
          if (toastTimeout.current !== null) {
            clearTimeout(toastTimeout.current);
          }
          toastTimeout.current = setTimeout(() => {
            setToast({ visible: false, text: "Za krótkie słowo" });
            toastTimeout.current = null;
          }, 1000);
          return;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [guess, guesses, loading]);

  const keyboardCallback = (event) => {
    const keyDownEvent = new KeyboardEvent('keydown', { key: event.target.innerHTML });
    document.dispatchEvent(keyDownEvent);
  }
  const wordleRows = [];
  for (let i = 0; i < 6; i++) {
    wordleRows.push(
      <WordleRow word={guesses[i]} evaluation={evaluation[i]} key={i} />
    );
  }
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <div className="flex flex-col w-fit">
      <header className="mb-1 flex flex-row justify-between">
        <button
          className={`bg-slate-200 hover:bg-slate-400 rounded py-1 px-2 text-black 
        disabled:bg-slate-200 disabled:opacity-50
        focus:active:bg-slate-600
        ${loading ? "blur-sm animate-pulse" : ""}`}
          disabled={overlay.visible || loading}
          onClick={giveUp}
        >
          Poddaj się
        </button>
        <button
          className={`bg-slate-200 hover:bg-slate-400 rounded py-1 px-2 text-black 
        disabled:bg-slate-200 disabled:opacity-50
        focus:active:bg-slate-600
        ${loading ? "blur-sm animate-pulse" : ""}`}
          disabled={loading}
          onClick={newGame}
        >
          Nowa gra
        </button>
      </header>
      <main
        className={`relative flex flex-col justify-center items-center
        ${loading ? "blur-sm animate-pulse" : ""}`}
      >
        {wordleRows}
        <p
          className={`overlay absolute flex justify-center items-center w-full h-full bg-gray-900/80 text-4xl font-bold text-center
        ${overlay.visible ? "opacity-100" : "opacity-0"}`}
        >
          {overlay.text}
        </p>
      </main>
      <footer
        className={`flex justify-center items-center w-full h-16 bg-rose-500 my-2 border-4 border-rose-700 rounded
      ${toast.visible ? "opacity-100" : "opacity-0 toast"}`}
      >
        {toast.text}
      </footer>
      </div>
      <WordleKeyboard keyboardCallback={keyboardCallback} keyboardState={keyboardState}/>
    </div>
  );
}
