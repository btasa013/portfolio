interface ScrollButtonProps {
    selected: boolean;
    id?: string;
    ref?: React.RefObject<HTMLElement | null>,
    children?: React.ReactNode
}

export default function ScrollButton({ selected, id, ref, children }: ScrollButtonProps) {
  return (
    <a
      href={`/#${id}`}
      onClick={e => {
        if (ref != undefined) {
          e.preventDefault();
          ref.current?.scrollIntoView({ behavior: "smooth" })
        }
      }}
      className={`
        p-2 rounded-4xl duration-200 font-bold
        hover:cursor-pointer hover:shadow-black hover:shadow-xs hover:brightness-125
        ${selected ? "bg-neutral-800" : ""}
      `}
    >
      <div className="flex items-center text-justify px-4">
        {children}
          {/*<img src={icon ?? "icons/file.svg"} className="w-1/10 aspect-square"/>
          <p className="px-4 font-mplus uppercase text-sm text-nowrap">{title}</p> */}
      </div>
    </a>
  );
}
