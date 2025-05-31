import React, { useState } from 'react';
import styles from './BookmarkList.module.css';
import star from '../../assets/star.svg'
import { IssueBookmarked } from '../../types/issue'


interface BookmarkProps {
    bookmark: IssueBookmarked;
};

const Bookmark: React.FC<BookmarkProps> = ({ bookmark }) => {

    const formatTimeAgo = (dateString: string): string => {
        const now = new Date();
        const date = new Date(dateString);
        const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

        const units = [
            { label: 'year', seconds: 60 * 60 * 24 * 365 },
            { label: 'month', seconds: 60 * 60 * 24 * 30 },
            { label: 'week', seconds: 60 * 60 * 24 * 7 },
            { label: 'day', seconds: 60 * 60 * 24 },
            { label: 'hour', seconds: 60 * 60 },
            { label: 'minute', seconds: 60 },
        ];

        for (const unit of units) {
            const value = Math.floor(diff / unit.seconds);
            if (value >= 1) return `${value} ${unit.label}${value > 1 ? 's' : ''} ago`;
        }

        return 'just now';
    };

    return (
        <div className={styles.card}>
            <div className={styles.contentWrapper}>
                <div className={styles.title}>{bookmark.issueTitle}</div>
                <div className={styles.subtitle}>{bookmark.repoName}</div>
                <div className={styles.bottomRow}>
                    <div className={styles.language}>
                        <div className={styles.languageDot} />
                        <div className={styles.languageText}>{bookmark.language}</div>
                    </div>
                    <div className={styles.stars}>
                        <img src={star} className={styles.starIcon} />
                        <div className={styles.starCount}>190k</div>
                    </div>
                    <div className={styles.updated}>updated {formatTimeAgo(bookmark.updatedAt)}</div>
                </div>
            </div>
        </div>
    );
};


interface BookmarkListProps {
    bookmarkList: IssueBookmarked[];
};

const BookmarkList: React.FC<BookmarkListProps> = ({ bookmarkList }) => {

    return (
        <div className={styles.boardBody}>
            <div className={styles.bookmarkList}>
                {bookmarkList.map((bookmark) => (<Bookmark bookmark={bookmark} />))}
            </div>
        </div>
    );
};

export default BookmarkList;
