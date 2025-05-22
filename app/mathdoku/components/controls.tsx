interface Config {
  size: number;
  autoSolve: boolean;
}

function Controls({ config, numberPress }:
		  { config: Config,
                    numberPress: (n: number) => void}) {
  return (
    <div className="mt-4 flex-row">
      {[...new Array(config.size).keys()].map((n) =>
        <button className="btn btn-primary btn-lg m-1" onClick={() => { numberPress(n + 1) }} key={n}>
          {n + 1}
	</button>
      )}
      <button className="btn btn-primary btn-lg" onClick={() => { numberPress(0) }}>
          <i className="bi bi-x-circle"/>
      </button>
    </div>
  );
}

export { Controls };

export type { Config };