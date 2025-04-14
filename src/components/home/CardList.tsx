import React from 'react';
import styles from './CardList.module.css';
import ToggleSwitch from './ToggleSwitch';
import Repository from './Repository';
import IssueItem from './IssueItem'

interface CardListProps {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const CardList: React.FC<CardListProps> = ({ active, setActive }) => {
  return (
    <div className={styles.cardListContainer}>
      <ToggleSwitch active={active} setActive={setActive} />
      {active ? (
        <>
          <IssueItem />
          <IssueItem />
          <IssueItem />
          <IssueItem />
          <IssueItem />
        </>
      ) : (
        <>
          <Repository />
          <Repository />
          <Repository />
          <Repository />
          <Repository />
        </>
      )}
    </div>
  );
};

export default CardList;
