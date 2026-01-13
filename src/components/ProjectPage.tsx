import Page from '@/components/Page';
import React, { useRef } from 'react';
import DetailBlock from './DetailBlock';
import Nav, { SmallNavButton, NavButton } from '@/components/Nav';
import { StaticImageData } from 'next/image';

import BackIcon from '@/assets/icons/back.svg';

export interface ProjectPageProps {
  title: string;
  slug: string;
  team: TeamMember[];
  isMainPage: boolean;
  banner: StaticImageData | string;
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
  ref?: React.RefObject<HTMLElement | null>;
  content: ProjectSubsectionProps[] | React.ReactNode;
}

export interface ProjectSubsectionProps {
  title: string;
  content: React.ReactNode;
}

export default function Project(props: ProjectPageProps) {

  const { title, slug, team, description, banner, sections, isMainPage } = props;

  const teamMembers = <div key="team" className="px-4 py-8">
    <h1 className="text-xl">Team</h1>
    <div className="flex flex-col gap-4 mt-4">
      {[...team.entries()].map(([i, member]) => {
        return <div key={i} className="flex flex-col">
          <h1>{member.name}</h1>
          <p className="text-xs italic relative mt-1 md:mt-0 right-0.5">{member.roles}</p>
        </div>
      })}
    </div>
  </div>;

  const navItems = sections
    .filter(s => s.navButton !== undefined)
    .map(s => {
      return {
        title: s.navButton!.title,
        id: s.title,
        ref: s.ref,
        component: NavButton
      };
    });

  navItems.reverse();

  const descriptionRef = useRef(null);
  navItems.push({
    title: "Description",
    id: "description",
    ref: descriptionRef,
    component: NavButton
  });

  navItems.reverse();

  const backButton = <div className="hidden md:block *:justify-center">
    <SmallNavButton title="Back" icon={BackIcon} href={isMainPage ? '#Projects' : `projects/${slug}#Reports`} />
  </div>;

  const quickLinks = <div key="back" className={`flex justify-center py-2 divide-x-1 divide-neutral-800 *:w-1/2 *:justify-center ${isMainPage ? "hidden md:flex" : ""}`}>
    { backButton }
    { isMainPage ? <div></div> : <SmallNavButton title="Projects" href={'#Projects'} /> }
  </div>;

  const sidebarItems = [teamMembers, quickLinks, <Nav key="nav" nav={navItems} />];

  return (
    <Page sidebarItems={sidebarItems}>
      <div className="flex flex-col divide-y divide-neutral-800 *:min-h-64">

        {/* Project banner */}
        <div
          className={`
            h-[350px] relative bg-black overflow-hidden

            before:bg-[image:var(--bg-image)] before:w-full before:h-full before:bg-contain before:bg-center
            before:absolute before:bg-repeat before:blur-xl before:scale-125 before:brightness-25

            after:bg-[image:var(--bg-image)] after:w-full after:h-full after:bg-contain after:bg-center
            after:absolute after:bg-no-repeat after:z-1
          `}
          style={{"--bg-image": `url(${typeof banner === 'string' ? banner : banner.src})`} as React.CSSProperties}
        ></div>

        {/* Project title and description */}
        <section ref={descriptionRef} id="description" className="p-12 font-inter shadow-xs shadow-black">
          <h1 className="mb-4 font-semibold text-2xl font-mplus">{title}</h1>
          <div className="whitespace-pre-line md:w-2/3">{description}</div>
        </section>

        {/* Sections */}
        {[...sections.entries()].map(([i, s]) =>
          <Section
            ref={s.ref}
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