import { works } from "../data/works";

export function getFeaturedWorks() {
  return works.filter((work) => work.isFeatured);
}
