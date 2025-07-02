import { getFeaturedPosts } from '@/lib/services/postService';
import Link from 'next/link';

export default async function FeaturedPost() {
  const featured = await getFeaturedPosts();

  if (!featured?.length) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Featured Posts</h2>
      
      <ul className="space-y-2">
        {featured.map(({ post }) => (
          <li key={post._id}>
            <Link
              href={`/post/${post.slug}`}
              className="text-lg text-teal-500 hover:underline"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}