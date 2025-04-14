import React from 'react';
import styles from './Summary.module.css';
import star from '../../assets/starEmpty.svg';
import eye from '../../assets/eye.svg';
import readMe from '../../assets/readMe.svg';
import branch from '../../assets/branch.svg';

const Summary: React.FC = () => {
  return (
    <div className={styles.body}>
      <div className={styles.cardContainer}>
        <div className={styles.cardBackground} />
        <div className={styles.cardContent}>
          <div className={styles.title}>netlify/cli</div>
          <div className={styles.details}>
            <div className={styles.detailRowStart}>
              <img src={readMe} alt="Readme" />
              <div className={styles.detailTextBlue}>Readme</div>
            </div>
            <div className={styles.detailRow}>
              <img src={star} alt="Stars" />
              <div className={styles.detailTextGray}>3.5k stars</div>
            </div>
            <div className={styles.detailRow}>
              <img src={eye} alt="Watching" />
              <div className={styles.detailTextGray}>131 watching</div>
            </div>
            <div className={styles.detailRow}>
              <img src={branch} alt="Forks" />
              <div className={styles.detailTextGray}>735 forks</div>
            </div>
            <div className={styles.detailRow}>
              <img src={branch} alt="Open Issues" />
              <div className={styles.detailTextGray}>191 open issues</div>
            </div>
            <div className={styles.detailRowSpaceBetween}>
              <img src={branch} alt="Closed Issues" />
              <div className={styles.detailTextGray}>1152 closed issues</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;