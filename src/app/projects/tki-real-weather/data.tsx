import { getPath } from "@/scripts/path";

export const TITLE = "TKI - Real Weather";
export const SLUG = "tki-real-weather";

export const TEAM = [
  { name: "Daniel Sarin", roles: "Programmer" },
  { name: "Niko Hakala", roles: "Programmer" },
  { name: "Veikka Kovanen", roles: "Programmer" }
];

export const DESCRIPTION = `${TITLE} is an plugin developed with the goal of integrating \
  real-time weather into Unreal Engine using Ultra Dynamic Sky. The plugin integrates \
  the Finnish Meteorological Institute's open weather data API to bring realistic and accurate \
  weather conditions to the virtual world.

  The project has been developed for Kantasatama goes SMART, an initiative by XAMK in collaboration \
  with Merikeskus Vellamo, Satama Areena & the city of Kotka. The initiative fosters innovation and \
  digitalization with the goal of developing and supporting the event ecosystem of the Kantasatama area.
`;

export const ASSETS_PATH = getPath(`assets/${SLUG}/`);
export function asset(name: string): string {
  return ASSETS_PATH + name;
}