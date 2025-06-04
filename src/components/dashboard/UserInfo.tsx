import React from 'react';
import styles from './UserInfo.module.css'; // Import the CSS module
import users from '../../assets/users.svg';
import location from '../../assets/location.svg';
import email from '../../assets/email.svg';
import chain from '../../assets/chain.svg';
import { Level } from '../../types/user'

interface UserInfoProps {
  level: Level;
}

const UserInfo: React.FC<UserInfoProps> = ({ level }) => {

  const username: string | null = sessionStorage.getItem('username');

  return (
    <div>
      <div className={styles.userInfoContainer}>
        <div className={styles.profilePicture} />
        <div className={styles.username}>{username}</div>
        <div className={styles.levelBarContainer}>
          <div className={styles.levelProgressBar} style={{ width: `${level.levelPercent}%` }}/>
          <div className={styles.levelText}>level {level.level} - {level.levelPercent}%</div>
        </div>
        <div className={styles.editProfileButton}>
          <div className={styles.editProfileText}>Edit profile</div>
        </div>
        <div className={styles.infoRow}>
          <img src={users} alt="users icon" className={styles.infoIcon} />
          <div className={styles.followersFollowing}>
            <span className={styles.count}>39</span>
            <span className={styles.label}> followers . </span>
            <span className={styles.count}>27</span>
            <span className={styles.label}> following</span>
          </div>
        </div>
        <div className={styles.infoRow}>
          <img src={location} alt="location icon" className={styles.infoIcon} />
          <div className={styles.infoText}>Seoul, South Korea</div>
        </div>
        <div className={styles.infoRow}>
          <img src={email} alt="email icon" className={styles.infoIcon} />
          <div className={styles.infoText}>user@naver.com</div>
        </div>
        <div className={styles.infoRow}>
          <img src={chain} alt="chain icon" className={styles.infoIcon} />
          <div className={styles.infoText}>in/userprofile</div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;