'use client';

import { FileInput, Label } from 'flowbite-react';
import { uploadFeaturedImage } from '@/firebase/uploadFeaturedImage';
import { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';

interface Props {
  label: string;
  slug: string;
  type: 'desktop' | 'mobile';
  currentImageUrl?: string;
  onUpload: (url: string) => void;
  setToast: Dispatch<SetStateAction<{ type: 'success' | 'error'; message: string } | null>>;
}

export default function ReusableImageUploader({
  label,
  slug,
  type,
  currentImageUrl,
  onUpload,
  setToast
}: Props) {
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const url = await uploadFeaturedImage(file, slug || 'default-slug');
      onUpload(url);
      setToast({ type: 'success', message: `${label} uploaded successfully!` });
    } catch {
      setToast({ type: 'error', message: `Failed to upload ${label.toLowerCase()}.` });
    }
  };

  return (
    <div className="mb-4 space-y-2">
      <Label value={label} />
      <FileInput onChange={handleChange} />

      {currentImageUrl && (
        <div className="w-full space-y-2 mb-4">
          <Label value={`Preview: ${type[0].toUpperCase() + type.slice(1)}`} />
          <div className="w-full rounded overflow-hidden">
            <Image
              src={currentImageUrl}
              alt={`${type} preview`}
              width={800}
              height={type === 'mobile' ? 320 : 450}
              className="object-cover w-full h-auto rounded"
            />
          </div>
        </div>
      )}
    </div>
  );
}