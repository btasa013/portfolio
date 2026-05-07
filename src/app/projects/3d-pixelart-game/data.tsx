import { getPath } from "@/scripts/path";

export const TITLE = "3D Pixel Art Game";
export const SLUG = "3d-pixelart-game";

export const TEAM = [
  { name: "Daniel Sarin", roles: "Programmer, 3D Artist" }
];

export const DESCRIPTION = `
  ${TITLE} is a 3D game with a focus on exploration and an atmospheric environment.
  The project uses a novel pixel art style using shaders and sub-pixel rendering.

  I have mostly developed 2D games so with this project, I wanted to expand my experience
  in creating other kind of games as well as improve my 3D modelling skills.
`;

export const ASSETS_PATH = getPath(`assets/${SLUG}/`);
export function asset(name: string): string {
  return ASSETS_PATH + name;
}