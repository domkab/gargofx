import { Schema, model, models } from 'mongoose';
import { FeaturedBlock, FeaturedLayoutRow } from '@/types/featuredLayout';

const HomePageBlockSchema = new Schema<FeaturedBlock>(
  {
    id: { type: String, required: true },
    postId: { type: String, required: true },
    layout: {
      type: String,
      layout: {
        type: String,
        enum: ['1/4', '1/2', 'full'],
        required: true
      },
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

const HomeLayoutRowSchema = new Schema<FeaturedLayoutRow>(
  {
    order: { type: Number, required: true },
    blocks: { type: [HomePageBlockSchema], default: [] }
  },
  { timestamps: true }
);

export default models.HomeLayoutRow ||
  model<HomeLayoutRow>('HomeLayoutRow', HomeLayoutRowSchema);