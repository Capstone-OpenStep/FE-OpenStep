import React from 'react';
import styles from './IssueItem.module.css';
import star from '../../assets/star.svg'

const IssueItem = () => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardBackground}></div>
      <div className={styles.issueTitle}>
        [CI] ILMHistoryItemTests testTruncateLongError failing
      </div>
      <div className={styles.openedInfo}>
        Elasticsearch 8.12에서 max_concurrent_shard_requests 설정이 비동기 검색(async search)에서 적용되지 않아, 설정했음에도 제한 없이 샤드 요청이 발생하는 문제입니다. 현재 이 설정은 동기 검색에만 영향을 미칩니다.
      </div>
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
      <div className={styles.cardFooter}>
        <div className={styles.footerLeft}>
          <span className={styles.issueFromLabel}>Issue from</span>
          <span className={styles.repositoryLabel}>elastic/elasticsearch</span>
          <span className={styles.issueFromLabel}>18 minutes ago</span>
        </div>
        <div className={styles.footerCenter}>
          <span className={styles.statusIndicator}></span>
          <span className={styles.languageLabel}>Java</span>
        </div>
        <div className={styles.footerRight}>
          <img src={star}></img>
          <span className={styles.starCount}>44.6k</span>
        </div>
      </div>
    </div>
  );
};

export default IssueItem;
