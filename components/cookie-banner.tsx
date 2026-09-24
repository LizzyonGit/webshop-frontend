'use client';

import { useEffect, useState } from 'react';

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
        <button type="button" onClick={declineCookie} className="rounded-xl border border-b-gray-600 px-5 py-2.5 text-sm font-medium text-black-600 transition hover:bg-gray-100">
          Neka
        </button>

        <button type="button" onClick={acceptCookie} className="rounded-xl bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-950">
          Acceptera
        </button>
      </div>
    </aside>
  );
}
