import React, { useEffect, useState } from "react";
import { getTrendingRepositories } from "../api/repository";
import { getRecommendedIssues, getTrendingIssues } from "../api/issue";
import { Repository } from "../types/repository";
import { Issue } from "../types/issue";
import styles from './Home.module.css';
import SearchBar from '../components/home/SearchBar';
import InfoText from '../components/home/InfoText';
import CardList from '../components/home/CardList';
import { useAuth } from "../components/AuthContext"; 

const Home: React.FC = () => {
  const { isLoggedIn } = useAuth(); // 로그인 상태 확인

  const [active, setActive] = useState<boolean>(false);
  const [mode, setMode] = useState<number>(0);
  const [query, setQuery] = useState<string>("");
  
  // 추천 관련 state
  const [recommendedIssues, setRecommendedIssues] = useState<Issue[]>([]);
  // 검색 관련 state
  const [searchedIssues] = useState<Issue[]>([]);
  // 트랜딩 관련 state
  const [trendingIssues, setTrendingIssues] = useState<Issue[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      const trending = await getTrendingIssues();
      setTrendingIssues(trending);

      if (isLoggedIn) {
        const recommended = await getRecommendedIssues();
        setRecommendedIssues(recommended);
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
      </div>
    </div>
  );
};

export default Home;
