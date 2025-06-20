import { useEffect, useState } from "react";
import { v1 as uuidv1 } from "uuid";

import { Card } from "./deckviewer";

import spanish_vocab from "../assets/data";

interface Deck {
  uuid: string;
  title: string;
  cards: Card[];
}

function DeckList({
  decks,
  setDecks,
  setActiveDeck,
  setMode,
}: {
  decks: Deck[],
  setDecks: (decks: Deck[]) => void,
  setActiveDeck: (number) => void,
  setMode: (mode: 'study'|'edit') => void
}) {
  function loadDecks() {
    let newDecks = [];

    //load default decks
    newDecks.push({ title: "Top 50 Spanish Words", cards: spanish_vocab });

    setDecks(newDecks);
  }

  function createNewDeck() {
    let newDeck = { uuid: uuidv1(), title: "New deck", cards: [{front: "hello", back: "world"}]}
    let newDecks = decks;
    newDecks.push(newDeck);
    setDecks(newDecks);
    setActiveDeck(newDeck);
    setMode('edit');
  }

  useEffect(loadDecks, []);

  return (
    <ul>
      {decks.map((deck) => (
        <li
          className="card"
          onClick={() => {
            setActiveDeck(deck);
            setMode('study');
          }}
          key={deck.uuid}
        >
          <h5 className="card-title">{deck.title}</h5>
        </li>
      ))}
      <li className="card" onClick={createNewDeck}><h5 className="card-title">New</h5></li>
    </ul>
  );
}

export { DeckList };
export type { Deck };
