'use client';

import { FeaturedBlock, LayoutSize } from '@/types/featuredLayout';
import {
  Button,
  // FileInput,
  Label,
  Select
} from 'flowbite-react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image';
import clsx from 'clsx';
import { RootState, useAppDispatch, useAppSelector } from '@/redux';
import {
  addBlockToRow,
  addRow,
  removeBlock,
  updateBlock
} from '@/redux/slices/featuredPostSlice';

const layoutOptions: LayoutSize[] = ['1/3', '1/2', '2/3', 'full'];

export default function FeaturedLayoutEditorPage() {
  const dispatch = useAppDispatch();
  const layoutRows = useAppSelector((state: RootState) => state.featuredPost.rows);

  const [availablePosts] = useState<{ _id: string; title: string }[]>([
    { _id: '1', title: 'Mock Post A' },
    { _id: '2', title: 'Mock Post B' },
    { _id: '3', title: 'Mock Post C' },
  ]);

  const handleAddBlockToRow = (rowIndex: number) => {
    const block: FeaturedBlock = {
      id: uuidv4(),
      postId: '',
      layout: '1/3',
    };

    dispatch(addBlockToRow({ rowIndex, block }));
  };

  // const handleImageUpload = async (file: File, rowIndex: number, blockIndex: number) => {
  //   // Replace with your actual upload logic
  //   const fakeUrl = URL.createObjectURL(file);
  //   updateBlock(rowIndex, blockIndex, {
  //     image: { url: fakeUrl, alt: 'Uploaded image' }
  //   });
  // };

  return (
    <main className="w-full max-w-[1440px] mx-auto p-6 space-y-10">
      <h1 className="text-2xl font-bold">🎯 Featured Layout Editor</h1>

      {layoutRows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="space-y-4 border p-4 rounded-md shadow-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
        >
          <div className="flex justify-between items-center">
            <h2 className="font-semibold">Row #{rowIndex + 1}</h2>
            <Button size="xs" color="gray" onClick={() => handleAddBlockToRow(rowIndex)}>
              + Add Block
            </Button>
          </div>

          <div className="flex flex-wrap gap-4">
            {row.blocks.map((block, blockIndex) => (
              <div
                key={block.id}
                className={clsx(
                  'p-4 border rounded-md shadow-sm flex-1 min-w-[150px]',
                  'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200',
                  {
                    'w-full': block.layout === 'full',
                    'w-1/2': block.layout === '1/2',
                    'w-1/3': block.layout === '1/3',
                    'w-2/3': block.layout === '2/3',
                  }
                )}
              >
                <div className="mb-2">
                  <Label value="Post" />
                  <Select
                    value={block.postId}
                    onChange={(e) =>
                      dispatch(updateBlock({
                        rowIndex,
                        blockIndex,
                        updates: { postId: e.target.value }
                      }))
                    }
                  >
                    <option value="">Select post</option>
                    {availablePosts.map(p => (
                      <option key={p._id} value={p._id}>{p.title}</option>
                    ))}
                  </Select>
                </div>

                <div className="mb-2">
                  <Label value="Layout" />
                  <Select
                    value={block.layout}
                    onChange={(e) =>
                      dispatch(updateBlock({
                        rowIndex,
                        blockIndex,
                        updates: { layout: e.target.value as LayoutSize }
                      }))
                    }
                  >
                    {layoutOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </Select>
                </div>

                {/* <div className="mb-2">
                  <Label value="Image" />
                  <FileInput onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file, rowIndex, blockIndex);
                  }} />
                </div> */}

                {block.image?.desktop.url && (
                  <div className="relative w-full h-40 mb-2">
                    <Image
                      src={block.image.desktop.url}
                      alt={block.image.desktop.alt || 'Preview'}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                )}

                <Button
                  size="xs"
                  color="failure"
                  onClick={() => dispatch(removeBlock({ rowIndex, blockIndex }))}
                >
                  Remove Block
                </Button>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="pt-4">
        <Button color="teal" onClick={() => dispatch(addRow())}>+ Add Layout Row</Button>
      </div>
    </main>
  );
}