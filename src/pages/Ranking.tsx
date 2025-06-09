import React, { useEffect, useState } from 'react';
import { RankUser } from '../types/rank'
import { getRanks } from '../api/user'
import styles from './Ranking.module.css';
import questionMark from '../assets/questionMark.svg'

interface UserProps {
  rank: number;
  name: string;
  xp?: number;
  avatar: string | null;
  highlight?: boolean;
  me?: boolean;
  color?: string;
}

const RankingRow: React.FC<UserProps> = ({ rank, name, xp, avatar, highlight, me, color }) => {
  const containerClass = highlight ? styles.highlightRow : styles.rankingRow;

  const onClickAvatar = () => {
    if (name != null) {
      const url = `https://github.com/${name}`
      window.location.href = url;
    }
  };

  return (
    <div className={containerClass}>
      <div className={highlight ? styles.userHighlight : styles.userInfo} onClick={onClickAvatar} >
        <div className={styles.rank}>{rank}</div>
        {avatar ? (<img src={avatar} className={styles.avatar} />) : (<div className={styles.avatar} />)}
        <div className={highlight ? styles.usernameHighlight : styles.username}>{name}</div>
        {me && <div className={styles.meBadge}>me</div>}
      </div>
      {xp !== undefined && <div className={highlight ? styles.scoreHighlight : styles.score}>{xp}xp</div>}
    </div>
  );
};

const Ranking: React.FC = () => {
  const [rankData, setRankData] = useState<RankUser[]>([]);
  const [currentUsername, setCurrentUsername] = useState<string | null>(null);

  useEffect(() => {
    const username = sessionStorage.getItem('username');
    setCurrentUsername(username);

    const fetchData = async () => {
      const data: RankUser[] = await getRanks();
      setRankData(data);
    };

    fetchData();
  }, [])

  // 유저 순위(인덱스) 검색
  const currentUserIndex = rankData.findIndex(user => user.githubId === currentUsername);

  // 유저의 위 5명 까지 출력
  const startIdx = currentUserIndex === -1 ? 0 : Math.max(0, currentUserIndex - 5);
  // 유저의 아래 5명 까지 출력
  const endIdx = currentUserIndex === -1 ? Math.min(rankData.length, 10) : Math.min(rankData.length, currentUserIndex + 6);


  // Get the subset of rank data to display
  const displayedRankData = rankData.slice(startIdx, endIdx);

  // 상위 유저
  const firstUser = rankData[0];
  const secondUser = rankData[1];
  const thirdUser = rankData[2];

  const handleAvatarClick = (username: string) => {
    if (username) {
      window.location.href = `https://github.com/${username}`;
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.titleBox}>
        <div className={styles.title}>랭킹</div>
      </div>

      <div className={styles.tooltipContainer}>
        <div className={styles.questionBox}>
          <img className={styles.checkIcon} src={questionMark} alt="Question Mark" />
          <div className={styles.helpText}>기여 포인트는 어떻게 얻나요?</div>
        </div>
        <div className={styles.tooltipBox}>
          메인페이지 혹은 프로젝트 페이지에서 이슈를 할당 받은 후 병합까지 성공하면 기여포인트를 얻고 레벨과 랭킹을 올릴 수 있어요
        </div>
      </div>

      <div className={styles.topThreeContainer}>
        {/* 2위 카드 */}
        {secondUser && (
          <div className={styles.secondCard}>
            <div className={styles.topRank}>2nd</div>
            <div className={styles.userInfo} onClick={() => handleAvatarClick(secondUser.githubId)} >
              {secondUser.avatarUrl ? (<img src={secondUser.avatarUrl} className={styles.avatarSpecial} />) :
                (<div className={styles.avatarSpecial} />)}
              <div className={styles.username}>{secondUser.githubId}</div>
            </div>
            <div className={styles.score}>{secondUser.xp}xp</div>
          </div>
        )}

        {/* 3위 카드 */}
        {thirdUser && (
          <div className={styles.thirdCard}>
            <div className={styles.topRank}>3rd</div>
            <div className={styles.userInfo} onClick={() => handleAvatarClick(thirdUser.githubId)}>
              {thirdUser.avatarUrl ? (<img src={thirdUser.avatarUrl} className={styles.avatarSpecial} />) :
                ((<div className={styles.avatarSpecial} />))}
              <div className={styles.username}>{thirdUser.githubId}</div>
            </div>
            <div className={styles.score}>{thirdUser.xp}xp</div>
          </div>
        )}

        {/* 1위 카드 */}
        {firstUser && (
          <div className={styles.firstCard}>
            <div className={styles.topTitle}>기여최공</div>
            <div className={styles.userBlock} onClick={() => handleAvatarClick(firstUser.githubId)}>
              {firstUser.avatarUrl ? (<img src={firstUser.avatarUrl} className={styles.avatarLarge} />) :
                (<div className={styles.avatarLarge} />)}
              <div className={styles.usernameLarge}>{firstUser.githubId}</div>
            </div>
            <div className={styles.scoreLarge}>{firstUser.xp}xp</div>
          </div>
        )}
      </div>


      <div className={styles.rankingCard}>
        {displayedRankData.map((user, index) => {
          const isCurrentUser = currentUsername === user.githubId;
          const actualRank = rankData.indexOf(user) + 1;

          // 상위 3명을 제외 한다면 다음 라인을 주석 해제
          // if (actualRank <= 3) return null;

          return (
            <RankingRow
              key={user.githubId}
              rank={actualRank}
              name={user.githubId}
              xp={user.xp}
              avatar={user.avatarUrl}
              highlight={isCurrentUser}
              me={isCurrentUser}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Ranking;