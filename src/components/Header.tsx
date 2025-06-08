import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { getProfile } from '../api/user';
import { UserProfile } from '../types/user'
import styles from './Header.module.css';
import logo from '../assets/logo.png';
import Sidebar from './Sidebar';
import axios from 'axios';

const Header = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [profile, setProfile] = useState<string>('');
  const [githubId, setGithubId] = useState<string>('');
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const toggleSidebar = () => setSidebarOpen(prev => !prev);
  const navigate = useNavigate();

  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  const onClickImg = () => navigate(`/`);
  const onClickRanking = () => navigate(`/ranking`);
  const onClickLogin = () => navigate(`/login`);

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    const backend = import.meta.env.VITE_BACKEND_URL;
    const processed = sessionStorage.getItem('github_oauth_processed');

    if (code && !processed) {
      sessionStorage.setItem('github_oauth_processed', 'true');

      axios
        .get(`${backend}/github/auth/callback?code=${code}`, {
          withCredentials: true,
        })
        .then((res) => {
          const token = res.data.result.accessToken;
          const username = res.data.result.githubId;
          sessionStorage.setItem('token', token);
          sessionStorage.setItem('username', username);
          setIsLoggedIn(true);
          if (res.data.result.isNewMember === true)
            navigate('/signup')
          else
            navigate('/');
        })
        .catch((err) => {
          console.error('OAuth 처리 실패', err);
        });
    }

    const existingToken = sessionStorage.getItem('token');
    if (existingToken) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const profile = await getProfile();
      setProfile(profile.avatarUrl);
      setGithubId(profile.githubId);
    };

    if (isLoggedIn === true) {
      fetchData();
    }
  }, [isLoggedIn]);


  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerRightSection}>
        {isLoginPage ? (
          <button className={styles.getStartedButton}>Get Started</button>
        ) : (
          <>
            <div className={styles.helpText}>도움말</div>
            {isLoggedIn ? (
              <img className={styles.profileButton} src={profile} onClick={toggleSidebar}></img>
            ) : (
              <button className={styles.helpText} onClick={onClickLogin}>로그인</button>
            )}
          </>
        )}
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
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} profile={profile} githubId={githubId}/>
    </div>
  );
};

export default Header;
