function Controls({
  size,
  numberPress,
  inputMode,
  toggleInputMode,
  undo,
}: {
  size: number;
  numberPress: (n: number) => void;
  inputMode: "final" | "possible";
  toggleInputMode: () => void;
  undo: () => void;
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
      {[...new Array(size).keys()].map((n) => (
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
      <button
        className={`btn btn-lg m-1 btn-secondary`}
        onClick={undo}
        title="Undo"
        aria-label="Undo"
      >
        <i className="bi bi-arrow-counterclockwise" />
      </button>
    </div>
  );
}

export { Controls };
