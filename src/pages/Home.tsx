import React, { useEffect, useState } from "react";
import { getTrendingRepositories } from "../api/repository";
import { getTrendingIssues } from "../api/issue";
import { Repository } from "../types/repository";
import { Issue } from "../types/issue";
import styles from './Home.module.css';
import SearchBar from '../components/home/SearchBar';
import InfoText from '../components/home/InfoText';
import CardList from '../components/home/CardList';


const Home: React.FC = () => {
  const [active, setActive] = useState<boolean>(false);
  const [mode, setMode] = useState<number>(0);
  const [query, setQuery] = useState<string>("");
  
  // 추천 관련 state
  const [recommendedRepos] = useState<Repository[]>([]);
  const [recommendedIssues] = useState<Issue[]>([]);
  // 검색 관련 state
  const [searchedRepos] = useState<Repository[]>([]);
  const [searchedIssues] = useState<Issue[]>([]);
  // 트랜딩 관련 state
  const [trendingRepos, setTrendingRepos] = useState<Repository[]>([]);
  const [trendingIssues, setTrendingIssues] = useState<Issue[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      const [repos, issues] = await Promise.all([
        getTrendingRepositories(),
        getTrendingIssues(),
      ]);
      setTrendingRepos(repos);
      setTrendingIssues(issues);
    };

    fetchData();
  }, []);


  const getCurrentRepos = (): Repository[] => {
    if (mode === 0) return recommendedRepos;
    if (mode === 1) return trendingRepos;
    if (mode === 2) return searchedRepos;
    return [];
  };

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
          repositories={getCurrentRepos()}
          issues={getCurrentIssues()}
        />
      </div>
    </div>
  );
};

export default Home;
