import { withAdminAuth } from '@/lib/auth/withAdminAuth';
import { cleanupUnusedImagesFromFirebaseAndFilestore } from '@/lib/firebaseSync';
import { connect } from '@/lib/mongodb/mongoose';
export const dynamic = 'force-dynamic';

export const POST = withAdminAuth(async () => {
  await connect();

  try {
    const result = await cleanupUnusedImagesFromFirebaseAndFilestore();
    return new Response(`Deleted ${result.deletedCount} unused images.`, { status: 200 });
  } catch (error) {
    console.error('[CLEANUP_FAILED]', error);
    return new Response('Failed to clean up unused images.', { status: 500 });
  }
});