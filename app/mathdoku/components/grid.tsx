'use client'
import { useState } from 'react';

import styles from '../styles.module.css';

import { Square } from './square';
import { Config } from './controls';
import { Clue } from '../generate_puzzle';

function Grid({ config, possibleValues, finalValues, clues,
	        activeSquareId, setActiveSquareId }:
              { config: Config,
                possibleValues: number[][][],
                finalValues: number[][],
		clues: Clue[],
                activeSquareId: string,
                setActiveSquareId: (id: string) => void}) {

  //clueText is a 2d array of strings the same size as finalValues
  let clueText = finalValues.map((x) => x.map(() => ""));
  console.log(clueText, clueText[0][0]);
  for (let clue of clues) {
    clueText[clue.indices[0][0]][clue.indices[0][1]] =
	    clue.value.toString() + (clue.operation ? clue.operation : "");
  }

  function handleClick(x: number, y: number) {
    return (() => {
      if (activeSquareId == `${x},${y}`) {
        setActiveSquareId("");
      } else {
        setActiveSquareId(`${x},${y}`);
      }	
    });
  }

  function getClueIndicesForSquare(x: number, y:number) : [number, number][] {
    let matchingClue = clues.find((c) =>
      c.indices.find(([i, j]) => (x == i && j == y))
    );
    if (matchingClue) {
      return matchingClue.indices
    }
    return [];
  }

  function getBorderStyles(x: number, y: number) : string[] {
    let indices = getClueIndicesForSquare(x ,y);

    //top border
    let topNeighborIsInClue = indices.find(([i, j]) => (i == x && j == y - 1));
    let rightNeighborIsInClue = indices.find(([i, j]) => (i == x + 1 && j == y));
    let bottomNeighborIsInClue = indices.find(([i, j]) => (i == x && j == y + 1));
    let leftNeighborIsInClue = indices.find(([i, j]) => (i == x - 1 && j == y));

    return [
      topNeighborIsInClue ? "lightgrey" : "black",
      rightNeighborIsInClue ? "lightgrey" : "black",
      bottomNeighborIsInClue ? "lightgrey" : "black",
      leftNeighborIsInClue ? "lightgrey" : "black"
    ];
  }

  return (
    <div className={styles.grid}>
      {finalValues.map((row: number[], i: number) => (
        <div className="row flex-grow-1" key={i}>
	  {row.map((value: number, j: number) => (
	    <div key={j} onClick={handleClick(i, j)}>
	      <Square value={value} borderStyles={getBorderStyles(i, j)}
	              clueText={clueText[i][j]} selected={ activeSquareId == `${i},${j}`}/>
	    </div>
	  ))}
        </div>	
      ))}
    </div>
  );
}

export { Grid };
