"use client";

import { useState } from "react";

import { Flashcard } from "./flashcard";

import styles from "../styles.module.css";

interface Card {
  front: string;
  back: string;
}

function DeckViewer({ cards }: { cards: Card[] }) {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  function goToPrevious() {
    if (activeIdx > 0) {
      setActiveIdx(activeIdx - 1);
    }
  }

  function goToNext() {
    if (activeIdx < cards.length - 1) {
      setActiveIdx(activeIdx + 1);
    }
  }

  return (
    <div className="row">
      <div
        className={`btn col-md-1 ${activeIdx <= 0 ? "disabled" : ""}`}
        onClick={goToPrevious}
      >
        <i className="bi bi-chevron-left" />
      </div>
      {cards.map((card, i) => (
        <div
          className={styles.flashcardContainer}
          hidden={activeIdx != i}
          key={i}
        >
          <Flashcard front={card.front} back={card.back} />
        </div>
      ))}
      <div
        className={`btn col-md-1 ${
          activeIdx >= cards.length - 1 ? "disabled" : ""
        }`}
        onClick={goToNext}
      >
        <i className="bi bi-chevron-right" />
      </div>
    </div>
  );
}

export { DeckViewer };
export type { Card };
