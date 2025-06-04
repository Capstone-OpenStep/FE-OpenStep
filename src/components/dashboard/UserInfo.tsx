import React from 'react';
import styles from './UserInfo.module.css'; // Import the CSS module
import users from '../../assets/users.svg';
import location from '../../assets/location.svg';
import email from '../../assets/email.svg';
import chain from '../../assets/chain.svg';
import { Level, UserProfile } from '../../types/user'

interface UserInfoProps {
  level: Level;
  profile: UserProfile;
}

const UserInfo: React.FC<UserInfoProps> = ({ level, profile }) => {

  const onClickProfile = () => {

  }

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
      </div>
    </div>
  );
};

export default UserInfo;