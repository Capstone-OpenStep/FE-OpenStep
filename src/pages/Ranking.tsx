import React from 'react';
import styles from './Ranking.module.css';
import questionMark from '../assets/questionMark.svg'

interface UserProps {
  rank: number;
  name: string;
  xp?: number;
  highlight?: boolean;
  me?: boolean;
  color?: string;
}

const RankingRow: React.FC<UserProps> = ({ rank, name, xp, highlight, me, color }) => {
  const containerClass = highlight ? styles.highlightRow : styles.rankingRow;
  return (
    <div className={containerClass}>
      <div className={highlight ? styles.userHighlight : styles.userInfo}>
        <div className={styles.rank}>{rank}</div>
        <div className={styles.avatar} style={{ background: color || '#EEEEEE' }} />
        <div className={highlight ? styles.usernameHighlight : styles.username}>{name}</div>
        {me && <div className={styles.meBadge}>me</div>}
      </div>
      {xp !== undefined && <div className={highlight ? styles.scoreHighlight : styles.score}>{xp}xp</div>}
    </div>
  );
};

const Ranking: React.FC = () => {
  return (
    <div className={styles.body}>
      <div className={styles.titleBox}>
        <div className={styles.title}>랭킹</div>
      </div>

      <div className={styles.questionBox}>
        <img className={styles.checkIcon} src={questionMark}></img>
        <div className={styles.helpText}>기여 포인트는 어떻게 얻나요?</div>
      </div>
      
      <div className={styles.topThreeContainer}>
        <div className={styles.secondCard}>
          <div className={styles.topRank}>2nd</div>
          <div className={styles.userInfo}>
            <div className={styles.avatarSpecial} />
            <div className={styles.username}>재혀니</div>
          </div>
          <div className={styles.score}>25000xp</div>
        </div>

        <div className={styles.thirdCard}>
          <div className={styles.topRank}>3rd</div>
          <div className={styles.userInfo}>
            <div className={styles.avatarSpecial} />
            <div className={styles.username}>재혀니</div>
          </div>
          <div className={styles.score}>25000xp</div>
        </div>

        <div className={styles.firstCard}>
          <div className={styles.topTitle}>기여최공</div>
          <div className={styles.userBlock}>
            <div className={styles.avatarLarge} />
            <div className={styles.usernameLarge}>재혀니</div>
          </div>
          <div className={styles.scoreLarge}>25000xp</div>
        </div>
      </div>


      <div className={styles.rankingCard}>
        <RankingRow rank={4} name="송마이노" xp={25000} />
        <RankingRow rank={5} name="송마이노" xp={25000} />
        <RankingRow rank={6} name="상윤쓰" xp={25000} color="#967B7B" highlight me/>
        <RankingRow rank={7} name="상윤쓰" xp={25000} />
        <RankingRow rank={8} name="송마이노" xp={25000} />
        <RankingRow rank={9} name="송마이노" xp={25000} />
        <RankingRow rank={10} name="재혀니" xp={25000} />
      </div>
    </div>
  );
};

export default Ranking;