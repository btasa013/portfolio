"use client";

import ProjectPage, { ProjectSectionProps } from '@/components/ProjectPage';
import CodeBlock from '@/components/CodeBlock';
import ContentPicture from '@/components/ContentPicture';
import { TITLE, SLUG, TEAM, DESCRIPTION, asset } from '../../data';
import { useRef } from 'react';
import Image from 'next/image';

import ProjectBanner from '@/assets/3d-pixelart-game/banner.png';

import ShowcaseImage0 from '@/assets/3d-pixelart-game/preview.png';
import ShowcaseImage1 from '@/assets/3d-pixelart-game/preview.png';
import ShowcaseImage2 from '@/assets/3d-pixelart-game/preview.png';
import ShowcaseImage3 from '@/assets/3d-pixelart-game/preview.png';

const s = <div className="*:my-8">
  <div className="max-w-2/3">

  </div>
</div>

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
        <Image alt="" src={ShowcaseImage0}/>
        <Image alt="" src={ShowcaseImage1}/>
        <Image alt="" src={ShowcaseImage2}/>
        <Image alt="" src={ShowcaseImage3}/>
        <p></p>
      </div>
    },
    {
      title: "Showcase Video",
      ref: useRef(null),
      navButton: { title: "Gameplay" },
      content: <div>
        <div className="max-w-2/3">
          There currently isn't much in terms of gameplay but below is a showcase of the project.
        </div>
        {/* Second iframe is needed so the video isn't blocked on Firefox for some reason */}
        <iframe hidden></iframe>
        <iframe className="aspect-video max-w-[800px]" src="https://www.youtube.com/embed/kStJTdOw_M8" title="Ground Level Gameplay" allowFullScreen></iframe>
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
      isMainPage={false}
    >
    </ProjectPage>
  );
}