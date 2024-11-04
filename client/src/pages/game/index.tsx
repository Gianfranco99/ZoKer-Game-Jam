/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import { Background, GameViewer, ScoreBoard } from '@/components';
import { useSessionStorage } from '@/hooks/useSessionStorage';
import { useRouter } from 'next/router';

const gameFeeds = [
  {
    feed: 'https://cdn.lottielab.com/l/2D7cPQVu7HNrYK.html',
    duration: 20000,
    timerStart: 66000,
    homeScore: 0,
    awayScore: 0
  },
  {
    feed: 'https://cdn.lottielab.com/l/CLfJah8jFNXEtn.html',
    duration: 22500,
    timerStart: 46000,
    homeScore: 1,
    awayScore: 0
  },
  {
    feed: 'https://cdn.lottielab.com/l/5G7nMVF3ieh21o.html',
    duration: 19000,
    timerStart: 24000,
    homeScore: 1,
    awayScore: 0
  },
  {
    feed: 'https://cdn.lottielab.com/l/C7DAnHtsEhK3kA.html',
    duration: 5000,
    timerStart: 5000,
    homeScore: 2,
    awayScore: 0
  }
];

export default function Game() {
  const { getItem, setItem, removeItem } = useSessionStorage();
  const router = useRouter();

  const retrieveGameState = () => {
    const gameState = getItem('game-state');
    if (gameState) return parseInt(gameState);
    else {
      setItem('game-state', '0');
      return 0;
    }
  };

  const [currentFeed, setCurrentFeed] = useState<number>(retrieveGameState);

  const handleGameLogic = () => {
    if (currentFeed === 0 || currentFeed === 2) {
      setItem('game-state', (currentFeed + 1).toString());
      router.push('/shootout');
    }

    if (currentFeed === 1) {
      setItem('game-state', (currentFeed + 1).toString());
      setCurrentFeed(prev => prev + 1);
    }

    if (currentFeed === 3) {
      removeItem('game-state');
      router.push('/summary');
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleGameLogic();
    }, gameFeeds[currentFeed].duration);

    return () => clearTimeout(timer);
  }, [currentFeed]);

  return (
    <>
      {/* Background component */}
      <Background image="/backgrounds/striped-screen-dark.svg" />

      <div className="game-overlay">
        {/* Scoreboard component */}
        <ScoreBoard
          homeLogo="/teams/team-a.svg"
          awayLogo="/teams/team-b.svg"
          homeScore={gameFeeds[currentFeed].homeScore}
          awayScore={gameFeeds[currentFeed].awayScore}
        />

        {/* Game Viewer component */}
        <GameViewer
          feed={gameFeeds[currentFeed].feed}
          duration={gameFeeds[currentFeed].timerStart}
        />
      </div>
    </>
  );
}
