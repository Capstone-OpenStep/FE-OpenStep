import React, { useState } from 'react';
import styles from './InfoText.module.css';
import SwitchIcon from '../../assets/switch.svg';


interface InfoTextProps {
  mode: number;
  query: string;
  setMode: React.Dispatch<React.SetStateAction<number>>;
}


const InfoText: React.FC<InfoTextProps> = ({ mode, query, setMode }) => {
  const switchMode = () => {
    if (mode === 0)
      setMode(1);
    else if (mode === 1)
      setMode(0);
    else
      setMode(0);
  }


  return (
    <div className={styles.infoTextContainer}>
      <div className={styles.infoTextRow}>
        {mode === 0 ? (<><div className={styles.infoTextContent}>
          <span className={styles.name}>송민혁</span>
          <span className={styles.greeting}>
            님을 위해
            <br />
          </span>
          <span className={styles.reactText}>React</span>
          <span className={styles.comma}> , </span>
          <span className={styles.webText}>Web</span>
          <span className={styles.serviceText}>서비스를 찾아봤어요.</span>
        </div>
          <div onClick={switchMode} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', marginLeft:'auto'  }}>
            <img src={SwitchIcon} className={styles.switchIconImg} alt="Switch Icon" />
            <span className={styles.switchIconText}>트랜딩 보기</span>
          </div></>) : mode === 1 ? (
            <><div className={styles.infoTextContent}>
              <span className={styles.trendingText}>
                다른 개발자들은 이런 것에 관심이 많아요
              </span>
            </div>
              <div onClick={switchMode} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', marginLeft:'auto' }}>
                <img src={SwitchIcon} className={styles.switchIconImg} alt="Switch Icon" />
                <span className={styles.switchIconText}>추천 보기</span>
              </div></>) : (<><div className={styles.infoTextContent}>
              <span className={styles.queryText}>
                "{query}"
              </span>
              <span className={styles.trendingText}>
                {" 에 대한 검색 결과예요"}
              </span>
            </div>
              <div onClick={switchMode} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', marginLeft:'auto'  }}>
                <img src={SwitchIcon} className={styles.switchIconImg} alt="Switch Icon" />
                <span className={styles.switchIconText}>추천/트랜딩 보기</span>
              </div></>

            )}

      </div>
      {mode <= 1 ? (<span className={styles.subText}>첫 기여, 아래 프로젝트로 시작해보세요!</span>) : (<></>)}
    </div>
  );
};

export default InfoText;
