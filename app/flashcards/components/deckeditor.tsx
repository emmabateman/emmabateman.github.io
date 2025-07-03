"use client";

import { Deck } from "./decklist";

import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function DeckEditor({
  deck,
  setDeck,
}: {
  deck: Deck;
  setDeck: (deck: Deck) => void;
}) {
  function updateTitle(title: string) {
    if (deck) {
      const newDeck = deck;
      newDeck.title = title;
      setDeck(newDeck);
    }
  }

  function addCard() {
    if (deck) {
      const newDeck = deck;
      newDeck.cards.push({ front: "", back: "" });
      setDeck(newDeck);
    }
  }

  function updateFront(content: string, cardNo: number) {
    if (deck) {
      const newDeck = deck;
      newDeck.cards[cardNo].front = content;
      setDeck(newDeck);
    }
  }

  function updateBack(content: string, cardNo: number) {
    if (deck) {
      const newDeck = deck;
      newDeck.cards[cardNo].back = content;
      setDeck(newDeck);
    }
  }

  return (
    <div>
      <label htmlFor="titleInput" className="form-label">
        Title
      </label>
      <input
        className="form-control mx-4 w-75"
        id="titleInput"
        value={deck ? deck.title : ""}
        onChange={(e) => updateTitle(e.target.value)}
      ></input>
      {deck
        ? deck.cards.map((card, idx) => (
            <div key={idx} className="card m-4 p-4">
              <label htmlFor={`card${idx}Front`} className="form-label">
                Front
              </label>
              {/*TODO: replace with rich text editor*/}
              <input
                className="form-control"
                id={`card${idx}Front`}
                value={card.front}
                onChange={(e) => updateFront(e.target.value, idx)}
              ></input>
              <label htmlFor={`card${idx}Back`} className="form-label">
                Back
              </label>
              <input
                className="form-control"
                id={`card${idx}Back`}
                value={card.back}
                onChange={(e) => updateBack(e.target.value, idx)}
              ></input>
            </div>
          ))
        : []}
      <button className="btn btn-primary mt-3" onClick={addCard}>
        <i className="bi bi-plus" />
        Add Card
      </button>
    </div>
  );
}

export { DeckEditor };
