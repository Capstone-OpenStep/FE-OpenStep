import React, { useState } from 'react';
import styles from './Home.module.css';
import SearchBar from '../components/home/SearchBar';
import InfoText from '../components/home/InfoText';
import CardList from '../components/home/CardList';

const Home: React.FC = () => {
  const [active, setActive] = useState<boolean>(false);
  const [mode, setMode] = useState<number>(0);
  const [query, setQuery] = useState<string>("");

  return (
    <div className={styles.body}>
      <div className={styles.mainContent}>
        <SearchBar mode={mode} query={query} setMode={setMode} setQuery={setQuery}/>
        <InfoText mode={mode} query={query} setMode={setMode}/>
        <CardList active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default Home;
