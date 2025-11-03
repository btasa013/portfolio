"use client";

import ProjectPage, { ProjectSectionProps } from '@/components/ProjectPage';
import { TITLE, SLUG, TEAM, DESCRIPTION, asset } from '@/app/projects/2d-platformer/data';
import { useRef } from 'react';

export default function Project() {

  const sections: ProjectSectionProps[] = [
    {
      title: "Reports",
      navButton: { title: "Reports" },
      ref: useRef(null),
      content: <div className="flex flex-col gap-4">
        <a className="bg-bg-secondary w-32 text-center p-2 rounded-2xl hover:scale-105 hover:brightness-125 transition-all duration-200" href={`${SLUG}/reports/2`}>Report 2</a>
        <a className="bg-bg-secondary w-32 text-center p-2 rounded-2xl hover:scale-105 hover:brightness-125 transition-all duration-200" href={`${SLUG}/reports/1`}>Report 1</a>
      </div>
    },
    {
      title: "Screenshots",
      navButton: { title: "Screenshots" },
      ref: useRef(null),
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
      navButton: { title: "Gameplay" },
      ref: useRef(null),
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
      isMainPage={true}
    >
    </ProjectPage>
  );
}