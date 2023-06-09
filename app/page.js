"use client";

import React, { useEffect } from "react";
import WordleGame from "@/components/WordleGame";

function localeSwitch() {
  let locale = localStorage.getItem("locale");
  if (locale === "pl" || locale === null) {
    localStorage.setItem("locale", "en");
  } else {
    localStorage.setItem("locale", "pl");
  }
  location.reload(true);
}

export default function Home() {
  return (
    <main className="h-screen overflow-hidden">
      <button onClick={localeSwitch}>Switch language</button>
      <WordleGame/>
    </main>
  );
}

