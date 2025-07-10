import NotFound from '@/app/not-found';
import { getPostBySlug } from '@/lib/services/postService';
import { IPost } from '@/types/post/iPost';

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post: IPost | null = await getPostBySlug(slug);

  if (!post) {
    return <NotFound />;
  };

  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center">{post.title.bold}</h1>
      <p>{post.description}</p>
    </main>
  );
};