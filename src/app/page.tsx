"use client";

import React, { useRef } from 'react';
import Sidebar from './components/Sidebar';

export default function Home() {

  const sections: Map<string, React.RefObject<HTMLElement | null>> = new Map([
    ["About Me", useRef(null)],
    ["Skills", useRef(null)],
    ["Projects", useRef(null)],
    ["Contact", useRef(null)],
  ]);

  const list = sections.entries().map(entry => ({ title: entry[0], ref: entry[1] })).toArray();

  return (
    <main className="flex">
      <Sidebar sections = {list}></Sidebar>
      <div className="grid grid-rows-4 w-full divide-y divide-neutral-800 *:shadow-xs *:shadow-black">
        <section className="w-full aspect-video">
          
        </section>
        <Section ref={sections.get("About Me")} title="About Me">
          <h2 className="justify-self-center">Hello!</h2>
        </Section>
        <Section ref={sections.get("Skills")} title="Skills">

        </Section>
        <Section ref={sections.get("Projects")} title="Projects">

        </Section>
        <Section ref={sections.get("Contact")} title="Contact">

        </Section>
      </div>
    </main>
  );
}

interface SectionProps {
  title: string;
  ref?: React.RefObject<any>;
  children?: React.ReactNode;
}

function Section({ ref, title, children }: SectionProps) {
  return (
    <section id={title} ref={ref} className="scroll-m-16">
      <h1 className="p-8 font-semibold text-2xl font-mplus">{title}</h1>
      <div className="font-inter">{children}</div>
    </section>
  )
}