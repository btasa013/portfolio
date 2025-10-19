interface ProjectPanelProps {
  title: string;
  slug: string;
  description: string;
}

export default function ProjectPanel({ title, slug, description }: ProjectPanelProps) {
  return (
    <a
      href={`projects/${slug}`}
      className="group w-1/4 overflow-hidden"
    >
      <div className="flex flex-col bg-secondary-bg rounded-2xl border-1 border-neutral-800">
          <div className="flex aspect-[3/2] bg-neutral-950 rounded-2xl overflow-hidden">
            <ProjectPanelBanner slug={slug} />
          </div>
          <div className="p-4 text-center">
            <p className="font-mplus uppercase text-xl font-bold duration-200 group-hover:scale-110">{title}</p>
            <p className="pt-4 font-mplus font-light text-xs">{description}</p>
          </div>
      </div>
    </a>
  );
}

function ProjectPanelBanner({ slug }: { slug: string }) {
  return (
    <img
      alt=""
      src={`assets/${slug}/banner.png`}
      className="
        object-cover rounded-2xl brightness-75 duration-500
        group-hover:brightness-100 group-hover:scale-125
      "
    />
  );
}