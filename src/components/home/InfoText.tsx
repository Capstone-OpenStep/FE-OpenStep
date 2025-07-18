import React, { useEffect, useState } from 'react';
import { useAuth } from "../AuthContext";
import styles from './InfoText.module.css';
import SwitchIcon from '../../assets/switch.svg';
import ErrorModal from '../ErrorModal';

interface InfoTextProps {
  mode: number;
  query: string;
  setMode: React.Dispatch<React.SetStateAction<number>>;
  domains: string[];
}


const InfoText: React.FC<InfoTextProps> = ({ mode, query, setMode, domains }) => {
  // 로그인 여부
  const { isLoggedIn } = useAuth();
  // 에러 모달
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [username, setUsername] = useState<string>('');

  const switchMode = () => {
    if (mode === 0) {
      setMode(1);
    }
    else if (mode === 1) {
      if (isLoggedIn == true) {
        setMode(0);
      }
      else {
        setShowModal(true);
        setModalMessage("추천 서비스는 로그인 후 이용 가능합니다")
      }
    }
    else {
      setMode(0);
    }
  }

  useEffect(() => {
    const username = sessionStorage.getItem('username');
    if (username != null) {
      setUsername(username);
    }
  }, [isLoggedIn])

  const renderDomains = () => {
    return domains.map((domain, index) => {
      const isLast = index === domains.length - 1;
      return (
        <React.Fragment key={domain}>
          <span className={styles.reactText}>{domain}</span>
          {!isLast && <span className={styles.comma}>, </span>}
        </React.Fragment>
      );
    });
  };

  return (
    <div className={styles.infoTextContainer}>
      <div className={styles.infoTextRow}>
        {mode === 0 ? (<><div className={styles.infoTextContent}>
          <span className={styles.name}>{username}</span>
          <span className={styles.greeting}>
            님을 위해
            <br />
          </span>
          {renderDomains()}
          <br />
          <span className={styles.serviceText}>서비스를 찾아봤어요.</span>
        </div>
          <div onClick={switchMode} className={styles.switchModeButton}>
            <img src={SwitchIcon} className={styles.switchIconImg} alt="Switch Icon" />
            <span className={styles.switchIconText}>트랜딩 보기</span>
          </div></>) : mode === 1 ? (
            <><div className={styles.infoTextContent}>
              <span className={styles.trendingText}>
                다른 개발자들은 이런 것에 관심이 많아요
              </span>
            </div>
              <div onClick={switchMode} className={styles.switchModeButton} >
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
                <div onClick={switchMode} className={styles.switchModeButton} >
                  <img src={SwitchIcon} className={styles.switchIconImg} alt="Switch Icon" />
                  <span className={styles.switchIconText}>추천/트랜딩 보기</span>
                </div></>

        )}

      </div>
      {mode <= 1 ? (<span className={styles.subText}>첫 기여, 아래 프로젝트로 시작해보세요!</span>) : (<></>)}
      <ErrorModal
        show={showModal}
        title="오류"
        message={modalMessage}
        confirmText="확인"
        onConfirm={() => setShowModal(false)}
      />
    </div>
  );
};

export default InfoText;
