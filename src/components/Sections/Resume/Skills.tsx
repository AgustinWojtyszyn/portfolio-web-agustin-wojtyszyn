import {FC, memo, PropsWithChildren} from 'react';

import {Skill as SkillType, SkillGroup as SkillGroupType} from '../../../data/dataDef';

export const SkillGroup: FC<PropsWithChildren<{skillGroup: SkillGroupType}>> = memo(({skillGroup}) => {
  const {name, skills} = skillGroup;
  return (
    <div
      className="resume-skill-card flex flex-col gap-y-3 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm"
      data-reveal>
      <span className="resume-card-title text-base font-bold text-neutral-900">{name}</span>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <Skill key={`${skill.name}-${index}`} skill={skill} />
        ))}
      </div>
    </div>
  );
});

SkillGroup.displayName = 'SkillGroup';

export const Skill: FC<{skill: SkillType}> = memo(({skill}) => {
  const {name} = skill;

  return (
    <span className="resume-skill-pill rounded-full bg-neutral-100 px-3 py-1 text-sm font-medium text-neutral-800">
      {name}
    </span>
  );
});

Skill.displayName = 'Skill';
