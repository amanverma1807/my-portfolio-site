import { Button } from '~/components/button';
import { Divider } from '~/components/divider';
import { Heading } from '~/components/heading';
import { LaptopFrame } from '~/components/laptop-frame';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { useTheme } from '~/components/theme-provider';
import { Transition } from '~/components/transition';
import { useWindowSize } from '~/hooks';
import { useState } from 'react';
import { cssProps, media } from '~/utils/style';
import katakana from './katakana.svg';
import styles from './project-summary.module.css';

export function ProjectSummary({
  id,
  visible: sectionVisible,
  sectionRef,
  index,
  title,
  category,
  description,
  model,
  image,
  buttonText,
  buttonLink,
  alternate,
  ...rest
}) {
  const [focused, setFocused] = useState(false);
  const { theme } = useTheme();
  const { width } = useWindowSize();
  const titleId = `${id}-title`;
  const isMobile = width <= media.tablet;
  const svgOpacity = theme === 'light' ? 0.35 : 0.8;
  const indexText = index < 10 ? `0${index}` : index;

  // Resolve screenshot src & alt
  const imageSrc =
    typeof image === 'string'
      ? image
      : image?.src ||
        image?.srcSet?.split(' ')?.[0] ||
        model?.textures?.[0]?.placeholder ||
        model?.textures?.[0]?.srcSet?.split(' ')?.[0] ||
        '';

  const imageAlt =
    (typeof image === 'object' && image?.alt) ||
    model?.alt ||
    `${title} preview`;

  function renderKatakana(device, visible) {
    return (
      <svg
        type="project"
        data-visible={visible}
        data-light={theme === 'light'}
        style={cssProps({ opacity: svgOpacity })}
        className={styles.svg}
        data-device={device}
        viewBox="0 0 751 136"
        aria-hidden="true"
      >
        <use href={`${katakana}#katakana-project`} />
      </svg>
    );
  }

  function renderDetails(visible) {
    return (
      <div className={styles.details}>
        <div aria-hidden className={styles.index}>
          <Divider
            notchWidth="64px"
            notchHeight="8px"
            collapsed={!visible}
            collapseDelay={1000}
          />
          <span className={styles.indexNumber} data-visible={visible}>
            {indexText}
          </span>
        </div>
        {category && (
          <span className={styles.category} data-visible={visible}>
            {category}
          </span>
        )}
        <Heading
          level={3}
          as="h2"
          className={styles.title}
          data-visible={visible}
          id={titleId}
        >
          {title}
        </Heading>
        <Text className={styles.description} data-visible={visible} as="p">
          {description}
        </Text>
        <div className={styles.button} data-visible={visible}>
          <Button
            iconHoverShift
            href={buttonLink || '#contact'}
            target={buttonLink?.startsWith('http') ? '_blank' : undefined}
            rel={buttonLink?.startsWith('http') ? 'noopener noreferrer' : undefined}
            iconEnd="arrow-right"
          >
            {buttonText || 'View Live Demo'}
          </Button>
        </div>
      </div>
    );
  }

  function renderPreview(visible) {
    return (
      <div className={styles.preview}>
        {renderKatakana('laptop', visible)}
        <LaptopFrame
          src={imageSrc}
          alt={imageAlt}
          link={buttonLink}
          visible={visible}
          priority={index === 1}
        />
      </div>
    );
  }

  return (
    <Section
      className={styles.summary}
      data-alternate={alternate}
      data-first={index === 1}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      as="section"
      aria-labelledby={titleId}
      ref={sectionRef}
      id={id}
      tabIndex={-1}
      {...rest}
    >
      <div className={styles.content}>
        <Transition in={sectionVisible || focused}>
          {({ visible }) => (
            <>
              {!alternate && !isMobile && (
                <>
                  {renderDetails(visible)}
                  {renderPreview(visible)}
                </>
              )}
              {(alternate || isMobile) && (
                <>
                  {renderPreview(visible)}
                  {renderDetails(visible)}
                </>
              )}
            </>
          )}
        </Transition>
      </div>
    </Section>
  );
}
