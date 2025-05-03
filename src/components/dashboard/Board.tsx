import React, { useState } from 'react';
import styles from './Board.module.css';
import overview from '../../assets/overview.svg'
import list from '../../assets/list.svg'
import bookmark from '../../assets/bookmark.svg'
import TaskList from './TaskList'
import BookmarkList from './BookmarkList';
import Overview from './Overview'

const Board: React.FC = () => {
  const [select, setSelect] = useState<number>(0);

  return (
    <div>
      <div className={styles.buttonList}>
        <div
          className={`${styles.selectButton} ${select === 0 ? styles.selected : ''}`}
          onClick={() => setSelect(0)}
        >
          <div className={styles.buttonDescription}>
            <img src={overview} style={{ height: 20, width: 20 }} />
            <span className={styles.buttonText}>overview</span>
          </div>
        </div>

        <div
          className={`${styles.selectButton} ${select === 1 ? styles.selected : ''}`}
          onClick={() => setSelect(1)}
        >
          <div className={styles.buttonDescription}>
            <img src={list} style={{ height: 20, width: 20 }} />
            <span className={styles.buttonText}>projects</span>
          </div>
        </div>

        <div
          className={`${styles.selectButton} ${select === 2 ? styles.selected : ''}`}
          onClick={() => setSelect(2)}
        >
          <div className={styles.buttonDescription}>
            <img src={bookmark} style={{ height: 20, width: 20 }} />
            <span className={styles.buttonText}>bookmark</span>
          </div>
        </div>
      </div>
      {select === 0 && <Overview />}
      {select === 1 && <TaskList />}
      {select === 2 && <BookmarkList />}
    </div>
  );
};

export default Board;
