import React, { useState, useEffect } from 'react';
import styles from './Board.module.css';
import overview from '../../assets/overview.svg'
import list from '../../assets/list.svg'
import bookmark from '../../assets/bookmark.svg'
import TaskList from './TaskList'
import BookmarkList from './BookmarkList';
import Overview from './Overview'
import { getTaskList, getTaskStatistic } from '../../api/task';
import { GroupedTasks, TaskStatistic } from '../../types/task';
import { getBookmarkIssue } from '../../api/issue';
import { IssueBookmarked } from '../../types/issue'

const Board: React.FC = () => {
  const [select, setSelect] = useState<number>(0);
  const [taskGroup, setTaskGroup] = useState<GroupedTasks[]>([]);
  const [bookmarkList, setBookmarkList] = useState<IssueBookmarked[]>([]);
  const [TaskStatistic, setTaskStatistic] = useState<TaskStatistic>({
    "feature": 0,
    "bug": 0,
    "refactor": 0,
    "good first issue": 0,
    "chore": 0,
    "other": 0
  });

  useEffect(() => {
    const fetchData = async () => {
      const tasks = await getTaskList();
      setTaskGroup(tasks);
      const bookmarks = await getBookmarkIssue();
      setBookmarkList(bookmarks);
      const taskStatistic = await getTaskStatistic();
      setTaskStatistic(taskStatistic);
    };

    fetchData();
  }, []);

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
      {select === 0 && <Overview taskStatistic={TaskStatistic}/>}
      {select === 1 && <TaskList tasks={taskGroup}/>}
      {select === 2 && <BookmarkList bookmarkList={bookmarkList}/>}
    </div>
  );
};

export default Board;
