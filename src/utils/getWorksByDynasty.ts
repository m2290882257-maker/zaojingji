import { works } from "../data/works";

export function getWorksByDynasty(dynastyId: string) {
  return works.filter((work) => work.dynastyId === dynastyId);
}
