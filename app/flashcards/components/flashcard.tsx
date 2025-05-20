"use client";

import { useState } from "react";

import styles from "../styles.module.css";

function Flashcard({ front, back }: { front: string; back: string }) {
  const [flipped, setFlipped] = useState<boolean>(false);
  return (
      <div
        className={`card justify-content-center ${styles.flashcard} ${flipped ? styles.flipped : ""}`}
        onClick={() => setFlipped(!flipped)}
      >
          <div className={`card-body ${styles.flashcardBody}`}>
            {front}
          </div>
          <div className={`card-body ${styles.flashcardBody} ${styles.flipped}`}>
            {back}
          </div>
      </div>
  );
}

export { Flashcard };
