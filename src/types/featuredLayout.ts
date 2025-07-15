// export type LayoutSize = '1/3' | '1/2' | '2/3' | 'full';

// export interface FeaturedBlock {
//   id: string;
//   postId: string;
//   layout: LayoutSize;
//   image?: {
//     desktop: { url: string; alt?: string };
//     mobile?: { url: string; alt?: string };
//   };
// }

// export interface FeaturedLayoutRowBase {
//   order: number;
//   blocks: FeaturedBlock[];
// }

// export interface FeaturedLayoutRow extends FeaturedLayoutRowBase {
//   _id?: string;
// }

export type LayoutSize = '1/3' | '1/2' | '2/3' | 'full';

export interface FeaturedBlock {
  id: string;
  postId: string;
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