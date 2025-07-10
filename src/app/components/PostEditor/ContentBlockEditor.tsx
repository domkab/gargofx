'use client';

import { Button } from 'flowbite-react/components/Button';
import ContentBlockItem from './ContentBlockItem';
import { useAppDispatch, useAppSelector } from '@/redux';
import {
  addContentBlock,
  updateContentBlock,
  removeContentBlock,
  moveContentBlockUp,
  moveContentBlockDown
} from '@/redux/slices/postFormSlice';
import { JSX } from 'react';

export default function ContentBlockEditor() {
  const dispatch = useAppDispatch();
  const content = useAppSelector((state) => state.postForm.content);

  const handleAddBlock = (layout: 'full' | 'half') => {
    if (layout === 'half') {
      dispatch(addContentBlock({ type: 'image', url: '', layout: 'half', alt: '' }));
      dispatch(addContentBlock({ type: 'image', url: '', layout: 'half', alt: '' }));
    } else {
      dispatch(addContentBlock({ type: 'image', url: '', layout: 'full', alt: '' }));
    }
  };

  return (
    <div className="flex flex-col gap-6 mt-10">
      <h2 className="text-xl font-semibold">Content Blocks</h2>

      {(() => {
        const rendered: JSX.Element[] = [];

        for (let i = 0; i < content.length; i++) {
          const block = content[i];
          const nextBlock = content[i + 1];

          if (block.layout === 'half' && nextBlock?.layout === 'half') {
            rendered.push(
              <div key={`pair-${i}`} className="grid grid-cols-2 gap-4">
                <ContentBlockItem
                  key={`block-${i}`}
                  block={block}
                  index={i}
                  onChange={(updated) =>
                    dispatch(updateContentBlock({ index: i, block: updated }))
                  }
                  onRemove={() => dispatch(removeContentBlock(i))}
                  onMoveUp={() => dispatch(moveContentBlockUp(i))}
                  onMoveDown={() => dispatch(moveContentBlockDown(i))}
                  isFirst={i === 0}
                  isLast={i === content.length - 1}
                />
                <ContentBlockItem
                  key={`block-${i + 1 }`}
                  block={nextBlock}
                  index={i + 1}
                  onChange={(updated) =>
                    dispatch(updateContentBlock({ index: i + 1, block: updated }))
                  }
                  onRemove={() => dispatch(removeContentBlock(i + 1))}
                  onMoveUp={() => dispatch(moveContentBlockUp(i + 1))}
                  onMoveDown={() => dispatch(moveContentBlockDown(i + 1))}
                  isFirst={i + 1 === 0}
                  isLast={i + 1 === content.length - 1}
                />
              </div>
            );

            i++;
          } else {
            rendered.push(
              <ContentBlockItem
                key={`block-${i}`}
                block={block}
                index={i}
                onChange={(updated) =>
                  dispatch(updateContentBlock({ index: i, block: updated }))
                }
                onRemove={() => dispatch(removeContentBlock(i))}
                onMoveUp={() => dispatch(moveContentBlockUp(i))}
                onMoveDown={() => dispatch(moveContentBlockDown(i))}
                isFirst={i === 0}
                isLast={i === content.length - 1}
              />
            );
          }
        }

        return rendered;
      })()}

      <div className="flex gap-4">
        <Button onClick={() => handleAddBlock('full')}>+ Add Full Width Block</Button>
        <Button onClick={() => handleAddBlock('half')}>+ Add 2 Half Width Blocks</Button>
      </div>
    </div>
  );
}