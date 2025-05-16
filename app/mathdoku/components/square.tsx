import styles from '../styles.module.css';

function Square({ value, clueText, clueIndices, selected, borderStyles }:
		{ value: number,
		  clueText: string,
		  clueIndices: [number, number][],
		  selected: boolean,
		  borderStyles: string[]}) {
  return (
    <div className={styles.square} style={{ borderColor: borderStyles.join(" ")}}>
      <div className={`${styles.highlight} ${selected ? styles.active : ""}`}>
        <p className="position-absolute">{clueText}</p>
        <h1>{value}</h1>
      </div>
    </div>
  );
}

export { Square };
