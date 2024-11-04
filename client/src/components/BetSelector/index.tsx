import React from 'react';
import Image from 'next/image';

import styles from './styles.module.scss';

interface BetSelectorProps {
  betOptions: string[];
  selectedBetOption?: number;
  setSelectedBet: (index: number) => void;
}

export const BetSelector: React.FC<BetSelectorProps> = ({
  betOptions,
  selectedBetOption,
  setSelectedBet
}) => {
  return (
    <div className={styles.betselectorStyled}>
      {betOptions.map((option, idx) => {
        const isSelected = selectedBetOption === idx;
        const selectedClass = isSelected ? styles.selected : '';

        return (
          <div
            className={[styles.betOption, selectedClass].join(' ')}
            key={idx}
            onClick={() => setSelectedBet(idx)}
          >
            <span>{option}</span>
            <Image
              src={`/currency/starknet-token.png`}
              alt={option}
              height={28}
              width={28}
            />
          </div>
        );
      })}
    </div>
  );
};
