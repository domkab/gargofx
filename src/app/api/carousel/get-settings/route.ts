import { ImageCarousel } from '@/lib/models/ImageCarouselModel';
import { connect } from '@/lib/mongodb/mongoose';

export const GET = async () => {
  await connect();

  try {
    const settings = await ImageCarousel.findOne().lean();

    if (!settings) {
      return new Response(JSON.stringify(
        { error: 'Settings not found' }), { status: 404 }
      );
    }

    return new Response(JSON.stringify(settings), { status: 200 });
  } catch (error) {
    console.error('[CAROUSEL_SETTINGS_GET_ERROR]', error);

    return new Response('Error fetching carousel settings', { status: 500 });
  }
}