import styles from '../styles.module.css';

function Square({ value, selected, handleClick }:
		{ value: number, selected: boolean }) {
  return (
    <div className={styles.square}>
      <div className={`${styles.highlight} ${selected ? styles.active : ""}`}>
        <h1>{value}</h1>
      </div>
    </div>
  );
}

export { Square };
