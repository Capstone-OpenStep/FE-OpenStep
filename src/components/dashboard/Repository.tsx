import React from 'react';
import Task from './Task';
import star from '../../assets/starGold.svg';
import styles from './Repository.module.css';
import { GroupedTasks } from '../../types/task';

interface RepositoryProps {
  tasks: GroupedTasks;
}

const Repository: React.FC<RepositoryProps> = ({ tasks }) => {

  const formatTimeAgo = (dateString: string): string => {
    const now = new Date();
    const date = new Date(dateString);
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000); // 초 단위

    const units = [
      { label: 'year', seconds: 60 * 60 * 24 * 365 },
      { label: 'month', seconds: 60 * 60 * 24 * 30 },
      { label: 'week', seconds: 60 * 60 * 24 * 7 },
      { label: 'day', seconds: 60 * 60 * 24 },
      { label: 'hour', seconds: 60 * 60 },
      { label: 'minute', seconds: 60 },
    ];

    for (const unit of units) {
      const value = Math.floor(diff / unit.seconds);
      if (value >= 1) return `${value} ${unit.label}${value > 1 ? 's' : ''} ago`;
    }

    return 'just now';
  };

  const formatnumbers = (count: number) => {
    return count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count.toString();
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.repoName}>{tasks.repository}</div>
          <div className={styles.subHeader}>
            <div className={styles.description}>{tasks.description}</div>
            <div className={styles.info}>
              <div className={styles.languageDot} />
              <div className={styles.languageText}>{tasks.language}</div>
              <img src={star} alt="star" />
              <div className={styles.starCount}>{formatnumbers(tasks.starCount)}</div>
              <div className={styles.updated}>updated {formatTimeAgo(tasks.last_github_update)}</div>
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
