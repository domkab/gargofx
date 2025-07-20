import { HomePageBlock, HomePageLayoutRow } from '@/types/HomePageLayout';
import { Schema, model, models } from 'mongoose';

const HomePageBlockSchema = new Schema<HomePageBlock>(
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

const HomePageLayoutRowSchema = new Schema<HomePageLayoutRow>(
  {
    order: { type: Number, required: true },
    blocks: { type: [HomePageBlockSchema], default: [] }
  },
  { timestamps: true }
);

export default models.HomePageLayoutRow ||
  model<HomePageLayoutRow>('HomePageLayoutRow', HomePageLayoutRowSchema);