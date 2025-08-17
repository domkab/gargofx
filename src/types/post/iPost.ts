export interface ContentBlock {
  id: string;
  type: 'image' | 'video';
  url: string;
  layout: 'full' | 'half';
  alt?: string;
}


export interface IPostBase {
  title: { bold: string; regular?: string };
  slug: string;
  heroImage: { url: string; alt?: string };
  description?: string;
  optionalDescription?: string;
  content: ContentBlock[];
  credits?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPost extends IPostBase {
  _id: string;
}

export type PostCreateInput = {
  title: {
    bold: string;
    regular?: string;
  };
  slug: string;
  heroImage: {
    url: string;
    alt?: string;
  };
  description?: string;
  optionalDescription?: string;
  content: ContentBlock[];
  credits?: string;
  userId: string;
};

export interface PostUpdateInput {
  postId: string;
  title: {
    bold: string;
    regular?: string;
  };
  description?: string;
  optionalDescription?: string;
  heroImage: {
    url: string;
    alt?: string;
  };
  content: ContentBlock[];
  credits?: string;
}

export interface FeaturedPostType {
  _id?: string;
  post: IPost;
  overrideSummary?: string;
  overrideImage?: string;
}