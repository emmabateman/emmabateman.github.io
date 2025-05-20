"use client";

import { useState } from "react";

import { Deck, Card } from "./components/deck";
import { DeckList } from "./components/decklist";

export default function Page() {
  const [activeDeck, setActiveDeck] = useState<Card[]>([]);

  return (
    <div className="row">
      <div className="col-md-2">
        <DeckList setActiveDeck={setActiveDeck} />
      </div>
      <div className="col-md-8">
        <Deck cards={activeDeck} />
      </div>
    </div>
  );
}
