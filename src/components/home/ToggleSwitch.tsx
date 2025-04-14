import React from 'react';
import styles from './ToggleSwitch.module.css';

interface ToggleSwitchProps {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ active, setActive }) => {
  const toggle = () => {
    setActive((prev) => !prev);
  };

  return (
    <div onClick={toggle} className={styles.container}>
      <div className={styles.background}></div>
      <div className={`${styles.slider} ${active ? styles.sliderActive : styles.sliderInactive}`}></div>
      <div className={`${styles.repoText} ${active ? styles.repoActive : styles.repoInactive}`}>
        레포지토리
      </div>
      <div className={`${styles.issueText} ${active ? styles.issueActive : styles.issueInactive}`}>
        이슈
      </div>
    </div>
  );
};

export default ToggleSwitch;
