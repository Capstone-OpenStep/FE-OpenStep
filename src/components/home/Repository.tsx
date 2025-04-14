import React from 'react';
import styles from './Repository.module.css';
import star from '../../assets/star.svg'

const Repostory = () => {
  return (
    <>
     <div className={styles.container}>
      <div className={styles.bg}></div>
      <div className={styles.header}>
        <div className={styles.title}>jestjs/jest</div>
        <div className={styles.description}>
          표준 웹 기술(HTML, CSS, JS, WASM)을 최대로 활용하는 새로운 웹 프레임워크입니다.<br /><br />
          복잡한 도구 없이 작고 빠른 웹앱을 만들 수 있어요.
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.footerLeft}>
          <div className={styles.languageIcon}></div>
          <div className={styles.language}>Typescript</div>
        </div>
        <div className={styles.footerMiddle}>
          <img src={star}></img>
          <div className={styles.stars}>44.6k</div>
          <div className={styles.builtBy}>Built by</div>
        </div>
        <div className={styles.footerRight}>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Repostory;
