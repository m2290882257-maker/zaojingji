import { works } from "./works";

export type OverviewImageSlot = {
  id: string;
  index: number;
  title: string;
  periodLabel: string;
  imagePath: string;
  alt: string;
};

const overviewWorkIds = [
  "northern-wei-251-lotus-feitian-pingqi",
  "northern-wei-baochi-feitian-pingqi",
  "western-wei-285-baochi-lotus",
  "western-wei-rendong-lotus-pingqi",
  "northern-zhou-428-nude-feitian-pingqi",
  "northern-liang-268-duipin-pingqi",
  "sui-407-three-hares-feitian",
  "sui-western-qianfo-8-huafo-dragon-pingqi",
  "early-tang-329-lotus-feitian",
  "early-tang-334-baoxianghua-core",
  "high-tang-217-baoxianghua",
  "high-tang-79-medallion-flower-zaojing",
  "middle-tang-159-camellia-pingqi",
  "late-tang-14-four-direction-buddha-zaojing",
  "five-dynasties-55-double-dragon-lotus-zaojing",
  "song-yulin-14-coiled-dragon-zaojing",
  "western-xia-yulin-2-coiled-dragon-zaojing",
  "yuan-yulin-10-nine-buddhas",
];

const worksById = new Map(works.map((work) => [work.id, work]));

export const overviewImageSlots: OverviewImageSlot[] = overviewWorkIds.flatMap(
  (workId, index) => {
    const work = worksById.get(workId);

    if (!work) {
      return [];
    }

    return [
      {
        id: `overview-${String(index + 1).padStart(2, "0")}-${work.id}`,
        index: index + 1,
        title: work.shortTitle,
        periodLabel: work.periodLabel,
        imagePath: work.images.thumbnail,
        alt: work.images.alt,
      },
    ];
  },
);
