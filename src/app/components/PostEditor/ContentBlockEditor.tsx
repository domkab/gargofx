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

export default function ContentBlockEditor() {
  const dispatch = useAppDispatch();
  const content = useAppSelector((state) => state.postForm.content);

  return (
    <div className="flex flex-col gap-6 mt-10">
      <h2 className="text-xl font-semibold">Content Blocks</h2>

      {content.map((block, index) => (
        <ContentBlockItem
          key={index}
          block={block}
          index={index}
          onChange={(updated) =>
            dispatch(updateContentBlock({ index, block: updated }))
          }
          onRemove={() => dispatch(removeContentBlock(index))}
          onMoveUp={() => dispatch(moveContentBlockUp(index))}
          onMoveDown={() => dispatch(moveContentBlockDown(index))}
          isFirst={index === 0}
          isLast={index === content.length - 1}
        />
      ))}

      <div>
        <Button
          onClick={() =>
            dispatch(
              addContentBlock({
                type: 'image',
                url: '',
                layout: 'full',
                alt: ''
              })
            )
          }
        >
          + Add Image Block
        </Button>
      </div>
    </div>
  );

  // 3. allow reordering (optional)
}