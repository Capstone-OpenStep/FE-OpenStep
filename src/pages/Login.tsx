import React, { useState } from 'react';
import styles from './Login.module.css';
import background from '../assets/loginBackground.png'
import phrase from '../assets/loginPhrase.png'
import githubLogo from '../assets/githubLoginLogo.svg'
const Project: React.FC = () => {

    return (
        <div className={styles.body}>
            <img style={{ width: 800, height: 800 }} src={background} />
            <div className={styles.sectionRight}>
                <img style={{ width: 710, height: 205 }} src={phrase} />
                <span className={styles.phrase}>
                    OpenStep은 당신의 기술과 관심사에 맞는 오픈소스 프로젝트를 찾아주는 서비스입니다. 개인 맞춤형 추천을 통해 당신에게 꼭 맞는 프로젝트를 소개해 드립니다. 지금 바로 커뮤니티에 참여해보세요!
                </span>
                <span className={styles.loginText}>
                    소셜 계정으로 로그인
                </span>
                <div className={styles.githubButton}>
                    <img style={{ width: 45, height: 45 }} src={githubLogo} />
                    <div className={styles.githubText}>Continue with Github</div>
                </div>
            </div>
        </div>
    );
};

export default Project;
