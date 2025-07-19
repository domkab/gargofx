import { connect } from '@/lib/mongodb/mongoose';
import { withAdminAuth } from '@/lib/auth/withAdminAuth';
import featuredLayoutModel from '@/lib/models/featuredLayoutModel';
import { FeaturedLayoutRow } from '@/types/featuredLayout';

export const GET = async () => {
  await connect();

  try {
    const rows = await featuredLayoutModel.find().sort({ order: 1 }).lean();
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    console.error('[FEATURED_LAYOUT_GET_ERROR]', error);
    return new Response('Error fetching layout', { status: 500 });
  }
};

export const POST = withAdminAuth(async (_user, body: { rows: FeaturedLayoutRow[] }) => {
  await connect();

  try {
    await featuredLayoutModel.deleteMany();
    await featuredLayoutModel.insertMany(body.rows);

    return new Response('Layout saved', { status: 200 });
  } catch (error) {
    console.error('[FEATURED_LAYOUT_SAVE_ERROR]', error);

    return new Response('Error saving layout', { status: 500 });
  }
});

export const DELETE = withAdminAuth(async () => {
  await connect();

  try {
    await featuredLayoutModel.deleteMany();

    return new Response('Featured layout deleted', { status: 200 });
  } catch (error) {
    console.error('[FEATURED_LAYOUT_DELETE_ERROR]', error);

    return new Response('Error deleting featured layout', { status: 500 });
  }
});