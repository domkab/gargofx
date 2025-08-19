'use client';

import { useEffect, useState } from 'react';
import {
  Button,
  FileInput,
  Label,
  ToggleSwitch,
  TextInput,
} from 'flowbite-react';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import axios from 'axios';
import clsx from 'clsx';

export default function DashHomeSettings() {
  const { user } = useUser();

  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [convertToWebp, setConvertToWebp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const [loop, setLoop] = useState(true);
  const [transitionTime, setTransitionTime] = useState(3000);
  const [settingsSaved, setSettingsSaved] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await axios.get('/api/carousel/get-settings');

        console.log('data:', data);

        if (data) {
          setImageUrl(data.heroImageUrl);
          setLoop(data.carouselOptions?.loop ?? true);
          setTransitionTime(data.carouselOptions?.transitionTime ?? 3000);
        }

      } catch (err) {
        console.error('Failed to load settings', err);
      }
    };

    fetchSettings();
  }, []);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setUploaded(false);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('convertToWebp', String(convertToWebp));

      const res = await axios.post('/api/carousel/upload-main', formData);
      if (res.data?.url) {
        setImageUrl(res.data.url + '?updated=' + Date.now());
        setUploaded(true);
      }
    } catch (err) {
      console.error('Upload failed', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    try {
      await axios.patch('/api/carousel/save-settings', {
        userId: user?.publicMetadata?.userMongoId,
        carouselOptions: {
          loop,
          transitionTime,
        },
      });
      setSettingsSaved(true);
      setTimeout(() => setSettingsSaved(false), 2000);
    } catch (err) {
      console.error('Failed to save settings', err);
    }
  };

  if (!user?.publicMetadata?.isAdmin) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500 font-semibold text-lg">
          You are not authorized to access this page.
        </p>
      </div>
    );
  }

  return (
    <div className='flex flex-col w-full'>
      <h1 className="text-2xl font-semibold m-4">Main Image Settings</h1>

      <div className="w-full px-4 lg:px-8 mb-6">
        {imageUrl && (
          <div className="shadow-sm overflow-hidden rounded">
            <Image
              src={imageUrl}
              alt="Homepage hero image"
              width={2150}
              height={772}
              className={clsx(
                'w-full h-96 object-cover',
                { 'opacity-50': loading }
              )}
              unoptimized
            />
          </div>
        )}
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <div className="flex flex-col gap-4 mb-4">
          <div>
            <Label htmlFor="file" value="Upload new image" />
            <FileInput
              id="file"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) setFile(f);
              }}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="webp-toggle" value="Convert to WebP" />
            <ToggleSwitch
              id="webp-toggle"
              checked={convertToWebp}
              onChange={setConvertToWebp}
            />
          </div>

          <Button onClick={handleUpload} disabled={loading || !file}>
            {loading ? 'Uploading...' : 'Upload Image'}
          </Button>

          {uploaded && (
            <p className="text-green-600 mt-2">Image uploaded successfully ✅</p>
          )}
        </div>

        <hr className="my-6" />

        <h2 className="text-xl font-semibold mb-4">Carousel Settings</h2>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="loop-toggle" value="Loop carousel" />
            <ToggleSwitch
              id="loop-toggle"
              checked={loop}
              onChange={setLoop}
            />
          </div>

          <div>
            <Label htmlFor="transitionTime" value="Transition time (ms)" />
            <TextInput
              id="transitionTime"
              type="number"
              value={transitionTime}
              onChange={(e) => setTransitionTime(Number(e.target.value))}
              min={500}
              step={100}
            />
          </div>

          <Button onClick={handleSaveSettings}>
            Save Carousel Settings
          </Button>

          {settingsSaved && (
            <p className="text-green-600 mt-2">Settings saved ✅</p>
          )}
        </div>
      </div>
    </div>
  );
}