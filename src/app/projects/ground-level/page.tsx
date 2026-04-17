"use client";

import ProjectPage, { ProjectSectionProps } from '@/components/ProjectPage';
import { TITLE, SLUG, TEAM, DESCRIPTION, asset } from './data';
import { useRef } from 'react';
import Image from 'next/image';

import ProjectBanner from '@/assets/ground-level/banner.png';

import ShowcaseImage0 from '@/assets/ground-level/image0.png';
import ShowcaseImage1 from '@/assets/ground-level/image1.png';
import ShowcaseImage2 from '@/assets/ground-level/image2.png';
import ShowcaseImage3 from '@/assets/ground-level/image3.png';

export default function Project() {

  const sections: ProjectSectionProps[] = [
    /*{
      title: "Reports",
      navButton: { title: "Reports" },
      ref: useRef(null),
      content: <div className="flex flex-col gap-4">
        <div>Nothing to see here as of now!</div>
      </div>
    },*/
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
        <Image alt="" src={ShowcaseImage3}/>
        <p></p>
      </div>
    },
    /*{
      title: "Gameplay Video",
      navButton: { title: "Gameplay" },
      ref: useRef(null),
      content: <div>
        <iframe hidden></iframe>
      </div>
    }*/
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