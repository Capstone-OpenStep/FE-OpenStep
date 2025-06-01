import React, { useState, useRef, useEffect, useMemo } from 'react';
import styles from './TaskList.module.css';
import arrow from '../../assets/arrowDown.svg';
import setting from '../../assets/setting.svg';
import Repository from './Repository';
import { GroupedTasks, TaskItem } from '../../types/task';

interface TaskListProps {
    tasks: GroupedTasks[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
    const [timeSortOpen, setTimeSortOpen] = useState(false);
    const [statusSortOpen, setStatusSortOpen] = useState(false);
    const [selectedTime, setSelectedTime] = useState('시간순');
    const [selectedStatus, setSelectedStatus] = useState('상태');

    const timeRef = useRef<HTMLDivElement>(null);
    const statusRef = useRef<HTMLDivElement>(null);

    const timeOptions = ['최신순', '오래된 순'];
    const statusOptions = ['브랜치 생성', 'PR 생성', '리뷰', '머지'];

    const resetFilters = () => {
        setSelectedTime('시간순');
        setSelectedStatus('상태');
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (timeRef.current && !timeRef.current.contains(event.target as Node)) {
                setTimeSortOpen(false);
            }
            if (statusRef.current && !statusRef.current.contains(event.target as Node)) {
                setStatusSortOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);


    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'NOTSTARTED': return '이슈 생성';
            case 'FORKED': return '브랜치 생성';
            case 'PR': return 'PR 생성';
            case 'review': return '리뷰';
            case 'Approve': return '머지';
            case 'Closed': return '머지';
            default: return '';
        }
    };

    const filteredAndSortedTasks = useMemo(() => {
        // 필터링
        let newTasks = tasks.map(repo => ({
            ...repo,
            tasks: repo.tasks.filter(task => {
                return selectedStatus === '상태' || getStatusLabel(task.status) === selectedStatus;
            }),
        }));

        // 정렬
        newTasks = newTasks.map(repo => {
            const sortedRepoTasks = [...repo.tasks];
            if (selectedTime === '오래된 순') {
                sortedRepoTasks.reverse();
            }
            return {
                ...repo,
                tasks: sortedRepoTasks,
            };
        });

        newTasks = newTasks.filter(repo => repo.tasks.length > 0);

        if (selectedTime === '오래된 순') {
            newTasks = newTasks.reverse();
        } 

        return newTasks;
    }, [tasks, selectedTime, selectedStatus]);



    return (
        <div className={styles.boardBody}>
            <div className={styles.sortBar}>
                {/* 시간순 */}
                <div ref={timeRef} className={styles.selectBox}>
                    <div className={styles.selectButton} onClick={() => setTimeSortOpen(prev => !prev)}>
                        <div className={styles.selectText}>{selectedTime}</div>
                        <img src={arrow} className={styles.arrowIcon} />
                    </div>
                    {timeSortOpen && (
                        <div className={styles.dropdown}>
                            {timeOptions.map(opt => (
                                <div
                                    key={opt}
                                    onClick={() => {
                                        setSelectedTime(opt);
                                        setTimeSortOpen(false);
                                    }}
                                    className={styles.dropdownItem}
                                >
                                    {opt}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                {/* 상태 */}
                <div ref={statusRef} className={styles.selectBox}>
                    <div className={styles.selectButton} onClick={() => setStatusSortOpen(prev => !prev)}>
                        <div className={styles.selectText}>{selectedStatus}</div>
                        <img src={arrow} className={styles.arrowIcon} />
                    </div>
                    {statusSortOpen && (
                        <div className={styles.dropdown}>
                            {statusOptions.map(opt => (
                                <div
                                    key={opt}
                                    onClick={() => {
                                        setSelectedStatus(opt);
                                        setStatusSortOpen(false);
                                    }}
                                    className={styles.dropdownItem}
                                >
                                    {opt}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                {/* 필터 초기화 */}
                <div className={styles.resetButton} onClick={resetFilters}>
                    <div className={styles.resetText}>필터 및 정렬 초기화</div>
                    <img src={setting} className={styles.settingIcon} />
                </div>
            </div>
            <div className={styles.repositoryList}>
                {filteredAndSortedTasks.map((repository) => (
                    <Repository key={repository.repoId} tasks={repository} />
                ))}
            </div>
            {/* <div className={styles.repositoryList}>
                {tasks.map((repository) => (<Repository tasks={repository} />))}
            </div> */}
        </div>
    );
};

export default TaskList;
