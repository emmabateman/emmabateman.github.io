"use client";

import { useState, useEffect } from "react";

import { Grid } from "./components/grid";
import { Controls } from "./components/controls";
import { Config, ConfigEditor } from "./components/config";
import { generatePuzzle, Puzzle } from "./generate_puzzle";

import { Footer } from "../../components/footer";

const DEFAULT_SIZE = 9;

export default function Page() {
  const [config, setConfig] = useState<Config>({
    autoComplete: false,
    size: DEFAULT_SIZE,
  });

  const [possibleValues, setPossibleValues] = useState<number[][][]>(
    new Array(config.size).fill(null).map(() =>
      new Array(config.size).fill(
        [...Array(config.size).keys()].map((n) => n + 1) //numbers 1 through size
      )
    )
  );

  const [finalValues, setFinalValues] = useState<number[][]>(
    new Array(config.size)
      .fill(null)
      .map(() => new Array(config.size).fill(null))
  );

  const [errorStates, setErrorStates] = useState<boolean[][]>(
    new Array(config.size)
      .fill(null)
      .map(() => new Array(config.size).fill(false))
  );

  const [history, setHistory] = useState<[number[][][], number[][]][]>([]);

  const [activeSquareId, setActiveSquareId] = useState<string>("");
  const [inputMode, setInputMode] = useState<"final" | "possible">("final"); //TODO: replace with enum

  const [puzzle, setPuzzle] = useState<Puzzle>();

  //generate puzzle on mount
  useEffect(() => {
    setPuzzle(generatePuzzle(DEFAULT_SIZE));
  }, []);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (config.autoComplete == true) {
      for (let i = 0; i < config.size; i++) {
        for (let j = 0; j < config.size; j++) {
          if (finalValues[i][j] != null) {
            updateFinalValue(i, j, finalValues[i][j]);
          } else if (possibleValues[i][j].length == 1) {
            updateFinalValue(i, j, possibleValues[i][j][0]);
          }
        }
      }
    }
  }, [config]);
  /* eslint-enable react-hooks/exhaustive-deps */

  useEffect(() => {
    if (!puzzle) {
      return;
    }

    const newErrorStates = new Array(config.size)
      .fill(null)
      .map(() => new Array(config.size).fill(false));

    //check rows and columns
    for (let i = 0; i < config.size; i++) {
      for (let j = 0; j < config.size; j++) {
        if (finalValues[i][j]) {
          for (let k = 0; k < config.size; k++) {
            if (j != k && finalValues[i][j] == finalValues[i][k]) {
              newErrorStates[i][j] = true;
              newErrorStates[i][k] = true;
            }
            if (i != k && finalValues[i][j] == finalValues[k][j]) {
              newErrorStates[i][j] = true;
              newErrorStates[k][j] = true;
            }
          }
        }
      }
    }

    //check math
    for (const clue of puzzle.clues) {
      const values = clue.indices.map(([i, j]) => finalValues[i][j]);
      if (!values.includes(null)) {
        let reduceFunc: (a: number, b: number) => number;
        switch (clue.operation) {
          case "-":
            reduceFunc = (a: number, b: number) => Math.abs(a - b);
            break;
          case "*":
            reduceFunc = (a: number, b: number) => a * b;
            break;
          case "/":
            reduceFunc = (a: number, b: number) =>
              Math.max(a, b) / Math.min(a, b);
              break;
          default:
            reduceFunc = (a: number, b: number) => a + b;
        }
        if (reduceFunc && values.reduce(reduceFunc) != clue.value) {
          clue.indices.map(([i, j]) => (newErrorStates[i][j] = true));
        }
      }
    }

    setErrorStates(newErrorStates);
  }, [finalValues, puzzle]);

  function generateNewPuzzle() {
    setPossibleValues(
      new Array(config.size).fill(null).map(() =>
        new Array(config.size).fill(
          [...Array(config.size).keys()].map((n) => n + 1) //numbers 1 through size
        )
      )
    );
    setFinalValues(
      new Array(config.size)
        .fill(null)
        .map(() => new Array(config.size).fill(null))
    );
    setPuzzle(generatePuzzle(config.size));
  }

  function updateFinalValue(x: number, y: number, n: number) {
    const newFinalValues = finalValues.slice();
    newFinalValues[x][y] = n;
    setFinalValues(newFinalValues);

    if (config.autoComplete) {
      //remove from possible values in the same row/column
      for (let i = 0; i < config.size; i++) {
        if (i != x) {
          removePossibleValue(i, y, n);
        }
        if (i != y) {
          removePossibleValue(x, i, n);
        }
      }
    }
  }

  function removePossibleValue(x: number, y: number, n: number) {
    if (!possibleValues[x][y].includes(n)) {
      return;
    }

    const values = possibleValues[x][y].slice();
    values.splice(values.indexOf(n), 1);

    const newPossibleValues = possibleValues.slice();
    newPossibleValues[x][y] = values;
    setPossibleValues(newPossibleValues);

    if (config.autoComplete && values.length == 1) {
      updateFinalValue(x, y, values[0]);
    }
  }

  function numberPress(n: number) {
    saveToHistory();
    if (activeSquareId) {
      const [x, y] = activeSquareId.split(",").map((x) => parseInt(x));

      if (inputMode == "final") {
        if (n >= 1 && n <= config.size) {
          updateFinalValue(x, y, n);
        } else if (n == 0) {
          //clear square
          const newFinalValues = finalValues.slice();
          newFinalValues[x][y] = null;
          setFinalValues(newFinalValues);
        }
      } else {
        if (possibleValues[x][y].includes(n)) {
          removePossibleValue(x, y, n);
        } else {
          let values = possibleValues[x][y].slice();
          if (n >= 1 && n <= config.size) {
            values.push(n);
          }
          if (n == 0) {
            //reset possible values
            values = [];
          }

          const newPossibleValues = possibleValues.slice();
          newPossibleValues[x][y] = values;
          setPossibleValues(newPossibleValues);
        }
      }
    }
  }

  function toggleInputMode() {
    if (inputMode == "final") {
      setInputMode("possible");
    } else {
      setInputMode("final");
    }
  }

  function saveToHistory() {
    const possibleValuesCopy = possibleValues.map((x) =>
      x.map((y) => y.map((z) => z))
    );
    const finalValuesCopy = finalValues.map((x) => x.map((y) => y));
    const newHistory = history.slice();
    newHistory.push([possibleValuesCopy, finalValuesCopy]);
    setHistory(newHistory);
  }

  function undo() {
    if (history.length) {
      const newHistory = history.slice();
      const [newPossibleValues, newFinalValues] = newHistory.pop();
      setHistory(newHistory);
      setPossibleValues(newPossibleValues);
      setFinalValues(newFinalValues);
    }
  }

  return (
    <div>
      <div>
        <div className="row">
          <h1>Mathdoku</h1>
          <h3 className="mb-4">My take on a KenKen clone</h3>
        </div>
        <div className="row">
          <div className="col-lg-9">
            <div
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key.match(/[0-9]/g)) {
                  numberPress(parseInt(e.key));
                } else if (e.key == "u") {
                  undo();
                }
              }}
            >
              <Grid
                possibleValues={possibleValues}
                finalValues={finalValues}
                errorStates={errorStates}
                clues={puzzle ? puzzle.clues : []}
                activeSquareId={activeSquareId}
                setActiveSquareId={setActiveSquareId}
                inputMode={inputMode}
                toggleInputMode={toggleInputMode}
              />
              <Controls
                config={config}
                numberPress={numberPress}
                inputMode={inputMode}
                toggleInputMode={toggleInputMode}
                undo={undo}
              />
            </div>
          </div>
          <div className="col-lg-3">
            <h5>Settings</h5>
            <ConfigEditor
              config={config}
              setConfig={setConfig}
              generateNewPuzzle={generateNewPuzzle}
            />
          </div>
        </div>
      </div>
      <Footer gitHubLink="https://github.com/emmabateman/emmabateman.github.io/tree/main/app/mathdoku" />
    </div>
  );
}
