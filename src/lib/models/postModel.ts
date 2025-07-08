import { ContentBlock, IPost } from '@/types/post/iPost';
import { Schema, Document, model, models } from 'mongoose';

interface IPostDocument extends IPost, Document {};

const ContentBlockSchema = new Schema<ContentBlock>({
  type: { type: String, enum: ['image', 'video'], required: true },
  url: { type: String, required: true },
  layout: { type: String, enum: ['full', 'half'], default: 'full' },
  alt: { type: String }
});

const PostSchema = new Schema<IPostDocument>(
  {
    title: {
      bold: { type: String, required: true },
      regular: { type: String, required: false }
    },
    slug: { type: String, required: true, unique: true },
    heroImage: {
      url: { type: String, required: true },
      alt: { type: String, default: '' }
    },
    description: { type: String },
    optionalDescription: { type: String, default: '' },
    content: { type: [ContentBlockSchema], default: [] },
    credits: { type: String, required: true, default: '' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  {
    timestamps: true
  }
);

export default models.Post || model<IPost>('Post', PostSchema);