import Image from 'next/image';

import styles from './styles.module.scss';

interface BackgroundProps {
  image: string;
  blur?: boolean;
}

export const Background: React.FC<BackgroundProps> = ({ image, blur }) => {
  const blurStyle = blur ? 'none' : 'none';

  return (
    <Image
      src={image}
      alt="Background image"
      layout="fill"
      objectFit="cover"
      style={{ filter: blurStyle }}
      className={styles.backgroundStyled}
    />
  );
};
