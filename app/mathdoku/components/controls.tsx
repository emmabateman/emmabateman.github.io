interface Config {
  size: number;
  autoSolve: boolean;
}

function Controls({
  config,
  numberPress,
  inputMode,
  toggleInputMode,
}: {
  config: Config;
  numberPress: (n: number) => void;
  inputMode: "final" | "possible";
  toggleInputMode: () => void;
}) {
  return (
    <div className="mt-4 flex-row">
      <button
        className={`btn btn-lg m-1 ${
          inputMode == "final" ? "btn-outline-primary" : "btn-primary"
        }`}
        title="Switch input mode"
        aria-label="Switch input mode"
        onClick={toggleInputMode}
      >
        <i className="bi bi-arrow-left-right"></i>
      </button>
      {[...new Array(config.size).keys()].map((n) => (
        <button
          className={`btn btn-lg m-1 ${
            inputMode == "final" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => {
            numberPress(n + 1);
          }}
          key={n}
        >
          {n + 1}
        </button>
      ))}
      <button
        className={`btn btn-lg m-1 ${
          inputMode == "final" ? "btn-primary" : "btn-outline-primary"
        }`}
        onClick={() => {
          numberPress(0);
        }}
        title="Clear"
        aria-label="Clear"
      >
        <i className="bi bi-x-circle" />
      </button>
    </div>
  );
}

export { Controls };

export type { Config };
