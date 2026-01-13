import { StaticImageData } from 'next/image';
import Image from 'next/image';

interface ContentPictureProps {
    path: StaticImageData | string;
    description: string;
    additionalImageStyles?: string;
}

export default function ContentPicture({ path, description, additionalImageStyles }: ContentPictureProps) {
  return (
    <div className="max-w-[25vw]">
        <Image alt={description} className={`rounded-xl ${additionalImageStyles}`} src={path} />
        <p className="text-sm my-1">{description}</p>
    </div>
  );
}