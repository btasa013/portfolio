import { getPath } from "@/scripts/path";

export const TITLE = "3D Pixel Art Game";
export const SLUG = "3d-pixelart-game";

export const TEAM = [
  { name: "Daniel Sarin", roles: "Programmer, 3D Artist" }
];

export const DESCRIPTION = `${TITLE}`;

export const ASSETS_PATH = getPath(`assets/${SLUG}/`);
export function asset(name: string): string {
  return ASSETS_PATH + name;
}