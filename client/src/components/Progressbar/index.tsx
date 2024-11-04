import React from 'react';

import styles from './styles.module.scss';

interface ProgressBarProps {
  percentage: number;
  isHightlighted?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  percentage,
  isHightlighted
}) => {
  const highlightedClass = isHightlighted ? styles.highlighted : '';

  return (
    <div className={[styles.progressbarStyled, highlightedClass].join(' ').trim()}>
      <div style={{ width: `${percentage}%` }} className={styles.progress} />
    </div>
  );
};
