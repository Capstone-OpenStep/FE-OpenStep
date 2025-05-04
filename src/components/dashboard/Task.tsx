import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Task.module.css';
import check from '../../assets/check.svg';

const Task: React.FC = () => {
    const navigate = useNavigate();
    const onClickTask = () => {
        navigate(`/issue`);
    };

    return (
        <div onClick={onClickTask} style={{ cursor: 'pointer' }}>
            <div className={styles.taskCard}>
                <div className={styles.title}>README.md 작성</div>
                <div className={styles.branch}>develop</div>
                <div className={styles.issueButton}>
                    <div className={styles.issueText}>Issue Check</div>
                </div>
                <div className={styles.checkIcon}>
                    <img src={check} />
                </div>
            </div>
        </div>
    );
};

export default Task;