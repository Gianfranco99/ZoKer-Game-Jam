import React from 'react';
import Image from 'next/image';
import { ProgressBar } from '../Progressbar';

import styles from './styles.module.scss';

interface FormationProps {
  name: string;
  attack: number;
  defence: number;
  middle: number;
  image: string;
  isSelected?: boolean;
  onClickCallback?: () => void;
}

export const FormationCard: React.FC<FormationProps> = ({
  name,
  attack,
  defence,
  middle,
  image,
  isSelected,
  onClickCallback
}) => {
  const selectedClass = isSelected ? styles.selected : '';
  const clickableClass = onClickCallback ? styles.clickable : '';

  return (
    <div
      className={[styles.formationStyled, selectedClass, clickableClass].join(' ').trim()}
      onClick={onClickCallback}
    >
      <p className={styles.formationName}>{name}</p>
      <div className={styles.formationVisual}>
        <Image src={image} alt={`${name} formation`} width={250} height={350} />
      </div>
      <div className={styles.formationStats}>
        <div className={styles.stat}>
          <p className={styles.statName}>ATK</p>
          <ProgressBar percentage={attack} isHightlighted={isSelected} />
        </div>
        <div className={styles.stat}>
          <p className={styles.statName}>DEF</p>
          <ProgressBar percentage={defence} isHightlighted={isSelected} />
        </div>
        <div className={styles.stat}>
          <p className={styles.statName}>MID</p>
          <ProgressBar percentage={middle} isHightlighted={isSelected} />
        </div>
      </div>
    </div>
  );
};
