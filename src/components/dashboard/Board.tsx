import React, { useState } from 'react';
import styles from './Board.module.css';
import overview from '../../assets/overview.svg'
import list from '../../assets/list.svg'
import bookmark from '../../assets/bookmark.svg'
import TaskList from './TaskList'


const Board: React.FC = () => {

  return (
    <div>
      <div className={styles.buttonList}>
        <div className={styles.selectButton}>
          <div className={styles.buttonDescription}>
            <img src={overview} style={{ height: 20, width: 20 }}></img>
            <span className={styles.buttonText}>overview</span>
          </div>
        </div>
        <div className={styles.selectButton}>
          <div className={styles.buttonDescription}>
            <img src={list} style={{ height: 20, width: 20 }}></img>
            <span className={styles.buttonText}>projects</span>
          </div>
        </div>
        <div className={styles.selectButton}>
          <div className={styles.buttonDescription}>
            <img src={bookmark} style={{ height: 20, width: 20 }}></img>
            <span className={styles.buttonText}>bookmark</span>
          </div>
        </div>
      </div>
        <TaskList></TaskList>
    </div>
  );
};

export default Board;
