import styles from "./LoadingState.module.css";

function Spinner() {
  return (
    <div class={styles.ring}>
      Loading
      <span className={styles.spans}></span>
    </div>
  );
}

export default Spinner;
