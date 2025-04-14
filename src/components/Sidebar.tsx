import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Sidebar.module.css';
import classNames from 'classnames';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const onClickDashboard = () => {
    onClose();
    navigate(`/dashboard`);
  };
  const onClickLogOut = () => {
    onClose();
    navigate(`/signup`);
  };


  return (
    <div className={classNames(styles.sidebar, {
      [styles.open]: isOpen,
      [styles.closed]: !isOpen,
    })}>
      <div className={styles.avatar} />
      <div className={styles.username}>allorak333</div>
      <div className={styles.closeButton} onClick={onClose}>x</div>
      <div className={styles.dividerHeader} />

      <div className={styles.menuDashboard} onClick={onClickDashboard}>대시보드(My profile)</div>
      <div className={styles.menuProject}>내가 참여한 프로젝트(My Project)</div>
      <div className={styles.menuBookmarks}>북마크 프로젝트(My Bookmarks)</div>
      <div className={styles.menuSettings}>설정(Settings)</div>
      <div className={styles.menuGithub}>깃헙으로 이동(Github)</div>

      <div className={styles.dividerFooter} />
      <div className={styles.menuLogout} onClick={onClickLogOut}>로그아웃(Sign out)</div>
    </div>
  );
};

export default Sidebar;
