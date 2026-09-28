'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState<boolean | null>(null);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    setShowBanner(!consent);
  }, []);

  const acceptCookie = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowBanner(false);
  };

  const declineCookie = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setShowBanner(false);
  };

  if (showBanner === null || !showBanner) {
    return null;
  }

  return (
    <aside aria-labelledby="cookie-title" className="fixed bottom-6 left-1/2 z-50 w-full max-w-2xl -translate-x-1/2 rounded-2xl border border-gray-300 p-6 shadow-2xl">
      <div>
        <h2 id="cookie-title" className="mb-2 text-xl font-semibold text-black-600">
          Cookies
        </h2>
        <p className="text-sm leading-6 text-gray-600">Vi använder cookies för att analysera trafik och förbättra webbplatsen. Du kan välja att acceptera eller neka.</p>
      </div>

      <div className="mt-5 flex justify-center gap-3">
        <div className="mt-5 flex justify-center gap-3">
          <Button type="button" variant="secondary" onClick={declineCookie}>
            Neka
          </Button>

          <Button type="button" variant="default" onClick={acceptCookie}>
            Acceptera
          </Button>
        </div>
      </div>
    </aside>
  );
}
