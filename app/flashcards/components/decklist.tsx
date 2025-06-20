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
  deleteDeck,
  setActiveDeck,
  setMode,
}: {
  decks: Deck[];
  setDecks: (decks: Deck[]) => void;
  deleteDeck: (deck: Deck) => void;
  setActiveDeck: (number) => void;
  setMode: (mode: "study" | "edit") => void;
}) {
  const [deletingDeck, setDeletingDeck] = useState<Deck>(undefined);

  function loadDecks() {
    const newDecks = [];

    //load default decks
    newDecks.push({
      uuid: uuidv1(),
      title: "Top 50 Spanish Words",
      cards: spanish_vocab,
    });

    setDecks(newDecks);
  }

  function createNewDeck() {
    const newDeck = {
      uuid: uuidv1(),
      title: "New deck",
      cards: [],
    };
    const newDecks = decks;
    newDecks.push(newDeck);
    setDecks(newDecks);
    setActiveDeck(newDeck);
    setMode("edit");
  }

  useEffect(loadDecks, []);

  console.log(decks);

  return (
    <div>
      <div className="modal fade column" id="deleteModal" tabIndex={-1}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                Are you sure you want to delete{" "}
                {deletingDeck ? deletingDeck.title : ""}?
              </h5>
            </div>
            <div className="modal-body">
              <p>This action cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                No
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => deleteDeck(deletingDeck)}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <ul>
        {decks.map((deck) => (
          <li className="card" key={deck.uuid}>
            <h5
              className="card-title"
              onClick={() => {
                setActiveDeck(deck);
                setMode("study");
              }}
            >
              {deck.title}
            </h5>
            <div className="d-flex flex-row-reverse">
              <button
                className="btn text-danger"
                onClick={() => setDeletingDeck(deck)}
                data-bs-toggle="modal"
                data-bs-target="#deleteModal"
                aria-label="Delete"
              >
                <i className="bi bi-trash" />
              </button>
              <button
                className="btn text-secondary"
                onClick={() => {
                  setActiveDeck(deck);
                  setMode("edit");
                }}
                aria-label="Edit"
              >
                <i className="bi bi-pencil" />
              </button>
            </div>
          </li>
        ))}
        <li className="card" onClick={createNewDeck} key="new">
          <h5 className="card-title">New</h5>
        </li>
      </ul>
    </div>
  );
}

export { DeckList };
export type { Deck };
