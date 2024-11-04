/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import styles from './styles.module.scss';

interface TimerProps {
  duration: number;
  runOnEnd?: () => void;
}

export const Timer: React.FC<TimerProps> = ({ duration, runOnEnd }) => {
  const [timeLeft, setTimeLeft] = useState(duration / 1000);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(prevTimeLeft => {
        if (prevTimeLeft <= 1) {
          clearInterval(intervalId);
          if (runOnEnd) runOnEnd();
          return 0;
        }
        return prevTimeLeft - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (timeLeft <= 0 && runOnEnd) runOnEnd();
  }, [timeLeft]);

  return (
    <div className={styles.timerStyled}>
      <p>{timeLeft}</p>
    </div>
  );
};
