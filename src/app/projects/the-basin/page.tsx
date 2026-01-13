"use client";

import ProjectPage, { ProjectSectionProps } from '@/components/ProjectPage';
import { TITLE, SLUG, TEAM, DESCRIPTION, asset } from './data';
import { useRef } from 'react';
import Image from 'next/image';

import ShowcaseImage0 from '@/assets/the-basin/image0.png';
import ShowcaseImage1 from '@/assets/the-basin/image1.png';
import ShowcaseImage2 from '@/assets/the-basin/image2.png';
import ShowcaseImage3 from '@/assets/the-basin/image3.png';

import ProjectBanner from '@/assets/the-basin/banner.png';
import UnityIcon from '@/assets/icons/devicon_unity.svg';

export default function Project() {

  const UNITY_ICON = <Image alt="Logo of the Unity Engine" width={24} src={UnityIcon}/>;

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
        <Image alt="" src={ShowcaseImage3}/>
        <p></p>
      </div>
    },
    {
      title: "Assets",
      navButton: { title: "Assets" },
      ref: useRef(null),
      content: <div>
        <div className="pb-4">
          The game uses free assets from the Unity Asset Store. The used assets can be seen below:
        </div>
        <ol className="*:py-1">
          <li>
            <div className="flex gap-2">
              {UNITY_ICON}
              <a href="https://assetstore.unity.com/packages/3d/environments/boki-low-poly-nature-206385">
                <p className="underline duration-200 hover:text-cyan-500">BOKI - Low Poly Nature by Boki</p>
              </a>
            </div>
            <p className="pl-8 text-xs">* Some textures were modified</p>
          </li>
          <li>
            <div className="flex gap-2">
              {UNITY_ICON}
              <a href="https://assetstore.unity.com/packages/3d/environments/low-poly-woods-lifestyle-65306">
                <p className="underline duration-200 hover:text-cyan-500">Low Poly: Woods Lifestyle by Rad-Coders</p>
              </a>
            </div>
            <p className="pl-8 text-xs">* Some textures were modified</p>
          </li>
          <li>
            <div className="flex gap-2">
              {UNITY_ICON}
              <a href="https://assetstore.unity.com/packages/vfx/shaders/full-opaque-interactive-water-waterfall-316447">
                <p className="underline duration-200 hover:text-cyan-500">Full Opaque Interactive Water & Waterfall by Roman CHACORNAC</p>
              </a>
            </div>
          </li>
          <li>
            <div className="flex gap-2">
              {UNITY_ICON}
              <a href="https://assetstore.unity.com/packages/2d/textures-materials/sky/free-stylized-skybox-212257">
                <p className="underline duration-200 hover:text-cyan-500">Free Stylized Skybox by Yuki2022</p>
              </a>
            </div>
          </li>
          <li>
            <div className="flex gap-2">
              {UNITY_ICON}
              <a href="https://assetstore.unity.com/packages/3d/props/survival-props-pack-1-0-312823">
                <p className="underline duration-200 hover:text-cyan-500">Survival Props Pack 1.0 by Anni</p>
              </a>
            </div>
          </li>
        </ol>
        <div className="py-4">
          As well as sounds from Soundly:
        </div>
        <ol className="*:py-1">
          <div>
            todo
          </div>
        </ol>
      </div>
    }
    /*{
      title: "Gameplay Video",
      navButton: { title: "Gameplay" },
      ref: useRef(null),
      content: <div>
        {/* Second iframe is needed so the video isn't blocked on Firefox for some reason /}
        <iframe hidden></iframe>
        <iframe className="aspect-video max-w-[800px]" src="https://www.youtube.com/embed/cAFu9xsRNwk" title="Fledge Gameplay" allowFullScreen></iframe>
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