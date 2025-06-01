import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignUp.module.css';
import SelectableList from '../components/signUp/SeletableList';
import WorkCounter from '../components/signUp/WorkCounter';
import api from '../api/client'

const languages: string[] = [
  'c', 'c++', 'java', 'javascript', 'python',
  'rust', 'go', 'typescript', 'ruby', 'c#',
  'perl', 'swift', 'kotlin', 'php', 'R',
  'sql', 'matlab', 'scratch'
];

const domains: string[] = [
  'Frontend', 'Backend', 'Spring Boot',
  'React', 'UI/UX', 'DevOps', 'Cloud',
  'Docker', 'Database', 'MySQL', 'AI', 'Deep Learning',
  'Mobile', 'Security', 'Embedded', 'Game Development',
  'Blockchain', 'Data Science', 'Linux', 'GraphQL'
];

enum SignUpStep {
  Language,
  Domain,
  WorkCount,
}

const SignUp: React.FC = () => {
  const [step, setStep] = useState(SignUpStep.Language);
  const [workCount, setWorkCount] = useState(0);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);

  const navigate = useNavigate();

  const toggleLanguage = (lang: string) => {
    setSelectedLanguages((prev) => {
      if (prev.includes(lang)) {
        return prev.filter((l) => l !== lang);
      } else if (prev.length < 4) {
        return [...prev, lang];
      }
      return prev;
    });
  };

  const toggleDomain = (domain: string) => {
    setSelectedDomains((prev) => {
      if (prev.includes(domain)) {
        return prev.filter((d) => d !== domain);
      } else if (prev.length < 4) {
        return [...prev, domain];
      }
      return prev;
    });
  };



  const handleNextButtonClick = async () => {
    if (step === SignUpStep.Language) {
      try {
        const response = await api.post('/member/select/languages', {
          languages: selectedLanguages
        });
        setStep(SignUpStep.Domain);
      } catch (error) {
        console.error('Error posting languages:', error);
      }
    } else if (step === SignUpStep.Domain) {
      try {
        const response = await api.post('/member/select/domains', {
          domains: selectedDomains
        });
        navigate(`/`);
      } catch (error) {
        console.error('Error posting languages:', error);
      }
    }
  };

  const getInfoText = () => {
    switch (step) {
      case SignUpStep.Language:
        return '어떤 언어에 관심이 있나요?';
      case SignUpStep.Domain:
        return '어떤 도메인에 관심이 있나요?';
      case SignUpStep.WorkCount:
        return '작업 횟수를 입력해주세요.';
      default:
        return '';
    }
  };

  const renderStep = () => {
    switch (step) {
      case SignUpStep.Language:
        return (
          <SelectableList
            options={languages}
            selected={selectedLanguages}
            onToggle={toggleLanguage}
            containerClassName={styles.languageSelector}
          />
        );
      case SignUpStep.Domain:
        return (
          <SelectableList
            options={domains}
            selected={selectedDomains}
            onToggle={toggleDomain}
            containerClassName={styles.domainSelector}
          />
        );
      case SignUpStep.WorkCount:
        return <WorkCounter count={workCount} setCount={setWorkCount} />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.board}>
        <div className={styles.infoText}>{getInfoText()}</div>
        {renderStep()}
        <div className={styles.nextButtonWrapper} onClick={handleNextButtonClick}>
          <div className={styles.nextButtonBackground} />
          <div className={styles.nextButtonText}>{'>'}</div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
