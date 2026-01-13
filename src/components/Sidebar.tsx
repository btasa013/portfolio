import RoundButton from "@/components/RoundButton";
import { getPath } from '@/scripts/path';
import Nav, { DEFAULT_NAV } from "@/components/Nav";
import Image from 'next/image';

import LinkedInIcon from '@/assets/icons/linkedin.svg';
import FacebookIcon from '@/assets/icons/facebook.svg';

import UserIcon from '@/assets/icons/user.svg';

export const PERSONAL_ICON = <div key="personal-icon" className="flex items-center justify-center p-2 py-8">
    <Image alt="" width={128} height={128} src={UserIcon} className="hidden md:block aspect-square rounded-full" />
    <div className="px-4">
        <h1 className="text-2xl leading-none font-light">Daniel</h1>
        <h2 className="text-xl leading-none font-extralight">Sarin</h2>
    </div>
</div>;

export const NETWORKING_BUTTONS = <div key="networking-buttons" className="flex justify-between items-center px-4 py-1 gap-2">
  <div className="flex gap-2">
    <RoundButton link="https://www.linkedin.com/in/daniel-sarin-7aa7132b6/">
      <Image alt="" width={28} height={28} src={LinkedInIcon} className="aspect-square opacity-75 rounded-md" />
    </RoundButton>
    <RoundButton link="https://www.facebook.com/daniel.sarin.58/">
      <Image alt="" width={28} height={28} src={FacebookIcon} className="aspect-square opacity-75 rounded-md" />
    </RoundButton>
  </div>
  <div className="flex justify-end text-xs w-4 h-4 md:w-auto md:h-auto md:text-sm">
    <RoundButton link={getPath("cv")} color="#a0a0a020">
      <p className="font-semibold p-2">CV</p>
    </RoundButton>
  </div>
</div>;

export const DEFAULT_SIDEBAR_ITEMS = [PERSONAL_ICON, NETWORKING_BUTTONS, <Nav key="nav" nav={DEFAULT_NAV} />];

interface SidebarProps {
  items: React.ReactNode[];
}

export default function Sidebar({ items }: SidebarProps) {
  return (
    <aside className="font-inter h-screen w-[20vw] lg:w-min-fit max-w-[250px] sticky top-0 bg-bg-secondary border-1 border-neutral-800 shadow-md shadow-black">
      <div className="flex flex-col justify-between">
        <div className="flex flex-col divide-y divide-neutral-800">
          {items}
        </div>
      </div>
    </aside>
  );
}