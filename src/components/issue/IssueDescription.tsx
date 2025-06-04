import React from 'react';
import styles from './IssueDescription.module.css';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import 'github-markdown-css';

interface IssueDescriptionProps {
    title: string;
    issueSummary: string;
    issueContent: string;
    stage: number;
    setStage: React.Dispatch<React.SetStateAction<number>>;
    isLoading: boolean;
}

const IssueDescription: React.FC<IssueDescriptionProps> = ({
    title,
    issueSummary,
    issueContent,
    stage,
    setStage,
    isLoading
}) => {
    const onClickButton = () => {
        setStage(stage + 1);
    };

    return (
        <div className={styles.container}>
            {/* Title */}
            {isLoading ? (
                <div className={`${styles.titleSkeleton} ${styles.skeleton}`} />
            ) : (
                <div className={styles.title}>{title}</div>
            )}

            {/* Summary */}
            <div className={styles.summaryLabel}>이슈 내용을 요약했어요</div>
            <div className={styles.summaryBox}>
                {isLoading ? (
                    <div className={`${styles.summarySkeleton} ${styles.skeleton}`} />
                ) : (
                    <div className={styles.summaryText}>{issueSummary}</div>
                )}
            </div>

            {/* Content */}
            <div className={styles.detailLabel}>상세 내용은 다음과 같아요</div>
            <div className={styles.contentBox}>
                {isLoading ? (
                    <div className={`${styles.contentSkeleton} ${styles.skeleton}`} />
                ) : (
                    <div className={`markdown-body ${styles.markdownBody} ${styles.markdown}`}>
                        <ReactMarkdown
                            children={issueContent}
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw]}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default IssueDescription;
