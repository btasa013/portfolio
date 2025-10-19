import RoundButton from "@/components/RoundButton";
import Nav, { NavItem } from "@/components/Nav";
import { getPath } from '@/scripts/path';

interface SidebarProps {
  nav: NavItem[];
}

export default function Sidebar({ nav }: SidebarProps) {
  return (
    <aside className="font-inter min-w-fit xl:w-1/5 h-full sticky top-0 bg-secondary-bg border-1 border-neutral-800 shadow-md shadow-black">
      <div className="flex flex-col h-screen justify-between">
        <div className="h-full flex flex-col divide-y divide-neutral-800">
            <div className="flex items-center justify-center p-4">
                <img alt="" width="128" height="128" src={getPath("icons/user.svg")} className="p-4 aspect-square rounded-full" />
                <div className="pr-4">
                    <h1 className="text-2xl leading-none font-light">Daniel</h1>
                    <h2 className="text-xl leading-none font-extralight">Sarin</h2>
                </div>
            </div>
            <div className="flex justify-between items-center p-2">
              <div className="flex gap-2">
                <RoundButton link="https://www.linkedin.com/in/daniel-sarin-7aa7132b6/">
                  <img alt="" width="28" height="28" src={getPath("icons/linkedin.svg")} className="aspect-square opacity-75 rounded-md" />
                </RoundButton>
                <RoundButton link="https://www.facebook.com/daniel.sarin.58/">
                  <img alt="" width="28" height="28" src={getPath("icons/facebook.svg")} className="aspect-square opacity-75 rounded-md" />
                </RoundButton>
              </div>
              <div className="flex justify-end">
                <RoundButton link={getPath("cv")} color="#212121af">
                  <p className="font-semibold p-2">CV</p>
                </RoundButton>
              </div>
            </div>
            <div className="p-4">
              <Nav nav={nav} />
            </div>
        </div>
        <footer className="h-1/2"></footer>
      </div>
    </aside>
  );
}