import { getPath } from "@/scripts/path";

export const TITLE = "Ground Level";
export const SLUG = "ground-level";

export const TEAM = [
  { name: "Daniel Sarin", roles: "Programmer, 2D Artist" }
];

export const DESCRIPTION = `
  ${TITLE} is a 2D shooter game where the player fights various monsters that attack \
  the player and can destroy the terrain the player is standing on. Each level has consists \
  of a small arena where monsters come from both sides. The player must defeat all of the \
  enemies to progress and watch their step, as they can fall through the ground \
  to the depths below.
`;

export const ASSETS_PATH = getPath(`assets/${SLUG}/`);
export function asset(name: string): string {
  return ASSETS_PATH + name;
}