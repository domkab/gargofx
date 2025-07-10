'use client';

import { ContentBlock } from '@/types/post/iPost';
import { TextInput, Select, Button } from 'flowbite-react';

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
  const handleChange = (field: keyof ContentBlock, value: string) => {
    onChange({ ...block, [field]: value });
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

      <div>
        <label className="block mb-1 text-sm text-gray-600 dark:text-gray-300">Media URL</label>
        <TextInput
          placeholder="Paste image or video URL"
          value={block.url}
          onChange={(e) => handleChange('url', e.target.value)}
        />
      </div>

      {block.type === 'image' && (
        <>
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

      <div className="flex gap-2 pt-2">
        <Button onClick={onRemove} color="failure">Remove</Button>
        {!isFirst && <Button onClick={onMoveUp} color="gray">↑</Button>}
        {!isLast && <Button onClick={onMoveDown} color="gray">↓</Button>}
      </div>
    </div>
  );
}