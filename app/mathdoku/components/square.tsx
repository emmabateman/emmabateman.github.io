import styles from "../styles.module.css";

function Square({
  value,
  possibleValues,
  clueText,
  selected,
  borderStyles,
  inputMode,
}: {
  value: number;
  possibleValues: number[];
  clueText: string;
  selected: boolean;
  borderStyles: string[];
  inputMode: "final" | "possible";
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
        <p className="position-absolute">{clueText}</p>
        <div hidden={value > 0} className={styles.possibleValuesGrid}>
          <div className={`row row-cols-3 g-0 ${styles.possibleValuesRow}`}>
            {[...Array(9).keys()].map((n) => (
              <div className={`col g-0 m-0 ${styles.possibleValue}`} key={n}>
                {possibleValues.includes(n + 1) ? n + 1 : ""}
              </div>
            ))}
          </div>
        </div>
        <h1>{value}</h1>
      </div>
    </div>
  );
}

export { Square };
