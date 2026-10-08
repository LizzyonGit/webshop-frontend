'use client';

import { useSyncExternalStore } from 'react';
import { Button } from '@/components/ui/button';

const COOKIE_KEY = 'cookieConsent';

const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);

  window.addEventListener('storage', callback);

  return () => {
    listeners.delete(callback);
    window.removeEventListener('storage', callback);
  };
}

function getSnapshot() {
  return localStorage.getItem(COOKIE_KEY) === null;
}

function getServerSnapshot() {
  return false;
}

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

export default function CookieBanner() {
  const showBanner = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const acceptCookie = () => {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    notifyListeners();
  };

  const declineCookie = () => {
    localStorage.setItem(COOKIE_KEY, 'declined');
    notifyListeners();
  };

  if (!showBanner) {
    return null;
  }

  return (
    <aside aria-labelledby="cookie-title" className="fixed bottom-6 left-1/2 z-50 w-full max-w-2xl -translate-x-1/2 rounded-2xl border border-gray-300 bg-white p-6 shadow-2xl">
      <div>
        <h2 id="cookie-title" className="mb-2 text-xl font-semibold text-black">
          Cookies
        </h2>

        <p className="text-sm leading-6 text-gray-600">We use cookies to analyze traffic and improve the website. You can choose to accept or decline.</p>
      </div>

      <div className="mt-5 flex justify-center gap-3">
        <Button type="button" variant="secondary" onClick={declineCookie}>
          Decline
        </Button>

        <Button type="button" variant="default" onClick={acceptCookie}>
          Accept
        </Button>
      </div>
    </aside>
  );
}
