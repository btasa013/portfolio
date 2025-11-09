"use client";

import { useEffect, useState } from "react";

interface DetailBlockProps {
    title: string;
    open?: boolean;
    children: React.ReactNode;
}

export default function DetailBlock({ title, open, children }: DetailBlockProps) {

  const [isOpen, setIsOpen] = useState(open ?? true);

  useEffect(() => {
    const saved = window?.localStorage?.getItem(title);
    if (saved) {
      setIsOpen(saved === "true");
    }
  }, [title]);

  const handleToggle = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    const open = e.currentTarget.parentElement?.getAttribute("open") !== "";
    window?.localStorage?.setItem(title, open.toString());
    setIsOpen(open);
  };

  return (
    <details id={title} open={isOpen} className="rounded-xl px-4 relative bg-bg-secondary">
      <summary onClick={handleToggle} className="transition-all my-4 duration-200 w-fit cursor-pointer font-bold hover:text-lg">
        {title}
      </summary>
      <div>
        {children}
      </div>
    </details>
  );
}