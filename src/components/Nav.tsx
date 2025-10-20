import { useState, useEffect } from "react";
import React from "react";
import ScrollButton from "@/components/ScrollButton";
import { usePath } from "@/scripts/path";

export interface NavItem {
  title: string;
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

    if (window.location.pathname === usePath() && window.scrollY != 0) {
      handleScroll();
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [nav]);

  return (
    <nav className="flex flex-col my-2 *:mb-2">
      {
        nav?.map(item => {
          const Component = item.component ?? MainNavButton;
          return <Component
            key={item.title}
            selected={active == item.title}
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

interface MainNavButtonProps {
  title: string;
  icon?: string;
  selected?: boolean;
  ref?: React.RefObject<HTMLElement | null>;
}

export function MainNavButton({ title, icon, selected, ref }: MainNavButtonProps) {
  return (
    <ScrollButton selected={selected ?? false} id={title} ref={ref}>
      <img alt="" src={usePath(icon ?? "icons/file.svg")} className="w-1/10 aspect-square"/>
      <p className="px-4 font-mplus uppercase text-sm text-nowrap">{title}</p>
    </ScrollButton>
  );
}