import { works } from "../data/works";

export function getWorkById(id: string) {
  return works.find((work) => work.id === id) || null;
}
