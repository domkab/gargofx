'use client';

import { useState } from 'react';
import clsx from 'clsx';
import CustomSelect from './CustomSelect';
// import styles from '@/styles/components/contact.module.scss';

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
      <div className="flex justify-between items-center border-b border-white">
        <input
          name="topic"
          type="text"
          placeholder="I’d love to chat about"
          required
          className={clsx(
            'bg-transparent text-white placeholder-gray-400 outline-none flex-1 py-2'
          )}
        />
        <span className="text-secondary text-xl">+</span>
      </div>

      {/* Budget (number or select) */}
      <div className="flex justify-between items-center border-b border-white">
        <select
          name="budget"
          required
          className={clsx(
            'flex-1 min-w-0',
            'bg-transparent text-white placeholder-gray-400 outline-none py-2 appearance-none truncate'
          )}
        >
          <option value="">Select budget</option>
          <option value="under-1k">&lt; $1,000</option>
          <option value="1k-5k">$1,000 – $5,000</option>
          <option value="5k-10k">$5,000 – $10,000</option>
          <option value="10k+">&gt; $10,000</option>
        </select>
        <span className="text-secondary text-xl">+</span>
      </div>

      {/* Referrer (select) */}
      {/* <div className="flex justify-between items-center border-b border-white">
        <select
          name="referrer"
          required
          className={clsx(
            'bg-transparent text-white placeholder-gray-400 outline-none flex-1 py-2',
            'appearance-none'
          )}
        >
          <option value="">How did you find us?</option>
          <option value="google">Google search</option>
          <option value="social">Social media (e.g., Instagram, Facebook, TikTok)</option>
          <option value="ads">Online ad (Google, Facebook, etc.)</option>
          <option value="referral">A friend or colleague (Word of mouth)</option>
          <option value="youtube">YouTube</option>
        </select>
        <span className="text-secondary text-xl">+</span>
      </div> */}

      <div className="flex justify-between items-center border-b border-white">
        <CustomSelect
          name="referrer"
          placeholder="How did you find us?"
          required
          options={[
            { label: 'Google search', value: 'google' },
            { label: 'Social media (e.g., Instagram, Facebook, TikTok)', value: 'social' },
            { label: 'Online ad (Google, Facebook, etc.)', value: 'ads' },
            { label: 'A friend or colleague (Word of mouth)', value: 'referral' },
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
        <div
          key={i}
          className="flex justify-between items-center border-b border-white"
        >
          <input
            name={name}
            type={type}
            placeholder={placeholder}
            required={name !== 'company'}
            className={clsx(
              'bg-transparent text-white placeholder-gray-400 outline-none flex-1 py-2'
            )}
          />
          <span className="text-secondary text-xl">+</span>
        </div>
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