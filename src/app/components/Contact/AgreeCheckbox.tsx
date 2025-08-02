'use client';

import { useState } from 'react';
import styles from '@/styles/components/contact.module.scss';
import clsx from 'clsx';

export default function AgreeCheckbox() {
  const [agree, setAgree] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!agree) {
      e.preventDefault(); // prevent form submission
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 3000); // hide after 3s
    }
  };

  return (
    <div className="consent-group flex flex-col md:flex-row md:border-t border-white relative">
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

      {/* Warning popup with fade animation */}
      <div
        className={clsx(
          'absolute top-full mt-2 text-xs bg-red-600 text-white rounded px-3 py-2 shadow transition-opacity duration-500',
          showWarning ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        style={{ left: '0' }}
      >
        Please agree before sending!
      </div>

      {/* Submit button */}
      <button
        type="submit"
        onClick={handleClick}
        className={clsx(
          styles['contact__form-submit'],
          'mt-7 text-white py-3 px-8 rounded-full border border-white transition-all duration-300',
          { 'opacity-50 cursor-not-allowed': !agree }
        )}
      >
        send
      </button>
    </div>
  );
}