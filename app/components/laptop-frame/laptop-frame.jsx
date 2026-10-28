import { classes } from '~/utils/style';
import styles from './laptop-frame.module.css';

export function LaptopFrame({
  src,
  alt = 'Project website demo screenshot',
  link,
  visible = true,
  priority = false,
  className,
}) {
  const content = (
    <div className={styles.laptop}>
      {/* Top Display Lid */}
      <div className={styles.lid}>
        <div className={styles.cameraNotch} aria-hidden>
          <div className={styles.cameraLens} />
        </div>
        <div className={styles.screen}>
          <img
            src={src}
            alt={alt}
            className={styles.screenshot}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
          />
          <div className={styles.glare} aria-hidden />
        </div>
      </div>

      {/* Laptop Hinge */}
      <div className={styles.hinge} aria-hidden />

      {/* Bottom Aluminum Base Deck */}
      <div className={styles.baseDeck} aria-hidden>
        <div className={styles.notch} />
      </div>

      {/* Ground Shadow & Ambient Aura */}
      <div className={styles.shadow} aria-hidden />
    </div>
  );

  return (
    <div
      className={classes(styles.frameContainer, className)}
      data-visible={visible}
    >
      <div className={styles.ambientGlow} aria-hidden />
      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.laptopLink}
          aria-label={`View live demo: ${alt}`}
        >
          {content}
        </a>
      ) : (
        <div className={styles.laptopLink}>{content}</div>
      )}
    </div>
  );
}
