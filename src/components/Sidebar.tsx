import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import styles from './Sidebar.module.css';
import classNames from 'classnames';
import dashboard from '../assets/dashboard.svg'
import github from '../assets/githubLoginLogo.svg'
import setting from '../assets/settingWhite.svg'
import home from '../assets/home.svg'
import signout from '../assets/signout.svg'


interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const onClickDashboard = () => {
    onClose();
    navigate(`/dashboard`);
  };

  const onClickHome = () => {
    onClose();
    navigate(`/`);
  };

  const onClickLogOut = () => {
    onClose();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('github_oauth_processed');
    setIsLoggedIn(false);
  };

  const onClickSetting = () => {
    onClose();
    navigate('/signup');
  };

  return (
    <div
      className={classNames(styles.overlay, { [styles.overlayVisible]: isOpen })}
      onClick={onClose}
    >
      <div
        className={classNames(styles.sidebar, {
          [styles.open]: isOpen,
          [styles.closed]: !isOpen,
        })}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <div className={styles.avatar} />
          <div className={styles.username}>allorak333</div>
          <div className={styles.closeButton} onClick={onClose}>×</div>
        </div>

        {/* <div className={styles.divider} /> */}

        <nav className={styles.menu}>
          <div onClick={onClickHome}><img style={{width:30, height:30}} src={home}></img>Home</div>
          <div onClick={onClickDashboard}><img style={{width:30, height:30}} src={dashboard}></img>Dashboard</div>
          <div onClick={onClickSetting}><img style={{width:30, height:30}} src={setting}></img>Settings</div>
          <div><img style={{width:30, height:30}} src={github}></img>To Github</div>
        </nav>

        {/* <div className={styles.divider} /> */}

        <div className={styles.menuLogout} onClick={onClickLogOut}>
          <img style={{width:30, height:30}} src={signout}></img>Sign out
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
