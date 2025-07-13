import Post from '@/lib/models/postModel';
import { connect } from '@/lib/mongodb/mongoose';

interface PostQuery {
  category?: string;
  slug?: string;
  _id?: string;
  $or?: Array<{
    title?: { $regex: string; $options: string };
    content?: { $regex: string; $options: string };
  }>;
};

export const POST = async (req: Request) => {
  await connect();

  const data = await req.json();

  try {
    const startIndex = parseInt(data.startIndex) || 0;
    const limit = parseInt(data.limit) || 9;
    const sortDirection = data.order === 'asc' ? 1 : -1;

    const query: PostQuery = {
      ...(data.category ? { category: data.category } : {}),
      ...(data.slug ? { slug: data.slug } : {}),
      ...(data.postId ? { _id: data.postId } : {}),
      ...(data.searchTerm
        ? {
            $or: [
              { title: { $regex: data.searchTerm, $options: 'i' } },
              { content: { $regex: data.searchTerm, $options: 'i' } },
            ],
          }
        : {}),
    };

    const posts = await Post.find(query)
      .lean()
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPost = await Post.countDocuments();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const lastMonthsPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    return new Response(JSON.stringify({ posts, totalPost, lastMonthsPosts }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return new Response('Error retrieving posts', { status: 500 });
  }
};