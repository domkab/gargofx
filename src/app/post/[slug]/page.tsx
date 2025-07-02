import { getPostBySlug } from '@/lib/services/postService';

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return <div className="text-center py-10 text-muted-foreground">Post not found</div>;
  }

  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center">{post.title}</h1>
    </main>
  );
}