import React from 'react';
import Image from 'next/image';

import styles from './styles.module.scss';

interface ScoreBoardProps {
  homeLogo: string;
  homeScore?: number;
  awayLogo: string;
  awayScore?: number;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({
  homeLogo,
  homeScore = 0,
  awayLogo,
  awayScore = 0
}) => {
  return (
    <div className={styles.scoreboardStyled}>
      <Image
        src={homeLogo}
        alt="Home Logo"
        className="team-logo"
        width={100}
        height={100}
      />
      <p className={styles.scores}>
        {homeScore} - {awayScore}
      </p>
      <Image
        src={awayLogo}
        alt="Home Logo"
        className="team-logo"
        width={100}
        height={100}
      />
    </div>
  );
};
