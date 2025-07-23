'use client';

import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import styles from '@/styles/components/contact.module.scss';

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
          styles['contact__form-input'],
          'w-full flex justify-between items-center',
          'placeholder-gray-400'
        )}
      >
        {selected?.label || placeholder}
        <span
          className={clsx(
            'text-secondary text-xl transition-transform duration-300',
            open ? 'rotate-45' : 'rotate-0'
          )}
        >
          +
        </span>
      </button>

      {/* Hidden input for form submission */}
      <input type="hidden" name={name} value={selected?.value || ''} required={required} />

      {open && (
        <ul
          className={clsx(styles['contact__form-dropdown'])}
          role='listbox'
        >
          {options.map((opt) => (
            <li
              key={opt.value}
              role='option'
              aria-selected={selected?.value === opt.value}
              onClick={() => {
                setSelected(opt);
                setOpen(false);
              }}
              className={clsx(styles['contact__form-dropdown-item'])}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}