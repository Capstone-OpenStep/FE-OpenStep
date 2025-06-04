import React, { useEffect, useState } from 'react';
import styles from './Dashboard.module.css';
import UserInfo from '../components/dashboard/UserInfo'
import Board from '../components/dashboard/Board';
import Repository from '../components/dashboard/Repository'
import { getLevel } from '../api/user'
import { Level } from '../types/user'

const Dashboard: React.FC = () => {
  const [level, setLevel] = useState<Level>({
    level: 0,
    levelPercent: 0,
    percentRemaining: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getLevel();
      setLevel(data);
    };

    fetchData();
  }, [])


  return (
    <div className={styles.main}>
      <div className={styles.contents}>
        <UserInfo level={level}/>
        <Board />
      </div>
    </div>
  );
};

export default Dashboard;
