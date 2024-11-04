import { useRouter } from 'next/router';

import styles from './styles.module.scss';

interface HeaderProps {
  title: string;
  backButton?: boolean;
  timeout?: number;
}

export const Header: React.FC<HeaderProps> = ({ title, backButton, timeout = false }) => {
  const router = useRouter();

  const backButtonClass = backButton ? '' : styles.hidden;
  const timerClass = timeout ? '' : styles.hidden;

  return (
    <header className={styles.headerStyled}>
      <button
        className={[styles.headerBack, backButtonClass].join(' ').trim()}
        onClick={() => router.back()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <h1 className={styles.headerTitle}>{title}</h1>
      <div className={[styles.headerTimer, timerClass].join(' ')}>Timer</div>
    </header>
  );
};
