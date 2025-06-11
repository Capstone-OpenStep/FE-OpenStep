import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Task, Stage } from '../../types/task'
import styles from './Guide.module.css';
import Example, { ImageInfo } from './Example';
import PRExample1 from '../../assets/examples/PRExample1.png'
import PRExample2 from '../../assets/examples/PRExample2.png'
import IssueExample from '../../assets/examples/issueExample.png'
import copyIcon from '../../assets/copy.svg'
import shortCutIcon from '../../assets/shortCut.svg'
import { updatePrUrl } from '../../api/task'
import ErrorModal from '../ErrorModal'
import refreshIcon from '../../assets/refresh.svg'


interface CapsuleProps {
  stage: Stage;
  task: Task;
  issueUrl: string;
  setStage: React.Dispatch<React.SetStateAction<Stage>>;
  refreshTask: (taskId: number) => Promise<void>;
}


const getCurrentImage = (stage: number) => {
  if (stage === 1) {
    return ([{
      src: IssueExample,
      alt: '첫 번째 예시 이미지',
      title: '예시'
    }]);
  } else if (stage === 2) {
    return ([{
      src: PRExample1,
      alt: '첫 번째 예시 이미지',
      title: '예시 1'
    },
    {
      src: PRExample2,
      alt: '두 번째 예시 이미지',
      title: '예시 2'
    }]);
  } else {
    return ([]);
  }

}



interface ForkGuideProps {
  task: Task
}

