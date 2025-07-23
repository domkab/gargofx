'use client';

import { useState } from 'react';
import clsx from 'clsx';
import CustomSelect from './CustomSelect';
import styles from '@/styles/components/contact.module.scss';
import TextInput from './TextInput';

export default function ContactForm() {
  const [agree, setAgree] = useState(false);

  return (
    <form
      action="https://formspree.io/f/mnndyryb"
      method="POST"
      className="flex flex-col gap-6"
    >
      <input
        type="hidden"
        name="_next"
        value={`${process.env.NEXT_PUBLIC_SITE_URL}/thank-you`}
      />

      {/* Topic (text input) */}
      <TextInput
        name="topic"
        placeholder="I’d love to chat about"
        required
      />

      {/* Budget (number or select) */}
      <div className={clsx(styles['contact__form-input-container'])}>
        <CustomSelect
          name="budget"
          placeholder="Select budget"
          required
          options={[
            { label: '< $1,000', value: 'under-1k' },
            { label: '$1,000 – $5,000', value: '1k-5k' },
            { label: '$5,000 – $10,000', value: '5k-10k' },
            { label: '> $10,000', value: '10k+' },
          ]}
        />
      </div>

      <div className={clsx(styles['contact__form-input-container'])}>
        <CustomSelect
          name="referrer"
          placeholder="How did you find us?"
          required
          options={[
            { label: 'Google search', value: 'google' },
            { label: 'Social media', value: 'social' },
            { label: 'Online ad (Google, Facebook, etc.)', value: 'ads' },
            { label: 'A friend or colleague', value: 'referral' },
            { label: 'YouTube', value: 'youtube' },
          ]}
        />
      </div>

      {/* Regular Inputs */}
      {[
        { name: 'name', placeholder: 'Your name' },
        { name: 'company', placeholder: 'Company (optional)' },
        { name: 'email', placeholder: 'Your email', type: 'email' },
      ].map(({ name, placeholder, type = 'text' }, i) => (
        <TextInput
          key={i}
          name={name}
          placeholder={placeholder}
          type={type}
          required={name !== 'company'}
        />
      ))}

      {/* Checkbox */}
      <label className="flex items-start gap-3 text-white text-sm mt-4">
        <input
          type="checkbox"
          name="consent"
          required
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          className="appearance-none w-5 h-5 border border-white checked:bg-secondary"
        />
        <span>
          By ticking this box, you’re allowing us to handle{' '}
          <a href="/privacy" className="underline">
            your personal data
          </a>
          , we’ll take good care of it.
        </span>
      </label>

      {/* Submit Button */}
      <button
        type="submit"
        className={clsx(
          'mt-6 text-white py-3 px-8 rounded-full border border-white hover:bg-white hover:text-black transition-all duration-300'
        )}
      >
        send
      </button>
    </form>
  );
}