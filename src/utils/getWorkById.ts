import { works } from "../data/works";

export function getWorkById(workId: string) {
  return works.find((work) => work.id === workId) ?? null;
}
