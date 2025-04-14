import React from 'react';
import styles from './WorkCounter.module.css';

interface CounterProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

const WorkCounter: React.FC<CounterProps> = ({ count, setCount }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setCount(value);
    } else if (value < 0) {
      setCount(0);
    }
  };

  return (
    <div className={styles.workCounterContainer}>
      <div className={styles.workCounterBackground} />
      <div className={styles.workCounterInputWrapper}>
        <input
          type="number"
          value={count}
          onChange={handleInputChange}
          className={styles.workCounterInput}
        />
      </div>
      <div
        onClick={() => setCount((prev) => (prev > 0 ? prev - 1 : 0))}
        className={styles.workCounterLeftButton}
      >
        <div className={styles.workCounterLeftButtonText}>-</div>
      </div>
      <div
        onClick={() => setCount(count + 1)}
        className={styles.workCounterRightButton}
      >
        <div className={styles.workCounterRightButtonText}>+</div>
      </div>
    </div>
  );
};


export default WorkCounter;