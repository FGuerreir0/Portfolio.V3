import { createContext, useContext, useEffect, useState } from 'react';

// Two languages. Copy lives next to the component that renders it, as
// { en, pt } pairs; `t()` picks the current one and passes anything else through.
const LANGS = ['en', 'pt'];
const STORAGE_KEY = 'lang';
// Head tags that follow the language; English values come from index.html.
const HEAD = {
  en: {
    title: document.title,
    description: document.querySelector('meta[name="description"]')?.content,
  },
  pt: {
    title: 'Fábio Guerreiro — Full Stack Developer em Portugal',
    description:
      'Full Stack Developer em Lisboa, há mais de 5 anos na Trading Economics. React, Node.js, TypeScript e investigação em segurança da cadeia de fornecimento reconhecida pela Lovable no HackerOne.',
  },
};

const LanguageContext = createContext(null);

// Order: ?lang= in the URL (so each language has a crawlable address),
// then the visitor's saved choice, then the browser language.
function initialLang() {
  const fromUrl = new URLSearchParams(window.location.search).get('lang');
  if (LANGS.includes(fromUrl)) return fromUrl;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (LANGS.includes(saved)) return saved;
  } catch {
    // storage blocked: fall through to the browser language
  }
  return navigator.language?.toLowerCase().startsWith('pt') ? 'pt' : 'en';
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-PT' : 'en';
    document.title = HEAD[lang].title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', HEAD[lang].description);

    const url = new URL(window.location.href);
    if (lang === 'en') url.searchParams.delete('lang');
    else url.searchParams.set('lang', lang);
    window.history.replaceState(null, '', url);

    // Each language is its own canonical page (see hreflang in index.html).
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      const href = new URL(canonical.href);
      href.search = lang === 'en' ? '' : `?lang=${lang}`;
      canonical.href = href.toString();
    }

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // not persisted; the choice still holds for this visit
    }
  }, [lang]);

  const t = (value) => (value && typeof value === 'object' && 'en' in value ? value[lang] : value);

  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  return useContext(LanguageContext);
}
