"use client";

import ProjectPage, { ProjectSectionProps } from '@/components/ProjectPage';
import { TITLE, SLUG, TEAM, DESCRIPTION, asset } from '../../data';
import { useRef } from 'react';

export default function Project() {

  const sections: ProjectSectionProps[] = [
    {
      title: "Functions",
      ref: useRef(null),
      navButton: { title: "Functions" },
      content: [
      ],
    },
    {
      title: "Problems",
      ref: useRef(null),
      navButton: { title: "Problems" },
      content: [
      ]
    },
    {
      title: "Screenshots",
      ref: useRef(null),
      navButton: { title: "Screenshots" },
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
      ref: useRef(null),
      navButton: { title: "Gameplay" },
      content: <div>
        { /* Second iframe is needed so the video isn't blocked on Firefox for some reason */}
        <iframe hidden></iframe>
        <iframe hidden className="aspect-video max-w-[800px]" src="https://www.youtube.com/embed/cAFu9xsRNwk" title="Fledge Gameplay" allowFullScreen></iframe>
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
      isMainPage={false}
    >
    </ProjectPage>
  );
}