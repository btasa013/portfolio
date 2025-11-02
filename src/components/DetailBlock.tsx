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

  const handleToggle = (e: React.SyntheticEvent<HTMLDetailsElement>) => {
    e.preventDefault();
    const open = !e.currentTarget.open;
    window?.localStorage?.setItem(title, open.toString());
    setIsOpen(open);
  };

  return (
    <details id={title} open={isOpen} className="w-fit rounded-xl px-4 relative bg-bg-secondary" onClick={handleToggle}>
      <summary className="transition-all my-4 duration-200 w-fit cursor-pointer font-bold hover:text-lg">
        {title}
      </summary>
      <div className="xl:max-w-[66vw] w-fit text-pretty">
        {children}
      </div>
    </details>
  );
}