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
import { v4 as uuidv4 } from 'uuid';
import { ContentBlock } from '@/types/post/iPost';

export default function ContentBlockEditor() {
  const dispatch = useAppDispatch();
  const content = useAppSelector((state) => state.postForm.content);

  const handleAddBlock = (layout: 'full' | 'half') => {
    const newBlock = (): ContentBlock => ({
      id: uuidv4(),
      type: 'image',
      url: '',
      alt: '',
      layout,
    });

    if (layout === 'half') {
      dispatch(addContentBlock(newBlock()));
      dispatch(addContentBlock(newBlock()));
    } else {
      dispatch(addContentBlock(newBlock()));
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
              <div key={`pair-${block.id}`} className="grid grid-cols-2 gap-4">
                <ContentBlockItem
                  key={block.id}
                  block={block}
                  index={i}
                  onChange={(updated) =>
                    dispatch(updateContentBlock({ id: block.id, block: updated }))
                  }
                  onRemove={() => dispatch(removeContentBlock(block.id))}
                  onMoveUp={() => dispatch(moveContentBlockUp(block.id))}
                  onMoveDown={() => dispatch(moveContentBlockDown(block.id))}
                  isFirst={i === 0}
                  isLast={i === content.length - 1}
                />
                <ContentBlockItem
                  key={nextBlock.id}
                  block={nextBlock}
                  index={i + 1}
                  onChange={(updated) =>
                    dispatch(updateContentBlock({ id: nextBlock.id, block: updated }))
                  }
                  onRemove={() => dispatch(removeContentBlock(nextBlock.id))}
                  onMoveUp={() => dispatch(moveContentBlockUp(nextBlock.id))}
                  onMoveDown={() => dispatch(moveContentBlockDown(nextBlock.id))}
                  isFirst={i + 1 === 0}
                  isLast={i + 1 === content.length - 1}
                />
              </div>
            );

            i++;
          } else {
            rendered.push(
              <ContentBlockItem
                key={block.id}
                block={block}
                index={i}
                onChange={(updated) =>
                  dispatch(updateContentBlock({ id: block.id, block: updated }))
                }
                onRemove={() => dispatch(removeContentBlock(block.id))}
                onMoveUp={() => dispatch(moveContentBlockUp(block.id))}
                onMoveDown={() => dispatch(moveContentBlockDown(block.id))}
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