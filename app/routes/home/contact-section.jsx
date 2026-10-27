import { Button } from '~/components/button';
import { Icon } from '~/components/icon';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { Transition } from '~/components/transition';
import { useEffect, useRef, useState } from 'react';
import { vantaFog } from '~/components/vanta/vanta-fog';
import config from '~/config.json';
import styles from './contact-section.module.css';

export function ContactSection({ id, visible, sectionRef, ...rest }) {
  const [copied, setCopied] = useState(false);
  const containerRef = useRef(null);
  const email = 'amanverma.build@gmail.com'; // Verified contact email

  const handleRef = el => {
    containerRef.current = el;
    if (typeof sectionRef === 'function') {
      sectionRef(el);
    } else if (sectionRef) {
      sectionRef.current = el;
    }
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const vantaEffect = vantaFog({
      el,
      highlightColor: 0x4d4d4d,
      midtoneColor: 0x4a4a4a,
      lowlightColor: 0x000000,
      baseColor: 0x000000,
      blurFactor: 0.18,
      speed: 1.70,
      zoom: 2.60,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
    });

    return () => {
      if (vantaEffect && typeof vantaEffect.destroy === 'function') {
        vantaEffect.destroy();
      }
    };
  }, []);

  const handleCopyEmail = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <Section
      className={styles.contactSection}
      as="section"
      id={id}
      ref={handleRef}
      tabIndex={-1}
      {...rest}
    >
      <div className={styles.ambientGlow} aria-hidden />
      <Transition in={visible} timeout={0}>
        {({ visible: isVisible, nodeRef }) => (
          <div className={styles.container} ref={nodeRef}>
            {/* 1A. Large Heading at the Top */}
            <div className={styles.heroHeadingWrapper} data-visible={isVisible}>
              <h2 className={styles.heroHeading}>
                LET’S TALK
              </h2>
            </div>

            {/* Main Content Grid: Introduction + Glass Card */}
            <div className={styles.mainGrid}>
              {/* Contact Introduction */}
              <div className={styles.leftColumn}>
                <Text
                  className={styles.description}
                  data-visible={isVisible}
                  size="l"
                  as="p"
                >
                  Looking for a modern, high-performance website for your business, or have a
                  custom web development project in mind? Let’s connect and bring your vision to life.
                </Text>

                {/* 1C. Contact Actions */}
                <div className={styles.actions} data-visible={isVisible}>
                  <Button
                    href={`mailto:${email}`}
                    iconEnd="arrow-right"
                    className={styles.primaryButton}
                  >
                    Email Me
                  </Button>
                  <Button
                    href="/contact"
                    iconEnd="send"
                    className={styles.secondaryButton}
                  >
                    Send a Message
                  </Button>
                </div>

                <div className={styles.note} data-visible={isVisible}>
                  <span className={styles.noteDot}>•</span>
                  <span>Direct email & consultations available</span>
                </div>
              </div>

              {/* 2 & 3. Glassmorphism Contact Card with Dividers */}
              <div className={styles.rightColumn} data-visible={isVisible}>
                <div className={styles.card}>
                  <div className={styles.cardHeader}>
                    <span className={styles.cardLabel}>Direct Details</span>
                    <span className={styles.responseTime}>Fast 24h Response</span>
                  </div>

                  <div className={styles.cardContent}>
                    {/* EMAIL */}
                    <div className={styles.cardRow}>
                      <span className={styles.rowLabel}>Email</span>
                      <div className={styles.rowValueWithAction}>
                        <a href={`mailto:${email}`} className={styles.rowLink}>
                          {email}
                        </a>
                        <button
                          type="button"
                          onClick={handleCopyEmail}
                          className={styles.copyButton}
                          title="Copy email address"
                          aria-label="Copy email address"
                        >
                          <Icon icon={copied ? 'check' : 'copy'} size={15} />
                          <span className={styles.copyText}>
                            {copied ? 'Copied' : 'Copy'}
                          </span>
                        </button>
                      </div>
                    </div>

                    <div className={styles.cardDivider} />

                    {/* GITHUB */}
                    <div className={styles.cardRow}>
                      <span className={styles.rowLabel}>GitHub</span>
                      <a
                        href={`https://github.com/${config.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.rowLink}
                      >
                        github.com/{config.github}
                      </a>
                    </div>

                    <div className={styles.cardDivider} />

                    {/* FOCUS & LOCATION */}
                    <div className={styles.cardRow}>
                      <span className={styles.rowLabel}>Focus</span>
                      <span className={styles.rowValue}>
                        Websites for Businesses & Custom Web Applications
                      </span>
                    </div>

                    <div className={styles.cardRow} style={{ marginTop: 'var(--spaceS)' }}>
                      <span className={styles.rowLabel}>Location</span>
                      <span className={styles.rowValue}>Remote / Worldwide</span>
                    </div>

                    <div className={styles.cardDivider} />

                    {/* AVAILABILITY STATUS */}
                    <div className={styles.cardFooter}>
                      <div className={styles.statusIndicator}>
                        <span className={styles.activeDot} />
                        <span>Currently taking on new business projects</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Transition>
    </Section>
  );
}
