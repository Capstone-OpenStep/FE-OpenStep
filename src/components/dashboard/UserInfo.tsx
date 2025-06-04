import React from 'react';
import styles from './UserInfo.module.css'; // Import the CSS module
import users from '../../assets/users.svg';
import location from '../../assets/location.svg';
import email from '../../assets/email.svg';
import chain from '../../assets/chain.svg';
import { Level } from '../../types/user'
import bugHunter from '../../assets/ achievements/bugHunter.png'
import consistentDev from '../../assets/ achievements/consistentDev.png'
import docWriter from '../../assets/ achievements/docWriter.png'
import ExplorerLv1 from '../../assets/ achievements/ExplorerLv1.png'
import ExplorerLv2 from '../../assets/ achievements/ExplorerLv2.png'
import ExplorerLv3 from '../../assets/ achievements/ExplorerLv3.png'
import firstCommit from '../../assets/ achievements/firstCommit.png'
import Mentor from '../../assets/ achievements/Mentor.png'
import PRMaster from '../../assets/ achievements/PRMaster.png'

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
        <div className={styles.archivementList}>
          <img className={styles.archivement} src={bugHunter}></img>
          <img className={styles.archivement} src={consistentDev}></img>
          <img className={styles.archivement} src={docWriter}></img>
          <img className={styles.archivement} src={ExplorerLv1}></img>
          <img className={styles.archivement} src={ExplorerLv2}></img>
          <img className={styles.archivement} src={ExplorerLv3}></img>
          <img className={styles.archivement} src={firstCommit}></img>
          <img className={styles.archivement} src={Mentor}></img>
          <img className={styles.archivement} src={PRMaster}></img>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;