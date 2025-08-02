// models/logoSliderModel.ts
import { Schema, model, models } from 'mongoose';

const LogoSchema = new Schema(
  {
    url: { type: String, required: true },
    alt: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default models.LogoSlider || model('LogoSlider', LogoSchema);