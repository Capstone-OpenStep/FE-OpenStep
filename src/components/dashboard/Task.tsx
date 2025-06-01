import React from 'react';
import { StaticRouterProps, useNavigate } from 'react-router-dom';
import styles from './Task.module.css';
import check from '../../assets/check.svg';

interface TaskProps {
    taskId: number,
    taskName: string,
    branch: string,
    status: string,
}


const Task: React.FC<TaskProps> = ({ taskId, taskName, branch, status }) => {
    const navigate = useNavigate();
    const onClickTask = () => {
        navigate(`/issue/?taskId=${taskId}`);
    };

    return (
        <div className={styles.taskCard} onClick={onClickTask} style={{ cursor: 'pointer' }}>
            <div className={styles.titleWrapper}>
                <div className={styles.title}>{taskName}</div>
            </div>
            <div className={styles.branch}>{branch}</div>
            <div className={styles.issueButton}>
                <div className={styles.issueText}>{status}</div>
            </div>
            <img className={styles.checkIcon} src={check} />
        </div>
    );
};

export default Task;