import React from 'react';
import Task from './Task';
import star from '../../assets/starGold.svg';
import styles from './Repository.module.css';
import { GroupedTasks } from '../../types/task';

interface RepositoryProps {
  tasks: GroupedTasks;
}

const Repository: React.FC = () => {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.repoName}>torvalds/linux</div>
          <div className={styles.subHeader}>
            <div className={styles.description}>linux kernel source tree</div>
            <div className={styles.info}>
              <div className={styles.languageDot} />
              <div className={styles.languageText}>c/c++</div>
              <img src={star} alt="star" />
              <div className={styles.starCount}>190k</div>
              <div className={styles.updated}>updated 2 weeks ago</div>
            </div>
          </div>
        </div>
        <div className={styles.taskGrid}>
          <Task />
          <Task />
          <Task />
        </div>
        <div
          data-option="새로고침+포인트"
          className={styles.moreButton}
        >
          <div className={styles.moreText}>MORE</div>
        </div>
      </div>
    </div>
  );
};

export default Repository;
