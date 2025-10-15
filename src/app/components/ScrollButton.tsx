interface ScrollButtonProps {
    title: string,
    selected: boolean;
    icon: string | null,
    dst: React.RefObject<HTMLElement | null>
}

export default function ScrollButton({ title, selected, icon, dst }: ScrollButtonProps) {
  return (
    <a
      href={`#${title}`}
      onClick={e => {
        e.preventDefault();
        dst?.current?.scrollIntoView({ behavior: "smooth" });
      }}
      className={`
        p-2 rounded-4xl duration-200
        hover:cursor-pointer hover:shadow-black hover:shadow-xs hover:brightness-125
        ${selected ? "bg-neutral-900" : ""}
      `}
    >
      <div className="flex items-center text-justify px-4">
          <img src={icon ?? "file.svg"} className="w-1/10 aspect-square"/>
          <p className="px-4 font-mplus uppercase text-sm text-nowrap">{title}</p>
      </div>
    </a>
  );
}
