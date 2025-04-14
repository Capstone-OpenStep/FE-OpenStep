import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Task.module.css';
import check from '../../assets/check.svg'


const Task: React.FC = () => {
    const navigate = useNavigate();
    const onClickTask = () => {
        navigate(`/issue`);
    };

    return (
        <div onClick={onClickTask} style={{cursor:'pointer'}}>
            <div style={{ width: 220, height: 120, position: 'relative', background: 'white', overflow: 'hidden', borderRadius: 15, outline: '1px rgba(0, 0, 0, 0.17) solid', outlineOffset: '-1px' }}>
                <div style={{ left: 18, top: 20, position: 'absolute', color: 'rgba(0, 0, 0, 0.64)', fontSize: 15, fontFamily: 'Noto Sans KR', fontWeight: '700', wordWrap: 'break-word' }}>README.md 작성</div>
                <div style={{ left: 18, top: 51, position: 'absolute', color: 'black', fontSize: 10, fontFamily: 'Noto Sans KR', fontWeight: '500', wordWrap: 'break-word' }}>develop</div>
                <div style={{ width: 198, height: 27, left: 11, top: 84, position: 'absolute', background: 'white', overflow: 'hidden', borderRadius: 10, outline: '1px rgba(0, 0, 0, 0.30) solid', outlineOffset: '-1px' }}>
                    <div style={{ left: 15, top: 5, position: 'absolute', color: '#474747', fontSize: 13, fontFamily: 'Noto Sans KR', fontWeight: '700', wordWrap: 'break-word' }}>Issue Check</div>
                </div>
                <div style={{ width: 20, height: 20, left: 180, top: 88, position: 'absolute', background: 'white', overflow: 'hidden' }}>
                    <img src={check} />
                </div>
            </div>
        </div >
    );
};

export default Task;
