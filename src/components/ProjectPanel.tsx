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
  hoverClip?: string;
  additionalBannerStyles?: string;
}

export default function ProjectPanel({
  title,
  slug,
  description,
  timeframe,
  onMobile,
  image,
  hoverClip,
  additionalBannerStyles
}: ProjectPanelProps) {

  const [isHovering, setIsHovering] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    const el = panelRef.current;

    if (onMobile) {
      function handleScroll() {
        if (el == undefined) return;
        const minScroll = el.offsetTop - el.scrollTop;
        const maxScroll = minScroll + el.scrollHeight;
        console.log(title, minScroll, maxScroll, window.scrollY);
        setIsHovering(window.scrollY >= minScroll && maxScroll >= window.scrollY);
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
              slug={slug}
              image={image}
              onMobile={onMobile}
              hoverClip={hoverClip}
              className={additionalBannerStyles}
            />
          </div>
          <div className="
            z-2 flex flex-col relative bg-bg-secondary duration-750 h-30 ease-in-out
            lg:motion-safe:rounded-[0_0_15px_15px] group-hover:rounded-none
            -translate-y-[100%] lg:motion-safe:-translate-y-0 group-hover:-translate-y-[100%]
          ">
            <div className="px-6 py-5 flex items-center justify-center">
              <hr className="
                flex-grow border-neutral-300 origin-left transition-all duration-500
                scale-x-100 lg:scale-x-0 lg:motion-safe:group-hover:scale-x-100
              "></hr>
              <p className="
                mx-[10%] font-semibold text-xl duration-500 will-change-transform
                scale-110 lg:motion-safe:scale-100 lg:group-hover:scale-110
              ">{title}</p>
              <hr className="
                flex-grow border-neutral-300 origin-left transition-all duration-500
                scale-x-100 lg:scale-x-0 lg:motion-safe:group-hover:scale-x-100
              "></hr>
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
  slug,
  hovering,
  image,
  onMobile,
  hoverClip,
  className
}: {
  slug: string,
  hovering: boolean,
  image: StaticImageData,
  onMobile: boolean,
  hoverClip?: string,
  className?: string
}) {

  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {

    const video = videoRef.current;
    if (video == undefined)
      return;

    let timeout: NodeJS.Timeout | undefined;
    const videoPlayback = () => {
      if (hovering) {
        if (timeout != undefined) {
          clearTimeout(timeout);
          timeout = undefined;
          video.play();
        }
        else if (video.currentTime == 0)
          video.play();
      } else {
        if (video.paused) return;
        video.pause();
        timeout = setTimeout(() => {
          video.currentTime = 0;
        }, 500);
      }
    }

    const interval = setInterval(videoPlayback, 150);
    return () => clearInterval(interval);

  }, [videoRef, hovering]);

  return hoverClip != undefined
    ? <div className="grid *:col-1 *:row-1">
        <video
          ref={videoRef}
          className={`
            relative top-5 scale-125 z-1 duration-1000 translate-y-[200%]
            motion-reduce:duration-0 group-hover:translate-y-0
            ${onMobile ? "translate-y-0" : ""}
            ${className ?? ""}
          `}
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
        >
          <source src={hoverClip} type="video/mp4"></source>
        </video>
        <div className="z-0 relative bottom-10 lg:motion-safe:bottom-0 group-hover:bottom-10 duration-750">
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
            bottom-10 lg:motion-safe:bottom-0 group-hover:bottom-10
            scale-110 lg:motion-safe:scale-100 lg:motion-safe:group-hover:scale-110
            ${className ?? ""}
          `}
        />
      </div>;
}