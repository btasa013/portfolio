
import ProjectPage, { ProjectSectionProps } from '@/components/ProjectPage';
import { getPath } from '@/scripts/path';

export const TITLE = "2D Platformer";
export const SLUG = "2d-platformer";
export const TEAM = [
  { name: "Daniel Sarin", roles: "Programmer, 2D Artist" }
];

export const DESCRIPTION = `
  ${TITLE} is a 2D platformer and adventure game created in Unity.

  The game is inspired by Celeste and focuses on fast-paced platforming where the player has to traverse each room by jumping, gliding or climbing over obstacles. Hidden across the levels, the player can find collectibles which serve as a bonus objective.

  The game follows an owl fledgling who left the nest too early in search of adventure. As the player progresses, the owl will learn to flap its wings, glide and take flight.
`;

export const ASSETS_PATH = getPath(`assets/${SLUG}/`);
function asset(name: string): string {
  return ASSETS_PATH + name;
}

export default function Project() {

  const sections: ProjectSectionProps[] = [
    {
      title: "Reports",
      content: <div className="flex flex-col gap-4">
        <a className="bg-bg-secondary w-32 text-center p-2 rounded-2xl hover:scale-105 hover:brightness-125 transition-all duration-200" href={`${SLUG}/reports/2`}>Report 2</a>
        <a className="bg-bg-secondary w-32 text-center p-2 rounded-2xl hover:scale-105 hover:brightness-125 transition-all duration-200" href={`${SLUG}/reports/1`}>Report 1</a>
      </div>
    },
    {
      title: "Screenshots",
      content: <div className="
          grid grid-cols-2 gap-2 w-fit divide-y-1 divide-neutral-200
          *:w-min *:max-w-[25vw]
      ">
        <img src={asset("gameplay_screenshot0.png")} className="pixelated" />
        <img src={asset("gameplay_screenshot1.png")} className="pixelated" />
        <img src={asset("gameplay_screenshot2.png")} className="pixelated" />
        <img src={asset("gameplay_screenshot3.png")} className="pixelated" />
        <p></p>
      </div>
    },
    {
      title: "Gameplay Video",
      content: <div>
        {/* Second iframe is needed so the video isn't blocked on Firefox for some reason */}
        <iframe hidden></iframe>
        <iframe width="711" height="400" src="https://www.youtube.com/embed/cAFu9xsRNwk" title="2D Platformer Gameplay" allowFullScreen></iframe>
      </div>
    }
  ];

  return (
    <ProjectPage
      title={TITLE}
      slug={SLUG}
      team={TEAM}
      description={DESCRIPTION}
      sections={sections}
    >
    </ProjectPage>
  );
}