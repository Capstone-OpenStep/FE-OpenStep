import React, { useState } from 'react';
import styles from './BookmarkList.module.css';
import star from '../../assets/star.svg'

const Bookmark: React.FC = () => {
    return (
        <div className={styles.card}>
            <div className={styles.contentWrapper}>
                <div className={styles.title}>torvalds/linux</div>
                <div className={styles.subtitle}>linux kernel source tree</div>
                <div className={styles.bottomRow}>
                    <div className={styles.language}>
                        <div className={styles.languageDot} />
                        <div className={styles.languageText}>typescript</div>
                    </div>
                    <div className={styles.stars}>
                        <img src={star} className={styles.starIcon} />
                        <div className={styles.starCount}>190k</div>
                    </div>
                    <div className={styles.updated}>updated 2 weeks ago</div>
                </div>
            </div>
        </div>
    );
};


const BookmarkList: React.FC = () => {

    return (
        <div className={styles.boardBody}>
            <div className={styles.bookmarkList}>
                <Bookmark></Bookmark>
                <Bookmark></Bookmark>
                <Bookmark></Bookmark>
                <Bookmark></Bookmark>
                <Bookmark></Bookmark>
                <Bookmark></Bookmark>
                <Bookmark></Bookmark>
                <Bookmark></Bookmark>
            </div>
        </div>
    );
};

export default BookmarkList;
