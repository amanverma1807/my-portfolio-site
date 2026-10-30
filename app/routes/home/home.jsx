import { Footer } from '~/components/footer';
import { baseMeta } from '~/utils/meta';
import { Intro } from './intro';
import { Profile } from './profile';
import { Services } from './services';
import { TechStack } from './tech-stack';
import { ProjectSummary } from './project-summary';
import { ContactSection } from './contact-section';
import { useEffect, useRef, useState } from 'react';
import config from '~/config.json';
import styles from './home.module.css';

// Prefetch draco decoder wasm
export const links = () => {
  return [
    {
      rel: 'prefetch',
      href: '/draco/draco_wasm_wrapper.js',
      as: 'script',
      type: 'text/javascript',
      importance: 'low',
    },
    {
      rel: 'prefetch',
      href: '/draco/draco_decoder.wasm',
      as: 'fetch',
      type: 'application/wasm',
      importance: 'low',
    },
  ];
};

export const meta = () => {
  return baseMeta({
    title: 'Web Developer & Business Solutions',
    description: `Portfolio of ${config.name} — a web developer building fast, modern websites and custom web applications for businesses.`,
  });
};

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const details = useRef();
  const services = useRef();
  const techStack = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const projectFour = useRef();
  const projectFive = useRef();
  const contact = useRef();

  useEffect(() => {
    const sections = [
      intro,
      details,
      services,
      techStack,
      projectOne,
      projectTwo,
      projectThree,
      projectFour,
      projectFive,
      contact,
    ];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    sections.forEach(section => {
      if (section.current) {
        sectionObserver.observe(section.current);
      }
    });

    if (intro.current) {
      indicatorObserver.observe(intro.current);
    }

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <div className={styles.home}>
      <Intro
        id="intro"
        sectionRef={intro}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />

      {/* 2. About Me Section */}
      <Profile
        id="details"
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
      />

      {/* 3. What I Can Do — Interactive Services */}
      <Services
        id="services"
        sectionRef={services}
        visible={visibleSections.includes(services.current)}
      />

      {/* 4. Tech Stack — Verified Tools */}
      <TechStack
        id="stack"
        sectionRef={techStack}
        visible={visibleSections.includes(techStack.current)}
      />

      {/* 5. Selected Projects */}
      <ProjectSummary
        id="project-1"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        category="Real Estate"
        title="Real Estate Website — Aranya Developments"
        description="A modern real estate showcase featuring premium residential and commercial developments, architectural galleries, property amenities, and direct consultation inquiries."
        buttonText="View Live Demo"
        buttonLink="https://real-estate-business.aff030832.workers.dev/"
        image={{
          src: '/real-estate.png',
          alt: 'Aranya Developments real estate website demo preview',
        }}
      />

      {/* Project 2: Dental Clinic Website */}
      <ProjectSummary
        id="project-2"
        alternate
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={2}
        category="Dental Clinic"
        title="Dental Clinic Website — Sai Dental Clinic"
        description="A specialized dental practice portal presenting advanced dental treatments, doctor credentials, patient care facilities, and streamlined appointment scheduling."
        buttonText="View Live Demo"
        buttonLink="https://dental-clinic-mu-bice.vercel.app/"
        image={{
          src: '/clinic.png',
          alt: 'Sai Dental Clinic website demo preview',
        }}
      />

      {/* Project 3: 3D Printing Website */}
      <ProjectSummary
        id="project-3"
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        index={3}
        category="3D Printing & Fabrication"
        title="3D Printing Website — Precision 3D Lab"
        description="An on-demand additive manufacturing website offering precision 3D printed model catalogs, custom STL file uploads, material selection (PLA, ABS, PETG, Resin), and instant quotation workflows."
        buttonText="View Live Demo"
        buttonLink="https://3d-printing-demo-site.vercel.app/"
        image={{
          src: '/3d-ecommerce.png',
          alt: 'Precision 3D Printing website demo preview',
        }}
      />

      {/* Project 4: Salon Website — Smile Luxury Salon */}
      <ProjectSummary
        id="project-4"
        alternate
        sectionRef={projectFour}
        visible={visibleSections.includes(projectFour.current)}
        index={4}
        category="Beauty & Salon"
        title="Salon Website — Smile Luxury Salon"
        description="A luxury beauty and styling studio website showcasing signature hair services, bridal packages, skin aesthetic rituals, transparent service pricing, and appointment booking."
        buttonText="View Live Demo"
        buttonLink="https://smileluxurysaloon.aff030832.workers.dev/"
        image={{
          src: '/salon.png',
          alt: 'Smile Luxury Salon website demo preview',
        }}
      />

      {/* Project 5: Cleaning Services Website — FreshNest */}
      <ProjectSummary
        id="project-5"
        sectionRef={projectFive}
        visible={visibleSections.includes(projectFive.current)}
        index={5}
        category="Cleaning Services"
        title="Cleaning Services Website — FreshNest"
        description="A conversion-focused residential and commercial cleaning service platform featuring instant estimate calculation, service checklists, and quick online booking requests."
        buttonText="View Live Demo"
        buttonLink="https://freshnest-cleaning-demo.aff030832.workers.dev/"
        image={{
          src: '/cleaning-service.png',
          alt: 'FreshNest cleaning services website demo preview',
        }}
      />



      {/* Final Contact Section before Footer */}
      <ContactSection
        id="contact"
        sectionRef={contact}
        visible={visibleSections.includes(contact.current)}
      />

      <Footer />
    </div>
  );
};
