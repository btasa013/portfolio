
import packageJson from '@/../package.json';

/**
 *
 * @param path Path that is appended at the end.
 * @returns The base path appended with the input path.
 */
export function getPath(path?: string): string {

  const isProd = process.env.NODE_ENV === 'production';
  const basePath = isProd ? `/${packageJson.name}/` : "/";
  
  return `${basePath}${path ?? ''}`;
}