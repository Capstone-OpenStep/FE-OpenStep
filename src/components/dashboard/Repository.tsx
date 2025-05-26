import React, { useState } from 'react';
import Task from './Task'
import star from '../../assets/starGold.svg'
import { GroupedTasks, TaskItem } from '../../types/task';

interface RepositoryProps {
    tasks : GroupedTasks
};

const Repository: React.FC = () => {

    return (
        <div>
            <div style={{ width: 763, minHeight: 288, position: 'relative', display:'flex', flexDirection:'column', alignItems:'center', background: 'white', borderRadius: 10, outline: '1px rgba(0, 0, 0, 0.19) solid', outlineOffset: '-1px', backdropFilter: 'blur(2px)' }}>
                <div style={{width:'100%', top:18, position:'relative'}}>
                    <div style={{ left: 20, position: 'relative', color: '#5353FF', fontSize: 18, fontFamily: 'Noto Sans KR', fontWeight: '700', wordWrap: 'break-word' }}>torvalds/linux</div>
                    <div style={{ left: 20, top: 6, width:'100%', height: 20, position: 'relative',display: 'flex', flexDirection:'row', alignItems:'center'}}>
                        <div style={{ position: 'absolute', color: 'rgba(0, 0, 0, 0.49)', fontSize: 18, fontFamily: 'Noto Sans KR', fontWeight: '700', wordWrap: 'break-word' }}>linux kernel source tree</div>
                        <div style={{position: 'absolute', right: 50, display: 'flex', flexDirection: 'row', gap: 8, alignItems:'center'}}>
                            <div style={{ width: 12, height: 12, background: '#206B5D', borderRadius: 9999 }} />
                            <div style={{ width: 48, color: '#737373', fontSize: 16, fontFamily: 'Noto Sans KR', fontWeight: '600', wordWrap: 'break-word' }}>c/c++</div>
                            <img src={star}></img>
                            <div style={{ width: 40, color: '#7E7E7E', fontSize: 16, fontFamily: 'Noto Sans KR', fontWeight: '600', wordWrap: 'break-word' }}>190k</div>
                            <div style={{ color: '#5C5C5C', fontSize: 14, fontFamily: 'Noto Sans KR', fontWeight: '600', wordWrap: 'break-word' }}>updated 2 weeks ago</div>
                        </div>
                    </div>
                </div>
                <div style={{top:50, position:'relative', display:'grid', gridTemplateColumns:'auto auto auto', gap: 22, alignItems:'center', justifyContent:'center'}}>
                    <Task/>
                    <Task/>
                    <Task/>
                </div>
                <div data-option="새로고침+포인트" style={{ top:72, width: 104, height: 28, marginBottom: 90, position:'relative', paddingLeft: 20, paddingRight: 20, paddingTop: 11, paddingBottom: 11, borderRadius: 20, outline: '1px var(--Line-line-divider-8, rgba(0, 0, 0, 0.08)) solid', outlineOffset: '-1px', justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex' }}>
                    <div style={{ color: 'var(--Font-text-primary, black)', fontSize: 10, fontFamily: 'Noto Sans KR', fontWeight: '400', wordWrap: 'break-word' }}>MORE</div>
                </div>
            </div>
        </div >
    );
};

export default Repository;
