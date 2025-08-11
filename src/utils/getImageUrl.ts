export function getImageUrl(relativePath?: string): string {
  if (!relativePath) return '/placeholder.jpg';

  if (/^https?:\/\//i.test(relativePath)) return relativePath;

  const clean = relativePath.startsWith('/') ? relativePath : `/${relativePath}`;

  if (clean.startsWith('/uploads/')) return clean;

  return clean;
}