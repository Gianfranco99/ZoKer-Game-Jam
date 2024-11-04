import React from 'react';

import styles from './styles.module.scss';

const animations = {
  NW: 'https://cdn.lottielab.com/l/BL3naVsTZFjvoy.html',
  NN: 'https://cdn.lottielab.com/l/55u2Rwz5bp1uUB.html',
  NE: 'https://cdn.lottielab.com/l/9Fu7e7BPVkFqmV.html',
  SW: ' https://cdn.lottielab.com/l/BZMsBQjDrjkdaQ.html',
  SS: 'https://cdn.lottielab.com/l/5TNCfrTPoezZki.html',
  SE: 'https://cdn.lottielab.com/l/CetXVwdJjx3Gcn.html'
};

interface ShootoutAnimationProps {
  position: keyof typeof animations;
}

export const ShootoutAnimation: React.FC<ShootoutAnimationProps> = ({ position }) => {
  return (
    <div className={styles.shootoutanimationStyled}>
      <iframe src={animations[position]} />
    </div>
  );
};
