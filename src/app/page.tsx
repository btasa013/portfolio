"use client";

import React, { useRef } from 'react';
import Page from '@/components/Page';
import ProjectPanel from '@/components/ProjectPanel';
import { DEFAULT_NAV } from '@/components/Nav';

export default function Home() {

  const aboutMeRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  const nav = DEFAULT_NAV;

  nav[0].ref = aboutMeRef;
  nav[1].ref = skillsRef;
  nav[2].ref = projectsRef;
  nav[3].ref = contactRef;

  return (
    <Page navItems={nav}>
      <div className="w-full h-64 aspect-video">
        <iframe></iframe>
      </div>
      <div className="flex flex-col divide-y divide-neutral-800 *:min-h-64">
        <Section ref={aboutMeRef} title="About Me">
          <p>
            Hello, my name is Daniel Sarin and I am a game developer based in Finland.
          </p>
          <p>
            I am a game technology student at <abbr title="South-Eastern Finland University of Applied Sciences">XAMK</abbr>.
          </p>
        </Section>
        <Section ref={skillsRef} title="Skills">

        </Section>
        <Section ref={projectsRef} title="Projects">
          <div className="flex flex-wrap gap-8 my-16">
            <ProjectPanel title="2D Platformer" slug="2d-platformer" description="A fast-paced platformer built in Unity." />
          </div>
        </Section>
        <Section ref={contactRef} title="Contact">
          <div className="flex flex-col py-8 mb-64">
            <p>Email address: btasa013@edu.xamk.fi</p>
          </div>
        </Section>
      </div>
    </Page>
  );
}

interface SectionProps {
  title: string;
  ref?: React.RefObject<HTMLElement | null>;
  children?: React.ReactNode;
}

function Section({ ref, title, children }: SectionProps) {
  return (
    <section id={title} ref={ref} className="scroll-my-64 p-8 shadow-xs shadow-black">
      <h1 className="font-semibold text-2xl font-mplus">{title}</h1>
      <div className="font-inter mt-4">
        {children}
      </div>
    </section>
  )
}