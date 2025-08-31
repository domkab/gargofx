'use client';

import { uploadPostImage, useAppDispatch } from '@/redux';
import { ContentBlock } from '@/types/post/iPost';
import { TextInput, Select, Button, FileInput, Label } from 'flowbite-react';
import Image from 'next/image';
import { DeleteInlineImageButton } from '../Dashboard/DeleteImage/DeleteInlineImageButton';

type Props = {
  block: ContentBlock;
  index: number;
  onChange: (block: ContentBlock) => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
};

function convertYouTubeUrlToEmbed(url: string) {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
}

export default function ContentBlockItem({
  block,
  index,
  onChange,
  onRemove,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast
}: Props) {
  const dispatch = useAppDispatch();

  const handleChange = (field: keyof ContentBlock, value: string) => {
    onChange({ ...block, [field]: value });
  };

  const handleInlineImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const result = await dispatch(uploadPostImage({ file, target: 'inline' }));

    if (uploadPostImage.fulfilled.match(result)) {
      onChange({ ...block, url: result.payload.url });
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-md border-gray-300 bg-white dark:bg-gray-800 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-300">
        Block #{index + 1}
      </h3>

      <div>
        <label className="block mb-1 text-sm text-gray-600 dark:text-gray-300">Type</label>
        <Select
          value={block.type}
          onChange={(e) => handleChange('type', e.target.value as 'image' | 'video')}
        >
          <option value="image">Image</option>
          <option value="video">Video</option>
        </Select>
      </div>

      {block.type === 'image' && (
        <>
          <div>
            <Label className="block mb-1 text-sm text-gray-600 dark:text-gray-300">Upload Image</Label>
            <FileInput accept="image/*" onChange={handleInlineImageUpload} />
          </div>

          {block.url && (
            <div className="relative w-full h-[300px] rounded overflow-hidden">
              <Image
                src={block.url}
                alt={block.alt || 'Uploaded image'}
                unoptimized
                fill
                className="object-contain"
              />
              <DeleteInlineImageButton
                url={block.url}
                label="inline image"
                onSuccess={() => onChange({ ...block, url: '' })}
              />
            </div>
          )}

          <div>
            <label className="block mb-1 text-sm text-gray-600 dark:text-gray-300">Alt Text</label>
            <TextInput
              placeholder="Alt text (for accessibility/SEO)"
              value={block.alt || ''}
              onChange={(e) => handleChange('alt', e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-600 dark:text-gray-300">Layout</label>
            <Select
              value={block.layout}
              onChange={(e) => handleChange('layout', e.target.value as 'full' | 'half')}
            >
              <option value="full">Full Width</option>
              <option value="half">Half Width</option>
            </Select>
          </div>
        </>
      )}

      {block.type === 'video' && (
        <>
          <div>
            <label className="block mb-1 text-sm text-gray-600 dark:text-gray-300">Video URL</label>
            <TextInput
              placeholder="Paste YouTube URL"
              value={block.url || ''}
              onChange={(e) => handleChange('url', convertYouTubeUrlToEmbed(e.target.value))}
            />
          </div>

          {block.url && (
            <div className="relative w-full h-[300px] rounded overflow-hidden">
              <iframe
                src={block.url}
                title={block.alt || 'Embedded video'}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          <div>
            <label className="block mb-1 text-sm text-gray-600 dark:text-gray-300">Layout</label>
            <Select
              value={block.layout}
              onChange={(e) => handleChange('layout', e.target.value as 'full' | 'half')}
            >
              <option value="full">Full Width</option>
              <option value="half">Half Width</option>
            </Select>
          </div>
        </>
      )}

      <div className="flex gap-2 pt-2">
        <Button onClick={onRemove} color="failure">Remove</Button>
        {!isFirst && <Button onClick={onMoveUp} color="gray">↑</Button>}
        {!isLast && <Button onClick={onMoveDown} color="gray">↓</Button>}
      </div>
    </div>
  );
}