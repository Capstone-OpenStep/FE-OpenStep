import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Issue.module.css';
import Summary from '../components/project/Summary';
import logo from '../assets/projectLogo.svg'
import Descrption from '../components/issue/IssueDescription' // Note: Typo in original, should be "Description"
import Milestone from '../components/issue/Milestone';
import Guide from '../components/issue/Guide'
import { getIssueDescription, getIssueDescriptionFromUrl } from '../api/issue'
import { getRepositoryDescription } from '../api/repository'
import { IssueDescription } from '../types/issueDescription';
import { RepositoryDescription } from '../types/repositoryDescription'
import { Task, TaskAssignResult, Stage } from '../types/task'
import { assignTask, getTask, setStatusProgress } from '../api/task'
import CheckIcon from '../components/issue/checkIcon';
import axios from 'axios';

const Project: React.FC = () => {
    const [stage, setStage] = useState<Stage>("NOT_STARTED");
    const [issueId, setIssueId] = useState<number>(-1);
    // const [loadedTaskId, setLoadedTaskId] = useState<number | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();
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
        ownerAvatarUrl: '',
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
    const [task, setTask] = useState<Task>({
        taskId: 0,
        title: "",
        forkedUrl: "",
        status: "NOT_STARTED",
        branchName: "",
        createdAt: "",
        updatedAt: "",
        issueId: 0,
        issueUrl: "",
        prUrl: "",
    });
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [showCheckIcon, setShowCheckIcon] = useState<boolean>(false);


    useEffect(() => {
        const query = location.search;
        const searchParams = new URLSearchParams(query);
        const githubUrl = searchParams.get('githubUrl');
        const issueId = searchParams.get('issueId');
        const taskId = searchParams.get('taskId');

        const fetchIssue = async (issueId: number) => {
            console.log("fetch issue")
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
            } finally {
                setIsLoading(false);
            }
        };

        const fetchTask = async (taskId: number) => {
            try {
                const taskInfo: Task = await getTask(taskId);
                const issueId = taskInfo.issueId;
                setStage(taskInfo.status);
                fetchIssue(issueId);
                setTask(taskInfo);
            } catch (error) {

            }
        }

        const fetchIssueFromUrl = async (githubUrl: string) => {
            console.log("fetch from url")
            try {
                const fetchedData = await getIssueDescriptionFromUrl(githubUrl);
                const fetchedIssue = fetchedData.issue;
                const fetchedRepository = fetchedData.repo;
                setIssue(fetchedIssue);
                setRepository(fetchedRepository);
                setIssueId(fetchedIssue.issueId);
                const task: Task = {
                    taskId: 0,
                    title: "",
                    forkedUrl: "",
                    status: "NOT_STARTED",
                    branchName: "",
                    createdAt: "",
                    updatedAt: "",
                    issueId: 0,
                    issueUrl: "",
                    prUrl: "",
                }
                task.issueUrl = fetchedIssue.url;
                setTask(task);
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
            } finally {
                setIsLoading(false);
            }
        };

        if (githubUrl != null) {
            fetchIssueFromUrl(githubUrl);
        } else if (taskId != null) {
            fetchTask(+taskId);
        } else if (issueId != null && taskId == null) {
            fetchIssue(+issueId);
        } else {
            navigate('/');
        }
    }, [location, navigate]);

    const startTask = async () => {
        const result = await assignTask(issueId);
        setStage("FORKED");

        // timeout 3 second
        setShowCheckIcon(true);
        setTimeout(() => setShowCheckIcon(false), 3000);

        const query = location.search;
        const searchParams = new URLSearchParams(query);
        searchParams.set('taskId', String(result.taskId));
        setSearchParams(searchParams);
        const task: Task = {
            taskId: result.taskId,
            title: result.title,
            forkedUrl: result.forkedUrl,
            status: "FORKED",
            branchName: result.branchName,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt,
            issueId: result.issueId,
            issueUrl: '',
            prUrl: '',
        };
        setTask(task);
    }

    const refreshTask = async (taskId: number) => {
        try {
            const taskInfo: Task = await getTask(taskId);
            setStage(taskInfo.status);
            setTask(taskInfo);
        } catch (error) {

        }
    }

    const setStageProgress = async (taskId: number) => {
        try {
            console.log("test")
            const result : boolean = await setStatusProgress(taskId);
            if (result == true) {
                setStage("PROGRESS");
            }
        } catch (error) {

        }
    }

    return (
        <div className={styles.body}>
            <div className={styles.contentWrapper}> {/* New wrapper div */}
                <div className={`${styles.section} ${styles.sectionLeft}`}>
                    {isLoading ? (
                        <div className={`${styles.imageSkeleton} ${styles.skeleton}`} />
                    ) : (
                        <img className={styles.projectLogo} src={repository.ownerAvatarUrl} />
                    )}
                    <Summary repository={repository} isLoading={isLoading} />
                </div>
                <div className={`${styles.section} ${styles.sectionMiddle}`}>
                    <Descrption title={issue?.title} issueSummary={issue?.summary} issueContent={issue?.body} isLoading={isLoading} />
                </div>
                <div className={`${styles.section} ${styles.sectionRight}`}>
                    {(stage === "MERGED" || stage === "REJECTED" || showCheckIcon) ? (
                        <>
                            {showCheckIcon && (
                                <CheckIcon
                                    checked={true}
                                    content={"포크가 완료되었어요!"}
                                    isHelp={false}
                                    help=''
                                />
                            )}
                            {stage === "MERGED" && !showCheckIcon && (
                                <CheckIcon
                                    checked={true}
                                    content={"기여가 완료되었어요!"}
                                    isHelp={false}
                                    help=''
                                />
                            )}
                            {stage === "REJECTED" && !showCheckIcon && (
                                <CheckIcon
                                    checked={false}
                                    content={"기여가 반려되었어요.."}
                                    isHelp={true}
                                    help='내 태스크가 왜 반려되었나요?'
                                />
                            )}
                        </>
                    ) : (
                        <>
                            <Milestone stage={stage} />
                            <Guide stage={stage} setStage={setStage} task={task} issueUrl={issue.issueUrl} refreshTask={refreshTask} />
                            {stage === "NOT_STARTED" && (
                                <div className={styles.startButton} onClick={startTask}>
                                    <div className={styles.startButtonText}>기여 시작</div>
                                </div>
                            )}
                            {stage === "FORKED" && (
                                <div className={styles.startButton} onClick={() => { setStageProgress(task.taskId) }}>
                                    <div className={styles.startButtonText}>넘어 가기</div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Project;