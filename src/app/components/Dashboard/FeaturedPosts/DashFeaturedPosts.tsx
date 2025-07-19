'use client';

import { FeaturedBlock, LayoutSize } from '@/types/featuredLayout';
import {
  Button,
  Label,
  Select,
  TextInput
} from 'flowbite-react';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import clsx from 'clsx';
import { RootState, useAppDispatch, useAppSelector } from '@/redux';
import {
  addBlockToRow,
  addRow,
  removeRow,
  removeBlock,
  setLayout,
  updateBlock
} from '@/redux/slices/featuredPostSlice';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
import { IPost } from '@/types/post/iPost';
import ReusableImageUploader from './ReusableImageUploader';

const layoutOptions: LayoutSize[] = ['1/4', '1/2', 'full'];

export default function FeaturedLayoutEditorPage() {
  const { user } = useUser();
  const dispatch = useAppDispatch();
  const layoutRows = useAppSelector((state: RootState) => state.featuredPost.rows);
  const [posts, setPosts] = useState<IPost[]>([]);

  const [toast, setToast] = useState<{
    type: 'success' | 'error';
    message: string
  } | null>(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.post(
          `/api/post/get`,
          {
            userId: user?.publicMetadata?.userMongoId,
            isAdmin: user?.publicMetadata?.isAdmin
          }
        );

        setPosts(data.posts);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchLayout = async () => {
      try {
        const { data } = await axios.get('/api/featured');

        if (Array.isArray(data)) {
          dispatch(setLayout(data));
        }
      } catch (error) {
        console.error('Failed to fetch featured layout:', error);
      }
    };

    fetchLayout();

    if (user?.publicMetadata?.userMongoId) {
      fetchPosts();
    }
  }, [dispatch, user?.publicMetadata?.userMongoId, user?.publicMetadata?.isAdmin]);

  const handleAddBlockToRow = (rowIndex: number) => {
    const block: FeaturedBlock = {
      id: uuidv4(),
      postId: '',
      layout: '1/4',
    };

    dispatch(addBlockToRow({ rowIndex, block }));
  };

  return (
    <main className="w-full max-w-[1440px] mx-auto p-6 space-y-10">

      {toast && (
        <div className="fixed top-4 right-4 z-50">
          <div
            className={
              `p-4 rounded-lg shadow-md text-white 
              ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`
            }
          >
            {toast.message}
          </div>
        </div>
      )}

      <h1 className="text-2xl font-bold">🎯 Featured Layout Editor</h1>

      {layoutRows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={clsx(
            'space-y-4',
            'border',
            'p-4',
            'rounded-md',
            'shadow-sm',
            'bg-white',
            'dark:bg-gray-800',
            'border-gray-200',
            'dark:border-gray-700'
          )}
        >
          <div className="flex justify-between items-center">
            <h2 className="font-semibold">Row #{rowIndex + 1}</h2>
            <Button size="xs" color="gray" onClick={() => handleAddBlockToRow(rowIndex)}>
              + Add Block
            </Button>

            <Button
              size="xs"
              color="failure"
              onClick={() => dispatch(removeRow(rowIndex))}
            >
              🗑 Remove Row
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
                    'w-1/4': block.layout === '1/4',
                    'w-1/2': block.layout === '1/2',
                    'w-full': block.layout === 'full',
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

                    {/* Show missing post fallback */}
                    {!posts.find(p => p._id === block.postId) && block.postId && (
                      <option value={block.postId} disabled>
                        (Missing Post)
                      </option>
                    )}

                    {/* Valid post options */}
                    {posts.map(post => (
                      <option key={post._id} value={post._id}>
                        {post.title.regular
                          ? `${post.title.bold} ${post.title.regular}`
                          : post.title.bold
                        }
                      </option>
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

                {/* check for if postid exists? */}
                {/* {block.postId && (
                  
                )} */}

                <ReusableImageUploader
                  label="Desktop Image (required)"
                  type="desktop"
                  slug={block.postId || 'default-slug'}
                  currentImageUrl={block.image?.desktop?.url}
                  setToast={setToast}
                  onUpload={(url) => {
                    dispatch(updateBlock({
                      rowIndex,
                      blockIndex,
                      updates: {
                        image: {
                          ...block.image,
                          desktop: { url, alt: 'Desktop image' }
                        }
                      }
                    }));
                  }}
                />

                <div className="mb-2">
                  <Label value="Alt text (desktop image)" />
                  <TextInput
                    type="text"
                    value={block.image?.desktop?.alt || ''}
                    onChange={(e) =>
                      dispatch(updateBlock({
                        rowIndex,
                        blockIndex,
                        updates: {
                          image: {
                            ...block.image,
                            desktop: {
                              ...(block.image?.desktop ?? { url: '' }),
                              alt: e.target.value,
                            }
                          }
                        }
                      }))
                    }
                    placeholder="Describe the image for SEO..."
                    className=""
                  />
                </div>

                {/* {block.postId && (
                  
                )} */}

                <ReusableImageUploader
                  label="Mobile Image (optional)"
                  type="mobile"
                  slug={block.postId || 'default-slug'}
                  currentImageUrl={block.image?.mobile?.url}
                  setToast={setToast}
                  onUpload={(url) => {
                    dispatch(updateBlock({
                      rowIndex,
                      blockIndex,
                      updates: {
                        image: {
                          desktop: block.image?.desktop ?? { url: '', alt: '' },
                          mobile: { url, alt: 'Mobile image' }
                        }
                      }
                    }));
                  }}
                />

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

      <div className="pt-2">
        <Button
          color="success"
          onClick={async () => {
            try {
              console.log('Saved layout:', layoutRows);
              const response = await axios.post('/api/featured', {
                rows: layoutRows,
                userMongoId: user?.publicMetadata?.userMongoId,
              });

              if (response.status === 200) {
                setToast({ type: 'success', message: 'Layout saved successfully!' });
              } else {
                setToast({ type: 'error', message: 'Something went wrong while saving.' });
              }
            } catch (err) {
              console.error(err);
              setToast({ type: 'error', message: 'Failed to save layout.' });
            }
          }}
        >
          💾 Save Layout
        </Button>
      </div>
    </main>
  );
}