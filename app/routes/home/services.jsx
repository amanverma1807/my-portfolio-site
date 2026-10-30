import { Button } from '~/components/button';
import { Divider } from '~/components/divider';
import { Heading } from '~/components/heading';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { Transition } from '~/components/transition';
import { useRef, useState } from 'react';
import styles from './services.module.css';

const SERVICES_DATA = [
  {
    number: '01',
    title: 'Website Development',
    description:
      'High-performance business websites, high-converting landing pages, and specialized web applications for real estate, dental clinics, luxury salons, and e-commerce. Engineered with responsive design, modern UI development, and fast load times.',
    deliverables: [
      'Business Websites & Landing Pages',
      'Real Estate, Clinic & Salon Portals',
      'E-Commerce & Digital Catalogs',
      'Responsive Mobile-First Design',
      'Modern UI Architecture',
    ],
    demo: {
      name: 'Aranya Developments Showcase',
      summary:
        'Custom luxury real estate web platform with architectural galleries, property amenities explorer, and fast Cloudflare edge delivery.',
      url: 'https://real-estate-business.aff030832.workers.dev/',
      buttonText: 'View Project Demo',
    },
  },
  {
    number: '02',
    title: 'SEO, AEO & GEO',
    description:
      'Rank on Google and get cited by AI search (ChatGPT, Gemini, Perplexity, Google AI Overviews). Technical SEO, structured data (JSON-LD), FAQ and answer-ready content, AI crawler access checks and entity consistency, delivered with a before/after visibility report.',
    deliverables: [
      'Technical SEO & Core Architecture',
      'Structured Data (JSON-LD Schema)',
      'FAQ & Answer-Ready Content (AEO)',
      'AI Crawler Access & Entity Consistency (GEO)',
      'Before / After Visibility Reports',
    ],
    cta: {
      title: 'Request an SEO, AEO & GEO Audit',
      summary:
        'Get a clear review of your website’s indexing health, on-page metadata, structured data schema, and search & AI visibility fundamentals.',
      url: '/#contact',
      buttonText: 'Request Visibility Review',
    },
  },
  {
    number: '03',
    title: 'Business Automation',
    description:
      'Connecting website frontends to automated backend operations with n8n workflows, instant lead capture, Google Sheets synchronization, real-time email notifications, and automated client follow-ups where configured.',
    deliverables: [
      'n8n Automated Workflows',
      'Google Sheets Lead Synchronization',
      'Instant Lead Capture Pipelines',
      'Real-Time Email Notifications',
      'Automated Customer Follow-ups',
    ],
    demo: {
      name: 'FreshNest Automated Estimator',
      summary:
        'Cleaning services platform featuring instant quote calculation, service selection, and automated booking dispatch workflows.',
      url: 'https://freshnest-cleaning-demo.aff030832.workers.dev/',
      buttonText: 'View Automation Demo',
    },
  },
  {
    number: '04',
    title: 'Lead Management & Business Integrations',
    description:
      'Capturing, organizing, and tracking prospective clients with structured enquiry forms, admin dashboard views, lead tracking systems, and seamless connections between website forms and business operational tools.',
    deliverables: [
      'Custom Enquiry & Intake Forms',
      'Admin Dashboard & Lead Tracking',
      'Form-to-Tool Business Connections',
      'Lead Verification & Routing',
      'Patient & Client Booking Funnels',
    ],
    demo: {
      name: 'Sai Dental Clinic Appointment Portal',
      summary:
        'Specialized healthcare portal featuring doctor qualification profiles, treatment catalogs, and streamlined patient appointment scheduling funnels.',
      url: 'https://dental-clinic-mu-bice.vercel.app/',
      buttonText: 'View Booking Demo',
    },
  },
];

