import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '../assets/logo.png';
import Sidebar from './Sidebar';

const Header = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  const navigate = useNavigate();
  const onClickImg = () => navigate(`/`);
  const onClickRanking = () => navigate(`/ranking`);

  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerRightSection}>
        <div className={styles.helpText}>도움말</div>
        <div className={styles.profileButton} onClick={toggleSidebar}></div>
      </div>
      <div className={styles.headerLeftSection}>
        <img
          className={styles.logoImage}
          src={logo}
          onClick={onClickImg}
          style={{ cursor: 'pointer' }}
        />
        <div className={styles.menuCommunity}>커뮤니티</div>
        <div className={styles.menuRanking} onClick={onClickRanking}>랭킹</div>
      </div>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
    </div>
  );
};

export default Header;
