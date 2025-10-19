"use client";

import Sidebar from '@/components/Sidebar';
import { DEFAULT_NAV, NavItem } from '@/components/Nav';

interface PageProps {
  navItems?: NavItem[];
  children?: React.ReactNode;
}

export default function Page({ navItems, children }: PageProps) {
  return (
    <div className="flex">
      <Sidebar nav = {navItems ?? DEFAULT_NAV}></Sidebar>
      <main>{children}</main>
    </div>
  );
}