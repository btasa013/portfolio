"use client";

import Sidebar, { DEFAULT_SIDEBAR_ITEMS } from '@/components/Sidebar';

interface PageProps {
  sidebarItems?: React.ReactNode[];
  children?: React.ReactNode;
}

export default function Page({ sidebarItems, children }: PageProps) {
  return (
    <div className="flex">
      <Sidebar items={sidebarItems ?? DEFAULT_SIDEBAR_ITEMS} />
      <main className="w-full h-full">{children}</main>
    </div>
  );
}