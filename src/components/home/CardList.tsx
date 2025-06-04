import React, { useEffect, useRef } from 'react';
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
  onLoadMore?: () => void;
  hasMore?: boolean;
  isSearchMode?: boolean;
  isLoadingMore?: boolean;
}

const CardList: React.FC<CardListProps> = ({
  issues,
  isLoading,
  onLoadMore,
  hasMore = false,
  isSearchMode = false,
  isLoadingMore = false
}) => {
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!onLoadMore || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMore) {
          onLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [onLoadMore, hasMore, isLoadingMore]);

  return (
    <div className={styles.cardListContainer}>
      {isLoading && issues.length === 0 ? (
        <>
          {Array.from({ length: 5 }).map((_, index) => (
            <SkeletonIssueItem key={index} />
          ))}
        </>
      ) : (
        <>
          {issues.map((issue, index) => (
            <IssueItem key={`${issue.issueId}-${index}`} issue={issue} />
          ))}
          {/* 무한 스크롤을 위한 관찰 요소 */}
          {hasMore && (
            <>
              {isLoadingMore && (
                <>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <SkeletonIssueItem key={`loading-${index}`} />
                  ))}
                </>
              )}
              <div ref={observerRef} style={{ height: '20px' }} key="scroll-observer">
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CardList;