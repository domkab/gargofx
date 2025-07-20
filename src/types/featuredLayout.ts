export type LayoutSize =
  | '1/4'
  | '1/2'
  | 'full';

export interface FeaturedBlock {
  id: string;
  postId: string;
  post?: {
    _id: string;
    slug: string;
    title: {
      bold: string;
      regular?: string;
    };
    heroImage?: {
      url: string;
      alt?: string;
    };
  };
  layout: LayoutSize;
  image?: {
    desktop: { url: string; alt?: string };
    mobile?: { url: string; alt?: string };
  };
}

export interface FeaturedLayoutRow {
  order: number;
  blocks: FeaturedBlock[];
  _id?: string;
}

export interface FeaturedLayoutPayload {
  rows: FeaturedLayoutRow[];
  userMongoId: string;
}