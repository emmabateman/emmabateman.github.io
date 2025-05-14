'use client'
import { useState } from 'react';

import styles from '../styles.module.css';

import { Square } from './square';
import { Config } from './controls';

function Grid({ config, possibleValues, finalValues,
	        activeSquareId, setActiveSquareId }:
              { config: Config,
                possibleValues: number[][][],
                finalValues: number[][],
                activeSquareId: string,
                setActiveSquareId: (id: string) => void}) {                
  function handleClick(x: number, y: number) {
    return (() => {
      if (activeSquareId == `${x},${y}`) {
        setActiveSquareId("");
      } else {
        setActiveSquareId(`${x},${y}`);
      }	
    });
  }

  return (
    <div className={styles.grid}>
      {finalValues.map((row: number[], i: number) => (
        <div className="row flex-column flex-grow-1" key={i}>
	  {row.map((value: number, j: number) => (
	    <div className="flex-grow-1" key={j} onClick={handleClick(i, j)}>
	      <Square value={value} selected={ activeSquareId == `${i},${j}`}/>
	    </div>
	  ))}
        </div>	
      ))}
    </div>
  );
}

export { Grid };
