import { dynasties } from "../data/dynasties";

export function getDynastyById(dynastyId: string) {
  return dynasties.find((dynasty) => dynasty.id === dynastyId) ?? null;
}
