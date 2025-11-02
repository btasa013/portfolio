interface ContentPictureProps {
    path: string;
    description?: string;
    additionalImageStyles?: string;
}

export default function ContentPicture({ path, description, additionalImageStyles }: ContentPictureProps) {
  return (
    <div className="max-w-[25vw]">
        <img alt={description} className={`rounded-xl ${additionalImageStyles}`} src={path} />
        <p className="text-sm my-1">{description}</p>
    </div>
  );
}