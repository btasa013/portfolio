import { usePathname } from 'next/navigation';

export function usePath(path?: string): string {

  const isProd = process.env.PRODUCTION === 'production';
  const basePath = isProd ? "/new-portfolio/" : "/";
  
  return `${usePathname() === '/' ? basePath : ''}${path ?? ''}`;
}