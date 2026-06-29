import { dynasties } from "../data/dynasties";

export function getDynastyById(id: string) {
  return dynasties.find((dynasty) => dynasty.id === id) || null;
}
