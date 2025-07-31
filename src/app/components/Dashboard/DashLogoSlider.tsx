'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Button, FileInput, TextInput } from 'flowbite-react';
import { useUser } from '@clerk/clerk-react';

type Logo = {
  _id?: string;
  url: string;
  alt: string;
  order: number;
};

export default function DashLogoSlider() {
  const { user } = useUser();
  const [logos, setLogos] = useState<Logo[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [altText, setAltText] = useState('');

  const [toast, setToast] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  useEffect(() => {
    axios.get('/api/logo-slider/get').then((res) => {
      setLogos(res.data.sort((a: Logo, b: Logo) => a.order - b.order));
    });
  }, []);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    if (user?.publicMetadata?.userMongoId) {
      formData.append('userMongoId', String(user?.publicMetadata?.userMongoId || ''));
    }

    try {
      const { data } = await axios.post('/api/logo-slider/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setLogos((prev) => [
        ...prev,
        {
          _id: uuidv4(),
          url: data.url,
          alt: altText || file.name.replace('.svg', ''),
          order: prev.length,
        },
      ]);

      setFile(null);
      setAltText('');
      setToast({ type: 'success', message: 'Logo uploaded successfully!' });
    } catch (err) {
      console.error('Upload failed', err);
      setToast({ type: 'error', message: `Failed to upload logo. ${err}` });
    }
  };

  // Handle manual order change
  const handleOrderChange = (index: number, newOrder: number) => {
    const updated = [...logos];
    updated[index].order = newOrder;
    setLogos(updated.sort((a, b) => a.order - b.order));
  };

  // Save to database
  const handleSave = async () => {
    try {
      await axios.post('/api/logo-slider/save', { logos });
      setToast({ type: 'success', message: 'Logos layout saved successfully!' });
    } catch (err) {
      console.error(err);
      setToast({ type: 'error', message: `Failed to save logos. ${err}` });
    }
  };

  return (

    <main className="w-full max-w-[900px] mx-auto p-6 space-y-6">
      {toast && (
        <div className="fixed top-4 right-4 z-50">
          <div
            className={`p-4 rounded-lg shadow-md text-white 
              ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`
            }
          >
            {toast.message}
          </div>
        </div>
      )}
      <h1 className="text-xl font-bold">Logo Slider Manager</h1>

      {/* Upload */}
      <div className="flex gap-4">
        <FileInput
          accept=".svg"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <TextInput
          placeholder="Alt text"
          value={altText}
          onChange={(e) => setAltText(e.target.value)}
        />
        <Button onClick={handleUpload} disabled={!file}>
          Upload Logo
        </Button>
      </div>

      {/* Logo List with manual order inputs */}
      <div className="space-y-2">
        {logos.map((logo, index) => (
          <div
            key={logo._id || index}
            className="flex items-center gap-4 p-2 border rounded bg-gray shadow-sm"
          >
            <Image src={logo.url} alt={logo.alt} width={80} height={80} />
            <span className="flex-1">{logo.alt}</span>

            <TextInput
              type="number"
              min={0}
              value={logo.order}
              onChange={(e) => handleOrderChange(index, parseInt(e.target.value, 10))}
              className="w-20"
            />
          </div>
        ))}
      </div>

      <Button color="success" onClick={handleSave}>
        Save Changes
      </Button>
    </main>
  );
}