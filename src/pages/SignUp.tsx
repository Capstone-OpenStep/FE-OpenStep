import React, { useState } from 'react';
import styles from './SignUp.module.css';
import SelectableList from '../components/signUp/SeletableList';
import WorkCounter from '../components/signUp/WorkCounter';

const languages: string[] = [
  'c', 'c++', 'java', 'java script', 'python',
  'rust', 'go', 'typescript', 'ruby', 'c#',
  'perl', 'swift', 'kotlin', 'php', 'R',
  'sql', 'matlab', 'scratch'
];

const domains: string[] = [
  '3D', 'Android', 'Arduino', 'Bootstrap', 'Php',
  'Database', 'Deep Learning', 'Docker', 'Kotlin',
  'Gradle', 'GraphQl', 'GraphQI', 'Linux',
  'MySql', 'React', 'Server', 'Spring Boot',
  'Terminal', 'Tensorflow', 'Unity'
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

  const toggleLanguage = (lang: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
  };

  const toggleDomain = (domain: string) => {
    setSelectedDomains((prev) =>
      prev.includes(domain) ? prev.filter((d) => d !== domain) : [...prev, domain]
    );
  };

  const handleNextButtonClick = () => {
    if (step === SignUpStep.Language) {
      setStep(SignUpStep.Domain);
    } else if (step === SignUpStep.Domain) {
      setStep(SignUpStep.WorkCount);
    }
    // WorkCount 단계에서는 추가 동작을 연결할 수 있습니다.
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
