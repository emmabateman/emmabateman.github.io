"use client";

import { useState } from "react";

import { DeckList, Deck } from "./components/decklist";
import { DeckViewer, Card } from "./components/deckviewer";
import { DeckEditor } from "./components/deckeditor";

export default function Page() {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [activeDeck, setActiveDeck] = useState<Deck>(undefined);
  const [mode, setMode] = useState<"study" | "edit">("study");

  function updateActiveDeck(deck: Deck) {
    setActiveDeck(deck);
    setDecks(
      decks.map((d) => {
        if (d.uuid == deck.uuid) {
          return deck;
        } else return d;
      })
    );
  }

  return (
    <div className="row">
      <div className="col-md-2">
        <DeckList
          decks={decks}
          setDecks={setDecks}
          setActiveDeck={setActiveDeck}
          setMode={setMode}
        />
      </div>
      <div className="col-md-8" hidden={!activeDeck || mode != "study"}>
        <DeckViewer
          cards={activeDeck ? activeDeck.cards : []}
          key={activeDeck ? activeDeck.uuid : ""}
        />
      </div>
      <div className="col-md-8" hidden={!activeDeck || mode != "edit"}>
        <DeckEditor
          deck={activeDeck}
          setDeck={updateActiveDeck}
          key={activeDeck ? activeDeck.uuid : ""}
        />
      </div>
    </div>
  );
}
