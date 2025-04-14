import React, { useState } from 'react';
import styles from './Home.module.css';
import SearchBar from '../components/home/SearchBar';
import InfoText from '../components/home/InfoText';
import CardList from '../components/home/CardList';

const Home: React.FC = () => {
  const [active, setActive] = useState<boolean>(false);
  const [mode, setMode] = useState<number>(0);

  return (
    <div className={styles.body}>
      <div className={styles.mainContent}>
        <SearchBar />
        <InfoText mode={mode} setMode={setMode}/>
        <CardList active={active} setActive={setActive} />
      </div>
      <div className={styles.projectList}>

      </div>
    </div>
  );
};

export default Home;
