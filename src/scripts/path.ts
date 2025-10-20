/**
 *
 * @param path Path that is appended at the end.
 * @returns The base path appended with the input path.
 */
export function getPath(path?: string): string {

  const isProd = process.env.NODE_ENV === 'production';
  const basePath = isProd ? "/portfolio/" : "/";
  
  return `${basePath}${path ?? ''}`;
}