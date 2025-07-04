
import Post from '@/lib/models/postModel';
import { connect } from '@/lib/mongodb/mongoose';

export const POST = async (req: Request) => {
  await connect();

  const data = await req.json();

  try {
    const startIndex = parseInt(data.startIndex) || 0;
    const limit = parseInt(data.limit) || 9;
    const sortDirection = data.order === 'asc' ? 1 : -1;

    const posts = await Post.find({
      ...(data.isAdmin ? {} : { userId: data.userId }),
      ...(data.category ? { category: data.category } : {}),
      ...(data.slug && { slug: data.slug }),
      ...(data.postId && { _id: data.postId }),
      ...(data.searchTerm && {
        $or: [
          { title: { $regex: data.searchTerm, $options: 'i' } },
          { content: { $regex: data.searchTerm, $options: 'i' } }
        ]
      })
    })
      .lean()
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit)

    const totalPost = await Post.countDocuments();
    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthsPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo }
    });

    return new Response(JSON.stringify({ posts, totalPost, lastMonthsPosts }), {
      status: 200
    })

  } catch (error) {
    console.error('Error fetching posts:', error);

    return new Response('Error retrieving post', {
      status: 500
    })
  }
}