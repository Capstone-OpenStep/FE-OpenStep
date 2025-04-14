import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '../assets/logo.png'


const Header = () => {
  const navigate = useNavigate();
  const onClickImg = () => {
    navigate(`/`);
  };

  return (
    <div className={styles.cusRectangle2}>
      <div className={styles.cusFrame80}>
        <div className={styles.cusDiv2}>도움말</div>
        <div className={styles.cusEllipse3}></div>
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
    </div>
  );
};

export default Header;
