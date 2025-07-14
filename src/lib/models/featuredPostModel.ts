import { Schema, Document, model, models } from 'mongoose';

type LayoutSize = '1/3' | '1/2' | '2/3' | 'full';

interface FeaturedBlock {
  id: string;
  postId: string;
  layout: LayoutSize;
  image?: {
    url: string;
    alt?: string;
  };
  // image?: {
  //   desktop: { url: string; alt?: string };
  //   mobile?: { url: string; alt?: string };
  // };
}

export interface IFeaturedLayoutRow extends Document {
  layoutSet: string;
  order: number;
  blocks: FeaturedBlock[];
  createdAt: Date;
  updatedAt: Date;
}

const FeaturedBlockSchema = new Schema<FeaturedBlock>(
  {
    id: { type: String, required: true },
    postId: { type: String, required: true },
    layout: {
      type: String,
      enum: ['1/3', '1/2', '2/3', 'full'],
      required: true
    },
    image: {
      url: { type: String },
      alt: { type: String, default: '' }
    }
  },
  { _id: false }
);

const FeaturedLayoutRowSchema = new Schema<IFeaturedLayoutRow>(
  {
    layoutSet: { type: String, required: true, default: 'homepage' },
    order: { type: Number, required: true },
    blocks: { type: [FeaturedBlockSchema], default: [] }
  },
  {
    timestamps: true
  }
);

export default models.FeaturedLayoutRow ||
  model<IFeaturedLayoutRow>('FeaturedLayoutRow', FeaturedLayoutRowSchema);