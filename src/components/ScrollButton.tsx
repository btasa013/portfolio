import { getPath } from '@/scripts/path';

interface ScrollButtonProps {
    selected: boolean;
    href?: string;
    ref?: React.RefObject<HTMLElement | null>,
    children?: React.ReactNode
}

export default function ScrollButton({ selected, href, ref, children }: ScrollButtonProps) {
  return (
    <a
      href={getPath(href)}
      onClick={e => {
        if (ref != undefined) {
          e.preventDefault();
          ref.current?.scrollIntoView({ behavior: "smooth", inline: 'center' })
        }
      }}
      className={`
        py-2 md:px-4 rounded-4xl duration-200 font-bold
        hover:cursor-pointer hover:shadow-black hover:shadow-xs hover:brightness-125
        ${selected ? "bg-highlight-primary" : ""}
      `}
    >
      <div className="opacity-100 text-center md:flex md:text-justify">
        {children}
      </div>
    </a>
  );
}
