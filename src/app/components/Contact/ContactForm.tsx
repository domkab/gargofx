'use client';

import { useState } from 'react';
import clsx from 'clsx';
import styles from '@/styles/components/contact.module.scss';

export default function ContactForm() {
  const [agree, setAgree] = useState(false);

  return (
    <form
      action="https://formspree.io/f/mnndyryb"
      method="POST"
      className="flex flex-col gap-6"
    >
      <input type="hidden" name="_next" value={`${process.env.NEXT_PUBLIC_SITE_URL}/thank-you`} />

      {[
        { name: 'topic', placeholder: 'I’d love to chat about' },
        { name: 'budget', placeholder: 'Budget' },
        { name: 'referrer', placeholder: 'How did you find us?' },
        { name: 'name', placeholder: 'Your name' },
        { name: 'company', placeholder: 'Company (optional)' },
        { name: 'email', placeholder: 'Your email', type: 'email' },
      ].map(({ name, placeholder, type = 'text' }, i) => (
        <div key={i} className={clsx(styles.inputRow, 'flex justify-between items-center border-b border-white')}>
          <input
            name={name}
            type={type}
            placeholder={placeholder}
            required={name !== 'company'}
            className={clsx(
              'bg-transparent text-white placeholder-gray-400 outline-none flex-1 py-2',
              styles.input
            )}
          />
          <span className="text-secondary text-xl">+</span>
        </div>
      ))}

      <label className={clsx('flex items-start gap-3 text-white text-sm mt-4', styles.checkboxContainer)}>
        <input
          type="checkbox"
          name="consent"
          required
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          className={clsx('appearance-none w-5 h-5 border border-white checked:bg-secondary')}
        />
        <span>
          By ticking this box, you’re allowing us to handle{' '}
          <a href="/privacy" className="underline">your personal data</a>, we’ll take good care of it.
        </span>
      </label>

      <button
        type="submit"
        className={clsx(
          'mt-6 text-white py-3 px-8 rounded-full border border-white hover:bg-white hover:text-black transition-all duration-300',
          styles.submit
        )}
      >
        send
      </button>
    </form>
  );
}