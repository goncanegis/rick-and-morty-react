import styles from './Spinner.module.css';

function Spinner() {
  return (
    <div className={styles.loader}>
      <img className={styles.spinner} src={require('../assets/portal.png')} />
    </div>
  );
}

export default Spinner;
