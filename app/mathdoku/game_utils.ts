import { useState } from 'react';

interface Clue {
  indices: [number, number][];
  operation?: '+|-|/|*';
  value: number;
}

interface Puzzle {
  solution: number[][];
  clues: Clue[];
}

interface SolutionState {
  finalValues: number[][];
  possibleValues: number[][][];
}

function setSolutionValue(
	possibleValues: number[][][],
	finalValues: number[][],
	x: number,
	y: number,
	value: number) {
  //do not overwrite
  if (finalValues[x][y] != null) {
    return;
  }
		
  finalValues[x][y] = value;

  //remove from possibilities in same row/column 
  for (let i = 0; i < possibleValues.length; i++) {
    for (let j = 0; j < possibleValues.length; j++) {	    
      if (i == x || j == y) { //same row and/or column
        if (finalValues[i][j] == null && possibleValues[i][j].includes(value)) {
          possibleValues[i][j] = possibleValues[i][j].filter(n => n != value);
          if (possibleValues[i][j].length == 1) {
	    setSolutionValue(possibleValues, finalValues, i, j, possibleValues[i][j][0]);
	  }
	}
      }
    }
  }
}

function generateSolution(size: number) {
  let possibleValues =
    new Array(size).fill(null).map(() => new Array(size).fill(
      [...Array(size).keys()].map(x => x + 1) //numbers 1 through size
    ));

  let finalValues = new Array(size).fill(null).map(() => new Array(size));

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let values = possibleValues[i][j];
      if (values.length > 1) {
        //set to random value
	let randomValue = possibleValues[i][j][Math.floor(Math.random() * values.length)];
	setSolutionValue(possibleValues, finalValues, i, j, randomValue);
      }
    }
  }
  return finalValues;
}

export function generatePuzzle(size: number) : Puzzle {
  let puzzle : Puzzle = { solution: generateSolution(size), clues: []};
  return puzzle;
}
