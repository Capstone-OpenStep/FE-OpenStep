import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '../assets/logo.png'
import Sidebar from './Sidebar';

const Header = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  const navigate = useNavigate();
  const onClickImg = () => {
    navigate(`/`);
  };

  return (
    <div className={styles.cusRectangle2}>
      <div className={styles.cusFrame80}>
        <div className={styles.cusDiv2}>도움말</div>
        <div className={styles.cusEllipse3} onClick={toggleSidebar}></div>
      </div>
      <div className={styles.cusFrame79}>
        <img
          className={styles.cusImage1}
          src={logo}
          onClick={onClickImg}
          style={{cursor:'pointer'}}
        />
        <div className={styles.cusDiv3}>커뮤니티</div>
        <div className={styles.cusDiv4}>랭킹</div>
      </div>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
    </div>
  );
};

export default Header;
