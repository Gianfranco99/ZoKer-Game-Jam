import React from 'react';

import styles from './styles.module.scss';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  size?: 'small' | 'medium' | 'large';
  isRounded?: boolean;
  isSecondary?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  size = 'medium',
  isRounded = false,
  isSecondary = false
}) => {
  const roundedClass = isRounded ? styles.rounded : '';
  const secondaryClass = isSecondary ? styles.secondary : '';

  return (
    <button
      className={[styles.buttonStyled, styles[size], roundedClass, secondaryClass].join(
        ' '
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
