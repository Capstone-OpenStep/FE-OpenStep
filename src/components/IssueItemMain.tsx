import React from 'react';
import styles from './IssueItemMain.module.css';

const IssueItemMain = () => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardBackground}></div>
      <div className={styles.cardFooter}></div>
      <div className={styles.statusIndicator}></div>
      <div className={styles.languageLabel}>Java</div>
      <div className={styles.starCount}>44.6k</div>
      <div className={styles.issueFromLabel}>Issue from</div>
      <div className={styles.repositoryLabel}>elastic/elasticsearch</div>
      <div className={styles.openedInfo}>
        elasticsearchmachine opened 18 minutes ago
      </div>
      <div className={styles.issueTitle}>
        [CI] ILMHistoryItemTests testTruncateLongError failing
      </div>
      <div className={styles.tagContainer}>
        <div className={`${styles.tag} ${styles.tagDataManagement}`}>
          <div className={`${styles.tagText} ${styles.tagTextDataManagement}`}>
            :Data Management/ILM+SLM
          </div>
        </div>
        <div className={`${styles.tag} ${styles.tagTestFailure}`}>
          <div className={`${styles.tagText} ${styles.tagTextTestFailure}`}>
            &gt;test-failure
          </div>
        </div>
        <div className={`${styles.tag} ${styles.tagTeam}`}>
          <div className={`${styles.tagText} ${styles.tagTextTeam}`}>
            Team:Data Management
          </div>
        </div>
        <div className={`${styles.tag} ${styles.tagNeedsRisk}`}>
          <div className={`${styles.tagText} ${styles.tagTextNeedsRisk}`}>
            needs:risk
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueItemMain;
