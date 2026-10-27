import { forwardRef, useId } from 'react';
import { classes } from '~/utils/style';
import styles from './monogram.module.css';

export const Monogram = forwardRef(({ highlight, className, ...props }, ref) => {
  const id = useId();
  const clipId = `${id}monogram-clip`;

  return (
    <svg
      aria-hidden
      className={classes(styles.monogram, className)}
      width="48"
      height="29"
      viewBox="0 0 48 29"
      ref={ref}
      {...props}
    >
      <defs>
        <clipPath id={clipId}>
          <path
            clipRule="evenodd"
            d="M14 0h6.5a5 5 0 0 1 4.4 2.6L32.2 18l3.6-7.8a5 5 0 0 1 4.5-2.8H46l-8.7 18.2a5 5 0 0 1-4.5 2.8h-6.2a5 5 0 0 1-4.4-2.6L16.2 12.5 12.8 20h7.8v5.5h-10.4L8 29H1.2L14 0Zm2.5 7.2L13.2 14h6.2l-2.9-6.8Z"
          />
        </clipPath>
      </defs>
      <rect clipPath={`url(#${clipId})`} width="100%" height="100%" />
      {highlight && (
        <g clipPath={`url(#${clipId})`}>
          <rect className={styles.highlight} width="100%" height="100%" />
        </g>
      )}
    </svg>
  );
});
