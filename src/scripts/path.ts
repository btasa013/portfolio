
import packageJson from '@/../package.json';

/**
 *
 * @param path Path that is appended at the end.
 * @returns The base path appended with the input path.
 */
export function getPath(path?: string): string {

  const isProd = process.env.NODE_ENV === 'production';
  const basePath = isProd ? `${packageJson.name}` : "";
  
  if (path == undefined)
    return basePath;

  const connect = startsWithAny(path, ["/", "#", "?", "&"]) ? '' : '/';
  return `/${basePath}${connect}${path}`;
}

function startsWithAny(content: string, strings: string[]): boolean {
  return strings.some(str => content.startsWith(str));
}