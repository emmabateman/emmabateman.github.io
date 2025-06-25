"use client";

import { useState } from "react";

import { DeckList, Deck } from "./components/decklist";
import { DeckViewer } from "./components/deckviewer";
import { DeckEditor } from "./components/deckeditor";

import { Footer } from "../../components/footer";

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

  function deleteDeck(deck: Deck) {
    if (activeDeck && deck.uuid == activeDeck.uuid) {
      setActiveDeck(undefined);
    }
    setDecks(decks.filter((d) => d.uuid != deck.uuid));
  }

  return (
    <div>
      <div className="row d-flex flex-row-reverse">
        <div className="col-lg-8" hidden={!activeDeck || mode != "study"}>
          <DeckViewer
            cards={activeDeck ? activeDeck.cards : []}
            key={activeDeck ? activeDeck.uuid : ""}
          />
        </div>
        <div className="col-lg-8" hidden={!activeDeck || mode != "edit"}>
          <DeckEditor
            deck={activeDeck}
            setDeck={updateActiveDeck}
            key={activeDeck ? activeDeck.uuid : ""}
          />
        </div>
        <div className="col-lg-8" hidden={activeDeck != undefined}></div>
        <div className="col-lg-4">
          <DeckList
            decks={decks}
            setDecks={setDecks}
            deleteDeck={deleteDeck}
            setActiveDeck={setActiveDeck}
            setMode={setMode}
          />
        </div>
      </div>
      <Footer
        gitHubLink="https://github.com/emmabateman/emmabateman.github.io/tree/main/app/flashcards"
        addtlContent={
          <div className="flex-row align-items-center">
            <a href="https://www.vecteezy.com/free-vector/lined-paper-texture">
              Lined Paper Texture Vectors by Vecteezy
            </a>
          </div>
        }
      />
    </div>
  );
}
