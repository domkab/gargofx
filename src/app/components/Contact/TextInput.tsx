'use client';

import { useState } from 'react';
import clsx from 'clsx';
import styles from '@/styles/components/contact.module.scss';

interface TextInputProps {
  name: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}

export default function TextInput({ name, placeholder, type = 'text', required = true }: TextInputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div className={clsx(styles['contact__form-input-container'])}>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={clsx(styles['contact__form-input'], 'placeholder-gray-400')}
      />
      <span
        className={clsx(
          'text-secondary text-xl transition-transform duration-300',
          focused ? 'rotate-45' : 'rotate-0'
        )}
      >
        +
      </span>
    </div>
  );
}