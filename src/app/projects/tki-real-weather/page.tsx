"use client";

import ProjectPage, { ProjectSectionProps } from '@/components/ProjectPage';
import { TITLE, SLUG, TEAM, DESCRIPTION } from './data';
import { useRef } from 'react';
import Image from 'next/image';

import ProjectBanner from '@/assets/tki-real-weather/banner.png';

import ShowcaseImage0 from '@/assets/tki-real-weather/image001.png';
import ShowcaseImage1 from '@/assets/tki-real-weather/image002.png';
import ShowcaseImage2 from '@/assets/tki-real-weather/image004.png';

export default function Project() {

  const sections: ProjectSectionProps[] = [
    {
      title: "Screenshots",
      navButton: { title: "Screenshots" },
      ref: useRef(null),
      content: <div className="
          grid grid-cols-2 grid-rows-2 gap-2 md:gap-4 *:shadow-bg-black *:shadow-md w-fit
      ">
        <Image alt="" src={ShowcaseImage0}/>
        <Image alt="" src={ShowcaseImage1}/>
        <Image alt="" src={ShowcaseImage2}/>
        <p></p>
      </div>
    },
    {
      title: "Showcase Video",
      navButton: { title: "Showcase Video" },
      ref: useRef(null),
      content: <div>
        {/* Second iframe is needed so the video isn't blocked on Firefox for some reason */}
        <iframe hidden></iframe>
        <iframe className="aspect-video max-w-[800px]" src="https://www.youtube.com/embed/pheOeEINGj0" title="Real Weather Plugin Preview" allowFullScreen></iframe>
      </div>
    }
  ];

  return (
    <ProjectPage
      title={TITLE}
      slug={SLUG}
      team={TEAM}
      description={DESCRIPTION}
      banner={ProjectBanner}
      sections={sections}
      isMainPage={true}
    >
    </ProjectPage>
  );
}