"use client";

import React, { useRef, useEffect } from 'react';
import Page from '@/components/Page';
import ProjectPanel from '@/components/ProjectPanel';
import { DEFAULT_NAV } from '@/components/Nav';
import { getPath } from '@/scripts/path';

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
        if (diff > 0.05) {
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

  return (
    <Page navItems={nav}>
      <div className="flex flex-col divide-y divide-neutral-800 *:min-h-64">

        <div className="relative overflow-hidden bg-black">
          <div className="w-full h-[700px] flex items-center justify-center">
            <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              disablePictureInPicture
              ref={bgRef}
            >
              <source src={getPath("assets/ProjectShowcase_Blur.mp4")} type="video/mp4" />
            </video>

            <video
              className="relative z-10 max-h-full w-auto object-contain"
              autoPlay
              muted
              loop
              playsInline
              disablePictureInPicture
              ref={fgRef}
            >
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
            <div className="grid grid-cols-2 divide-x divide-neutral-800">
              <div className="flex flex-col">
                <p className="mr-4">
                  I have multiple years of experience in game development and using
                  different game engines to create games. I also have several years of
                  experience in programming different kinds of apps.
                </p>
                
                <div className="flex flex-wrap gap-4 text-sm mt-12 my-4">
                  <div className="p-1 bg-secondary-bg rounded-xl">
                    <p className="text-green-400 font-semibold mx-2">C#</p>
                  </div>
                  <div className="p-1 bg-secondary-bg rounded-xl">
                    <p className="text-slate-300 font-semibold mx-2">C / C++</p>
                  </div>
                  <div className="p-1 bg-secondary-bg rounded-xl">
                    <p className="text-amber-500 font-semibold mx-2">Rust</p>
                  </div>

                  <div className="p-1 bg-secondary-bg rounded-xl">
                    <p className="text-yellow-300 font-semibold mx-2">Javascript</p>
                  </div>
                  <div className="p-1 bg-secondary-bg rounded-xl">
                    <p className="text-orange-500 font-semibold mx-2">HTML</p>
                  </div>
                  <div className="p-1 bg-secondary-bg rounded-xl">
                    <p className="text-sky-300 font-semibold mx-2">CSS</p>
                  </div>

                  <div className="p-1 bg-secondary-bg rounded-xl">
                    <p className="text-blue-300 font-semibold mx-2">Python</p>
                  </div>
                </div>

              </div>
              <div className="flex flex-col gap-8">
                <div className="mx-8">
                  <h1 className="font-semibold text-lg mb-2">Game Engines</h1>
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
          <div className="flex flex-wrap gap-8 my-16">
            <ProjectPanel title="2D Platformer" slug="2d-platformer" description="A fast-paced platformer built in Unity." />
          </div>
        </Section>
        <Section id="Contact" ref={contactRef} title="Contact">
          <div className="flex flex-col py-8 mb-96">
            <div className="flex items-center gap-2">
              <p>Email address</p>
              <div className="bg-secondary-bg rounded-xl w-fit">
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