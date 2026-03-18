import 'tailwindcss/tailwind.css';
import '../globalStyles.scss';

import type {AppProps} from 'next/app';
import {memo, useEffect} from 'react';

import {LanguageProvider} from '../context/LanguageContext';

const MyApp = memo(({Component, pageProps}: AppProps): JSX.Element => {
  useEffect(() => {
    document.body.classList.add('theme-dark');
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    elements.forEach((element, index) => {
      element.classList.add('reveal-on-scroll');
      if (reduceMotion) {
        element.style.removeProperty('transition-delay');
      } else {
        const delay = Math.min(index % 6, 5) * 70;
        element.style.setProperty('transition-delay', `${delay}ms`);
      }
    });

    if (reduceMotion) {
      elements.forEach(element => element.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -60px 0px',
      },
    );

    elements.forEach(element => observer.observe(element));

    return () => observer.disconnect();
  }, [Component]);

  return (
    <LanguageProvider>
      <Component {...pageProps} />
    </LanguageProvider>
  );
});

export default MyApp;