export function Services({ id, visible, sectionRef, ...rest }) {
  const [openIndex, setOpenIndex] = useState(null);
  const headerRefs = useRef([]);

  const handleToggle = index => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  const handleKeyDown = (e, index) => {
    const total = SERVICES_DATA.length;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (index + 1) % total;
      headerRefs.current[nextIndex]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (index - 1 + total) % total;
      headerRefs.current[prevIndex]?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      headerRefs.current[0]?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      headerRefs.current[total - 1]?.focus();
    }
  };

  return (
    <Section
      className={styles.servicesSection}
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
            {/* Section Pre-header & Tag */}
            <div className={styles.tag} aria-hidden="true">
              <Divider
                notchWidth="64px"
                notchHeight="8px"
                collapsed={!isVisible}
                collapseDelay={500}
              />
              <span className={styles.tagText} data-visible={isVisible}>
                Capabilities
              </span>
            </div>

            {/* Section Header */}
            <div className={styles.headerWrapper} data-visible={isVisible}>
              <Heading
                level={2}
                as="h2"
                className={styles.heading}
                id={`${id}-title`}
              >
                WHAT I CAN DO
              </Heading>
              <Text className={styles.subtitle} size="l" as="p">
                Bespoke web development, smart conversion funnels, and automated business
                workflows engineered to help your brand operate faster and scale.
              </Text>
            </div>

            {/* Interactive Accordion */}
            <div className={styles.accordionList} role="region" aria-label="Services list">
              {SERVICES_DATA.map((service, index) => {
                const isOpen = openIndex === index;
                const headerId = `service-trigger-${index}`;
                const panelId = `service-panel-${index}`;

                return (
                  <div
                    key={service.number}
                    className={styles.accordionItem}
                    data-open={isOpen}
                    data-visible={isVisible}
                    style={{ '--item-delay': `${index * 80}ms` }}
                  >
                    <h3>
                      <button
                        ref={el => (headerRefs.current[index] = el)}
                        id={headerId}
                        type="button"
                        className={styles.accordionHeader}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => handleToggle(index)}
                        onKeyDown={e => handleKeyDown(e, index)}
                      >
                        <span className={styles.headerLeft}>
                          <span className={styles.serviceNumber}>{service.number}</span>
                          <span className={styles.serviceTitle}>{service.title}</span>
                        </span>
                        <span className={styles.arrowWrapper} aria-hidden="true">
                          <svg
                            className={styles.arrowIcon}
                            viewBox="0 0 24 24"
                            width="20"
                            height="20"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                          </svg>
                        </span>
                      </button>
                    </h3>

                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={headerId}
                      className={styles.accordionCollapse}
                      data-open={isOpen}
                    >
                      <div className={styles.accordionInner}>
                        <div className={styles.contentGrid}>
                          {/* Left Column: Description & Deliverables */}
                          <div className={styles.contentLeft}>
                            <p className={styles.serviceDescription}>
                              {service.description}
                            </p>
                            <div className={styles.deliverables}>
                              <span className={styles.deliverablesTitle}>
                                Key Capabilities & Deliverables
                              </span>
                              <div className={styles.deliverablesList}>
                                {service.deliverables.map(item => (
                                  <span key={item} className={styles.deliverableBadge}>
                                    <span
                                      className={styles.deliverableDot}
                                      aria-hidden="true"
                                    />
                                    {item}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Right Column: Demo Link or Contact CTA */}
                          <div className={styles.contentRight}>
                            {service.demo ? (
                              <div className={styles.demoCard}>
                                <div className={styles.cardHeader}>
                                  <span
                                    className={styles.statusLiveDot}
                                    aria-hidden="true"
                                  />
                                  <span className={styles.cardCategory}>
                                    Live Concept Demo
                                  </span>
                                </div>
                                <h4 className={styles.cardTitle}>{service.demo.name}</h4>
                                <p className={styles.cardSummary}>
                                  {service.demo.summary}
                                </p>
                                <Button
                                  href={service.demo.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  iconEnd="arrow-right"
                                  className={styles.actionButton}
                                >
                                  {service.demo.buttonText}
                                </Button>
                              </div>
                            ) : (
                              <div className={styles.ctaCard}>
                                <div className={styles.cardHeader}>
                                  <span
                                    className={styles.statusDirectDot}
                                    aria-hidden="true"
                                  />
                                  <span className={styles.cardCategory}>
                                    Custom Consultation
                                  </span>
                                </div>
                                <h4 className={styles.cardTitle}>{service.cta.title}</h4>
                                <p className={styles.cardSummary}>{service.cta.summary}</p>
                                <Button
                                  secondary
                                  href={service.cta.url}
                                  iconEnd="arrow-right"
                                  className={styles.actionButton}
                                >
                                  {service.cta.buttonText}
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
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
