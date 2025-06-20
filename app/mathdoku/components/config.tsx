"use client";

import { useState, useEffect } from "react";

import { Tooltip, OverlayTrigger } from "react-bootstrap";

interface Config {
  size: number;
  autoComplete: boolean;
}

function ConfigEditor({
  config,
  setConfig,
  generateNewPuzzle,
}: {
  config: Config;
  setConfig: (config: Config) => void;
  generateNewPuzzle: () => void;
}) {
  const [inputDisabled, setInputDisabled] = useState<boolean>(false);

  useEffect(() => {
    setInputDisabled(false);
  }, [config]);

  function toggleAutoComplete() {
    setInputDisabled(true);
    const newConfig = {
      size: config.size,
      autoComplete: config.autoComplete,
    };
    newConfig.autoComplete = !config.autoComplete;
    setConfig(newConfig);
  }

  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-auto p-0">
          <button
            id="autoCompleteToggle"
            className="btn btn-light text-left"
            aria-label="Toggle"
            onClick={toggleAutoComplete}
          >
            <i
              className={`bi ${
                config.autoComplete ? "bi-toggle-on" : "bi-toggle-off"
              } ${inputDisabled ? "disabled" : ""}`}
              style={{ fontSize: "1.5rem" }}
            />
          </button>
        </div>
        <div
          className="col-auto align-content-center p-0"
          label-for="autoCompleteToggle"
        >
          <p className="m-0">Auto Complete</p>
        </div>
        <div className="col-auto align-content-center p-0">
          <OverlayTrigger
            overlay={
              <Tooltip>
                When Auto Complete is enabled, setting a value will eliminate
                matching possible values in the same row and column, and
                removing all but one possible value will cause the remaining
                value to be set.
              </Tooltip>
            }
          >
            <button className="btn btn-link">
              <i className="bi bi-question-circle" />
            </button>
          </OverlayTrigger>
        </div>
      </div>
      <button onClick={generateNewPuzzle}>Generate New</button>
    </div>
  );
}

export { ConfigEditor };
export type { Config };
