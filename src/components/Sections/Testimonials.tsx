import classNames from 'classnames';
import {FC, memo, UIEventHandler, useCallback, useEffect, useMemo, useRef, useState} from 'react';

import {isApple, isMobile} from '../../config';
import {useLanguage} from '../../context/LanguageContext';
import {getTestimonial, SectionId} from '../../data/data';
import {Testimonial} from '../../data/dataDef';
import useInterval from '../../hooks/useInterval';
import useWindow from '../../hooks/useWindow';
import QuoteIcon from '../Icon/QuoteIcon';
import Section from '../Layout/Section';

const Testimonials: FC = memo(() => {
  const {language} = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [scrollValue, setScrollValue] = useState(0);
  const [parallaxEnabled, setParallaxEnabled] = useState(false);

  const itemWidth = useRef(0);
  const scrollContainer = useRef<HTMLDivElement>(null);

  const {width} = useWindow();

  const {imageSrc, testimonials} = getTestimonial(language);

  const resolveSrc = useMemo(() => {
    if (!imageSrc) return undefined;
    return typeof imageSrc === 'string' ? imageSrc : imageSrc.src;
  }, [imageSrc]);

  // Mobile iOS doesn't allow background-fixed elements
  useEffect(() => {
    setParallaxEnabled(!(isMobile && isApple));
  }, []);

  useEffect(() => {
    itemWidth.current = scrollContainer.current ? scrollContainer.current.offsetWidth : 0;
  }, [width]);

  useEffect(() => {
    if (scrollContainer.current) {
      const newIndex = Math.round(scrollContainer.current.scrollLeft / itemWidth.current);
      setActiveIndex(newIndex);
    }
  }, [itemWidth, scrollValue]);

  const setTestimonial = useCallback(
    (index: number) => () => {
      if (scrollContainer !== null && scrollContainer.current !== null) {
        scrollContainer.current.scrollLeft = itemWidth.current * index;
      }
    },
    [],
  );
  const next = useCallback(() => {
    if (activeIndex + 1 === testimonials.length) {
      setTestimonial(0)();
    } else {
      setTestimonial(activeIndex + 1)();
    }
  }, [activeIndex, setTestimonial, testimonials.length]);

  const handleScroll = useCallback<UIEventHandler<HTMLDivElement>>(event => {
    setScrollValue(event.currentTarget.scrollLeft);
  }, []);

  useInterval(next, 10000);

  // If no testimonials, don't render the section
  if (!testimonials.length) {
    return null;
  }

  return (
    <Section noPadding sectionId={SectionId.Testimonials}>
      <div
        className={classNames(
          'relative flex w-full items-center justify-center bg-cover bg-center px-4 py-20 md:py-28 lg:px-8',
          parallaxEnabled && 'bg-fixed',
          {'bg-neutral-700': !imageSrc},
        )}
        style={imageSrc ? {backgroundImage: `url(${resolveSrc})`} : undefined}>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-900/80 to-slate-950/92" />
        <div className="z-10 w-full max-w-screen-md px-4 lg:px-0" data-reveal>
          <div className="flex flex-col items-center gap-y-7 rounded-2xl border border-blue-100/28 bg-gray-900/84 p-6 shadow-2xl backdrop-blur-md sm:p-8">
            <div
              className="no-scrollbar flex w-full touch-pan-x snap-x snap-mandatory gap-x-6 overflow-x-auto scroll-smooth"
              onScroll={handleScroll}
              ref={scrollContainer}>
              {testimonials.map((testimonial, index) => {
                const isActive = index === activeIndex;
                return (
                  <Testimonial isActive={isActive} key={`${testimonial.name}-${index}`} testimonial={testimonial} />
                );
              })}
            </div>
            <div className="flex items-center gap-x-3">
              {[...Array(testimonials.length)].map((_, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    aria-label={`Go to testimonial ${index + 1}`}
                    className={classNames(
                      'h-2.5 w-2.5 rounded-full border border-blue-100/30 bg-blue-100/70 transition-all duration-500 sm:h-3 sm:w-3',
                      isActive ? 'scale-100 bg-orange-300 opacity-100' : 'scale-75 opacity-50 hover:opacity-80',
                    )}
                    disabled={isActive}
                    key={`select-button-${index}`}
                    onClick={setTestimonial(index)}></button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
});

const Testimonial: FC<{testimonial: Testimonial; isActive: boolean}> = memo(
  ({testimonial: {text, name, image}, isActive}) => (
    <div
      className={classNames(
        'flex w-full shrink-0 snap-start snap-always flex-col items-start gap-y-4 rounded-xl border border-blue-100/20 bg-black/34 p-4 transition-opacity duration-1000 sm:flex-row sm:gap-x-6',
        isActive ? 'opacity-100' : 'opacity-0',
      )}>
      {image ? (
        <div className="relative h-14 w-14 shrink-0 sm:h-16 sm:w-16">
          <QuoteIcon className="absolute -left-2 -top-2 h-4 w-4 stroke-black text-white" />
          <img alt={`${name} testimonial`} className="h-full w-full rounded-full" src={image} />
        </div>
      ) : (
        <QuoteIcon className="h-5 w-5 shrink-0 text-white sm:h-8 sm:w-8" />
      )}
      <div className="flex flex-col gap-y-4">
        <p className="prose prose-sm leading-7 font-medium italic text-slate-100 sm:prose-base sm:leading-8">{text}</p>
        <p className="text-xs font-medium tracking-[0.05em] text-slate-200 sm:text-sm">-- {name}</p>
      </div>
    </div>
  ),
);

export default Testimonials;
