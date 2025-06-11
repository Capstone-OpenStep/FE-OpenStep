import React from 'react';
import styles from './checkIcon.module.css';
import 'github-markdown-css';
import checkedIcon from '../../assets/checkIcon.svg';
import rejectedIcon from '../../assets/rejectedIcon.svg'
import questionMark from '../../assets/questionMark.svg'

interface CheckIconProps {
    checked: boolean;
    content: string;
    isHelp: boolean;
    help: string;
}

const CheckIcon: React.FC<CheckIconProps> = ({
    checked,
    content,
    isHelp,
    help
}) => {


    return (
        <div className={styles.container}>
            {checked ? (<img className={styles.icon} src={checkedIcon}></img>) :
                (<img className={styles.icon} src={rejectedIcon}></img>)}

            <span className={styles.content}>{content}</span>
            {isHelp ? (<div className={styles.questionBox}>
                <img className={styles.checkIcon} src={questionMark} alt="Question Mark" />
                <div className={styles.helpText}>{help}</div>
            </div>) : (null)}
        </div>
    );
};

export default CheckIcon;