import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import defaultLogo from '../assets/logo.svg';

export const DEFAULT_SETTINGS = {
  logoUrl: '',
  phone: '+91-141-404-5555',
  instagram: 'https://www.instagram.com/',
  facebook: 'https://www.facebook.com/',
  linkedin: 'https://www.linkedin.com/'
};

const SiteSettingsContext = createContext({
  settings: DEFAULT_SETTINGS,
  logoSrc: defaultLogo,
  refreshSettings: async () => {}
});

export function SiteSettingsProvider({ children }) {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  const refreshSettings = useCallback(async () => {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      if (res.ok && data && !data.message) {
        setSettings({
          logoUrl: data.logoUrl || '',
          phone: data.phone || DEFAULT_SETTINGS.phone,
          instagram: data.instagram || DEFAULT_SETTINGS.instagram,
          facebook: data.facebook || DEFAULT_SETTINGS.facebook,
          linkedin: data.linkedin || DEFAULT_SETTINGS.linkedin
        });
      }
    } catch {
      /* keep defaults */
    }
  }, []);

  useEffect(() => {
    refreshSettings();
  }, [refreshSettings]);

  const value = useMemo(() => ({
    settings,
    logoSrc: settings.logoUrl?.trim() || defaultLogo,
    refreshSettings
  }), [settings, refreshSettings]);

  return (
    <SiteSettingsContext.Provider value={value}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext);
}
