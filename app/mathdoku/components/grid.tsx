"use client";

import styles from "../styles.module.css";

import { Square } from "./square";
import { Clue } from "../generate_puzzle";

function Grid({
  possibleValues,
  finalValues,
  clues,
  activeSquareId,
  setActiveSquareId,
  inputMode,
  toggleInputMode,
}: {
  possibleValues: number[][][];
  finalValues: number[][];
  clues: Clue[];
  activeSquareId: string;
  setActiveSquareId: (id: string) => void;
  inputMode: "final" | "possible";
  toggleInputMode: () => void;
}) {
  //clueText is a 2d array of strings the same size as finalValues
  const clueText = finalValues.map((x) => x.map(() => ""));
  console.log(clueText, clueText[0][0]);
  for (const clue of clues) {
    clueText[clue.indices[0][0]][clue.indices[0][1]] =
      clue.value.toString() + (clue.operation ? clue.operation : "");
  }

  function handleClick(x: number, y: number) {
    return () => {
      if (activeSquareId == `${x},${y}`) {
        toggleInputMode();
      } else {
        setActiveSquareId(`${x},${y}`);
      }
    };
  }

  function getClueIndicesForSquare(x: number, y: number): [number, number][] {
    const matchingClue = clues.find((c) =>
      c.indices.find(([i, j]) => x == i && j == y)
    );
    if (matchingClue) {
      return matchingClue.indices;
    }
    return [];
  }

  function getBorderStyles(x: number, y: number): string[] {
    const indices = getClueIndicesForSquare(x, y);

    //top border
    const topNeighborIsInClue = indices.find(([i, j]) => i == x && j == y - 1);
    const rightNeighborIsInClue = indices.find(
      ([i, j]) => i == x + 1 && j == y
    );
    const bottomNeighborIsInClue = indices.find(
      ([i, j]) => i == x && j == y + 1
    );
    const leftNeighborIsInClue = indices.find(([i, j]) => i == x - 1 && j == y);

    return [
      topNeighborIsInClue ? "lightgrey" : "black",
      rightNeighborIsInClue ? "lightgrey" : "black",
      bottomNeighborIsInClue ? "lightgrey" : "black",
      leftNeighborIsInClue ? "lightgrey" : "black",
    ];
  }

  return (
    <div className={styles.grid}>
      {finalValues.map((row: number[], i: number) => (
        <div className="row flex-grow-1" key={i}>
          {row.map((value: number, j: number) => (
            <div key={j} onClick={handleClick(i, j)}>
              <Square
                value={value}
                possibleValues={possibleValues[i][j]}
                borderStyles={getBorderStyles(i, j)}
                clueText={clueText[i][j]}
                selected={activeSquareId == `${i},${j}`}
                inputMode={inputMode}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export { Grid };
