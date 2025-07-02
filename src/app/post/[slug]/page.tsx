import NotFound from '@/app/not-found';
import { getPostBySlug } from '@/lib/services/postService';

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return <NotFound />;
  };

  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center">{post.title}</h1>
      <p>this is a sample post</p>
    </main>
  );
};