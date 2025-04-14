import React from 'react';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.avatar} />
      <div className={styles.username}>allorak333</div>
      <div className={styles.closeButton}>x</div>
      <div className={styles.dividerHeader} />

      <div className={styles.menuDashboard}>대시보드(My profile)</div>
      <div className={styles.menuProject}>내가 참여한 프로젝트(My Project)</div>
      <div className={styles.menuBookmarks}>북마크 프로젝트(My Bookmarks)</div>
      <div className={styles.menuSettings}>설정(Settings)</div>
      <div className={styles.menuGithub}>깃헙으로 이동(Github)</div>

      <div className={styles.dividerFooter} />
      <div className={styles.menuLogout}>로그아웃(Sign out)</div>
    </div>
  );
};

export default Sidebar;
