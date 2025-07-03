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
    <div className="row mb-5">
      <div
        className={`btn col-1 d-flex align-items-center justify-content-center ${
          activeIdx <= 0 ? "disabled" : ""
        }`}
        onClick={goToPrevious}
      >
        <h3 className="bi bi-chevron-left text-primary" />
      </div>
      {cards.map((card, i) => (
        <div
          className={`col-10 ${styles.flashcardContainer}`}
          hidden={activeIdx != i}
          key={i}
        >
          <Flashcard front={card.front} back={card.back} />
        </div>
      ))}
      <div
        className={`btn col-1 d-flex align-items-center justify-content-center ${
          activeIdx >= cards.length - 1 ? "disabled" : ""
        }`}
        onClick={goToNext}
      >
        <h3 className="bi bi-chevron-right text-primary" />
      </div>
    </div>
  );
}

export { DeckViewer };
export type { Card };
