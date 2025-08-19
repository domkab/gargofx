import { withAdminAuth } from '@/lib/auth/withAdminAuth';
import { ImageCarousel } from '@/lib/models/ImageCarouselModel';
import { connect } from '@/lib/mongodb/mongoose';

interface ImageCarouselInput {
  heroImageUrl: string;
  carouselOptions: {
    loop: boolean;
    transitionTime: number;
  };
};

export const PATCH = withAdminAuth<ImageCarouselInput>(async (user, body) => {
  await connect();

  try {
    const updatedSettings = await ImageCarousel.findOneAndUpdate(
      {
        heroImageUrl: body.heroImageUrl,
        carouselOptions: {
          loop: body.carouselOptions.loop,
          transitionTime: body.carouselOptions.transitionTime,
        },
      },
      { new: true, upsert: true }
    ).lean();

    return new Response(JSON.stringify(updatedSettings), { status: 200 });
  } catch (error) {
    console.error('[CAROUSEL_SETTINGS_UPDATE_ERROR]', error);
    return new Response('Error saving carousel settings', { status: 500 });
  }
});