const ForkGuide: React.FC<ForkGuideProps> = ({ task }) => {
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);

  // forkedUrl에서 실제 clone URL과 폴더명 생성
  const getCloneInfo = () => {
    if (!task?.forkedUrl) {
      return {
        cloneUrl: '',
        folderName: ''
      };
    }

    // https://github.com/allorak333/godot -> https://github.com/allorak333/godot.git
    const url = task.forkedUrl;
    const match = url.match(/https:\/\/github\.com\/(.+)$/);

    if (match) {
      const repoPath = match[1];
      const cloneUrl = `https://github.com/${repoPath}.git`;
      const folderName = repoPath.split('/')[1];

      return {
        cloneUrl,
        folderName
      };
    }

    return {
      cloneUrl: '',
      folderName: ''
    };
  };

  const { cloneUrl, folderName } = getCloneInfo();

  // 클립보드에 복사하는 함수
  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);

      // 2초 후에 복사 상태 초기화
      setTimeout(() => {
        setCopiedIndex(null);
      }, 2000);
    } catch (err) {
      console.error('복사 실패:', err);
      // fallback: 텍스트 선택 방식
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);

      setCopiedIndex(index);
      setTimeout(() => {
        setCopiedIndex(null);
      }, 2000);
    }
  };

  const copyIcon = (index: number) => {
    if (copiedIndex === index) {
      return <Check size={20} color="white" />;
    }
    return <Copy size={20} color="white" />;
  };

  // 각 명령어 블록의 텍스트 생성
  const getFirstCommandText = () => {
    if (cloneUrl && folderName) {
      return `git clone ${cloneUrl}\ncd ${folderName}`;
    }
    return '';
  };

  const getSecondCommandText = () => {
    return `git fetch origin\ngit checkout -b ${task.branchName || ''}`;
  };

  return (
    <>
      <div style={{ width: 387, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
        <div style={{ alignSelf: 'stretch', height: 44, color: 'black', fontSize: 16, fontFamily: 'Noto Sans KR', fontWeight: '400', wordWrap: 'break-word' }}>
          터미널 혹은 쉘에서 원하는 디렉토리로 이동한 후 다음 명령어를 실행해주세요
        </div>

        <div style={{ width: 387, background: '#363636', borderRadius: 15, padding: 16, display: 'flex', flexDirection: 'row' }}>
          <div style={{ width: 338, color: 'white', fontSize: 14, fontFamily: 'Noto Sans KR', fontWeight: '700', lineHeight: '19.6px' }}>
            {cloneUrl && folderName ? (
              <>
                git clone {cloneUrl}<br />
                cd {folderName}
              </>
            ) : (null)}
          </div>
          <div
            style={{
              height: "100%",
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              marginLeft: 'auto'
            }}
            onClick={() => copyToClipboard(getFirstCommandText(), 0)}
          >
            {copyIcon(0)}
          </div>
        </div>

        <div style={{ alignSelf: 'stretch', height: 25, color: 'black', fontSize: 16, fontFamily: 'Noto Sans KR', fontWeight: '400', wordWrap: 'break-word' }}>
          아래 명령어를 실행하여 브랜치를 이동해주세요
        </div>

        <div style={{ width: 387, background: '#363636', borderRadius: 15, padding: 16, display: 'flex', flexDirection: 'row' }}>
          <div style={{ width: 338, color: 'white', fontSize: 14, fontFamily: 'Noto Sans KR', fontWeight: '700', lineHeight: '19.6px' }}>
            git fetch origin<br />
            git checkout -b {task.branchName}
          </div>
          <div
            style={{
              height: "100%",
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              marginLeft: 'auto'
            }}
            onClick={() => copyToClipboard(getSecondCommandText(), 1)}
          >
            {copyIcon(1)}
          </div>
        </div>

        <div style={{ alignSelf: 'stretch', color: 'black', fontSize: 16, fontFamily: 'Noto Sans KR', fontWeight: '400', wordWrap: 'break-word' }}>
          이제 작업을 시작해주세요! 작업을 완료하고<br />
          push 까지 하셨다면 아래 넘어가기 버튼을 눌러주세요
        </div>
      </div>
    </>
  );
};


interface ShortCutProps {
  url: string;
  name: string;
}

const ShortCut: React.FC<ShortCutProps> = ({ url, name }) => {
  return (
    <a style={{ minWidth: 127, height: 34, position: 'relative', display: 'flex', marginTop: 6, flexDirection: 'row', gap: 7, alignItems: 'center', cursor: "pointer" }} href={url}>
      <div style={{ minWidth: 96, height: 34, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#4366F2', fontSize: 16, fontFamily: 'Noto Sans KR', fontWeight: '700', wordWrap: 'break-word' }}>
        {name} 바로가기
      </div>
      <img src={shortCutIcon}></img>
    </a>
  );
};

interface PRGuideProps {
  task: Task;
  setStage: React.Dispatch<React.SetStateAction<Stage>>;
};

const PRGuide: React.FC<PRGuideProps> = ({ task, setStage }) => {

  return (
    <>
      <span className={styles.content}>
        레포지토리 바로가기 버튼을 눌러 PR을 작성해주세요<br />
      </span>
      <ShortCut url={task.forkedUrl} name='레포지토리' />
      <Example images={getCurrentImage(2)} />
    </>
  );
};

interface IssueGuideProps {
  issueUrl: string,
};

const IssueGuide: React.FC<IssueGuideProps> = ({ issueUrl }) => {
  return (
    <>
      <span className={styles.content}>
        아래 이슈 바로가기 버튼을 눌러 댓글로 참여 의사를 남기고, <br />
        Maintainer의 할당을 기다리세요. <br />
        할당이 되었다면 기여 시작 버튼을 눌러주세요!
      </span>
      <ShortCut url={issueUrl} name='이슈' />
      <Example images={getCurrentImage(1)} />
    </>
  );
}

interface ReviewGuideProps {
  prUrl: string,
  isReviewed: boolean,
};

const ReviewGuide: React.FC<ReviewGuideProps> = ({ prUrl, isReviewed }) => {
  return (
    <>
      <ShortCut url={prUrl} name='PR' />
      <span className={styles.content}>
        아래 이슈 바로가기 버튼을 눌러 댓글로 참여 의사를 남기고, <br />
        Maintainer의 할당을 기다리세요. <br />
        할당이 되었다면 기여 시작 버튼을 눌러주세요!
      </span>
    </>
  );
}


const stageTitleMap: Record<Stage, string> = {
  NOT_STARTED: '프로젝트 기여 단계 : 이슈 할당 및 fork',
  FORKED: '프로젝트 기여 단계 : 브랜치 생성 및 작업',
  PROGRESS: '프로젝트 기여 단계 : PR 생성',
  PR: '프로젝트 기여 단계 : 리뷰',
  REVIEW: '프로젝트 기여 단계 : 리뷰',
  MERGED: '프로젝트 기여 단계 : 머지',
  REJECTED: '프로젝트 기여 단계 : 머지',
};

const stageGuideComponent = (
  stage: Stage,
  issueUrl: string,
  task: Task,
  setStage: React.Dispatch<React.SetStateAction<Stage>>,
) => {
  switch (stage) {
    case 'NOT_STARTED':
      return <IssueGuide issueUrl={issueUrl} />;
    case 'FORKED':
      return <ForkGuide task={task} />;
    case 'PROGRESS':
      return <PRGuide task={task} setStage={setStage} />;
    case 'PR':
    case 'REVIEW':
      return <ReviewGuide prUrl={task.prUrl} isReviewed={stage == "REVIEW"} />
    default:
      return null;
  }
};

const Guide: React.FC<CapsuleProps> = ({ stage, task, issueUrl, setStage, refreshTask }) => {
  return (
    <div className={styles.container}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <span className={styles.title}>{stageTitleMap[stage as Stage]}</span>
        {(stage === "PROGRESS" || stage === "REVIEW") && (
          <img
            src={refreshIcon}
            onClick={() => refreshTask(task.taskId)}
            style={{ marginLeft: 20, cursor: 'pointer' }}
            alt="Refresh"
          />
        )}
      </div>
      {stageGuideComponent(stage as Stage, issueUrl, task, setStage)}
    </div>
  );
};

export default Guide;