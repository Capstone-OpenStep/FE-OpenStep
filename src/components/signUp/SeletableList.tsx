import React, { useState } from 'react';
import styles from './SelectableList.module.css';


interface CapsuleProps {
  text: string;
  isSelected: boolean;
  onClick: () => void;
}

const Capsule: React.FC<CapsuleProps> = ({ text, isSelected, onClick }) => (
  <div
    onClick={onClick}
    className={`${styles.capsule} ${isSelected ? styles.capsuleSelected : ''}`}
  >
    <div className={`${styles.capsuleText} ${isSelected ? styles.capsuleTextSelected : ''}`}>
      {text}
    </div>
  </div>
);

interface SelectableListProps {
  options: string[];
  selected: string[];
  onToggle: (option: string) => void;
  containerClassName: string;
}

const SelectableList: React.FC<SelectableListProps> = ({
  options,
  selected,
  onToggle,
  containerClassName,
}) => (
  <div className={containerClassName}>
    {options.map((option) => (
      <Capsule
        key={option}
        text={option}
        isSelected={selected.includes(option)}
        onClick={() => onToggle(option)}
      />
    ))}
  </div>
);

export default SelectableList;