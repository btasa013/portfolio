import { useState, useEffect } from "react";
import ScrollButton from "./ScrollButton";
import RoundButton from "./RoundButton";

interface Section {
    title: string;
    ref: React.RefObject<HTMLElement | null>;
}

interface SidebarProps {
    sections: Section[];
}

export default function Sidebar({ sections }: SidebarProps) {
  return (
    <aside className="font-inter min-w-32 max-w-96 h-full sticky top-0 bg-neutral-950 border-1 border-neutral-900 shadow-md shadow-black">
      <div className="flex flex-col h-screen justify-between">
        <div className="h-full grid grid-rows-[2fr_1fr_5fr] divide-y divide-neutral-800 *:p-4">
            <div className="flex items-center justify-center shadow-xs shadow-black">
                <img src="file.svg" className="w-32 border-1 aspect-square rounded-full overflow-hidden"/>
                <div className="p-4">
                    <h1 className="text-2xl leading-none font-bold">Daaaaa</h1>
                    <h2 className="text-xl leading-none">Saaaa</h2>
                </div>
            </div>
            <div className="flex justify-between items-center h-2/3 shadow-xs shadow-black">
              <div>
                <RoundButton link="" color="#212121af">
                  <p className="font-semibold">CV</p>
                </RoundButton>
              </div>
              <div className="flex justify-end *:mx-1">
                <RoundButton link="" color="#0a66c27f">
                  <img src="linkedin.svg" className="w-6 aspect-square opacity-75"></img>
                </RoundButton>
                <RoundButton link="" color="#3b59987f">
                  <img src="facebook.svg" className="w-6 aspect-square opacity-75"></img>
                </RoundButton>
              </div>
            </div>
            <Nav sections={sections}></Nav>
        </div>
        <footer className="h-1/10 bg-neutral-900 rounded-t-4xl"></footer>
      </div>
    </aside>
  );
}

function Nav({ sections }: SidebarProps) {

  const [active, setActive] = useState(sections[0].title);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 2;
      sections.forEach(section => {
        const el = section.ref.current;
        if (el) {
          const offsetTop = el.offsetTop;
          const offsetBottom = offsetTop + el.offsetHeight;
          if (scrollPos >= offsetTop && scrollPos < offsetBottom) {
            setActive(section.title);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="flex flex-col my-2 *:mb-2">
      {sections.map((section) => {
        const selected = active === section.title;
        return <ScrollButton selected={selected} key={section.title} title={section.title} icon={null} dst={section.ref}/>;
      })}
    </nav>
  ) 
}