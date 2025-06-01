import React from 'react';
import styles from './CardList.module.css';
import ToggleSwitch from './ToggleSwitch';
import Repository from './Repository';
import IssueItem from './IssueItem'
import { Repository as RepoType } from '../../types/repository';
import { Issue as IssueType } from '../../types/issue';


const SkeletonIssueItem: React.FC = () => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.titleSkeleton}></div>
      <div className={styles.summarySkeleton}></div>
      <div className={styles.tagsSkeleton}>
        <div className={styles.tag}></div>
        <div className={styles.tag}></div>
        <div className={styles.tag}></div>
      </div>
      <div className={styles.footerSkeleton}></div>
    </div>
  );
};

interface CardListProps {
  issues: IssueType[];
  isLoading: boolean;
}

const CardList: React.FC<CardListProps> = ({ issues, isLoading }) => {
  return (
    <div className={styles.cardListContainer}>
      {isLoading ? (
        <>
          {Array.from({ length: 5 }).map((_, index) => (
            <SkeletonIssueItem key={index} />
          ))}
        </>
      ) : (
        <>
          {issues.map((issue) => (
            <IssueItem key={issue.issueId} issue={issue} />
          ))}
        </>
      )}
    </div>
  );
};

export default CardList;
