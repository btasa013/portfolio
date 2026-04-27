"use client";

import { useState, useRef, useEffect } from "react";
import React from "react";
import ScrollButton from "@/components/ScrollButton";
import { getPath } from "@/scripts/path";
import { StaticImageData } from "next/image";
import Image from "next/image";

import DescriptionIcon from '@/assets/icons/description.svg';
import ProfileIcon from '@/assets/icons/profile.svg';
import CatalogIcon from '@/assets/icons/catalog.svg';
import MailIcon from '@/assets/icons/mail.svg';
import FileIcon from '@/assets/icons/file.svg';
import BackIcon from '@/assets/icons/back.svg';

export interface NavItem {
  title: string;
  id?: string;
  href?: string;
  icon?: StaticImageData;
  ref?: React.RefObject<HTMLElement | null>,
  component?: React.ElementType;
}

export interface NavProps {
  nav: NavItem[];
}

export default function Nav({ nav }: NavProps) {

  const [active, setActive] = useState("");
  const smoothScrollRef = useRef(0);

  useEffect(() => {
    smoothScrollRef.current = window.scrollY;

    const entries = nav.filter(entry => entry.ref?.current);
    const offsets = entries.map(item => {
      const el = item!.ref!.current!;
      const top = el.offsetTop;
      const bottom = top + el.offsetHeight;

      return [top, bottom];
    });

    const interval = setInterval(() => {

      const scroll = window.scrollY;
      const current = smoothScrollRef.current;

      if (Math.abs(scroll - current) < 0.5) return;
      if (offsets.length === 0) return;

      const acceleration = Math.abs(current > scroll ? current / scroll : scroll / current);

      const speed = Number.isFinite(acceleration) ? 1 / acceleration : 1;
      console.log(acceleration, speed, current, scroll, current-scroll);
      const scrollPos =
        (1.0 - speed) * current + speed * scroll;

      smoothScrollRef.current = scrollPos;

      const viewportAnchor = scrollPos + window.innerHeight / 2;

      let minIndex = 0;
      let maxIndex = offsets.length - 1;

      while (maxIndex - minIndex > 1) {
        const index = Math.ceil((minIndex + maxIndex) / 2);
        const [top, bottom] = offsets[index];

        if (viewportAnchor >= top) minIndex = index;
        else if (viewportAnchor <= bottom) maxIndex = index;
        else {
          minIndex = index;
          maxIndex = index;
        }
      }

      let activeIndex = minIndex;

      const [minTop, minBottom] = offsets[minIndex];
      const [maxTop, maxBottom] = offsets[maxIndex];

      if (viewportAnchor >= minTop && viewportAnchor <= minBottom) {
        activeIndex = minIndex;
      } else if (viewportAnchor >= maxTop && viewportAnchor <= maxBottom) {
        activeIndex = maxIndex;
      } else {
        const minDist = Math.abs(minTop - viewportAnchor);
        const maxDist = Math.abs(maxTop - viewportAnchor);
        activeIndex = minDist < maxDist ? minIndex : maxIndex;
      }

      const el = entries[activeIndex]?.ref?.current;
      if (!el) return;

      setActive(el.id);
    }, 10);

  return () => clearInterval(interval);
}, [nav]);

  return (
    <nav className="flex flex-col gap-2 mt-4 m-0.5 md:p-4">
      {
        nav?.map(item => {
          const Component = item.component ?? MainNavButton;
          return <Component
            key={item.title}
            id={item.id}
            selected={active == (item.id ?? item.title)}
            href={item.href}
            title={item.title}
            icon={item.icon}
            ref={item.ref}
          />;
        })
      }
    </nav>
  );
}

export const DEFAULT_NAV: NavItem[] = [
  { title: "About Me", icon: DescriptionIcon, component: MainNavButton },
  { title: "Skills", icon: ProfileIcon, component: MainNavButton },
  { title: "Projects", icon: CatalogIcon, component: MainNavButton },
  { title: "Contact", icon: MailIcon, component: MainNavButton }
];

interface NavButtonProps {
  title: string;
  id?: string;
  selected: boolean;
  ref?: React.RefObject<HTMLElement | null>;
}

export function NavButton({ title, id, selected, ref }: NavButtonProps) {
  return (
    <ScrollButton selected={selected} href={`#${id ?? title}`} ref={ref}>
      <p className="font-mplus uppercase text-xs md:text-sm">{title}</p>
    </ScrollButton>
  );
}

interface SmallNavButtonProps {
  title: string;
  icon?: StaticImageData;
  href: string;
}

export function SmallNavButton({ title, icon, href }: SmallNavButtonProps) {
  return (
    <div className="flex items-center h-[50px]">
      <a href={getPath(href)} className="p-2 rounded-4xl duration-200 font-bold hover:cursor-pointer hover:shadow-black hover:shadow-xs hover:brightness-125">
        <div className="flex gap-2 h-full opacity-100 items-center text-justify">
          {icon ? <Image alt="" src={icon ?? BackIcon} className="w-[14px] aspect-square"/> : null}
          <p className="font-mplus uppercase text-xs text-nowrap">{title}</p>
        </div>
      </a>
    </div>
  );
}

interface MainNavButtonProps {
  title: string;
  id?: string;
  icon?: string;
  selected: boolean;
  ref?: React.RefObject<HTMLElement | null>;
}

export function MainNavButton({ title, id, icon, selected, ref }: MainNavButtonProps) {
  return (
    <ScrollButton selected={selected} href={`#${id ?? title}`} ref={ref}>
      <div className="flex ml-2 gap-2 justify-between">
        <Image alt="" src={icon ?? FileIcon} className="hidden md:block w-4 aspect-square"/>
        <p className="font-mplus uppercase text-sm text-nowrap">{title}</p>
      </div>
    </ScrollButton>
  );
}