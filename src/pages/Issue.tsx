import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Issue.module.css';
import Summary from '../components/project/Summary';
import logo from '../assets/projectLogo.svg'
import Descrption from '../components/issue/IssueDescription' // Note: Typo in original, should be "Description"
import Milestone from '../components/issue/Milestone';
import Guide from '../components/issue/Guide'
import { getIssueDescription } from '../api/issue'
import { getRepositoryDescription } from '../api/repository'
import { IssueDescription } from '../types/issueDescription';
import { RepositoryDescription } from '../types/repositoryDescription'
import { Task } from '../types/task'
import { assignTask, getTask } from '../api/task'
import axios from 'axios';

const Project: React.FC = () => {
    const [stage, setStage] = useState<number>(1);
    const [issueId, setIssueId] = useState<number>(-1);
    const location = useLocation();
    const navigate = useNavigate();
    const [issue, setIssue] = useState<IssueDescription>({
        issueId: 0,
        repoId: 0,
        title: '',
        body: '',
        summary: '',
        language: 'string',
        url: 'string',
        createdAt: 'string',
        updatedAt: 'string',
        author: 'string',
        labels: [''],
    });
    const [repository, setRepository] = useState<RepositoryDescription>({
        repoId: 0,
        repoName: '',
        summary: '',
        ownerName: '',
        description: '',
        language: '',
        stars: 0,
        watchers: 0,
        forks: 0,
        openIssues: 0,
        closedIssues: 0,
        beginnerIssueCount: 0,
        githubUrl: '',
        readmeUrl: '',
    });

    useEffect(() => {
        const query = location.search;
        const searchParams = new URLSearchParams(query);
        const issueId = searchParams.get('issueId');
        const taskId = searchParams.get('taskId');
        
        const fetchIssue = async (issueId : number) => {
            try {
                const fetchedIssue = await getIssueDescription(+issueId);
                setIssue(fetchedIssue);
                if (fetchedIssue && fetchedIssue.repoId) {
                    const fetchedRepository = await getRepositoryDescription(fetchedIssue.repoId);
                    setRepository(fetchedRepository);
                    setIssueId(+issueId);
                } else if (fetchedIssue) {
                    console.error("RepoId missing from issue data");
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    if (error.response?.status === 401) {
                        console.error("로그인이 필요합니다.");
                    } else {
                        console.error("API 오류:", error.response?.data?.message || "알 수 없는 오류");
                    }
                } else {
                    console.error("예상치 못한 오류:", error);
                }
            }
        };

        const fetchTask = async (taskId : number) => {
            try {
                const taskInfo : Task = await getTask(taskId);
                const issueId = taskInfo.issueId;
                let newStage = 1; // Default stage
                switch (taskInfo.status) {
                    case "NOTSTARTED":
                        newStage = 1;
                        break;
                    case "FORKED":
                        newStage = 2;
                        break;
                    case "PR":
                        newStage = 3;
                    case "review":
                        newStage = 4;
                        break;
                    case "Approve":
                        newStage = 5;
                    case "Closed":
                        newStage = 5;
                        break;
                    default:
                        console.warn(`Unknown task status: ${taskInfo.status}. Defaulting to stage 2 as task exists.`);
                        newStage = 1; // If task exists, it's at least at the "assigned" stage
                }
                setStage(newStage);
                fetchIssue(issueId);
            } catch (error) {

            }
        }

        if (taskId != null) {
            fetchTask(+taskId);
        }
        else if (issueId != null) {
            fetchIssue(+issueId);
        } else {
            navigate('/');
        }
    }, [location, navigate]);

    const onClickButton = async () => {
        const result = await assignTask(issueId);
        setStage(stage + 1);
    }

    return (
        <div className={styles.body}>
            <div className={styles.contentWrapper}> {/* New wrapper div */}
                <div className={`${styles.section} ${styles.sectionLeft}`}>
                    <img className={styles.projectLogo} src={logo} alt="Project Logo" />
                    <Summary repository={repository} />
                </div>
                <div className={`${styles.section} ${styles.sectionMiddle}`}>
                    <Descrption title={issue?.title} issueSummary={issue?.summary} issueContent={issue?.body} stage={stage} setStage={setStage} />
                </div>
                <div className={`${styles.section} ${styles.sectionRight}`}>
                    <Milestone currentStage={stage} />
                    <Guide title={''} text={''} />
                    {stage === 1 ? (
                        <div className={styles.startButton} onClick={onClickButton}>
                            <div className={styles.startButtonText}>기여 시작</div>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default Project;