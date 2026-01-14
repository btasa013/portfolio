"use client";

import React, { useRef, useEffect, useState } from 'react';
import Page from '@/components/Page';
import ProjectPanel from '@/components/ProjectPanel';
import Nav, { DEFAULT_NAV } from '@/components/Nav';
import { getPath } from '@/scripts/path';
import { NETWORKING_BUTTONS, PERSONAL_ICON } from '@/components/Sidebar';
import Image from 'next/image';

import FledgePreview from '@/assets/fledge/preview.png';

import TheBasinPreview from '@/assets/the-basin/preview.png';
import SpaceshipPreview from '@/assets/space-ship/preview.png';

import UnityIcon from '@/assets/icons/devicon_unity.svg';
import UnrealIcon from '@/assets/icons/mdi_unreal.svg';

export default function Home() {

  const aboutMeRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const animationFrameRef = useRef<number>(null);

  const nav = DEFAULT_NAV;

  nav[0].ref = aboutMeRef;
  nav[1].ref = skillsRef;
  nav[2].ref = projectsRef;
  nav[3].ref = contactRef;

  const [onMobile, setOnMobile] = useState(false);

  useEffect(() => {
    function handleWindowResize() {
      setOnMobile(window.innerWidth < 1024);
    }
    setOnMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("reisze", handleWindowResize);
  });

  useEffect(() => {

    if (window.scrollY != 0) {
      return;
    }

    const timer = setTimeout(() => {
      if (window.scrollY == 0) {
        aboutMeRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const bgRef = useRef<HTMLVideoElement>(null);
  const fgRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {

    const bg = bgRef.current;
    const fg = fgRef.current;

    if (!bg || !fg) return;

    const syncVideos = () => {
      if (!bg.paused && !fg.paused) {
        const diff = Math.abs(bg.currentTime - fg.currentTime);
        if (diff > 0.03) {
          bg.currentTime = fg.currentTime;
        }
      }
      animationFrameRef.current = requestAnimationFrame(syncVideos);
    };

    animationFrameRef.current = requestAnimationFrame(syncVideos);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const sidebarItems = [PERSONAL_ICON, NETWORKING_BUTTONS, <Nav key="nav" nav={nav}/>];

  return (
    <Page sidebarItems={sidebarItems}>
      <div className="flex flex-col divide-y divide-neutral-800 *:min-h-64">

        <div className="relative overflow-hidden bg-black">
          <div className="w-full h-[700px] flex items-center justify-center">
            <video
              className="absolute inset-0 w-full h-full object-cover brightness-15"
              autoPlay
              muted
              loop
              playsInline
              disablePictureInPicture
              preload="auto"
              ref={bgRef}
            >
              <source src={getPath("assets/ProjectShowcase_Blur.webm")} type="video/webm" />
              <source src={getPath("assets/ProjectShowcase_Blur.mp4")} type="video/mp4" />
            </video>

            <video
              className="relative z-10 max-h-full w-auto object-contain"
              autoPlay
              muted
              loop
              playsInline
              disablePictureInPicture
              preload="auto"
              ref={fgRef}
            >
              <source src={getPath("assets/ProjectShowcase.webm")} type="video/webm" />
              <source src={getPath("assets/ProjectShowcase.mp4")} type="video/mp4" />
            </video>
          </div>
        </div>

        <Section id="About Me" ref={aboutMeRef} title="Hello!">
          <div>
            <p>
              I&apos;m an aspiring game developer from Finland who is passionate
              about programming and all things games.
            </p>
            <br/>
            <p>
              I&apos;m second year a student of Game Technology at <abbr
                className="underline-offset-2"
                title="South-Eastern Finland University of Applied Sciences">
                  XAMK
              </abbr>.
            </p>
          </div>
        </Section>
        <Section id="Skills" ref={skillsRef} title="Skills">
          <div>
            <div className="
              flex flex-row flex-wrap divide-y divide-neutral-800 gap-4
              lg:grid lg:grid-cols-2 lg:divide-x lg:divide-y-0
            ">
              <div className="flex flex-col">
                <p className="mr-4">
                  I have multiple years of experience in game development and using
                  different game engines to create games. I also have several years of
                  experience in programming different kinds of apps.
                </p>
                <div className="
                  flex flex-wrap gap-4 text-sm mt-8 mb-8 font-semibold
                  *:bg-bg-secondary *:p-1 *:rounded-xl *:*:mx-2
                  lg:mb-0
                ">
                  <div>
                    <p className="text-green-400">C#</p>
                  </div>
                  <div>
                    <p className="text-slate-300">C / C++</p>
                  </div>
                  <div>
                    <p className="text-amber-500">Rust</p>
                  </div>

                  <div>
                    <p className="text-yellow-300">Javascript</p>
                  </div>
                  <div>
                    <p className="text-orange-500">HTML</p>
                  </div>
                  <div>
                    <p className="text-sky-300">CSS</p>
                  </div>

                  <div>
                    <p className="text-blue-300">Python</p>
                  </div>
                </div>

              </div>
              <div className="mt-4 lg:mt-0 md:mx-4">
                <h1 className="font-semibold text-lg mb-4">Game Engines</h1>
                <div className="flex flex-wrap gap-4">
                  <div className="flex flex-col">
                    <div className="flex gap-x-2 items-center">
                      <Image alt="Logo of the Unity Engine" width={31} src={UnityIcon}/>
                      <div className="text-nowrap">Unity</div>
                    </div>
                    <div className="text-xs ml-10">
                      2 years
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex gap-x-2 items-center">
                      <Image alt="Logo of the Unreal Engine" width={32} src={UnrealIcon}/>
                      <div className="relative right-[1px]">Unreal Engine</div>
                    </div>
                    <div className="text-xs ml-10">
                      2 years
                    </div>
                  </div>
                </div>
                {/*<div className="mx-8">
                  <h1 className="font-semibold text-lg mb-2">Tools</h1>
                  <div className="flex flex-wrap gap-x-8">
                    <div className="flex flex-col">
                      <div className="flex gap-x-2 items-center">
                        <img width="31px" src={getPath("icons/devicon_unity.svg")}></img>
                        <div className="text-nowrap">Unity</div>
                      </div>
                      <div className="text-xs ml-10">
                        2 years
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex gap-x-2 items-center">
                        <img width="32px" src={getPath("icons/mdi_unreal.svg")}></img>
                        <div className="relative right-[1px] text-nowrap">Unreal Engine</div>
                      </div>
                      <div className="text-xs ml-10">
                        2 years
                      </div>
                    </div>
                  </div>
                </div>*/}
              </div>
            </div>
          </div>
        </Section>
        <Section id="Projects" ref={projectsRef} title="Projects">
          <div className="gap-8 my-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <ProjectPanel
              title="Fledge"
              slug="fledge"
              timeframe={{
                started: new Date(2025, 1-1, 20),
                ended: undefined
              }}
              onMobile={onMobile}
              description="A fast-paced 2D platformer"
              image={FledgePreview}
              clip={"assets/fledge/Preview2.mp4"}
            />
            <ProjectPanel
              title="The Basin"
              slug="the-basin"
              timeframe={{
                started: new Date(2025, 11-1, 12),
                ended: new Date(2025, 12-1, 17)
              }}
              onMobile={onMobile}
              image={TheBasinPreview}
              description="Short game created as a part of the Level Design and Sound Design courses"
            />
            <ProjectPanel
              title="Spaceship"
              slug="space-ship"
              timeframe={{
                started: new Date(2024, 9-1, 4),
                ended: new Date(2025, 4-1, 23)
              }}
              onMobile={onMobile}
              image={SpaceshipPreview}
              description="Unfinished space physics simulation"
            />
          </div>
        </Section>
        <Section id="Contact" ref={contactRef} title="Contact">
          <div className="flex flex-col py-8 mb-96">
            <div className="flex items-center gap-2">
              <p>Email address</p>
              <div className="bg-bg-secondary rounded-xl w-fit">
                <p className="py-1 px-2 text-sm">btasa013@edu.xamk.fi</p>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </Page>
  );
}

interface SectionProps {
  id: string;
  title: string;
  ref?: React.RefObject<HTMLElement | null>;
  children?: React.ReactNode;
}

function Section({ id, title, ref, children }: SectionProps) {
  return (
    <section id={id} ref={ref} className="scroll-my-64 p-8 font-inter shadow-xs shadow-black">
      <h1 className="font-semibold text-2xl font-mplus mb-8">{title}</h1>
      {children}
    </section>
  )
}