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
  heroImage: string;
  description?: string;
  optionalDescription?: string;
  content: ContentBlock[];
  credits: string;
  createdAt: Date;
  updatedAt: Date;
}