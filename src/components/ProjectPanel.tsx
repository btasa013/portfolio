import { getPath } from "@/scripts/path";

interface ProjectPanelProps {
  title: string;
  slug: string;
  description: string;
  additionalBannerStyles?: string;
}

export default function ProjectPanel({ title, slug, description, additionalBannerStyles }: ProjectPanelProps) {
  return (
    <a
      href={getPath(`projects/${slug}`)}
      className="group overflow-hidden"
    >
      <div className="h-full flex flex-col bg-bg-secondary rounded-2xl border-1 border-neutral-800">
          <div className="flex aspect-[3/2] bg-neutral-950 rounded-2xl overflow-hidden">
            <ProjectPanelBanner slug={slug} className={additionalBannerStyles}/>
          </div>
          <div className="p-6 flex items-center justify-center">
            <hr className="flex-grow border-neutral-300 origin-left scale-x-0 transition-all duration-500 group-hover:scale-x-100"></hr>
            <p className="mx-8 font-semibold text-xl duration-500 will-change-transform group-hover:scale-110">{title}</p>
            <hr className="flex-grow border-neutral-300 origin-right scale-x-0 transition-all duration-500 group-hover:scale-x-100"></hr>
          </div>
          <div className="pb-4 flex items-center justify-center">
            <p className="font-light text-xs text-center">{description}</p>
          </div>
      </div>
    </a>
  );
}

function ProjectPanelBanner({ slug, className }: { slug: string, className?: string }) {
  return (
    <img
      alt=""
      src={getPath(`assets/${slug}/preview.png`)}
      className={`
        object-cover rounded-2xl duration-500 will-change-transform
        group-hover:scale-110
        ${className ?? ""}
      `}
    />
  );
}