/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';

import { Background, Football, ShootoutAnimation, Timer } from '@/components';
import { useRouter } from 'next/router';

type TBallPosition = 'NW' | 'NN' | 'NE' | 'SW' | 'SS' | 'SE';

export default function Shootout() {
  const [selectedBall, setSelectedBall] = useState<TBallPosition>();
  const [viewAnimation, setViewAnimation] = useState<boolean>(false);

  const router = useRouter();

  const ballPositions: TBallPosition[] = ['NW', 'NN', 'NE', 'SW', 'SS', 'SE'];

  const ramdomPositionOnTimerEnd = () => {
    const randomPosition =
      ballPositions[Math.floor(Math.random() * ballPositions.length)];
    setSelectedBall(randomPosition);
    runAnimation();
  };

  const runAnimation = () => {
    setTimeout(() => {
      setViewAnimation(true);
    }, 1000);
  };

  const handleBallSelectionCallback = useCallback((position: TBallPosition) => {
    setSelectedBall(position);
    runAnimation();
  }, []);

  useEffect(() => {
    if (viewAnimation === true) {
      const timer = setTimeout(() => router.push('/game'), 3000);
      return () => clearTimeout(timer);
    }
  }, [viewAnimation]);

  return (
    <>
      {/* Background component */}
      <Background image="/backgrounds/shootout-screen.svg" />

      {/* Header component */}
      <div className="shootout-header">
        <h1>Shoot !</h1>
        <p className="sub-title">
          Select one spot among the 6 available. The goalkeeper will select 2 spots
        </p>
      </div>

      {/* Shoot Position Overlay component */}
      <div className="shot-overlay">
        {ballPositions.map((position, idx) => {
          const isBallSelected = selectedBall === ballPositions[idx];
          return (
            <Football
              key={position}
              isSelected={isBallSelected}
              selectBall={() => handleBallSelectionCallback(ballPositions[idx])}
            />
          );
        })}
      </div>

      {/* Timer component */}
      {!viewAnimation && (
        <div className="shootout-timer-overlay">
          <Timer duration={10000} runOnEnd={ramdomPositionOnTimerEnd} />
        </div>
      )}

      {/* Animation overlay */}
      {viewAnimation && <ShootoutAnimation position={selectedBall as TBallPosition} />}
    </>
  );
}
