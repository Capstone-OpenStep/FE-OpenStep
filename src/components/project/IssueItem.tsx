import React from 'react';
import styles from './IssueItem.module.css';
import star from '../../assets/star.svg'

const IssueItem = () => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.infoList}>
        <div className={styles.issueTitle}>[CI] ILMHistoryItemTests testTruncateLongError failing</div>
        <div className={styles.openedInfo}>elasticsearchmachine opened 18 minutes ago</div>
        <div className={styles.tagContainer}>
          <div className={`${styles.tag}`}>
            <div className={`${styles.tagText}`}>
              :Data Management/ILM+SLM
            </div>
          </div>
          <div className={`${styles.tag}`}>
            <div className={`${styles.tagText}`}>
              &gt;test-failure
            </div>
          </div>
          <div className={`${styles.tag}`}>
            <div className={`${styles.tagText}`}>
              Team:Data Management
            </div>
          </div>
          <div className={`${styles.tag}`}>
            <div className={`${styles.tagText}`}>
              needs:risk
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueItem;
