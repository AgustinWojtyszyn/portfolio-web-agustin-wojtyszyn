import {
  AcademicCapIcon,
  ArrowDownTrayIcon,
  BuildingOffice2Icon,
  FlagIcon,
  MapIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

import CodePenIcon from '../components/Icon/CodePenIcon';
import GithubIcon from '../components/Icon/GithubIcon';
import LinkedInIcon from '../components/Icon/LinkedInIcon';
import porfolioImage2 from '../images/arcadereact.png';
import porfolioImage1 from '../images/dashboardcatering.png';
import porfolioImage4 from '../images/landingpage.png';
import porfolioImage3 from '../images/password.png';
import profilepic from '../images/profilepic.jpg';
import heroImage from '../images/tech.png';
import testimonialImage from '../images/testimonial.webp';
import {
  About,
  ContactSection,
  ContactType,
  Hero,
  HomepageMeta,
  PortfolioItem,
  SkillGroup,
  Social,
  TestimonialSection,
  TimelineItem,
} from './dataDef';

export type Language = 'es' | 'en';

/**
 * Section definition
 */
export const SectionId = {
  Hero: 'hero',
  About: 'about',
  Contact: 'contact',
  Portfolio: 'portfolio',
  Resume: 'resume',
  Skills: 'skills',
  Stats: 'stats',
  Testimonials: 'testimonials',
} as const;

export type SectionId = (typeof SectionId)[keyof typeof SectionId];

interface UiText {
  nav: Record<SectionId, string>;
  aboutTitle: string;
  portfolioTitle: string;
  educationTitle: string;
  workTitle: string;
  skillsTitle: string;
  skillsIntro: string;
  contactFormName: string;
  contactFormEmail: string;
  contactFormMessage: string;
  contactFormSubmit: string;
  footerCreditPrefix: string;
  footerCopyrightName: string;
  languageToggle: string;
  menuButtonAria: string;
  openSidebarAria: string;
}

const uiTextByLanguage: Record<Language, UiText> = {
  es: {
    nav: {
      [SectionId.Hero]: 'Inicio',
      [SectionId.About]: 'Sobre mi',
      [SectionId.Resume]: 'Curriculum',
      [SectionId.Portfolio]: 'Portafolio',
      [SectionId.Skills]: 'Habilidades',
      [SectionId.Stats]: 'Stats',
      [SectionId.Testimonials]: 'Testimonios',
      [SectionId.Contact]: 'Contacto',
    },
    aboutTitle: 'Sobre mi',
    portfolioTitle: 'Mira algunos de mis proyectos',
    educationTitle: 'Educacion',
    workTitle: 'Trabajo',
    skillsTitle: 'Habilidades',
    skillsIntro: 'Resumen de stack tecnologico y herramientas de trabajo.',
    contactFormName: 'Nombre',
    contactFormEmail: 'Email',
    contactFormMessage: 'Mensaje',
    contactFormSubmit: 'Enviar mensaje',
    footerCreditPrefix: 'Desarrollado con',
    footerCopyrightName: 'Agustin Wojtyszyn',
    languageToggle: 'EN',
    menuButtonAria: 'Boton de menu',
    openSidebarAria: 'Abrir menu lateral',
  },
  en: {
    nav: {
      [SectionId.Hero]: 'Home',
      [SectionId.About]: 'About',
      [SectionId.Resume]: 'Resume',
      [SectionId.Portfolio]: 'Portfolio',
      [SectionId.Skills]: 'Skills',
      [SectionId.Stats]: 'Stats',
      [SectionId.Testimonials]: 'Testimonials',
      [SectionId.Contact]: 'Contact',
    },
    aboutTitle: 'About me',
    portfolioTitle: 'Check out some of my work',
    educationTitle: 'Education',
    workTitle: 'Work',
    skillsTitle: 'Skills',
    skillsIntro: 'Snapshot of my real-world tech stack and tooling.',
    contactFormName: 'Name',
    contactFormEmail: 'Email',
    contactFormMessage: 'Message',
    contactFormSubmit: 'Send message',
    footerCreditPrefix: 'Built with',
    footerCopyrightName: 'Agustin Wojtyszyn',
    languageToggle: 'ES',
    menuButtonAria: 'Menu button',
    openSidebarAria: 'Open sidebar',
  },
};

/**
 * Page meta data
 */
const homePageMetaByLanguage: Record<Language, HomepageMeta> = {
  es: {
    title: 'Portfolio - Agustin Wojtyszyn',
    description: 'Portfolio full stack de Agustin Wojtyszyn',
  },
  en: {
    title: 'Portfolio - Agustin Wojtyszyn',
    description: 'Full stack portfolio of Agustin Wojtyszyn',
  },
};

const heroDataByLanguage: Record<Language, Hero> = {
  es: {
    imageSrc: heroImage,
    name: 'Agustín Wojtyszyn',
    description: (
      <>
        <p className="prose-sm text-stone-200 sm:prose-base lg:prose-lg">
          Hola! Mi nombre es Agustín. Soy un <strong className="text-stone-100">desarrollador web full stack</strong>,
          en constante formacion.
        </p>
        <p className="prose-sm text-stone-200 sm:prose-base lg:prose-lg">
          En mi perfil de{' '}
          <a className="text-blue-400 underline" href="https://github.com/AgustinWojtyszyn">
            GitHub
          </a>{' '}
          se alojan algunos de mis proyectos. Ademas, alli podras ver mi perfil de{' '}
          <a className="text-blue-400 underline" href="https://codepen.io/Boiti99">
            CodePen
          </a>
          , con proyectos dedicados a HTML, CSS y JavaScript.
        </p>
      </>
    ),
    actions: [
      {
        href: 'mailto:agustinwojtyszyn99@gmail.com',
        text: 'Email',
        primary: true,
        Icon: ArrowDownTrayIcon,
      },
      {
        href: `#${SectionId.Contact}`,
        text: 'Contacto',
        primary: false,
      },
    ],
  },
  en: {
    imageSrc: heroImage,
    name: 'Agustin Wojtyszyn',
    description: (
      <>
        <p className="prose-sm text-stone-200 sm:prose-base lg:prose-lg">
          Hi! My name is Agustin and I am 25 years old. I am a{' '}
          <strong className="text-stone-100">full stack web developer</strong>, always learning.
        </p>
        <p className="prose-sm text-stone-200 sm:prose-base lg:prose-lg">
          You can check my{' '}
          <a className="text-blue-400 underline" href="https://github.com/AgustinWojtyszyn">
            GitHub
          </a>{' '}
          profile where I host some of my projects. There you will also find my{' '}
          <a className="text-blue-400 underline" href="https://codepen.io/Boiti99">
            CodePen
          </a>{' '}
          profile focused on HTML, CSS, and JavaScript projects.
        </p>
      </>
    ),
    actions: [
      {
        href: 'mailto:agustinwojtyszyn99@gmail.com',
        text: 'Email',
        primary: true,
        Icon: ArrowDownTrayIcon,
      },
      {
        href: `#${SectionId.Contact}`,
        text: 'Contact',
        primary: false,
      },
    ],
  },
};

const aboutDataByLanguage: Record<Language, About> = {
  es: {
    profileImageSrc: profilepic,
    description:
      'Desarrollador web full stack con experiencia en proyectos reales y una fuerte orientacion al aprendizaje continuo.',
    aboutItems: [
      {label: 'Ubicacion', text: 'Argentina', Icon: MapIcon},
      {label: 'Nacionalidad', text: 'Argentina', Icon: FlagIcon},
      {label: 'Intereses', text: 'Tecnologia, UX/UI y productos digitales', Icon: SparklesIcon},
      {label: 'Formacion', text: 'Conquer Blocks', Icon: AcademicCapIcon},
      {label: 'Actualidad', text: 'Full Stack Developer en Servifood', Icon: BuildingOffice2Icon},
    ],
  },
  en: {
    profileImageSrc: profilepic,
    description:
      'Full stack web developer with real-world project experience and a strong continuous-learning mindset.',
    aboutItems: [
      {label: 'Location', text: 'Argentina', Icon: MapIcon},
      {label: 'Nationality', text: 'Argentinian', Icon: FlagIcon},
      {label: 'Interests', text: 'Technology, UX/UI and digital products', Icon: SparklesIcon},
      {label: 'Education', text: 'Conquer Blocks', Icon: AcademicCapIcon},
      {label: 'Current role', text: 'Full Stack Developer at Servifood', Icon: BuildingOffice2Icon},
    ],
  },
};

const skillsByLanguage: Record<Language, SkillGroup[]> = {
  es: [
    {
      name: 'Languages',
      skills: [
        {name: 'Python', level: 1},
        {name: 'JavaScript', level: 1},
        {name: 'SQL', level: 1},
      ],
    },
    {
      name: 'Frontend',
      skills: [
        {name: 'HTML5', level: 1},
        {name: 'CSS3', level: 1},
        {name: 'JavaScript', level: 1},
        {name: 'Responsive Design', level: 1},
        {name: 'UX/UI', level: 1},
      ],
    },
    {
      name: 'Backend',
      skills: [
        {name: 'Supabase', level: 1},
        {name: 'PostgreSQL', level: 1},
        {name: 'Node.js', level: 1},
        {name: 'REST APIs', level: 1},
        {name: 'Authentication / Authorization', level: 1},
        {name: 'Row Level Security (RLS)', level: 1},
      ],
    },
    {
      name: 'Tools',
      skills: [
        {name: 'Git', level: 1},
        {name: 'GitHub', level: 1},
        {name: 'Visual Studio Code', level: 1},
        {name: 'Deployment & Production Support', level: 1},
      ],
    },
  ],
  en: [
    {
      name: 'Languages',
      skills: [
        {name: 'Python', level: 1},
        {name: 'JavaScript', level: 1},
        {name: 'SQL', level: 1},
      ],
    },
    {
      name: 'Frontend',
      skills: [
        {name: 'HTML5', level: 1},
        {name: 'CSS3', level: 1},
        {name: 'JavaScript', level: 1},
        {name: 'Responsive Design', level: 1},
        {name: 'UX/UI', level: 1},
      ],
    },
    {
      name: 'Backend',
      skills: [
        {name: 'Supabase', level: 1},
        {name: 'PostgreSQL', level: 1},
        {name: 'Node.js', level: 1},
        {name: 'REST APIs', level: 1},
        {name: 'Authentication / Authorization', level: 1},
        {name: 'Row Level Security (RLS)', level: 1},
      ],
    },
    {
      name: 'Tools',
      skills: [
        {name: 'Git', level: 1},
        {name: 'GitHub', level: 1},
        {name: 'Visual Studio Code', level: 1},
        {name: 'Deployment & Production Support', level: 1},
      ],
    },
  ],
};

const portfolioItemsByLanguage: Record<Language, PortfolioItem[]> = {
  es: [
    {
      title: 'Servi Food - Plataforma de gestion de pedidos',
      description:
        'Plataforma web para gestion diaria de pedidos de catering corporativo. Registra, organiza y exporta pedidos por empresa para optimizar logistica y control operativo.',
      url: 'https://github.com/AgustinWojtyszyn/Servifood-order-system',
      image: porfolioImage1,
      stack: ['JavaScript', 'HTML', 'CSS', 'Supabase', 'PostgreSQL'],
      repoUrl: 'https://github.com/AgustinWojtyszyn/Servifood-order-system',
    },
    {
      title: 'Arcade Web - Coleccion de mini-juegos',
      description:
        'Aplicacion web con mini-juegos interactivos en JavaScript, con arquitectura modular e integracion de APIs externas.',
      url: 'https://arcade.agustinwojtyszyn.com/',
      image: porfolioImage2,
      stack: ['JavaScript', 'HTML', 'CSS', 'APIs externas'],
      demoUrl: 'https://arcade.agustinwojtyszyn.com/',
    },
    {
      title: 'Generador de contrasenas seguras',
      description:
        'Aplicacion en Python para generar contrasenas robustas con combinaciones aleatorias de caracteres, numeros y simbolos.',
      url: 'https://github.com/AgustinWojtyszyn/Secure-password-generator',
      image: porfolioImage3,
      stack: ['Python', 'CLI', 'Seguridad'],
      repoUrl: 'https://github.com/AgustinWojtyszyn/Secure-password-generator',
    },
    {
      title: 'Sitios corporativos y landing pages',
      description:
        'Desarrollo de sitios estaticos y landing pages a partir de disenos profesionales y maquetas Figma, con foco en fidelidad visual y responsive design.',
      url: 'https://github.com/AgustinWojtyszyn/app_tracking_laboral_sf',
      image: porfolioImage4,
      stack: ['HTML', 'CSS', 'JavaScript', 'Responsive', 'Figma handoff'],
      repoUrl: 'https://github.com/AgustinWojtyszyn/app_tracking_laboral_sf',
    },
  ],
  en: [
    {
      title: 'Servi Food - Order management platform',
      description:
        'Web platform for daily management of corporate catering orders. It registers, organizes, and exports orders by company to improve logistics and operational control.',
      url: 'https://github.com/AgustinWojtyszyn/Servifood-order-system',
      image: porfolioImage1,
      stack: ['JavaScript', 'HTML', 'CSS', 'Supabase', 'PostgreSQL'],
      repoUrl: 'https://github.com/AgustinWojtyszyn/Servifood-order-system',
    },
    {
      title: 'Arcade Web - Mini-game collection',
      description:
        'Web application with interactive JavaScript mini-games, modular architecture, and external API integration.',
      url: 'https://arcade.agustinwojtyszyn.com/',
      image: porfolioImage2,
      stack: ['JavaScript', 'HTML', 'CSS', 'External APIs'],
      demoUrl: 'https://arcade.agustinwojtyszyn.com/',
    },
    {
      title: 'Secure password generator',
      description:
        'Python application that generates strong passwords using random combinations of characters, numbers, and symbols.',
      url: 'https://github.com/AgustinWojtyszyn/Secure-password-generator',
      image: porfolioImage3,
      stack: ['Python', 'CLI', 'Security'],
      repoUrl: 'https://github.com/AgustinWojtyszyn/Secure-password-generator',
    },
    {
      title: 'Corporate websites and landing pages',
      description:
        'Development of static websites and landing pages from professional designs and Figma mockups, focused on visual fidelity and responsive behavior.',
      url: 'https://github.com/AgustinWojtyszyn/app_tracking_laboral_sf',
      image: porfolioImage4,
      stack: ['HTML', 'CSS', 'JavaScript', 'Responsive', 'Figma handoff'],
      repoUrl: 'https://github.com/AgustinWojtyszyn/app_tracking_laboral_sf',
    },
  ],
};

const educationByLanguage: Record<Language, TimelineItem[]> = {
  es: [
    {
      date: 'Agosto 2024 - Diciembre 2025',
      location: 'Conquer Blocks',
      title: 'Full Stack Web Developer',
      content: (
        <div className="flex flex-col gap-y-4">
          <p>Formacion intensiva en desarrollo web full stack enfocada en construccion de aplicaciones web modernas.</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Aprendizaje de frontend responsive y buenas practicas de UI.</li>
            <li>Backend con logica de negocio y arquitectura de servicios.</li>
            <li>Bases de datos SQL, autenticacion de usuarios y despliegue en produccion.</li>
          </ul>
        </div>
      ),
    },
  ],
  en: [
    {
      date: 'August 2024 - December 2025',
      location: 'Conquer Blocks',
      title: 'Full Stack Web Developer',
      content: (
        <div className="flex flex-col gap-y-4">
          <p>Intensive full stack web development training focused on building modern web applications.</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Covered responsive frontend development and UI best practices.</li>
            <li>Learned backend business logic and service architecture.</li>
            <li>Worked with SQL databases, user authentication, and production deployment.</li>
          </ul>
        </div>
      ),
    },
  ],
};

const experienceByLanguage: Record<Language, TimelineItem[]> = {
  es: [
    {
      date: 'Agosto 2024 - Actualidad',
      location: 'Servifood',
      title: 'Full Stack Web Developer',
      content: (
        <div className="flex flex-col gap-y-4">
          <p>
            Desarrollo y mantenimiento de una plataforma web de gestion de pedidos y panel administrativo para una
            empresa de servicios gastronomicos.
          </p>
          <p className="font-semibold">Principales responsabilidades:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Desarrollo de frontend responsive utilizando HTML, CSS y JavaScript.</li>
            <li>Implementacion de autenticacion y recuperacion de contrasena con Supabase Auth.</li>
            <li>
              Gestion de roles y permisos (admin / user) mediante politicas Row Level Security (RLS) en PostgreSQL.
            </li>
            <li>Modelado de datos y consultas SQL avanzadas (JOINs, filtros y optimizacion).</li>
            <li>Integracion de base de datos con paneles administrativos y reportes operativos.</li>
            <li>
              Deploy, monitoreo y mantenimiento en produccion, resolucion de bugs y mejoras de experiencia de usuario.
            </li>
          </ul>
        </div>
      ),
    },
  ],
  en: [
    {
      date: 'August 2024 - Present',
      location: 'Servifood',
      title: 'Full Stack Web Developer',
      content: (
        <div className="flex flex-col gap-y-4">
          <p>
            Development and maintenance of a web-based order management platform and admin dashboard for a food service
            company.
          </p>
          <p className="font-semibold">Main responsibilities:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Built responsive frontend interfaces using HTML, CSS, and JavaScript.</li>
            <li>Implemented authentication and password recovery with Supabase Auth.</li>
            <li>Managed roles and permissions (admin / user) with PostgreSQL Row Level Security (RLS).</li>
            <li>Designed data models and wrote advanced SQL queries (joins, filters, optimization).</li>
            <li>Integrated the database with admin dashboards and operational reports.</li>
            <li>Handled deployment, production monitoring, bug fixing, and UX improvements.</li>
          </ul>
        </div>
      ),
    },
  ],
};

const testimonialByLanguage: Record<Language, TestimonialSection> = {
  es: {
    imageSrc: testimonialImage,
    testimonials: [
      {
        name: 'Feedback de proyecto',
        text: 'Profesional orientado a resultados, con foco en calidad tecnica y entrega continua.',
      },
      {
        name: 'Trabajo colaborativo',
        text: 'Buena comunicacion, criterio para resolver problemas y capacidad para mejorar productos en produccion.',
      },
    ],
  },
  en: {
    imageSrc: testimonialImage,
    testimonials: [
      {
        name: 'Project feedback',
        text: 'Results-oriented professional with strong focus on technical quality and continuous delivery.',
      },
      {
        name: 'Team collaboration',
        text: 'Clear communication, problem-solving mindset, and ability to improve production products.',
      },
    ],
  },
};

const contactByLanguage: Record<Language, ContactSection> = {
  es: {
    headerText: 'Contacto',
    description: 'Puedes contactarme por email o LinkedIn para oportunidades laborales y colaboraciones.',
    items: [
      {
        type: ContactType.Email,
        text: 'agustinwojtyszyn99@gmail.com',
        href: 'mailto:agustinwojtyszyn99@gmail.com',
      },
      {
        type: ContactType.Github,
        text: 'AgustinWojtyszyn',
        href: 'https://github.com/AgustinWojtyszyn',
      },
      {
        type: ContactType.LinkedIn,
        text: 'Agustin Wojtyszyn',
        href: 'https://www.linkedin.com/in/agustin-wojtyszyn-87b524247/',
      },
    ],
  },
  en: {
    headerText: 'Contact',
    description: 'You can reach me by email or LinkedIn for job opportunities and collaborations.',
    items: [
      {
        type: ContactType.Email,
        text: 'agustinwojtyszyn99@gmail.com',
        href: 'mailto:agustinwojtyszyn99@gmail.com',
      },
      {
        type: ContactType.Github,
        text: 'AgustinWojtyszyn',
        href: 'https://github.com/AgustinWojtyszyn',
      },
      {
        type: ContactType.LinkedIn,
        text: 'Agustin Wojtyszyn',
        href: 'https://www.linkedin.com/in/agustin-wojtyszyn-87b524247/',
      },
    ],
  },
};

/**
 * Social items
 */
export const socialLinks: Social[] = [
  {label: 'Github', Icon: GithubIcon, href: 'https://github.com/AgustinWojtyszyn'},
  {label: 'LinkedIn', Icon: LinkedInIcon, href: 'https://www.linkedin.com/in/agustin-wojtyszyn-87b524247/'},
  {label: 'CodePen', Icon: CodePenIcon, href: 'https://codepen.io/Boiti99'},
];

export const defaultLanguage: Language = 'es';

export const getUiText = (language: Language): UiText => uiTextByLanguage[language];
export const getHomePageMeta = (language: Language): HomepageMeta => homePageMetaByLanguage[language];
export const getHeroData = (language: Language): Hero => heroDataByLanguage[language];
export const getAboutData = (language: Language): About => aboutDataByLanguage[language];
export const getSkills = (language: Language): SkillGroup[] => skillsByLanguage[language];
export const getPortfolioItems = (language: Language): PortfolioItem[] => portfolioItemsByLanguage[language];
export const getEducation = (language: Language): TimelineItem[] => educationByLanguage[language];
export const getExperience = (language: Language): TimelineItem[] => experienceByLanguage[language];
export const getTestimonial = (language: Language): TestimonialSection => testimonialByLanguage[language];
export const getContact = (language: Language): ContactSection => contactByLanguage[language];
