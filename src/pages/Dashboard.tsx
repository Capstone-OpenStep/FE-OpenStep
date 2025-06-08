import React, { useEffect, useState } from 'react';
import styles from './Dashboard.module.css';
import UserInfo from '../components/dashboard/UserInfo'
import Board from '../components/dashboard/Board';
import Repository from '../components/dashboard/Repository'
import { getAcheievement, getLevel, getProfile } from '../api/user'
import { Level, UserProfile, Acheievement } from '../types/user'

const Dashboard: React.FC = () => {
  const [level, setLevel] = useState<Level>({
    level: 0,
    levelPercent: 0,
    percentRemaining: 0,
  });
  const [profile, setProfile] = useState<UserProfile>({
      githubId: "",
      email: "",
      avatarUrl: "",
      location: "",
      profileUrl: "",
      followersCount: 0,
      followingCount: 0,
  })
  const [acheivement, setAcheivement] = useState<Acheievement[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getLevel();
      setLevel(data);
      const profile = await getProfile();
      setProfile(profile);
      const acheievement = await getAcheievement();
      setAcheivement(acheievement);
    };

    fetchData();
  }, [])


  return (
    <div className={styles.main}>
      <div className={styles.contents}>
        <UserInfo level={level} profile={profile} acheivements={acheivement}/>
        <Board />
      </div>
    </div>
  );
};

export default Dashboard;
