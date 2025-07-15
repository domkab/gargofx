import { Schema, model, models } from 'mongoose';
import { FeaturedBlock, FeaturedLayoutRow } from '@/types/featuredLayout';

const FeaturedBlockSchema = new Schema<FeaturedBlock>(
  {
    id: { type: String, required: true },
    layout: {
      type: String,
      enum: ['1/3', '1/2', '2/3', 'full'],
      required: true
    },
    image: {
      desktop: {
        url: { type: String, required: true },
        alt: { type: String, default: '' }
      },
      mobile: {
        url: { type: String },
        alt: { type: String, default: '' }
      }
    },
  },
  { _id: false }
);

const FeaturedLayoutRowSchema = new Schema<FeaturedLayoutRow>(
  {
    order: { type: Number, required: true },
    blocks: { type: [FeaturedBlockSchema], default: [] }
  },
  { timestamps: true }
);

export default models.FeaturedLayoutRow ||
  model<FeaturedLayoutRow>('FeaturedLayoutRow', FeaturedLayoutRowSchema);