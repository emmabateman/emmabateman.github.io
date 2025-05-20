import { Deck, Card } from "./components/deck";

const cards: Card[] = [
  { front: "Hello", back: "World" },
  { front: "Foo", back: "Bar" },
];

export default function Page() {
  return (
    <div>
      <Deck cards={cards} />
    </div>
  );
}
