import { Schema, Document, model, models } from 'mongoose';

interface ContentBlock {
  type: 'image' | 'video';
  url: string;
  layout: 'full' | 'half';
  alt?: string;
}

export interface IPost extends Document {
  title: {
    bold: string;
    regular?: string;
  };
  shortDescription: string;
  heroImage: string;
  description?: string;
  content: ContentBlock[];
  credits: string;
  createdAt: Date;
  updatedAt: Date;
}

const ContentBlockSchema = new Schema<ContentBlock>({
  type: { type: String, enum: ['image', 'video'], required: true },
  url: { type: String, required: true },
  layout: { type: String, enum: ['full', 'half'], default: 'full' },
  alt: { type: String }
});

const PostSchema = new Schema<IPost>(
  {
    title: {
      bold: { type: String, required: true },
      regular: { type: String, required: false }
    },
    shortDescription: { type: String, required: true },
    heroImage: { type: String, required: true },
    description: { type: String },
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