import React from 'react';
import styles from './UserInfo.module.css';
import users from '../../assets/users.svg';
import location from '../../assets/location.svg';
import email from '../../assets/email.svg';
import chain from '../../assets/chain.svg';
import bugHunter from '../../assets/achievements/bugHunter.png';
import consistentDev from '../../assets/achievements/consistentDev.png';
import docWriter from '../../assets/achievements/docWriter.png';
import ExplorerLv1 from '../../assets/achievements/ExplorerLv1.png';
import ExplorerLv2 from '../../assets/achievements/ExplorerLv2.png';
import ExplorerLv3 from '../../assets/achievements/ExplorerLv3.png';
import firstCommit from '../../assets/achievements/firstCommit.png';
import Mentor from '../../assets/achievements/Mentor.png';
import PRMaster from '../../assets/achievements/PRMaster.png';
import { Level, UserProfile, Acheievement } from '../../types/user';

interface UserInfoProps {
  level: Level;
  profile: UserProfile;
  acheivements: Acheievement[];
}

const achievementImages: Record<Acheievement["type"], string> = {
  FIRST_COMMIT: firstCommit,
  BUF_HUNTER: bugHunter,
  PR_MASTER: PRMaster,
  CONSISTENT_DEV: consistentDev,
  EXPLORER_LV1: ExplorerLv1,
  EXPLORER_LV2: ExplorerLv2,
  EXPLORER_LV3: ExplorerLv3,
  MENTOR: Mentor,
};

const UserInfo: React.FC<UserInfoProps> = ({ level, profile, acheivements }) => {
  return (
    <div>
      <div className={styles.userInfoContainer}>
        <a href={profile.profileUrl}>
          <img className={styles.profilePicture} src={profile.avatarUrl} />
        </a>
        <div className={styles.username}>{profile.githubId}</div>
        <div className={styles.levelBarContainer}>
          <div className={styles.levelProgressBar} style={{ width: `${level.levelPercent}%` }} />
          <div className={styles.levelText}>level {level.level} - {level.levelPercent}%</div>
        </div>
        <div className={styles.editProfileButton}>
          <div className={styles.editProfileText}>Edit profile</div>
        </div>
        <div className={styles.infoRow}>
          <img src={users} alt="users icon" className={styles.infoIcon} />
          <div className={styles.followersFollowing}>
            <span className={styles.count}>{profile.followersCount}</span>
            <span className={styles.label}> followers . </span>
            <span className={styles.count}>{profile.followingCount}</span>
            <span className={styles.label}> following</span>
          </div>
        </div>
        <div className={styles.infoRow}>
          <img src={location} alt="location icon" className={styles.infoIcon} />
          <div className={styles.infoText}>{profile.location}</div>
        </div>
        <div className={styles.infoRow}>
          <img src={email} alt="email icon" className={styles.infoIcon} />
          <div className={styles.infoText}>{profile.email}</div>
        </div>
        <div className={styles.infoRow}>
          <img src={chain} alt="chain icon" className={styles.infoIcon} />
          <a className={styles.infoText} href={profile.profileUrl}>in/userprofile</a>
        </div>
        <div className={styles.archivementList}>
          {acheivements.map((acheivement) => (
            <img
              className={styles.archivement}
              src={achievementImages[acheivement.type]}
              alt={acheivement.title}
              title={acheivement.description}
            />))
          }
        </div>
      </div>
    </div>
  );
};

export default UserInfo;