'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Button, TextInput } from 'flowbite-react';

type Logo = {
  _id?: string;
  url: string;
  alt: string;
  order: number;
};

export default function DashLogoSlider() {
  const [logos, setLogos] = useState<Logo[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [altText, setAltText] = useState('');

  // Fetch existing logos
  useEffect(() => {
    axios.get('/api/logo-slider/get').then((res) => {
      // Ensure logos are sorted by `order`
      setLogos(res.data.sort((a: Logo, b: Logo) => a.order - b.order));
      console.log(logos);
      
    });
  }, []);

  // Upload new logo
  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const { data } = await axios.post('/api/logo-slider/upload', formData);
      setLogos((prev) => [
        ...prev,
        {
          _id: uuidv4(), // temporary id until saved
          url: data.url,
          alt: altText || file.name.replace('.svg', ''),
          order: prev.length,
        },
      ]);
      setFile(null);
      setAltText('');
      console.log(logos);
      
    } catch (err) {
      console.error('Upload failed', err);
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
      alert('Logos saved successfully');
    } catch (err) {
      console.error(err);
      alert('Failed to save logos');
    }
  };

  return (
    <main className="w-full max-w-[900px] mx-auto p-6 space-y-6">
      <h1 className="text-xl font-bold">Logo Slider Manager</h1>

      {/* Upload */}
      <div className="flex gap-4">
        <input
          type="file"
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
            className="flex items-center gap-4 p-2 border rounded bg-white shadow-sm"
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