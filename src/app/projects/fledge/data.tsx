import { getPath } from "@/scripts/path";

export const TITLE = "Fledge";
export const SLUG = "fledge";

export const TEAM = [
  { name: "Daniel Sarin", roles: "Programmer, 2D Artist" }
];

export const DESCRIPTION = `
  ${TITLE} is a 2D platformer and adventure game created in Unity.

  The game is inspired by Celeste and focuses on fast-paced platforming where the player has to traverse each room by jumping, gliding or climbing over obstacles. Hidden across the levels, the player can find collectibles which serve as a bonus objective.

  The game follows an owl fledgling who left the nest too early in search of adventure. As the player progresses, the owl will learn to flap its wings, glide and take flight.
`;

export const ASSETS_PATH = getPath(`assets/${SLUG}/`);
export function asset(name: string): string {
  return ASSETS_PATH + name;
}