// export function getImageUrl(relativePath?: string): string {
//   if (!relativePath) return '/placeholder.jpg';

//   const base =
//     process.env.NODE_ENV === 'production'
//       ? process.env.NEXT_PUBLIC_URL
//       : 'http://localhost:3000';

//   return `${base}${relativePath}`;
// }

export function getImageUrl(relativePath?: string): string {
  if (!relativePath) return '/placeholder.jpg';

  let cleanPath = relativePath.startsWith('/')
    ? relativePath
    : '/' + relativePath;

  if (!cleanPath.startsWith('/uploads')) {
    cleanPath = '/uploads' + cleanPath;
  }

  const base =
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_URL?.replace(/\/$/, '')
      : 'http://localhost:3000';

  return `${base}${cleanPath}`;
}