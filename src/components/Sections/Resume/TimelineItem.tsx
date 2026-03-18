import {FC, memo} from 'react';

import {TimelineItem} from '../../../data/dataDef';

const TimelineItem: FC<{item: TimelineItem}> = memo(({item}) => {
  const {title, date, location, content} = item;
  return (
    <article
      className="resume-card rounded-xl border border-neutral-200 bg-white px-5 py-6 text-left shadow-sm sm:px-6"
      data-reveal>
      <div className="mb-4 flex flex-col gap-y-2 border-b border-neutral-200 pb-4">
        <h3 className="resume-card-title text-xl font-semibold leading-tight text-neutral-900">{title}</h3>
        <div className="flex flex-col gap-y-1 sm:flex-row sm:items-center sm:justify-between">
          <span className="resume-card-meta text-sm font-medium text-neutral-700">{location}</span>
          <span className="resume-card-date text-xs font-medium uppercase tracking-[0.08em] text-neutral-500 sm:text-sm">
            {date}
          </span>
        </div>
      </div>
      <div className="resume-card-content max-w-3xl space-y-4 text-[15px] leading-7 text-neutral-700">{content}</div>
    </article>
  );
});

TimelineItem.displayName = 'TimelineItem';
export default TimelineItem;
