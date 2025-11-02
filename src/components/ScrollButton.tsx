import { getPath } from '@/scripts/path';

interface ScrollButtonProps {
    selected: boolean;
    id?: string;
    ref?: React.RefObject<HTMLElement | null>,
    children?: React.ReactNode
}

export default function ScrollButton({ selected, id, ref, children }: ScrollButtonProps) {
  return (
    <a
      href={getPath(`#${id}`)}
      onClick={e => {
        if (ref != undefined) {
          e.preventDefault();
          ref.current?.scrollIntoView({ behavior: "smooth", inline: 'center' })
        }
      }}
      className={`
        p-2 rounded-4xl duration-200 font-bold
        hover:cursor-pointer hover:shadow-black hover:shadow-xs hover:brightness-125
        ${selected ? "bg-highlight-primary" : ""}
      `}
    >
      <div className="opacity-100 flex items-center text-justify px-4">
        {children}
      </div>
    </a>
  );
}
