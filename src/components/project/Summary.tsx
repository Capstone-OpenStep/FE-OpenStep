import React from 'react';
import styles from './Summary.module.css';
import star from '../../assets/starEmpty.svg';
import eye from '../../assets/eye.svg';
import readMe from '../../assets/readMe.svg';
import branch from '../../assets/branch.svg';
import { RepositoryDescription } from '../../types/repositoryDescription';

interface SummaryProps {
  repository: RepositoryDescription,
  isLoading: boolean,
}


const Summary: React.FC<SummaryProps> = ({ repository, isLoading }) => {
  const formatnumbers = (count: number) => {
    return count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count.toString();
  };

  return (
    <div className={styles.body}>
      <div className={styles.cardContainer}>
        <div className={styles.cardBackground} />
        <div className={styles.cardContent}>
          {isLoading ? (
            <div className={`${styles.titleSkeleton} ${styles.skeleton}`} />
          ) : (
            <a className={styles.title} href={repository.githubUrl}>
              {repository.repoName}
            </a>
          )}

          <div className={styles.details}>
            {isLoading ? (
              <>
                <div className={`${styles.detailSkeleton} ${styles.skeleton}`} />
                <div className={`${styles.detailSkeleton} ${styles.skeleton}`} />
                <div className={`${styles.detailSkeleton} ${styles.skeleton}`} />
                <div className={`${styles.detailSkeleton} ${styles.skeleton}`} />
                <div className={`${styles.detailSkeleton} ${styles.skeleton}`} />
              </>
            ) : (
              <>
                {repository.readmeUrl && (
                  <a className={styles.detailRowStart} href={repository.readmeUrl}>
                    <img src={readMe} alt="Readme" />
                    <div className={styles.detailTextBlue}>Readme</div>
                  </a>
                )}
                <div className={styles.detailRow}>
                  <img src={star} alt="Stars" />
                  <div className={styles.detailTextGray}>{formatnumbers(repository.stars)} stars</div>
                </div>
                <div className={styles.detailRow}>
                  <img src={eye} alt="Watching" />
                  <div className={styles.detailTextGray}>{formatnumbers(repository.watchers)} watching</div>
                </div>
                <div className={styles.detailRow}>
                  <img src={branch} alt="Forks" />
                  <div className={styles.detailTextGray}>{formatnumbers(repository.forks)} forks</div>
                </div>
                <div className={styles.detailRowSpaceBetween}>
                  <img src={branch} alt="Closed Issues" />
                  <div className={styles.detailTextGray}>{formatnumbers(repository.closedIssues)} closed issues</div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;