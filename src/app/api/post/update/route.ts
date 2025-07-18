import { withAdminAuth } from '@/lib/auth/withAdminAuth';
import Post from '@/lib/models/postModel';
import { connect } from '@/lib/mongodb/mongoose';
import { PostUpdateInput } from '@/types/post/iPost';

export const PUT = withAdminAuth<PostUpdateInput>(async (user, body) => {
  await connect();

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      body.postId,
      {
        $set: {
          title: body.title,
          description: body.description,
          optionalDescription: body.optionalDescription || '',
          heroImage: body.heroImage,
          content: body.content,
          credits: body.credits,
        },
      },
      { new: true }
    );

    return new Response(JSON.stringify(updatedPost), { status: 200 });
  } catch (error) {
    console.error('Error updating post:', error);
    return new Response('Error updating post', { status: 500 });
  }
});