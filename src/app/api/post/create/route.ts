import { withAdminAuth } from '@/lib/auth/withAdminAuth';
import Post from '@/lib/models/postModel';
import { connect } from '@/lib/mongodb/mongoose';
import { PostCreateInput } from '@/types/post/iPost';
import { generateSlug, getSlugSource } from '@/utils/generateSlug';

export const POST = withAdminAuth<PostCreateInput>(async (user, body) => {
  await connect();

  try {
    const slug = generateSlug(getSlugSource(body.title));

    const newPost = await Post.create({
      userId: user.publicMetadata.userMongoId,
      title: body.title,
      slug,
      heroImage: body.heroImage,
      description: body.description,
      optionalDescription: body.optionalDescription,
      content: body.content,
      credits: body?.credits,
    });

    return new Response(JSON.stringify(newPost), {
      status: 200,
    });
  } catch (err) {
    console.error('Error creating post:', err);
    return new Response('Error creating post', { status: 500 });
  }
});