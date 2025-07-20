export type LayoutSize =
  | '1/4'
  | '1/2'
  | 'full';

export interface HomePageBlock {
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

export interface HomePageLayoutRow {
  order: number;
  blocks: HomePageBlock[];
  _id?: string;
}

export interface HomePageLayoutPayload {
  rows: HomePageLayoutRow[];
  userMongoId: string;
}