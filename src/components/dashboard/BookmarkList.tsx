import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BookmarkList.module.css';
import star from '../../assets/star.svg'
import { IssueBookmarked } from '../../types/issue'


interface BookmarkProps {
    bookmark: IssueBookmarked;
};

const Bookmark: React.FC<BookmarkProps> = ({ bookmark }) => {
    const navigate = useNavigate();


    const getLanguageColor = (language: string | null | undefined): string => {
        if (!language) return '#FF9D48'; // 기본값 (예: 오렌지색)

        const normalized = language.trim().toLowerCase();

        const colorMap: Record<string, string> = {
            'c': '#555555',
            'c++': '#f34b7d',
            'java': '#b07219',
            'java script': '#f1e05a',
            'javascript': '#f1e05a',
            'python': '#3572A5',
            'rust': '#dea584',
            'go': '#00ADD8',
            'typescript': '#2b7489',
            'ruby': '#701516',
            'c#': '#178600',
            'perl': '#0298c3',
            'swift': '#ffac45',
            'kotlin': '#A97BFF',
            'php': '#4F5D95',
            'r': '#198CE7',
            'sql': '#e38c00',
            'matlab': '#e16737',
            'scratch': '#ffa500',
            'markdown': '#083fa1',
            'html': '#e34c26',
        };

        return colorMap[normalized] || '#FF9D48';
    };


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

    const onClickCard = () => {
        navigate(`/issue/?issueId=${bookmark.issueId}`)
    };

    return (
        <div className={styles.card} onClick={onClickCard}>
            <div className={styles.contentWrapper}>
                <div className={styles.title}>{bookmark.issueTitle}</div>
                <div className={styles.subtitle}>{bookmark.repoName}</div>
                <div className={styles.bottomRow}>
                    <div className={styles.language}>
                        <div className={styles.languageDot} style={{ backgroundColor: getLanguageColor(bookmark.language) }} />
                        <div className={styles.languageText}>{bookmark.language}</div>
                    </div>
                    {/* <div className={styles.stars}>
                        <img src={star} className={styles.starIcon} />
                        <div className={styles.starCount}>190k</div>
                    </div> */}
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
