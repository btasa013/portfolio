"use client";

import ProjectPage, { ProjectSectionProps } from '@/components/ProjectPage';
import { TITLE, SLUG, TEAM, DESCRIPTION, asset } from '../../data';
import { useRef } from 'react';
import Image from 'next/image';
import ContentPicture from '@/components/ContentPicture';

import ShowcaseImage0 from '@/assets/fledge/image0.png';
import ShowcaseImage1 from '@/assets/fledge/image1.png';
import ShowcaseImage2 from '@/assets/fledge/image2.png';
import ShowcaseImage3 from '@/assets/fledge/image3.png';

import ProjectBanner from '@/assets/fledge/banner.png';

import PlayerOnEdgePicture from '@/assets/fledge/player_onedge.png';
import PlayerCollidersPicture from '@/assets/fledge/player_colliders.png';

const playerMovement = <div className="*:my-8">
  <div className="my-8 md:max-w-2/3">
  </div>
  <div className="flex flex-wrap gap-2 my-8">
  </div>
</div>;

const playerCollision = <div className="*:my-8">
  <div className="my-8 md:max-w-2/3">
    The game&apos;s player sprite
  </div>
  <div className="flex flex-wrap gap-2 my-8">
    <ContentPicture
      path={PlayerOnEdgePicture}
      description="The player standing on the edge of a tile."
    />
    <ContentPicture
      path={PlayerCollidersPicture}
      description="Normal collider (left) and slim collider (right)."
    />
  </div>
</div>;

const roomTransitions = <div className="*:my-8">
  <div className="my-8 md:max-w-2/3">
  </div>
  <div className="flex flex-wrap gap-2 my-8">
  </div>
</div>;

export default function Project() {

  const sections: ProjectSectionProps[] = [
    {
      title: "Functions",
      ref: useRef(null),
      navButton: { title: "Functions" },
      content: [
        { title: "a", content: <div></div> },
        { title: "b", content: <div></div> },
        { title: "c", content: <div></div> }
      ],
    },
    {
      title: "Problems",
      ref: useRef(null),
      navButton: { title: "Problems" },
      content: [
        { title: "Better Player Movement", content: playerMovement },
        { title: "Player Collision", content: playerCollision },
        { title: "Room Transitions", content: roomTransitions }
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
      title: "Gameplay Video",
      ref: useRef(null),
      navButton: { title: "Gameplay" },
      content: <div>
        { /* Second iframe is needed so the video isn't blocked on Firefox for some reason */ }
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
      banner={ProjectBanner}
      sections={sections}
      isMainPage={false}
    >
    </ProjectPage>
  );
}