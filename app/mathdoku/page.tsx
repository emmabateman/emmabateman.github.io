'use client'

import { useState, useEffect } from 'react';

import { Grid } from './components/grid';
import { Config, Controls } from './components/controls';
import { generatePuzzle, Puzzle } from './generate_puzzle';

export default function Page() {
  const [config, setConfig] = useState<Config>({ autoSolve: false, size: 9 });

  const [possibleValues, setPossibleValues] = useState<number[][][]>(
    new Array(config.size).fill(null).map(() => new Array(config.size).fill(
      [...Array(config.size).keys()].map(n => n + 1) //numbers 1 through size
    ))
  );

  const [finalValues, setFinalValues] = useState<number[][]>(
    new Array(config.size).fill(null).map(() => new Array(config.size).fill(null))
  );

  const [activeSquareId, setActiveSquareId] = useState<string>("");

  const [puzzle, setPuzzle] = useState<Puzzle>();

  //generate puzzle on mount
  useEffect(() => {
    setPuzzle(generatePuzzle(config.size));
  }, []);

  console.log(puzzle);

  function numberPress(n: number) {
    if (activeSquareId) {
      let [x, y] = activeSquareId.split(",").map((x) => parseInt(x));
      let newFinalValues = finalValues.slice();
      if (n >= 1 && n <= config.size) {
        newFinalValues[x][y] = n;
      }
      if (n == 0) { //clear square
        newFinalValues[x][y] = null;
      }
      setFinalValues(newFinalValues);
    }
  }

  return (
    <div tabIndex="0" onKeyDown={(e) => {
	    if (e.key.match(/[1-9]/g)) {
		    numberPress(e.key)
	    }
        }}>
      <h1>Mathdoku</h1>
      <h3 className="mb-4">My take on a KenKen clone</h3>
      <Grid config={config} possibleValues={possibleValues}
            finalValues={finalValues} clues={puzzle ? puzzle.clues : []}
	    activeSquareId={activeSquareId} setActiveSquareId={setActiveSquareId}/>
      <Controls config={config} numberPress={numberPress}/>
    </div>
  );
}
