import { useState } from "react";

const numClues = 27;
const maxClueSize = 5;

interface Clue {
  indices: [number, number][];
  operation?: "+" | "-" | "/" | "*";
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
  value: number
) {
  //do not overwrite
  if (finalValues[x][y] != null) {
    return;
  }

  finalValues[x][y] = value;

  //remove from possibilities in same row/column
  for (let i = 0; i < possibleValues.length; i++) {
    for (let j = 0; j < possibleValues.length; j++) {
      if (i == x || j == y) {
        //same row and/or column
        if (finalValues[i][j] == null && possibleValues[i][j].includes(value)) {
          possibleValues[i][j] = possibleValues[i][j].filter((n) => n != value);
          if (possibleValues[i][j].length == 1) {
            setSolutionValue(
              possibleValues,
              finalValues,
              i,
              j,
              possibleValues[i][j][0]
            );
          }
        }
      }
    }
  }
}

function generateSolution(size: number): number[][] {
  let possibleValues = new Array(size).fill(null).map(() =>
    new Array(size).fill(
      [...Array(size).keys()].map((x) => x + 1) //numbers 1 through size
    )
  );

  let finalValues = new Array(size).fill(null).map(() => new Array(size));

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let values = possibleValues[i][j];
      if (values.length > 1) {
        //set to random value
        let randomValue =
          possibleValues[i][j][Math.floor(Math.random() * values.length)];
        setSolutionValue(possibleValues, finalValues, i, j, randomValue);
      }
    }
  }
  return finalValues;
}

function generateClues(size: number, solution: number[][]): Clue[] {
  // start with single-box clues
  let clues: Clue[] = [];
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      clues.push({ indices: [[i, j]], value: solution[i][j] });
    }
  }

  //merge clues
  while (clues.length > numClues) {
    let clue1 = clues.splice(Math.floor(Math.random() * clues.length), 1)[0];
    let clue2 = clues.splice(Math.floor(Math.random() * clues.length), 1)[0];

    if (clue1.indices.length + clue2.indices.length > maxClueSize) {
      //merged clue would be too big, put back
      clues.push(clue1);
      clues.push(clue2);
      continue;
    }

    let areAdjacent = false;
    for (let idx1 of clue1.indices) {
      for (let idx2 of clue2.indices) {
        //check if squares are neighboring horizontally
        if (idx1[0] == idx2[0] && Math.abs(idx1[1] - idx2[1]) == 1) {
          areAdjacent = true;
        }
        //check if squares are neighboring vertically
        if (idx1[1] == idx2[1] && Math.abs(idx1[0] - idx2[0]) == 1) {
          areAdjacent = true;
        }
      }
    }

    if (!areAdjacent) {
      //can't merge non-adjacent clues, put back
      clues.push(clue1);
      clues.push(clue2);
      continue;
    }

    let mergedClue: Clue = {
      indices: clue1.indices.concat(clue2.indices).sort((a, b) => {
        if (a[0] != b[0]) {
          return a[0] - b[0];
        }
        return a[1] - b[1];
      }),
      value: 0,
    };

    let possibleOperations: Array<"+" | "-" | "*" | "/"> = ["+", "*"]; //any clue can have commutative operations
    if (mergedClue.indices.length == 2) {
      possibleOperations.push("-");

      if (
        Math.max(clue1.value, clue2.value) %
          Math.min(clue1.value, clue2.value) ==
        0
      ) {
        // one value divides into the other
        possibleOperations.push("/");
      }
    }

    mergedClue.operation =
      possibleOperations[Math.floor(Math.random() * possibleOperations.length)];
    switch (mergedClue.operation) {
      case "+":
        mergedClue.value = mergedClue.indices
          .map(([x, y]) => solution[x][y])
          .reduce((a, b) => a + b);
        break;
      case "*":
        mergedClue.value = mergedClue.indices
          .map(([x, y]) => solution[x][y])
          .reduce((a, b) => a * b);
        break;
      case "-":
        mergedClue.value =
          Math.max(clue1.value, clue2.value) -
          Math.min(clue1.value, clue2.value);
        break;
      case "/":
        mergedClue.value =
          Math.max(clue1.value, clue2.value) /
          Math.min(clue1.value, clue2.value);
        break;
    }

    clues.push(mergedClue);
  }

  return clues;
}

function generatePuzzle(size: number): Puzzle {
  let puzzle: Puzzle = { solution: generateSolution(size), clues: [] };
  puzzle.clues = generateClues(size, puzzle.solution);
  return puzzle;
}

export { generatePuzzle };
export type { Clue, Puzzle };
