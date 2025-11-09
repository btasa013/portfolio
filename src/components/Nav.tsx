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
      <p className="font-mplus uppercase text-xs md:text-sm">{title}</p>
    </ScrollButton>
  );
}

interface SmallNavButtonProps {
  title: string;
  icon?: string;
  href: string;
}

export function SmallNavButton({ title, icon, href }: SmallNavButtonProps) {
  return (
    <div className="flex items-center h-[50px]">
      <div className="p-2 rounded-4xl duration-200 font-bold hover:cursor-pointer hover:shadow-black hover:shadow-xs hover:brightness-125">
        <a href={getPath(href)}>
          <div className="flex gap-2 h-full opacity-100 items-center text-justify">
            {icon ? <img alt="" src={icon ?? getPath("icons/back.svg")} className="w-[14px] aspect-square"/> : null}
            <p className="font-mplus uppercase text-xs text-nowrap">{title}</p>
          </div>
        </a>
      </div>
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
        <img alt="" src={getPath(icon ?? "icons/file.svg")} className="hidden md:block w-4 aspect-square"/>
        <p className="font-mplus uppercase text-sm text-nowrap">{title}</p>
      </div>
    </ScrollButton>
  );
}