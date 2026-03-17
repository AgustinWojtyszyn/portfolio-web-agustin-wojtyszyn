import {FC, memo} from 'react';

import {useLanguage} from '../../../context/LanguageContext';
import {getEducation, getExperience, getSkills, getUiText, SectionId} from '../../../data/data';
import Section from '../../Layout/Section';
import ResumeSection from './ResumeSection';
import {SkillGroup} from './Skills';
import TimelineItem from './TimelineItem';

const Resume: FC = memo(() => {
  const {language} = useLanguage();
  const education = getEducation(language);
  const experience = getExperience(language);
  const skills = getSkills(language);
  const uiText = getUiText(language);

  return (
    <Section className="bg-neutral-100" sectionId={SectionId.Resume}>
      <div className="flex flex-col divide-y-2 divide-neutral-300">
        <ResumeSection title={uiText.educationTitle}>
          <div className="space-y-6" data-reveal>
            {education.map((item, index) => (
              <TimelineItem item={item} key={`${item.title}-${index}`} />
            ))}
          </div>
        </ResumeSection>
        <ResumeSection title={uiText.workTitle}>
          <div className="space-y-6" data-reveal>
            {experience.map((item, index) => (
              <TimelineItem item={item} key={`${item.title}-${index}`} />
            ))}
          </div>
        </ResumeSection>
        <ResumeSection title={uiText.skillsTitle}>
          <p className="pb-8 leading-7 text-neutral-700" data-reveal>
            {uiText.skillsIntro}
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2" data-reveal>
            {skills.map((skillgroup, index) => (
              <SkillGroup key={`${skillgroup.name}-${index}`} skillGroup={skillgroup} />
            ))}
          </div>
        </ResumeSection>
      </div>
    </Section>
  );
});

Resume.displayName = 'Resume';
export default Resume;
