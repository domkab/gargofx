export interface ContentBlock {
  id: string;
  type: 'image' | 'video';
  url: string;
  layout: 'full' | 'half';
  alt?: string;
}

export interface IPost {
  _id: string;
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
  credits: string;
  createdAt: Date;
  updatedAt: Date;
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
  credits: string;
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
  credits: string;
}