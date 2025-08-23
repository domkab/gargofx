import { NextResponse } from 'next/server';
import { withAdminAuth } from '@/lib/auth/withAdminAuth';

export const POST = withAdminAuth(async () => {
  const {
    syncFromFirebase,
    syncUsedImagesToFirebaseFromLocal,
    cleanupUnusedImagesFromFirebaseAndFilestore,
  } = await import('@/lib/firebaseSync');
  const { connect } = await import('@/lib/mongodb/mongoose');

  await connect();

  try {
    await syncFromFirebase();
    await syncUsedImagesToFirebaseFromLocal();
    const { deletedCount } = await cleanupUnusedImagesFromFirebaseAndFilestore();

    return NextResponse.json({
      success: true,
      message: `Sync complete. 🔁 Cleanup removed ${deletedCount} files.`,
    });
  } catch (err) {
    console.error('🔥 Full Sync failed:', err);
    return NextResponse.json(
      { success: false, message: 'Full sync failed.', error: String(err) },
      { status: 500 }
    );
  }
});