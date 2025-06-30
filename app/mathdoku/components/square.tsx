import styles from "../styles.module.css";

function Square({
  value,
  possibleValues,
  clueText,
  selected,
  borderStyles,
  inputMode,
  hasError,
}: {
  value: number;
  possibleValues: number[];
  clueText: string;
  selected: boolean;
  borderStyles: string[];
  inputMode: "final" | "possible";
  hasError: boolean;
}) {
  return (
    <div
      className={styles.square}
      style={{ borderColor: borderStyles.join(" ") }}
    >
      <div
        className={`${styles.highlight} ${selected ? styles.active : ""} ${
          inputMode == "possible" ? styles.guessMode : ""
        }`}
      >
        <div className={styles.clueText}>
          <p className="position-absolute">{clueText}</p>
          <p hidden={!hasError} className="text-danger text-end">
            *
          </p>
        </div>
        <div hidden={value > 0} className={styles.possibleValuesGrid}>
          <div className={`row row-cols-3 g-0 ${styles.possibleValuesRow}`}>
            {[...Array(9).keys()].map((n) => (
              <div className={`col g-0 m-0 ${styles.possibleValue}`} key={n}>
                {possibleValues.includes(n + 1) ? n + 1 : ""}
              </div>
            ))}
          </div>
        </div>
        <p className={`${styles.valueText} ${hasError ? "text-danger" : ""}`}>
          {value}
        </p>
      </div>
    </div>
  );
}

export { Square };
