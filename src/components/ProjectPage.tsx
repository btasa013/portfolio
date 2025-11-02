"use client";

import Page from '@/components/Page';
import { getPath } from '@/scripts/path';
import React, { useRef } from 'react';
import DetailBlock from './DetailBlock';
import Nav, { NavButton, NavItem } from './Nav';

export interface ProjectPageProps {
  title: string;
  slug: string;
  team: TeamMember[];
  description: React.ReactNode;
  sections: ProjectSectionProps[];
}

export interface TeamMember {
  name: string;
  roles: string;
}

export interface ProjectSectionProps {
  title: string;
  navButton?: { title: string };
  content: ProjectSubsectionProps[] | React.ReactNode;
}

export interface ProjectSubsectionProps {
  title: string;
  content: React.ReactNode;
}

export default function Project(props: ProjectPageProps) {

  const { title, slug, team, description, sections } = props;

  const sectionRefs: React.RefObject<HTMLElement | null>[] = [];
  for (let i = 0; i < sections.length; i++) {
    sectionRefs.push(useRef(null));
  }

  const teamMembers = <div key="team" className="px-4 py-8">
    <h1 className="text-xl">Team</h1>
    <div className="flex flex-col gap-4 mt-4">
      {[...team.entries()].map(([i, member]) => {
        return <div key={i} className="flex flex-col">
          <h1>{member.name}</h1>
          <p className="text-xs italic relative right-0.5">{member.roles}</p>
        </div>
      })}
    </div>
  </div>;

  const navItems = [...sections.entries()]
    .filter(([_, s]) => s.navButton !== undefined)
    .map(([i, s]) => {
      return {
        title: s.navButton!.title,
        id: s.title,
        ref: sectionRefs[i],
        component: NavButton
      };
    });

  const sidebarItems = [teamMembers, <Nav key="nav" nav={navItems} />];

  return (
    <Page sidebarItems={sidebarItems}>
      <div className="flex flex-col divide-y divide-neutral-800 *:min-h-64">

        {/* Project banner */}
        <div
          className={`
            h-[350px] relative bg-black overflow-hidden pixelated

            before:bg-[image:var(--bg-image)] before:w-full before:h-full before:bg-contain before:bg-center
            before:absolute before:bg-repeat before:blur-xl before:brightness-33

            after:bg-[image:var(--bg-image)] after:w-full after:h-full after:bg-contain after:bg-center
            after:absolute after:bg-no-repeat after:z-1
          `}
          style={{"--bg-image": `url(${getPath(`assets/${slug}/banner.png`)})`} as React.CSSProperties}
        ></div>

        {/* Project title and description */}
        <section className="p-12 font-inter shadow-xs shadow-black">
          <h1 className="mb-4 font-semibold text-2xl font-mplus">{title}</h1>
          <div className="whitespace-pre-line w-2/3">{description}</div>
        </section>

        {/* Sections */}
        {[...sections.entries()].map(([i, s]) =>
          <Section
            ref={sectionRefs[i]}
            key={s.title}
            id={s.title}
            title={s.title}
          >
            {
              Array.isArray(s.content)
                ? s.content.map(s =>
                  <DetailBlock
                    key={s.title}
                    title={s.title}
                  >
                    {s.content}
                  </DetailBlock>
                )
                : s.content
            }
          </Section>
        )}
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
      <h1 className="mx-4 pb-8 font-semibold text-2xl font-mplus">{title}</h1>
      <div className="flex flex-col gap-4 px-4">{children}</div>
    </section>
  );
}