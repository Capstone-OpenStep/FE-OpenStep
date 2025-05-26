import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext'
import styles from './Issue.module.css';
import Summary from '../components/project/Summary';
import logo from '../assets/projectLogo.svg'
import Descrption from '../components/issue/IssueDescription'
import Milestone from '../components/issue/Milestone';
import Guide from '../components/issue/Guide'
import { getIssueDescription } from '../api/issue'
import { getRepositoryDescription } from '../api/repository'
import { IssueDescription } from '../types/issueDescription';
import { RepositoryDescription } from '../types/repositoryDescription'
import axios from 'axios';

const Project: React.FC = () => {
    const [stage, setStage] = useState<number>(1);
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
        if (issueId === null) {
            navigate('/');
        }
        else {
            const fetchData = async () => {
                try {
                    const issue = await getIssueDescription(+issueId);
                    setIssue(issue);
                    const repository = await getRepositoryDescription(issue.repoId);
                    setRepository(repository);
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
            fetchData();
        }

    }, [location])

    return (
        <div className={styles.body}>
            <div className={`${styles.section} ${styles.sectionLeft}`}>
                <img style={{ width: 250, height: 250 }} src={logo} />
                <Summary repository={repository}/>
            </div>
            <div className={`${styles.section} ${styles.sectionMiddle}`}>
                <Descrption title={issue?.title} issueSummary={issue?.summary} issueContent={issue?.body} stage={stage} setStage={setStage} />
            </div>
            <div className={`${styles.section} ${styles.sectionRight}`}>
                <Milestone currentStage={stage} />
                <Guide title={''} text={''} />
            </div>
        </div>
    );
};

export default Project;
