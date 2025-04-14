import React, { useState } from 'react';
import styles from './Guide.module.css';


interface CapsuleProps {
  title: string;
  text: string;
}


const Guide: React.FC<CapsuleProps> = ({ title, text }) => {
    const contents : string = '1. github 이슈 댓글란(파란색 이슈 제목을 클릭)에 참여 의사를 정중하게 남겨주세요.';

    return (
    <>
    <div className={styles.container}>
      <span className={styles.title}>
      프로젝트 기여 단계 : Pull Request 작성
      </span>
      <span className={styles.content}>
        {contents}
      </span>
    </div>
    </>
    );
}

export default Guide;