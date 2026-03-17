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

    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    elements.forEach(element => element.classList.add('reveal-on-scroll'));

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
