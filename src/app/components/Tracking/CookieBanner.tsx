'use client';

import CookieConsent from 'react-cookie-consent';
import { loadGtag, enableAdsense } from '@/lib/analytics';
import { useEffect } from 'react';
import styles from '@/styles/components/cookie-consent.module.scss';

export default function CookieBanner() {
  useEffect(() => {
    loadGtag();
  }, []);

  return (
    <CookieConsent
      disableStyles
      location="bottom"
      cookieName="cookie_consent"
      sameSite="lax"
      enableDeclineButton
      buttonText="Accept all"
      declineButtonText="Only essential"
      containerClasses={styles.banner}
      contentClasses={styles.content}
      buttonWrapperClasses={styles.buttonWrapper}
      buttonClasses={styles.accept}
      declineButtonClasses={styles.decline}
      onAccept={() => {
        document.cookie =
          'cookie_consent=full; Max-Age=31536000; path=/; SameSite=Lax';
        document.cookie = 'needs_banner=1; Max-Age=0; path=/';

        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('consent', 'update', {
            ad_storage: 'granted',
            analytics_storage: 'granted',
            ad_user_data: 'granted',
            ad_personalization: 'granted',
          });
        }

        enableAdsense();
      }}
      onDecline={() => {
        document.cookie =
          'cookie_consent=necessary; Max-Age=31536000; path=/; SameSite=Lax';
        document.cookie = 'needs_banner=1; Max-Age=0; path=/';
      }}
    >
      This site uses cookies to offer you a better browsing experience.{' '}
      <a href="/privacy-policy" className={styles.link}>
        Learn&nbsp;more
      </a>
      .
    </CookieConsent>
  );
}