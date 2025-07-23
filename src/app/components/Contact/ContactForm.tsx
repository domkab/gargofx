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
      className={styles['contact__form']}
    >
      <input
        type="hidden"
        name="_next"
        value={`${process.env.NEXT_PUBLIC_SITE_URL}/thank-you`}
      />

      <div className="groups flex flex-col md:flex-row gap-6 w-full">

        <div className="group flex flex-col flex-1 gap-6">
          <TextInput
            name="topic"
            placeholder="I’d love to chat about"
            required
          />

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
        </div>

        <div className="group flex flex-col flex-1 gap-6">
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
          ))
          }
        </div>
      </div>

      {/* Checkbox */}
      <div 
      className="consent-group flex flex-col md:flex-row md:border-t border-white"
      >
        <label className="flex items-start gap-3 text-white text-sm mt-7">
          <input
            type="checkbox"
            className={styles['contact__form-checkbox']}
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          />
          <span className={styles['contact__form-consent']}>
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
            styles['contact__form-submit'],
            'mt-7 text-white py-3 px-8 rounded-full border border-white transition-all duration-300'
          )}
        >
          send
        </button>
      </div>

    </form >
  );
}