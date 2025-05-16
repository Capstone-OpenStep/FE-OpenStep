import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './IssueItem.module.css';
import star from '../../assets/star.svg'
import { Issue as IssueType } from '../../types/issue';

const extractRepoName = (url: string): string => {
  const match = url.match(/github\.com\/([^/]+\/[^/]+)\//);
  return match ? match[1] : 'unknown/repo';
};

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

interface Props {
  issue: IssueType;
}

const IssueItem: React.FC<Props> = ({ issue }) => {
  const navigate = useNavigate();
  const onClickContainer = () => {
    navigate(`/issue`);
  };
  const repoFullName = extractRepoName(issue.url); // ex: freeCodeCamp/freeCodeCamp
  const timeAgo = formatTimeAgo(issue.createdAt);

  return (
    <div className={styles.cardContainer} onClick={onClickContainer}>
      
      <div className={styles.issueTitle}>
        {issue.title}
      </div>
      <div className={styles.openedInfo}>
        {issue.summary}
      </div>
      <div className={styles.tagContainer}>
        {issue.labels.map((label, index) => (
          <div key={index} className={styles.tag}>
            <div className={styles.tagText}>{label}</div>
          </div>
        ))}
      </div>
      <div className={styles.cardFooter}>
        <div className={styles.footerLeft}>
          <span className={styles.issueFromLabel}>Issue from</span>
          <span className={styles.repositoryLabel}>{repoFullName}</span>
          <span className={styles.issueFromLabel}>{timeAgo}</span>
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
