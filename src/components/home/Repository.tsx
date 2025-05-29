import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Repository.module.css';
import star from '../../assets/star.svg'
import { Repository as RepoType } from '../../types/repository';


const SvgToggleFill: React.FC = () => {
  const [isFilled, setIsFilled] = useState<boolean>(false);

  return (
    <div
      className={`${styles.svgWrapper} ${isFilled ? styles.filled : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        setIsFilled((prev) => !prev);
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

interface Props {
  repo: RepoType;
}

const Repository: React.FC<Props> = ({ repo }) => {
  const navigate = useNavigate();
  const onClickContainer = () => {
    navigate(`/project`);
  };
  const formatStars = (stars: number) => {
    return stars >= 1000 ? `${(stars / 1000).toFixed(1)}k` : stars.toString();
  };

  return (
    <>
      <div className={styles.container} onClick={onClickContainer}>
        <div className={styles.bg}></div>
        <div className={styles.header}>
          <div className={styles.headerTop}>
            <div className={styles.title}>{repo.repoName}</div>
            <SvgToggleFill></SvgToggleFill>
          </div>
          <div className={styles.description}>
            {repo.summary}
          </div>
        </div>
        <div className={styles.footer}>
          <div className={styles.footerLeft}>
            <div className={styles.languageIcon}></div>
            <div className={styles.language}>{repo.language}</div>
          </div>
          <div className={styles.footerMiddle}>
            <img src={star}></img>
            <div className={styles.stars}>{formatStars(repo.stars)}</div>
            <div className={styles.builtBy}>Built by</div>
          </div>
          <div className={styles.footerRight}>
            <div className={styles.circle}></div>
            <div className={styles.circle}></div>
            <div className={styles.circle}></div>
            <div className={styles.circle}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Repository;
