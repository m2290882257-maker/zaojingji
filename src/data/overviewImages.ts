import { works } from "./works";

export type OverviewImageSlot = {
  id: string;
  index: number;
  title: string;
  periodLabel: string;
  placeholderPath: string;
  replacementNote: string;
};

const featuredWorks = works.filter((work) => work.isFeatured);

// Replace placeholderPath values with real zaojing images after adding files to:
// public/assets/zaojing/overview/
export const overviewImageSlots: OverviewImageSlot[] = Array.from(
  { length: 18 },
  (_, index) => {
    const work = featuredWorks[index % featuredWorks.length];
    const slotNumber = String(index + 1).padStart(2, "0");

    return {
      id: `overview-${slotNumber}-${work.id}`,
      index: index + 1,
      title: work.shortTitle,
      periodLabel: work.periodLabel,
      placeholderPath: `/assets/zaojing/overview/overview-${slotNumber}-placeholder.svg`,
      replacementNote: `Replace with public/assets/zaojing/overview/overview-${slotNumber}.jpg`,
    };
  },
);
