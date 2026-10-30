import { Divider } from '~/components/divider';
import { Heading } from '~/components/heading';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { Transition } from '~/components/transition';
import styles from './tech-stack.module.css';

const TECH_ROWS = [
  {
    id: 'row-1',
    direction: 'left',
    duration: '38s',
    items: [
      'HTML5',
      'CSS3',
      'JavaScript',
      'TypeScript',
      'React',
      'Next.js',
      'Astro',
      'Responsive UI',
    ],
  },
  {
    id: 'row-2',
    direction: 'right',
    duration: '42s',
    items: [
      'Tailwind CSS',
      'Sign In & Auth',
      'Payment Gateways',
      'Push Notifications',
      'REST APIs',
      'Modern UI Architecture',
    ],
  },
  {
    id: 'row-3',
    direction: 'left',
    duration: '39s',
    items: [
      'n8n Workflows',
      'Google Sheets Sync',
      'Supabase',
      'Email Notifications',
      'Lead Capture Forms',
      'Webhook Pipelines',
      'Automated Follow-ups',
    ],
  },
  {
    id: 'row-4',
    direction: 'right',
    duration: '44s',
    items: [
      'Git',
      'GitHub',
      'Vercel',
      'Cloudflare Pages',
      'Cloudflare Workers',
      'On-Page SEO',
      'Structured Data',
    ],
  },
];

function TechPill({ label }) {
  return (
    <div className={styles.techPill}>
      <span className={styles.pillDot} aria-hidden="true" />
      <span className={styles.pillLabel}>{label}</span>
    </div>
  );
}

export function TechStack({ id, visible, sectionRef, ...rest }) {
  return (
    <Section
      className={styles.techStackSection}
      as="section"
      id={id}
      ref={sectionRef}
      aria-labelledby={`${id}-title`}
      tabIndex={-1}
      {...rest}
    >
      <div className={styles.ambientGlow} aria-hidden="true" />
      <Transition in={visible} timeout={0}>
        {({ visible: isVisible, nodeRef }) => (
          <div className={styles.container} ref={nodeRef}>
            {/* Header Content */}
            <div className={styles.headerWrapper} data-visible={isVisible}>
              <div className={styles.tag} aria-hidden="true">
                <Divider
                  notchWidth="64px"
                  notchHeight="8px"
                  collapsed={!isVisible}
                  collapseDelay={500}
                />
                <span className={styles.tagText} data-visible={isVisible}>
                  Tech Stack
                </span>
              </div>
              <Heading
                level={2}
                as="h2"
                className={styles.heading}
                id={`${id}-title`}
              >
                VERIFIED TECH STACK
              </Heading>
              <Text className={styles.subtitle} size="l" as="p">
                A grounded, modern set of technologies powering fast business websites,
                smart data automations, and resilient cloud deployments.
              </Text>
            </div>

            {/* Marquee Rows Container */}
            <div
              className={styles.marqueeContainer}
              data-visible={isVisible}
              aria-label="Continuously moving technology stack rows"
            >
              {TECH_ROWS.map(row => {
                // Duplicate items multiple times per track so each track is comfortably wide on any viewport
                const trackItems = [...row.items, ...row.items, ...row.items];

                return (
                  <div
                    key={row.id}
                    className={styles.marqueeRow}
                    data-direction={row.direction}
                    style={{ '--marquee-duration': row.duration }}
                  >
                    {/* Track 1 */}
                    <div className={styles.marqueeTrack}>
                      {trackItems.map((tech, index) => (
                        <TechPill key={`${row.id}-t1-${index}`} label={tech} />
                      ))}
                    </div>

                    {/* Track 2 (Seamless loop duplicate) */}
                    <div className={styles.marqueeTrack} aria-hidden="true">
                      {trackItems.map((tech, index) => (
                        <TechPill key={`${row.id}-t2-${index}`} label={tech} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </Transition>
    </Section>
  );
}
