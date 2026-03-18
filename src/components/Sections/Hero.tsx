import {ChevronDownIcon} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import {FC, memo, useEffect, useRef} from 'react';

import {useLanguage} from '../../context/LanguageContext';
import {getHeroData, SectionId} from '../../data/data';
import Section from '../Layout/Section';
import Socials from '../Socials';

const Hero: FC = memo(() => {
  const {language} = useLanguage();
  const {name, description, actions} = getHeroData(language);
  const heroRootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRootRef.current || typeof window === 'undefined') return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let mounted = true;
    let cleanup: (() => void) | undefined;

    import('gsap').then(({gsap}) => {
      if (!mounted || !heroRootRef.current) return;

      const ctx = gsap.context(() => {
        const timeline = gsap.timeline({defaults: {ease: 'power2.out'}});

        timeline
          .from('.hero-anim-card', {
            autoAlpha: 0,
            duration: 0.95,
            scale: 0.98,
            y: 32,
          })
          .from(
            '.hero-anim-title',
            {
              autoAlpha: 0,
              duration: 0.75,
              y: 24,
            },
            '-=0.48',
          )
          .from(
            '.hero-anim-description > *',
            {
              autoAlpha: 0,
              duration: 0.62,
              stagger: 0.12,
              y: 18,
            },
            '-=0.4',
          )
          .from(
            '.hero-anim-socials a',
            {
              autoAlpha: 0,
              duration: 0.44,
              scale: 0.9,
              stagger: 0.08,
              y: 10,
            },
            '-=0.36',
          )
          .from(
            '.hero-anim-actions a',
            {
              autoAlpha: 0,
              duration: 0.48,
              stagger: 0.1,
              y: 14,
            },
            '-=0.34',
          )
          .from(
            '.hero-anim-scroll',
            {
              autoAlpha: 0,
              duration: 0.5,
              y: 12,
            },
            '-=0.18',
          );
      }, heroRootRef);

      cleanup = () => ctx.revert();
    });

    return () => {
      mounted = false;
      cleanup?.();
    };
  }, []);

  useEffect(() => {
    const root = heroRootRef.current;
    if (!root || typeof window === 'undefined') return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;

    root.style.setProperty('--hero-cursor-x', '50%');
    root.style.setProperty('--hero-cursor-y', '38%');
    root.style.setProperty('--hero-parallax-x', '0px');
    root.style.setProperty('--hero-parallax-y', '0px');

    if (reduceMotion || coarsePointer) return;

    let raf = 0;

    const updatePosition = (event: PointerEvent) => {
      if (!heroRootRef.current) return;

      const rect = heroRootRef.current.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;

      const offsetX = (event.clientX - (rect.left + rect.width / 2)) / rect.width;
      const offsetY = (event.clientY - (rect.top + rect.height / 2)) / rect.height;

      heroRootRef.current.style.setProperty('--hero-cursor-x', `${x.toFixed(2)}%`);
      heroRootRef.current.style.setProperty('--hero-cursor-y', `${y.toFixed(2)}%`);
      heroRootRef.current.style.setProperty('--hero-parallax-x', `${(offsetX * 10).toFixed(2)}px`);
      heroRootRef.current.style.setProperty('--hero-parallax-y', `${(offsetY * 8).toFixed(2)}px`);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (raf) cancelAnimationFrame(raf);
      raf = window.requestAnimationFrame(() => updatePosition(event));
    };

    const handlePointerLeave = () => {
      if (!heroRootRef.current) return;
      heroRootRef.current.style.setProperty('--hero-cursor-x', '50%');
      heroRootRef.current.style.setProperty('--hero-cursor-y', '38%');
      heroRootRef.current.style.setProperty('--hero-parallax-x', '0px');
      heroRootRef.current.style.setProperty('--hero-parallax-y', '0px');
    };

    root.addEventListener('pointermove', handlePointerMove, {passive: true});
    root.addEventListener('pointerleave', handlePointerLeave, {passive: true});

    return () => {
      if (raf) cancelAnimationFrame(raf);
      root.removeEventListener('pointermove', handlePointerMove);
      root.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  return (
    <Section noPadding sectionId={SectionId.Hero}>
      <div className="hero-reactive-root relative flex h-screen w-full items-center justify-center" ref={heroRootRef}>
        <iframe
          aria-hidden="true"
          className="hero-parallax-layer pointer-events-none absolute z-0 h-full w-full border-0"
          src="/animated-network/index.html"
          tabIndex={-1}
          title="Animated network background"
        />
        <div aria-hidden="true" className="hero-starfield hero-starfield-a absolute inset-0 z-[1]" />
        <div aria-hidden="true" className="hero-starfield hero-starfield-b absolute inset-0 z-[1]" />
        <div aria-hidden="true" className="hero-starfield hero-starfield-c absolute inset-0 z-[1]" />
        <div aria-hidden="true" className="hero-constellation-lines absolute inset-0 z-[1]" />
        <div aria-hidden="true" className="hero-ambient-light hero-parallax-layer absolute inset-0 z-[1]" />
        <div aria-hidden="true" className="hero-cursor-glow absolute inset-0 z-[2]" />
        <div className="z-10 max-w-screen-lg px-4 lg:px-0" data-reveal>
          <div className="hero-card hero-anim-card flex flex-col items-center gap-y-7 rounded-2xl p-6 text-center sm:p-9">
            <div className="hero-name-wrap">
              <span aria-hidden="true" className="hero-title-stars" />
              <h1 className="hero-title hero-anim-title text-4xl font-bold text-white sm:text-5xl lg:text-7xl">
                {name}
              </h1>
            </div>
            <div className="hero-anim-description mt-4 flex max-w-2xl flex-col gap-y-4 sm:mt-5">{description}</div>
            <div className="hero-anim-socials flex gap-x-4 text-neutral-100">
              <Socials />
            </div>
            <div className="hero-anim-actions mt-1 flex w-full justify-center gap-x-4">
              {actions.map(({href, text, primary, Icon}) => (
                <a
                  className={classNames(
                    'hero-action-btn ui-btn flex gap-x-2 rounded-full border-2 bg-none px-4 py-2 text-sm font-medium text-white ring-offset-gray-700/80 hover:bg-gray-700/80 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-base',
                    primary ? 'border-orange-500 ring-orange-500' : 'border-white ring-white',
                  )}
                  href={href}
                  key={text}>
                  {text}
                  {Icon && <Icon className="h-5 w-5 text-white sm:h-6 sm:w-6" />}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="hero-anim-scroll absolute inset-x-0 bottom-6 flex justify-center">
          <a
            className="ui-btn rounded-full border border-white/40 bg-white/95 p-1 text-slate-900 ring-white ring-offset-2 ring-offset-gray-700/80 focus:outline-none focus:ring-2 sm:p-2"
            href={`/#${SectionId.About}`}>
            <ChevronDownIcon className="h-5 w-5 bg-transparent sm:h-6 sm:w-6" />
          </a>
        </div>
      </div>
    </Section>
  );
});

Hero.displayName = 'Hero';
export default Hero;
