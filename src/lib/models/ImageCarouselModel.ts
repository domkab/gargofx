import { Schema, models, model } from 'mongoose';

const ImageCarouselSchema = new Schema({
  heroImageUrl: { type: String, required: false },
  carouselImages: { type: [String], default: [] },
  carouselOptions: {
    loop: { type: Boolean, default: false },
    transitionTime: { type: Number, default: 3000 },
  },
  updatedAt: { type: Date, default: Date.now },
});

export const ImageCarousel = models.ImageCarousel || model('ImageCarousel', ImageCarouselSchema, 'carousel-home');