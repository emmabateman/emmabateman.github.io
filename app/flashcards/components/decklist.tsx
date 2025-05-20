import { useEffect, useState } from "react";

import { Card } from "./deck";

import spanish_vocab from "../assets/data";

interface Deck {
  title: string;
  cards: Card[];
}

function DeckList({
  setActiveDeck,
}: {
  setActiveDeck: (cards: Card[]) => void;
}) {
  const [decks, setDecks] = useState<Deck[]>([]);

  function loadDecks() {
    let newDecks = [];

    //load default decks
    newDecks.push({ title: "Top 50 Spanish Words", cards: spanish_vocab });

    setDecks(newDecks);
  }

  function createNewDeck() {
    let newDeck = { title: "New deck", cards: [{front: "hello", back: "world"}]}
    let newDecks = decks;
    newDecks.push(newDeck);
    setDecks(newDecks);
    setActiveDeck(newDeck.cards);
  }

  useEffect(loadDecks, []);

  return (
    <ul>
      {decks.map((deck) => (
        <li
          className="card"
          onClick={() => {
            setActiveDeck(deck.cards);
          }}
          key={deck.title}
        >
          <h5 className="card-title">{deck.title}</h5>
        </li>
      ))}
      <li className="card" onClick={createNewDeck}><h5 className="card-title">New</h5></li>
    </ul>
  );
}

export { DeckList };
