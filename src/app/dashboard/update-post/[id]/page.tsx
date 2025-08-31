'use client';

import Image from 'next/image';
import { uploadPostImage, useAppDispatch, useAppSelector } from '@/redux';
import { setFormData } from '@/redux/slices/postFormSlice';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { Alert, Button, FileInput, Label, Textarea, TextInput } from 'flowbite-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { DeleteMainImageButton } from '@/app/components/Dashboard/DeleteImage/DeleteMainImageButton';
import { generateSlug, getSlugSource } from '@/utils/generateSlug';
import ContentBlockEditor from '@/app/components/PostEditor/ContentBlockEditor';


export default function UpdatePost() {
  // const router = useRouter();
  const { isSignedIn, user, isLoaded } = useUser();
  const [publishError, setPublishError] = useState<string | null>(null);
  const [publishSuccess, setPublishSuccess] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const dispatch = useAppDispatch();
  const formData = useAppSelector((state) => state.postForm);
  const imageUploadProgress = useAppSelector((state) => state.postForm.imageUploadProgress);
  const imageUploadError = useAppSelector((state) => state.postForm.imageUploadError);
  const slug = generateSlug(getSlugSource(formData.title));

  const pathname = usePathname();
  const postId = pathname.split('/').pop() || '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data, status } = await axios.put(
        '/api/post/update',
        {
          ...formData,
          userMongoId: user?.publicMetadata.userMongoId,
          isAdmin: user?.publicMetadata?.isAdmin,
          postId,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      console.log('form data on submit:', formData);

      if (status !== 200) {
        setPublishError(data.message);

        return;
      }

      setPublishSuccess('Post updated successfully!');
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // router.push(`/dashboard?tab=posts`);
    } catch (error: unknown) {
      setPublishError(`Something went wrong: ${error}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleTitleChange = (field: 'bold' | 'regular', value: string) => {
    dispatch(setFormData({
      title: {
        ...formData.title,
        [field]: value
      }
    }));
  };

  const handleMainImageUpload = (file: File) => {
    if (file) {
      dispatch(uploadPostImage({ file, target: 'main' }));
    }
  };

  const handleDescriptionChange = (
    field: 'description' | 'optionalDescription' = 'description',
    value: string
  ) => {
    dispatch(setFormData({
      [field]: value
    }));
  };

  const handleCreditsChange = (value: string) => {
    dispatch(setFormData({
      credits: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await axios.post(
          '/api/post/get',
          { postId, userId: user?.publicMetadata?.userMongoId, isAdmin: user?.publicMetadata?.isAdmin },
          {
            headers: { 'Content-Type': 'application/json' },
          }
        );

        dispatch(setFormData(data.posts[0]));

        console.log('raw data posts:', data.posts[0]);
      } catch (error) {
        console.error(error);
      }
    };

    if (isSignedIn && user?.publicMetadata?.isAdmin) {
      fetchPost();
    }

  }, [postId, user?.publicMetadata?.isAdmin, isSignedIn, dispatch, user?.publicMetadata?.userMongoId]);

  // debug?
  useEffect(() => {
    console.log('form data:', formData);
  }, [formData]);

  if (!isLoaded) return null;

  if (!(isSignedIn && user.publicMetadata.isAdmin)) {
    return (
      <h1 className="text-center text-3xl my-7 font-semibold min-h-screen">
        You need to be an admin to update a post
      </h1>
    );
  }

  return (
    <div className="p-5 mx-96 min-h-screen">
      {publishSuccess && (
        <Alert color='success'>{publishSuccess}</Alert>
      )}

      {publishError && (
        <Alert color='failure'>{publishError}</Alert>
      )}

      <Link href="/dashboard?tab=posts">
        <Button>Back to Posts</Button>
      </Link>

      <h1 className="text-center text-3xl my-7 font-semibold">
        Update a post
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type='text'
            placeholder='Title BOLD'
            id='title-bold'
            className='flex-1'
            value={formData.title.bold}
            onChange={(e) => handleTitleChange('bold', e.target.value)}
          />
        </div>

        <div className="description flex flex-col gap-4 sm:flex-row ">
          <TextInput
            type='text'
            placeholder='Title REGULAR'
            id='title-regular'
            className='flex-1'
            value={formData.title.regular}
            onChange={(e) => handleTitleChange('regular', e.target.value)}
          />
        </div>

        <div className="
          flex gap-4 items-center justify-between border-4 
          border-teal-500 border-dotted p-3"
        >
          <FileInput
            accept='image/*'
            onChange={handleFileChange}
          />

          <Button
            type='button'
            gradientDuoTone='purpleToBlue'
            size='sm'
            outline
            onClick={() => {
              if (file) {
                handleMainImageUpload(file);
              } else {
                alert('No file selected');
              }
            }}
            disabled={!!imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className='w-16 h-16'>
                <CircularProgressbar
                  value={Number(imageUploadProgress)}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              'Upload Image'
            )}
          </Button>
        </div>

        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}

        {formData.heroImage.url && (
          <>
            <div style={{ position: 'relative', width: '100%', height: '400px' }}>
              <Image
                src={formData.heroImage.url}
                alt={formData.heroImage.alt || "Uploaded image"}
                fill
                unoptimized
                className="object-cover"
              />

              <div className="absolute top-1 right-1 z-10">
                <DeleteMainImageButton
                  slug={slug}
                  onSuccess={() => {
                    dispatch(setFormData({
                      heroImage: {
                        url: '',
                        alt: ''
                      }
                    }));
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-6">
              <div className="flex flex-col gap-2">
                <Label htmlFor="main-image-description" className="text-sm font-medium">
                  Image Description
                </Label>

                <TextInput
                  id="main-image-description"
                  type="text"
                  placeholder="Description for SEO (ALT TAG)"
                  value={formData.heroImage.alt || ''}
                  onChange={(e) =>
                    dispatch(setFormData({
                      heroImage: {
                        ...formData.heroImage,
                        alt: e.target.value
                      }
                    }))
                  }
                />
              </div>
            </div>
          </>
        )}

        <div className="flex flex-col gap-4 mt-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="post-description" className="text-sm font-medium">
              Post Description MAIN
            </Label>

            <TextInput
              type='text'
              placeholder='Main description, written in bold text'
              id='post-description'
              className='flex-1'
              value={formData.description || ''}
              onChange={(e) => handleDescriptionChange('description', e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="post-optional-description" className="text-sm font-medium">
              Post Description Optional
            </Label>

            <TextInput
              type='text'
              placeholder='Optional description, written in regular text'
              id='post-optional-description'
              className='flex-1'
              value={formData.optionalDescription || ''}
              onChange={(e) => handleDescriptionChange('optionalDescription', e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="post-optional-description" className="text-sm font-medium">
              Post Credits
            </Label>

            <Textarea
              id="post-optional-description"
              placeholder={`Production: NOIR Production\n3D modelling, shading, animation: Laurynas Gargasas\nComposition: Tomas Pranevičius, Laurynas Gargasas`}
              className="flex-1 min-h-[80px] resize-y"
              value={formData.credits || ''}
              onChange={(e) => handleCreditsChange(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-6">
          <ContentBlockEditor />
        </div>

        <Button type="submit" gradientDuoTone="purpleToPink">
          Update
        </Button>
      </form>
    </div>
  );
}