import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './IssueItem.module.css';
import star from '../../assets/star.svg'
import { Issue as IssueType } from '../../types/issue';
import { setBookmarkIssue, delBookmarkIssue } from '../../api/issue'
import { useAuth } from '../AuthContext'
import ErrorModal from '../ErrorModal'

const extractRepoName = (url: string): string => {
  const match = url.match(/github\.com\/([^/]+\/[^/]+)\//);
  return match ? match[1] : 'unknown/repo';
};

const formatTimeAgo = (dateString: string): string => {
  const now = new Date();
  const date = new Date(dateString);
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000); // 초 단위

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

interface Props {
  issue: IssueType;
}

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

interface BookmarkLogoProps {
  issueId: number;
  isbookmarked: boolean;
  setIsBookmarked: React.Dispatch<React.SetStateAction<boolean>>;
  setModalMessage: React.Dispatch<React.SetStateAction<string>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}


const SvgToggleFill: React.FC<BookmarkLogoProps> = ({ issueId, isbookmarked, setIsBookmarked, setModalMessage, setShowModal }) => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const onclickBookmark = async () => {
    if (isLoggedIn == false) {
      setModalMessage("북마크는 로그인 후 이용가능합니다");
      setShowModal(true);
      return;
    }
    if (isbookmarked == false) {
      const response = await setBookmarkIssue(issueId);
      if (response == true)
        setIsBookmarked(true);
    } else {
      const response = await delBookmarkIssue(issueId);
      if (response == true)
        setIsBookmarked(false);
    }
  };

  return (
    <div
      className={`${styles.svgWrapper} ${isbookmarked ? styles.filled : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        onclickBookmark();
      }}
    >
      <svg
        className={styles.svgIcon}
        width="35"
        height="35"
        viewBox="0 0 35 35"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M27.7083 30.625L17.5 23.3333L7.29163 30.625V7.29167C7.29163 6.51812 7.59892 5.77625 8.1459 5.22927C8.69288 4.68229 9.43474 4.375 10.2083 4.375H24.7916C25.5652 4.375 26.307 4.68229 26.854 5.22927C27.401 5.77625 27.7083 6.51812 27.7083 7.29167V30.625Z"
          className={styles.svgPath}
        />
      </svg>
    </div>
  );
};

const IssueItem: React.FC<Props> = ({ issue }) => {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const navigate = useNavigate();
  // 에러 모달
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    setIsBookmarked(issue.bookmarked);
  }, [issue])

  const onClickContainer = () => {
    navigate(`/issue?issueId=${issue.issueId}`);
  };
  const repoFullName = extractRepoName(issue.url); // ex: freeCodeCamp/freeCodeCamp
  const timeAgo = formatTimeAgo(issue.updatedAt);

  const handleModalClose = (e?: React.MouseEvent) => {
    e?.stopPropagation?.();
    setShowModal(false);
  };

  return (
    <div className={styles.cardContainer} onClick={onClickContainer}>

      <div className={styles.issueTitle}>
        {issue.title}
        <SvgToggleFill
          issueId={issue.issueId}
          isbookmarked={isBookmarked}
          setIsBookmarked={setIsBookmarked}
          setModalMessage={setModalMessage}
          setShowModal={setShowModal}
        />
      </div>
      <div className={styles.openedInfo}>
        {issue.summary}
      </div>
      <div className={styles.tagContainer}>
        {issue.labels.map((label, index) => (
          <div key={index} className={styles.tag}>
            <div className={styles.tagText}>{label}</div>
          </div>
        ))}
      </div>
      <div className={styles.cardFooter}>
        <div className={styles.footerLeft}>
          <span className={styles.issueFromLabel}>Issue from</span>
          <span className={styles.repositoryLabel}>{repoFullName}</span>
          <span className={styles.issueFromLabel}>updated</span>
          <span className={styles.issueFromLabel}>{timeAgo}</span>
        </div>
        <div className={styles.footerCenter}>
          <div
            className={styles.statusIndicator}
            style={{ backgroundColor: getLanguageColor(issue.language) }}
          ></div>
          <span className={styles.languageLabel}>{issue.language}</span>
        </div>
      </div>
      <ErrorModal
        show={showModal}
        title="오류"
        message={modalMessage}
        confirmText="확인"
        onConfirm={handleModalClose}
      />
    </div>
  );
};

export default IssueItem;
