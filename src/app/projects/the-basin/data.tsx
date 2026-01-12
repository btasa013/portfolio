import { getPath } from "@/scripts/path";

export const TITLE = "The Basin";
export const SLUG = "the-basin";

export const TEAM = [
  { name: "Daniel Sarin", roles: "Programmer, Designer" }
];

export const DESCRIPTION = `
  ${TITLE} is a short game created as a the final project of my Level Design and Sound Design courses at XAMK.
`;

export const ASSETS_PATH = getPath(`assets/${SLUG}/`);
export function asset(name: string): string {
  return ASSETS_PATH + name;
}