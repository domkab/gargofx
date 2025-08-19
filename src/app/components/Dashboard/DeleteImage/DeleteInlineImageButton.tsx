'use client';

import { useState, useEffect } from 'react';
import { Modal } from 'flowbite-react';
import { FiX } from 'react-icons/fi';

type Props = {
  url: string;
  label?: string;
  onSuccess?: () => void;
};

export function DeleteInlineImageButton({ url, label = 'image', onSuccess }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch('/api/image/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      if (!res.ok) throw new Error('Failed to delete image');

      onSuccess?.();
    } catch (err) {
      console.error(err);
      alert('❌ Failed to delete image');
    } finally {
      setIsDeleting(false);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Enter') handleDelete();
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        title={`Delete ${label}`}
        className="absolute top-1 right-1 p-1 z-10 rounded-full bg-white/80 hover:bg-red-100"
      >
        <FiX className="w-5 h-5 text-red-600 hover:text-red-800" />
      </button>

      <Modal show={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Header>Delete {label}</Modal.Header>
        <Modal.Body>
          <p>This action will permanently delete the {label}. Proceed?</p>
        </Modal.Body>
        <Modal.Footer className="flex justify-center">
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-600 text-white/95 px-4 py-2 rounded hover:bg-red-700"
          >
            {isDeleting ? 'Deleting...' : 'Yes, delete'}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}