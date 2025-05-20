import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTrendingRepositories } from "../api/repository";
import { getRecommendedIssues, getTrendingIssues } from "../api/issue";
import { Repository } from "../types/repository";
import { Issue } from "../types/issue";
import styles from './Home.module.css';
import SearchBar from '../components/home/SearchBar';
import InfoText from '../components/home/InfoText';
import CardList from '../components/home/CardList';
import { useAuth } from "../components/AuthContext"; 
import ErrorModal from "../components/ErrorModal";

const Home: React.FC = () => {
  const { isLoggedIn } = useAuth(); // 로그인 상태 확인
  const navigate = useNavigate();

  const [active, setActive] = useState<boolean>(false);
  const [mode, setMode] = useState<number>(0);
  const [query, setQuery] = useState<string>("");
  
  // 추천 관련 state
  const [recommendedIssues, setRecommendedIssues] = useState<Issue[]>([]);
  // 검색 관련 state
  const [searchedIssues] = useState<Issue[]>([]);
  // 트랜딩 관련 state
  const [trendingIssues, setTrendingIssues] = useState<Issue[]>([]);

  // 에러 모달
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalShouldNavigate, setModalShouldNavigate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const trending = await getTrendingIssues();
      setTrendingIssues(trending);

      if (isLoggedIn) {
        try {
          const recommended = await getRecommendedIssues();
          setRecommendedIssues(recommended);
        } catch (error: any) {
            const backendMessage = error.response?.data?.message;

          if (backendMessage) {
            setModalMessage(backendMessage);
          } else {
            setModalMessage("추천 이슈를 불러오는 중 오류가 발생했습니다.");
          }
          console.log(error);
          setShowModal(true);
          if (error.response?.status === 404) {
            setModalShouldNavigate(true);
          } else {
            setModalShouldNavigate(false);
          }
        }
        setMode(0);
      }
      else {
        setMode(1);
      }
    };

    fetchData();
  }, [isLoggedIn]);

  const getCurrentIssues = (): Issue[] => {
    if (mode === 0) return recommendedIssues;
    if (mode === 1) return trendingIssues;
    if (mode === 2) return searchedIssues;
    return [];
  };

  const handleModalClose = () => {
    setShowModal(false);
    if (modalShouldNavigate) {
      // navigate("/signup");
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.mainContent}>
        <SearchBar mode={mode} query={query} setMode={setMode} setQuery={setQuery} />
        <InfoText mode={mode} query={query} setMode={setMode} />
        <CardList
          active={active}
          setActive={setActive}
          issues={getCurrentIssues()}
        />
        {showModal && (
        <ErrorModal
          show={showModal}
          title="오류"
          message={modalMessage}
          confirmText="확인"
          onConfirm={handleModalClose}
        />
      )}
      </div>
    </div>
  );
};

export default Home;
