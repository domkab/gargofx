export interface ContentBlock {
  type: 'image' | 'video';
  url: string;
  layout: 'full' | 'half';
  alt?: string;
}

export interface IPost {
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