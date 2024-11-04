import React, { useEffect, useState } from 'react';

import styles from './styles.module.scss';

interface GameViewerProps {
  feed: string;
  duration: number;
}

export const GameViewer: React.FC<GameViewerProps> = ({ feed, duration }) => {
  const [timeRemaining, setTimeRemaining] = useState(duration);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(prev => prev - 1000);
    }, 1000);

    // Cleanup function to clear the interval
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.gameviewerStyled}>
      <iframe src={feed} />
      <p className={styles.gameTime}>{timeRemaining / 1000}:00</p>
    </div>
  );
};
