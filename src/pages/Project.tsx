import React, { useState } from 'react';
import styles from './Project.module.css';
import Summary from '../components/project/Summary';
import logo from '../assets/projectLogo.svg'
import IssueItem from '../components/project/IssueItem';

const Project: React.FC = () => {

    return (
        <div className={styles.body}>
            <div className={`${styles.section} ${styles.sectionLeft}`}>
                <img style={{width: 250, height: 250}} src={logo} />
                <Summary/>
            </div>
            <div className={`${styles.section} ${styles.sectionMiddle}`}>
                <div className={styles.descriptionCard}>
                    <span className={styles.title}>프로젝트 개요</span>
                    <span className={styles.description}>"Linux Kernel Module Programming Guide (LKMPG)"는 리눅스 커널 모듈 프로그래밍을 배우기 위한 가이드입니다. 커널 모듈 개발에 필요한 개념, 코드 예제, 빌드 및 디버깅 방법 등을 설명하며, 리눅스 커널 모듈을 처음 접하는 개발자를 위한 참고서 역할을 합니다.</span>
                </div>
                <div className={styles.issueContainer}>
                    <span className={styles.title}>이슈</span>
                    <div className={styles.issueList}>
                        <IssueItem/>
                        <IssueItem/>
                        <IssueItem/>
                        <IssueItem/>
                        <IssueItem/>
                    </div>
                </div>
            </div>
            <div className={`${styles.section} ${styles.sectionRight}`}>
            </div>
        </div>
    );
};

export default Project;
