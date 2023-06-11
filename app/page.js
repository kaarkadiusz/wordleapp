"use client";

import React, { useState, useEffect } from "react";
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
  const [loading, setLoading] = useState(true);
  const [locale, setLocale] = useState(null);
  const [localeCode, setLocaleCode] = useState(null);
  const [wordset, setWordset] = useState(null);

  useEffect(() => {
    let locale = localStorage.getItem("locale");
    locale = locale === null ? "pl" : locale;
    let wordsetURL = "/locale.json";
    let localeURL = `/words_${locale}.json`;
    Promise.all([fetch(localeURL), fetch(wordsetURL)])
      .then(([localeRes, wordsetRes]) => {
        return Promise.all([localeRes.json(), wordsetRes.json()])
      })
      .then(([wordsetData, localeData]) => {
        setLocale(localeData);
        setLocaleCode(locale);
        setWordset(wordsetData);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
      })
  }, [])
  return (
    <main className="flex flex-col h-screen items-start">
      <button onClick={localeSwitch}>{locale !== null ? locale[localeCode].switch_language : ""}</button>
      {loading && 
      <div className="flex flex-col gap-2 justify-center items-center w-fit m-auto h-full">
        <div
          className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status">
        </div>
        <strong>Loading...</strong>
      </div>}
      {!loading && <WordleGame locale={locale[localeCode]} words={wordset} localeCode={localeCode}/>}
    </main>
  );
}

