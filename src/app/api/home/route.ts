import { connect } from '@/lib/mongodb/mongoose';
import { withAdminAuth } from '@/lib/auth/withAdminAuth';
import homePageLayoutModel from '@/lib/models/homePageLayoutModel';
import { HomePageLayoutRow } from '@/types/HomePageLayout';

export const GET = async () => {
  await connect();

  try {
    const rows = await homePageLayoutModel.find().sort({ order: 1 }).lean();
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    console.error('[HOMEPAGE_LAYOUT_GET_ERROR]', error);
    return new Response('Error fetching layout', { status: 500 });
  }
};

export const POST = withAdminAuth(async (_user, body: { rows: HomePageLayoutRow[] }) => {
  await connect();

  try {
    await homePageLayoutModel.deleteMany();
    await homePageLayoutModel.insertMany(body.rows);

    return new Response('Layout saved', { status: 200 });
  } catch (error) {
    console.error('[HOMEPAGE_LAYOUT_SAVE_ERROR]', error);

    return new Response('Error saving layout', { status: 500 });
  }
});

export const DELETE = withAdminAuth(async () => {
  await connect();

  try {
    await homePageLayoutModel.deleteMany();

    return new Response('HOMEPAGE layout deleted', { status: 200 });
  } catch (error) {
    console.error('[HOMEPAGE_LAYOUT_DELETE_ERROR]', error);

    return new Response('Error deleting HOMEPAGE layout', { status: 500 });
  }
});