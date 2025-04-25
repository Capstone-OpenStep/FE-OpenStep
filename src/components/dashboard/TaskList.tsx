import React, { useState } from 'react';
import styles from './TaskList.module.css';
import arrow from '../../assets/arrowDown.svg'
import setting from '../../assets/setting.svg'
import Repository from './Repository'

const TaskList: React.FC = () => {

    return (
        <div className={styles.boardBody}>
            <div style={{ top: 17, width: 795, height: 35, position: 'relative', borderRadius: 5 }}>
                <div style={{ width: 136, height: 34, left: 0, top: 1, position: 'absolute', display: 'flex', alignItems: 'center', background: '#DFDDFF', overflow: 'hidden', borderRadius: 5 }}>
                    <div style={{ left: 15, position: 'absolute', color: 'black', fontSize: 16, fontFamily: 'Noto Sans KR', fontWeight: '500', wordWrap: 'break-word' }}>시간순</div>
                    <div data-size="32" style={{ width: 32, height: 32, left: 104, position: 'absolute', overflow: 'hidden' }}>
                        <img src={arrow} />
                    </div>
                </div>
                <div style={{ width: 136, height: 34, left: 162, top: 1, position: 'absolute', display: 'flex', alignItems: 'center', background: '#DFDDFF', overflow: 'hidden', borderRadius: 5 }}>
                    <div style={{ left: 15, position: 'absolute', color: 'black', fontSize: 16, fontFamily: 'Noto Sans KR', fontWeight: '500', wordWrap: 'break-word' }}>상태</div>
                    <div data-size="32" style={{ width: 32, height: 32, left: 104, position: 'absolute', overflow: 'hidden' }}>
                        <img src={arrow} />
                    </div>
                </div>
                <div style={{ width: 179, height: 34, left: 616, top: 0, position: 'absolute', display: 'flex', alignItems: 'center', background: 'rgba(125.03, 123.09, 156.06, 0.39)', overflow: 'hidden', borderRadius: 5 }}>
                    <div style={{ left: 15, position: 'absolute', color: 'black', fontSize: 16, fontFamily: 'Noto Sans KR', fontWeight: '500', wordWrap: 'break-word' }}>필터 및 정렬 초기화</div>
                    <div style={{ width: 24, height: 24, left: 150, position: 'absolute' }}>
                        <img src={setting} />
                    </div>
                </div>
            </div>
            <div className={styles.repositoryList}>
                <Repository />
                <Repository />
                <Repository />
                <Repository />
            </div>
        </div>
    );
};

export default TaskList;
