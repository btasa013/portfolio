interface RoundButtonProps {
    link: string;
    color?: string;
    children: React.ReactNode
}

export default function RoundButton({ link, color, children }: RoundButtonProps) {
  return (
    <a
      href={link}
      className={`
        w-full aspect-square p-2 rounded-full duration-200
        hover:cursor-pointer hover:shadow-black hover:shadow-xs hover:brightness-125
        flex justify-center items-center text-center
      `}
      style={{ backgroundColor: color ?? "transparent"}}
    >
      {children}
    </a>
  );
}
