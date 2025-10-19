import { usePathname } from 'next/navigation';

export function getPath(path?: string): string {

  const isProd = process.env.PRODUCTION === 'production';
  const basePath = isProd ? "/new-portfolio/" : "/";

  if (path) {
    const pathname = usePathname() || '/';
    return pathname === '/' ? `${path}` : `${basePath}${path}`;
  }

  return basePath;
}