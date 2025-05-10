'use client'
import { useState, useEffect } from 'react';
import styles from './styles.module.css'
import { Puzzle, generatePuzzle, SolutionState } from './game_utils'

interface SquareProps {
  x: number;
  y: number;
  value: number;
  selected: boolean;
  handleClick;
}

function Square(props: SquareProps) {
  return (
    <div className={styles.square} onClick={props.handleClick}>
      <div className={`${styles.highlight} ${props.selected ? styles.active : ""}`}>
        <h1>{props.value}</h1>
      </div>
    </div>
  );
}

interface GridProps {
  values: number[][];
}

function Grid(props: GridProps) {
  const [activeSquareId, setActiveSquareId] = useState<string>(""); 

  function handleClick(i: number, j:number) {
    return (() => {
      if (activeSquareId == `${i},${j}`) {
        setActiveSquareId("");
      } else {
        setActiveSquareId(`${i},${j}`);
      }
    });
  }

  return (
    <div className={styles.grid}>
      {props.values.map((row: number[], i: number) => (
        <div className="row flex-column flex-grow-1" key={i}>
          {row.map((col: number | null, j: number) => (
	    <div className="flex-grow-1" key={j}>
	      <Square x={row} y={col} value={col} selected={ activeSquareId == `${i},${j}` }
	              handleClick={handleClick(i, j)}/>
	    </div>
	  ))}
        </div>
      ))}
    </div>
  );
}

function Game() {
  let size = 9;

  const [possibleValues, setPossibleValues] = useState<number[][][]>(
    new Array(size).fill(null).map(() => new Array(size).fill(
      [...Array(size).keys()].map(x => x + 1) //numbers 1 through size
    ))
  );

  const [finalValues, setFinalValues] = useState<number[][]>(
    new Array(size).fill(null).map(() => new Array(size))
  );

  const [history, setHistory] = useState<Array<SolutionState>>([]);

  let puzzle : Puzzle;

  //generate puzzle on mount
  useEffect(() => {
    puzzle = generatePuzzle(size);
  }, []);

  return <Grid values={finalValues} />;
}

export default function Page() {
  return (
    <div>
      <div className="row">
        <h1>Mathdoku for my wife</h1>
      </div>
      <div className="row">
        <h2>My wife wanted a Mathdoku that propagates solutions automatically because
		that would be more satisfying</h2>
      </div>
      <div className="row">
        <Game />
      </div>
    </div>
  );
}
