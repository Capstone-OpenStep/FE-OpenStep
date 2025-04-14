import React, { useState } from 'react';
import styles from './UserInfo.module.css';
import users from '../../assets/users.svg'
import location from '../../assets/location.svg'
import email from '../../assets/email.svg'
import chain from '../../assets/chain.svg'

const UserInfo: React.FC = () => {

  return (
    <div>
      <div style={{ width: 300, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 19, display: 'inline-flex' }}>
        <div style={{ width: 250, height: 250, background: '#967B7B', borderRadius: 9999 }} />
        <div style={{ alignSelf: 'stretch', height: 28, textAlign: 'center', color: 'black', fontSize: 30, fontFamily: 'Noto Sans KR', fontWeight: '600', wordWrap: 'break-word' }}>allorak333</div>
        <div style={{ width: 300, height: 30, background: '#206B5D', borderRadius: 5 }}>
          <div style={{ position: 'absolute', width: 225.41, height: 30, background: '#48D3BA', borderRadius: 5, zIndex:1}} />
          <div style={{ position: 'absolute', width: 300, height: 30, textAlign: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'white', fontSize: 13, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word', zIndex:2 }}>level 10 - 78%</div>
        </div>
        <div style={{ width: 300, height: 30, position: 'relative', background: '#DFE7EC', overflow: 'hidden', borderRadius: 5, outline: '1px rgba(0, 0, 0, 0.06) solid', outlineOffset: '-1px' }}>
          <div style={{ left: 116, top: 7, position: 'absolute', color: 'rgba(0, 0, 0, 0.62)', fontSize: 13, fontFamily: 'Noto Sans KR', fontWeight: '600', wordWrap: 'break-word' }}>Edit profile</div>
        </div>
        <div data-size="20" style={{ width: '100%',height: 20, position: 'relative',display: 'flex', flexDirection: 'row', gap:10, alignItems:'center', overflow: 'hidden' }}>
          <img src={users}/>
          <div style={{ width: 202.16, height: 19, display: 'flex', flexDirection: 'row', gap:4, alignItems:'center', }}>
            <span style={{color: '#4E4C4C', fontSize: 14, fontFamily: 'Noto Sans KR', fontWeight: '700', wordWrap: 'break-word'}}>39</span>
            <span style={{color: '#4E4C4C', fontSize: 14, fontFamily: 'Noto Sans KR', fontWeight: '500', wordWrap: 'break-word'}}> followers . </span>
            <span style={{color: '#4E4C4C', fontSize: 14, fontFamily: 'Noto Sans KR', fontWeight: '700', wordWrap: 'break-word'}}>27</span>
            <span style={{color: '#4E4C4C', fontSize: 14, fontFamily: 'Noto Sans KR', fontWeight: '500', wordWrap: 'break-word'}}> following</span>
          </div>
        </div>
        <div data-size="20" style={{ width: '100%', height: 20, position: 'relative', display: 'flex', flexDirection: 'row', gap:10, alignItems:'center', overflow: 'hidden'}}>
          <img src={location}/>
          <div style={{ width: 202.16, height: 19, color: '#4E4C4C', fontSize: 14, fontFamily: 'Noto Sans KR', fontWeight: '500', wordWrap: 'break-word' }}>Seoul, South Korea</div>
        </div>
        <div data-size="20" style={{ width: '100%', height: 20, position: 'relative', display: 'flex', flexDirection: 'row', gap:10, alignItems:'center',overflow: 'hidden' }}>
          <img src={email}/>
          <div style={{ width: 202.16, height: 19, color: '#4E4C4C', fontSize: 14, fontFamily: 'Noto Sans KR', fontWeight: '500', wordWrap: 'break-word' }}>user@naver.com</div>
        </div>
        <div data-size="20" style={{ width: '100%', height: 20, position: 'relative', display: 'flex', flexDirection: 'row',gap:10, alignItems:'center', overflow: 'hidden' }}>
          <img src={chain}/>
          <div style={{ width: 265.89, height: 19, color: '#4E4C4C', fontSize: 14, fontFamily: 'Noto Sans KR', fontWeight: '500', wordWrap: 'break-word' }}>in/userprofile</div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
