import React, { useState } from 'react';
import styles from './Issue.module.css';
import Summary from '../components/project/Summary';
import logo from '../assets/projectLogo.svg'
import Descrption from '../components/issue/IssueDescription' 
import Milestone from '../components/issue/Milestone';
import Guide from '../components/issue/Guide'

const Project: React.FC = () => {
    const [stage, setStage] = useState<number>(1);
    
    return (
        <div className={styles.body}>
            <div className={`${styles.section} ${styles.sectionLeft}`}>
                <img style={{width: 250, height: 250}} src={logo} />
                <Summary/>
            </div>
            <div className={`${styles.section} ${styles.sectionMiddle}`}>
                <Descrption stage={stage} setStage={setStage}/>
            </div>
            <div className={`${styles.section} ${styles.sectionRight}`}>
                <Milestone currentStage={stage}/>
                <Guide title={''} text={''}/>
            </div>
        </div>
    );
};

export default Project;
