import { useState, useEffect } from "react";
import React from "react";
import ScrollButton from "@/components/ScrollButton";
import { getPath } from "@/scripts/path";

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
      nav?.forEach(entry => {
        const el = entry.ref?.current;
        if (el) {
          const offsetTop = el.offsetTop;
          const offsetBottom = offsetTop + el.offsetHeight;
          if (scrollPos >= offsetTop && scrollPos < offsetBottom) {
            setActive(el.id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <ScrollButton selected={selected || false} id={title} ref={ref}>
      <img alt="" src={getPath(icon ?? "icons/file.svg")} className="w-1/10 aspect-square"/>
      <p className="px-4 font-mplus uppercase text-sm text-nowrap">{title}</p>
    </ScrollButton>
  );
}