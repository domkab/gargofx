'use client';

import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

type Option = { label: string; value: string };

export default function CustomSelect({
  name,
  placeholder,
  options,
  required,
}: {
  name: string;
  placeholder: string;
  options: Option[];
  required?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Option | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={clsx(
          'w-full text-left py-2 bg-transparent border-b border-white text-white placeholder-gray-400',
          'flex justify-between items-center'
        )}
      >
        {selected?.label || placeholder}
        <span className="text-secondary text-xl">+</span>
      </button>

      {/* Hidden input for form submission */}
      <input type="hidden" name={name} value={selected?.value || ''} required={required} />

      {open && (
        <ul className="absolute z-50 mt-2 w-full bg-black border border-white text-white rounded shadow">
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => {
                setSelected(opt);
                setOpen(false);
              }}
              className="px-4 py-2 hover:bg-secondary hover:text-black cursor-pointer transition-all"
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}