import {ArrowTopRightOnSquareIcon} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import Image from 'next/image';
import {FC, memo} from 'react';

import {useLanguage} from '../../context/LanguageContext';
import {getPortfolioItems, getUiText, SectionId} from '../../data/data';
import {PortfolioItem} from '../../data/dataDef';
import Section from '../Layout/Section';

type PortfolioCta = {href: string; label: string; kind: 'demo' | 'repo' | 'details' | 'default'};

const copyByLanguage = {
  es: {
    demo: 'Demo',
    repo: 'Repositorio',
    details: 'Detalles',
    view: 'Ver proyecto',
  },
  en: {
    demo: 'Demo',
    repo: 'Repository',
    details: 'Details',
    view: 'View project',
  },
} as const;

const buildCtas = (
  item: PortfolioItem,
  labels: (typeof copyByLanguage)['es'] | (typeof copyByLanguage)['en'],
): PortfolioCta[] => {
  const ctas: PortfolioCta[] = [];

  if (item.demoUrl) ctas.push({href: item.demoUrl, label: labels.demo, kind: 'demo'});
  if (item.repoUrl) ctas.push({href: item.repoUrl, label: labels.repo, kind: 'repo'});
  if (item.detailsUrl) ctas.push({href: item.detailsUrl, label: labels.details, kind: 'details'});

  if (ctas.length === 0) {
    ctas.push({href: item.url, label: labels.view, kind: 'default'});
  }

  return ctas;
};

const Portfolio: FC = memo(() => {
  const {language} = useLanguage();
  const portfolioItems = getPortfolioItems(language);
  const uiText = getUiText(language);
  const labels = copyByLanguage[language];

  return (
    <Section className="bg-neutral-800" sectionId={SectionId.Portfolio}>
      <div className="portfolio-shell flex flex-col gap-y-8" data-reveal>
        <h2 className="self-center text-xl font-bold text-white">{uiText.portfolioTitle}</h2>
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
          {portfolioItems.map(item => (
            <ProjectCard item={item} key={item.title} labels={labels} />
          ))}
        </div>
      </div>
    </Section>
  );
});

Portfolio.displayName = 'Portfolio';
export default Portfolio;

const ProjectCard: FC<{
  item: PortfolioItem;
  labels: (typeof copyByLanguage)['es'] | (typeof copyByLanguage)['en'];
}> = memo(({item, labels}) => {
  const ctas = buildCtas(item, labels);
  const {description, image, stack, title} = item;

  return (
    <article className="project-panel group overflow-hidden rounded-2xl border border-white/10 bg-slate-950/55" data-reveal>
      <div className="grid h-full gap-0">
        <div className="project-visual relative aspect-[16/10] overflow-hidden">
          <Image
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            placeholder="blur"
            src={image}
          />
          <div className="project-visual-overlay absolute inset-0" />
        </div>

        <div className="flex flex-col gap-y-4 p-5 sm:p-6 lg:p-7">
          <h3 className="text-xl text-white">{title}</h3>
          <p className="text-sm leading-6 text-slate-200/90">{description}</p>

          {!!stack?.length && (
            <ul className="flex flex-wrap gap-2">
              {stack.map(tech => (
                <li className="project-stack-pill rounded-full px-3 py-1 text-xs text-slate-100" key={`${title}-${tech}`}>
                  {tech}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-auto flex flex-wrap gap-3 pt-2">
            {ctas.map(cta => (
              <a
                className={classNames('project-cta inline-flex items-center gap-x-2 rounded-full px-4 py-2 text-sm font-semibold', {
                  'project-cta-primary': cta.kind === 'demo' || cta.kind === 'default',
                  'project-cta-secondary': cta.kind === 'repo' || cta.kind === 'details',
                })}
                href={cta.href}
                key={`${title}-${cta.label}`}
                rel="noreferrer"
                target="_blank">
                {cta.label}
                <ArrowTopRightOnSquareIcon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
});

ProjectCard.displayName = 'ProjectCard';
