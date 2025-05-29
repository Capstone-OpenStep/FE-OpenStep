import React from 'react';
import styles from './CardList.module.css';
import ToggleSwitch from './ToggleSwitch';
import Repository from './Repository';
import IssueItem from './IssueItem'
import { Repository as RepoType } from '../../types/repository';
import { Issue as IssueType } from '../../types/issue';

interface CardListProps {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  issues: IssueType[];
}

const CardList: React.FC<CardListProps> = ({ active, setActive, issues }) => {
  return (
    <div className={styles.cardListContainer}>
      {/* <ToggleSwitch active={active} setActive={setActive} /> */}
        <>
          {issues.map((issue) => (
            <IssueItem key={issue.issueId} issue={issue} />
          ))}
        </>
    </div>
  );
};

export default CardList;
