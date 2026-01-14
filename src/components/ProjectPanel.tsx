import { getPath } from "@/scripts/path";
import Image, { StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";

interface ProjectPanelProps {
  title: string;
  slug: string;
  description: string;
  timeframe: { started: Date, ended?: Date };
  onMobile: boolean;
  image: StaticImageData;
  clip?: string;
  additionalBannerStyles?: string;
}

export default function ProjectPanel({
  title,
  slug,
  description,
  timeframe,
  onMobile,
  image,
  clip,
  additionalBannerStyles
}: ProjectPanelProps) {

  const [isHovering, setIsHovering] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    const el = panelRef.current;

    if (onMobile) {
      function handleScroll() {
        if (el == undefined) return;

        const scroll = window.scrollY + window.innerHeight;

        const minScroll = el.offsetTop + el.scrollHeight - 100;
        const maxScroll = minScroll + el.scrollHeight;
        setIsHovering(scroll >= minScroll && maxScroll >= scroll);
      }
      
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }

    const handleMouseOver = () => setIsHovering(true);
    const handleMouseExit = () => setIsHovering(false);
    el?.addEventListener("mouseenter", handleMouseOver);
    el?.addEventListener("mouseleave", handleMouseExit);
    return () => {
      el?.removeEventListener("mouseenter", handleMouseOver);
      el?.removeEventListener("mouseleave", handleMouseExit);
    }
  }, [onMobile, panelRef]);

  return (
    <div ref={panelRef} className="group overflow-hidden">
      <div className="h-full flex flex-col bg-bg-secondary rounded-2xl border-1 border-neutral-800">
          <div className="bg-neutral-950 rounded-[15px_15px_0_0] overflow-hidden">
            <ProjectPanelPreview
              hovering={isHovering}
              image={image}
              clip={clip}
              className={additionalBannerStyles}
            />
          </div>
          <div className={`
            z-2 flex flex-col relative bg-bg-secondary duration-750 h-30 ease-in-out
            ${isHovering ? "-translate-y-[100%] rounded-none" : "rounded-[0_0_15px_15px]"}
            motion-reduce:-translate-y-[100%]
            motion-reduce:rounded-none
          `}>
            <div className="px-5 py-5 flex items-center justify-center">
              <hr className={`
                flex-grow border-neutral-300 origin-left transition-all duration-500
                ${isHovering ? "scale-x-100" : "scale-x-0"}
                motion-reduce:scale-x-100
              `}></hr>
              <p className={`
                mx-[10%] font-semibold text-xl duration-500 will-change-transform
                ${isHovering ? "scale-110" : "scale-100"}
                motion-reduce:scale-100
              `}>{title}</p>
              <hr className={`
                flex-grow border-neutral-300 origin-right transition-all duration-500
                ${isHovering ? "scale-x-100" : "scale-x-0"}
                motion-reduce:scale-x-100
              `}></hr>
            </div>
            <div className="px-4 font-light text-xs">
              <div className="duration-500 will-change-transform text-center">{description}</div>
            </div>
            <div className="absolute bottom-0 top-25">
              <div className="mx-4 my-2">
                <div className="flex font-light py-4 gap-8">
                  <div className="flex flex-col">
                    <div className="text-xs relative top-1">Started</div>
                    <div>{timeframe.started.toLocaleDateString()}</div>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-xs relative top-1">{timeframe.ended ? "Ended" : "Status"}</div>
                    <div>{timeframe.ended?.toLocaleDateString() ?? "Ongoing"}</div>
                  </div>
                </div>
                <div className="my-2">
                  <a
                    href={getPath(`projects/${slug}`)}
                    className="px-3 py-1 rounded-xl bg-highlight-primary hover:brightness-125 text-sm font-bold font-mplus uppercase"
                  >
                    Go to project
                  </a>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

function ProjectPanelPreview({
  hovering,
  image,
  clip,
  className
}: {
  hovering: boolean,
  image: StaticImageData,
  clip?: string,
  className?: string
}) {
  return clip != undefined
    ? <div className="grid *:col-1 *:row-1">
        <video
          className={`
            h-full relative bottom-15 scale-145 z-1 duration-1000
            motion-reduce:duration-0
            ${hovering ? "translate-y-0" : "translate-y-[200%]"}
            ${className ?? ""}
          `}
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          preload="metadata"
        >
          <source src={clip} type="video/mp4"></source>
        </video>
        <div className={`
          z-0 relative duration-750
          ${hovering ? "bottom-10" : "bottom-0"}
          motion-reduce:bottom-10
        `}>
          <Image
            alt=""
            src={image}
            className={`
              h-full object-cover aspect-square duration-200
              ${className ?? ""}
            `}
          />
        </div>
      </div>
    : <div>
        <Image
          alt=""
          src={image}
          className={`
            h-full object-cover aspect-square duration-700 will-change-transform relative
            ${hovering ? "bottom-10 scale-110" : "bottom-0 scale-100"}
            motion-reduce:scale-100;
            motion-reduce:bottom-10;
            ${className ?? ""}
          `}
        />
      </div>;
}