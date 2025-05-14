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

  let puzzle : Puzzle;

  //generate puzzle on mount
  useEffect(() => {
    puzzle = generatePuzzle(config.size);
  }, []);

  function numberPress(n: number) {
    if (activeSquareId) {
      let [x, y] = activeSquareId.split(",").map((x) => parseInt(x));
      let newFinalValues = finalValues.slice();
      newFinalValues[x][y] = n;
      setFinalValues(newFinalValues);
    }
  }

  return (
    <div tabIndex="0" onKeyDown={(e) => {
	    if (e.key.match(/[0-9]/g)) {
		    numberPress(e.key)
	    }
        }}>
      <h1>Mathdoku</h1>
      <h3 className="mb-4">My take on a KenKen clone</h3>
      <Grid config={config} possibleValues={possibleValues} finalValues={finalValues}
	    activeSquareId={activeSquareId} setActiveSquareId={setActiveSquareId}/>
      <Controls config={config}/>
    </div>
  );
}
