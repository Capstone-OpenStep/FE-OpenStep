import React, { useEffect, useState } from "react";
import { IsSessionFunction, useNavigate } from "react-router-dom";
import { getTrendingRepositories } from "../api/repository";
import { getRecommendedIssues, getTrendingIssues, searchIssue } from "../api/issue";
import {getDomains} from '../api/user'
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

  const [mode, setMode] = useState<number>(1);
  const [query, setQuery] = useState<string>("");

  // 유저 정보
  const [domains, setDomains] = useState<string[]>([]);

  // 추천 관련 state
  const [recommendedIssues, setRecommendedIssues] = useState<Issue[]>([]);
  // 검색 관련 state
  const [searchedIssues, setSearchedIssues] = useState<Issue[]>([]);
  // 트랜딩 관련 state
  const [trendingIssues, setTrendingIssues] = useState<Issue[]>([]);

  // 검색 상태 관리
  const [searchState, setSearchState] = useState({
    text: "",
    languages: [] as string[],
    update: null as string | null,
    page: 0,
    hasMore: true
  });

  // 에러 모달
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalShouldNavigate, setModalShouldNavigate] = useState(false);

  const [isTrendingLoading, setIsTrendingLoading] = useState(true);
  const [isRecommendedLoading, setIsRecommendedLoading] = useState(true);
  const [isSearchLoading, setIsSearchLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsTrendingLoading(true);
      const trending = await getTrendingIssues();
      setTrendingIssues(trending);
      setIsTrendingLoading(false);

      if (isLoggedIn) {
        setIsRecommendedLoading(true);
        try {
          const domains = await getDomains();
          setDomains(domains);
          const recommended = await getRecommendedIssues();
          setRecommendedIssues(recommended);
          setMode(0); // 추천 모드로 전환
        } catch (error: any) {
          const backendMessage = error.response?.data?.message;
          setModalMessage(backendMessage || "추천 이슈를 불러오는 중 오류가 발생했습니다.");
          setShowModal(true);
          setModalShouldNavigate(error.response?.status === 404);
          setMode(1); // fallback to 트렌딩
        } finally {
          setIsRecommendedLoading(false);
        }
      } else {
        setMode(1); // 로그인 안 했으면 트렌딩 모드
      }
    };

    fetchData();
  }, [isLoggedIn]);

  // 무한 스크롤 로딩 함수
  const loadMoreSearchResults = async () => {
    if (!searchState.hasMore || isSearchLoading || searchState.page >= 3) return;

    setIsSearchLoading(true);
    try {
      const nextPage = searchState.page + 1;
      const newResults = await searchIssue(
        searchState.text,
        searchState.languages,
        searchState.update,
        nextPage
      );

      if (newResults.length === 0) {
        // 더 이상 결과가 없음
        setSearchState(prev => ({ ...prev, hasMore: false }));
      } else {
        // 새로운 결과를 기존 결과에 추가
        setSearchedIssues(prev => [...prev, ...newResults]);
        setSearchState(prev => ({ 
          ...prev, 
          page: nextPage,
          hasMore: newResults.length > 0 && nextPage < 3
        }));
      }
    } catch (error) {
      console.error("Failed to load more search results:", error);
    } finally {
      setIsSearchLoading(false);
    }
  };

  const getCurrentIssues = (): Issue[] => {
    if (mode === 0) return recommendedIssues;
    if (mode === 1) return trendingIssues;
    if (mode === 2) return searchedIssues;
    return [];
  };

  // mode가 변경될 때 검색 결과 초기화
  useEffect(() => {
    if (mode !== 2) {
      setSearchedIssues([]);
      setSearchState({
        text: "",
        languages: [],
        update: null,
        page: 0,
        hasMore: true
      });
    }
  }, [mode]);

  const getCurrentLoadingState = (): boolean => {
    if (mode === 0) return isRecommendedLoading;
    if (mode === 1) return isTrendingLoading;
    if (mode === 2) return isSearchLoading && searchedIssues.length === 0;
    return false;
  };

  const handleModalClose = () => {
    setShowModal(false);
    if (modalShouldNavigate) {
      navigate("/signup");
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.mainContent}>
        {mode != 0 ? (
          <SearchBar 
            mode={mode} 
            query={query} 
            setMode={setMode} 
            setQuery={setQuery} 
            setSearchedIssues={setSearchedIssues}
            setSearchState={setSearchState}
          />
        ) : (null)}
        <InfoText mode={mode} query={query} setMode={setMode} domains={domains}/>
        <CardList
          issues={getCurrentIssues()}
          isLoading={getCurrentLoadingState()}
          onLoadMore={mode === 2 ? loadMoreSearchResults : undefined}
          hasMore={mode === 2 ? searchState.hasMore : false}
          isSearchMode={mode === 2}
          isLoadingMore={isSearchLoading}
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