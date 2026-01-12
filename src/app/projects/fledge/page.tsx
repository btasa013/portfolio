"use client";

import ProjectPage, { ProjectSectionProps } from '@/components/ProjectPage';
import { TITLE, SLUG, TEAM, DESCRIPTION, asset } from './data';
import { useRef } from 'react';

export default function Project() {

  const sections: ProjectSectionProps[] = [
    {
      title: "Reports",
      navButton: { title: "Reports" },
      ref: useRef(null),
      content: <div className="flex flex-col gap-4">
        <a className="bg-bg-secondary w-32 text-center p-2 rounded-2xl will-change-transform hover:scale-105 hover:brightness-125 transition-all duration-200" href={`${SLUG}/reports/3`}>
          <p>Report 3</p>
          <p className="text-xs">(WIP)</p>
        </a>
        <a className="bg-bg-secondary w-32 text-center p-2 rounded-2xl will-change-transform hover:scale-105 hover:brightness-125 transition-all duration-200" href={`${SLUG}/reports/2`}>Report 2</a>
        <a className="bg-bg-secondary w-32 text-center p-2 rounded-2xl will-change-transform hover:scale-105 hover:brightness-125 transition-all duration-200" href={`${SLUG}/reports/1`}>Report 1</a>
      </div>
    },
    {
      title: "Screenshots",
      navButton: { title: "Screenshots" },
      ref: useRef(null),
      content: <div className="
          grid grid-cols-2 grid-rows-2 gap-2 md:gap-4 *:shadow-bg-black *:shadow-md w-fit
      ">
        <img src={asset("image0.png")}/>
        <img src={asset("image1.png")}/>
        <img src={asset("image2.png")}/>
        <img src={asset("image3.png")}/>
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
        <iframe className="aspect-video max-w-[800px]" src="https://www.youtube.com/embed/uErqjzIrJPs" title="Fledge Gameplay" allowFullScreen></iframe>
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