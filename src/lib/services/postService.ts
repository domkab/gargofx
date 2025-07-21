import { connect } from '@/lib/mongodb/mongoose';
import FeaturedLayoutRowModel from '../models/featuredLayoutModel';
import Post from '../models/postModel';
import { FeaturedBlock, FeaturedLayoutRow } from '@/types/featuredLayout';
import { IPost } from '@/types/post/iPost';
import { HomePageBlock, HomePageLayoutRow } from '@/types/HomePageLayout';
import homePageLayoutModel from '../models/homePageLayoutModel';

export async function getPostBySlug(slug: string): Promise<IPost> {
  await connect();
  const post = await Post.findOne({ slug }).lean<IPost>();

  return post as IPost;
};

export async function getFeaturedLayout(): Promise<FeaturedLayoutRow[]> {
  await connect();

  const layout = await FeaturedLayoutRowModel.find().sort({ order: 1 }).lean();

  const postIds = layout.flatMap((row) =>
    row.blocks.map((block: FeaturedBlock) => block.postId)
  );
  const posts = await Post.find({ _id: { $in: postIds } }).lean<IPost[]>();
  const postMap = new Map(posts.map(p => [p._id.toString(), p]));

  return layout.map(row => ({
    order: row.order,
    blocks: row.blocks.map((block: FeaturedBlock) => ({
      post: postMap.get(block.postId) || null,
      layout: block.layout,
      image: block.image,
    }))
  }));
};

export async function getHomePageLayout(): Promise<HomePageLayoutRow[]> {
  await connect();

  const layout = await homePageLayoutModel.find().sort({ order: 1 }).lean();

  const postIds = layout.flatMap((row) =>
    row.blocks.map((block: HomePageBlock) => block.postId)
  );
  const posts = await Post.find({ _id: { $in: postIds } }).lean<IPost[]>();
  const postMap = new Map(posts.map(p => [p._id.toString(), p]));

  return layout.map(row => ({
    order: row.order,
    blocks: row.blocks.map((block: HomePageBlock) => ({
      post: postMap.get(block.postId) || null,
      layout: block.layout,
      image: block.image,
    }))
  }));
};