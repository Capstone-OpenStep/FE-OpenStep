import React, { useState } from 'react';
import styles from './Dashboard.module.css';
import UserInfo from '../components/dashboard/UserInfo'
import Board from '../components/dashboard/Board';
import Repository from '../components/dashboard/Repository'


const Dashboard: React.FC = () => {

  return (
    <div className={styles.main}>
      <div className={styles.contents}>
        <UserInfo/>
        <Board/>
      </div>
    </div>
  );
};

export default Dashboard;
