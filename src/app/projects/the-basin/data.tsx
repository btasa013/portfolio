import { getPath } from "@/scripts/path";

export const TITLE = "The Basin";
export const SLUG = "the-basin";

export const TEAM = [
  { name: "Daniel Sarin", roles: "Programmer, Designer" }
];

export const DESCRIPTION = `
  ${TITLE} is a game/level created as the final project of the Level Design course. I also used it in the Audio Design course and implemented an audio system using FMOD.

  ${TITLE} is a short linear and story-based game where the player explores a small area, gathering clues and solving small puzzles.
`;

export const ASSETS_PATH = getPath(`assets/${SLUG}/`);
export function asset(name: string): string {
  return ASSETS_PATH + name;
}