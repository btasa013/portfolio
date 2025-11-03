"use client";

import { useState, useEffect } from "react";
import React from "react";
import ScrollButton from "@/components/ScrollButton";
import { getPath } from "@/scripts/path";

export interface NavItem {
  title: string;
  id?: string;
  href?: string;
  icon?: string;
  ref?: React.RefObject<HTMLElement | null>,
  component?: React.ElementType;
}

export interface NavProps {
  nav: NavItem[];
}

export default function Nav({ nav }: NavProps) {

  const [active, setActive] = useState("");

  useEffect(() => {

    const handleScroll = () => {

      const scrollPos = window.scrollY + window.innerHeight / 2;

      let minEntry = null;
      let minValue = Number.MAX_SAFE_INTEGER;

      for (const entry of nav) {

        const el = entry.ref?.current;
        if (!el) {
          continue;
        }

        const offsetTop = el.offsetTop;
        const offsetBottom = offsetTop + el.offsetHeight * 0.75;

        const distTop = Math.abs(scrollPos - offsetTop);
        const distBottom = Math.abs(scrollPos - offsetBottom);

        const dist = Math.min(distTop, distBottom);

        if (minValue > dist) {
          minValue = dist;
          minEntry = entry;
        }
      }

      if (minEntry) {
        console.log(minEntry, minEntry.ref?.current?.id);
        setActive(minEntry.ref?.current?.id ?? "");
      }
    };

    if (window.location.pathname === getPath() && window.scrollY != 0) {
      handleScroll();
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [nav]);

  return (
    <nav className="flex flex-col my-2 *:mb-2 p-4">
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
  { title: "About Me", icon: "icons/description.svg", component: MainNavButton },
  { title: "Skills", icon: "icons/profile.svg", component: MainNavButton },
  { title: "Projects", icon: "icons/catalog.svg", component: MainNavButton },
  { title: "Contact", icon: "icons/mail.svg", component: MainNavButton }
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
      <p className="mr-8 font-mplus uppercase text-sm text-nowrap">{title}</p>
    </ScrollButton>
  );
}

interface NavBackButtonProps {
  title: string;
  href?: string;
}

export function NavBackButton({ title, href }: NavBackButtonProps) {
  return (
    <div>
      <div className="rounded-4xl duration-200 font-bold hover:cursor-pointer hover:shadow-black hover:shadow-xs hover:brightness-125">
        <a href={getPath(href)}>
          <div className="p-2 opacity-100 flex items-center text-justify px-4">
            { /* <img alt="" src={getPath("icons/file.svg")} className="w-[24px] aspect-square"/> */}
            <p className="px-2 font-mplus uppercase text-sm text-nowrap">{title}</p>
          </div>
        </a>
      </div>
      <p className="mb-4"></p>
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
      <img alt="" src={getPath(icon ?? "icons/file.svg")} className="w-1/10 aspect-square"/>
      <p className="px-4 font-mplus uppercase text-sm text-nowrap">{title}</p>
    </ScrollButton>
  );
}