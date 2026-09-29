import { useEffect, useState } from 'react';
import { useLang } from '../i18n';

const links = [
  { href: '#about', label: { en: 'About', pt: 'Sobre' } },
  { href: '#projects', label: { en: 'Work', pt: 'Trabalho' } },
  { href: '#research', label: { en: 'Research', pt: 'Investigação' } },
  { href: '#skills', label: { en: 'Expertise', pt: 'Competências' } },
  { href: '#contact', label: { en: 'Contact', pt: 'Contacto' } },
];

function LanguageSwitch() {
  const { lang, setLang } = useLang();
  return (
    <div className="lang-switch" role="group" aria-label="Language / Idioma">
      {['en', 'pt'].map((code) => (
        <button
          key={code}
          type="button"
          lang={code}
          aria-pressed={lang === code}
          className={lang === code ? 'is-active' : ''}
          onClick={() => setLang(code)}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

function Navbar() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keep the rule under the link of whichever section is mid-screen.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    links.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  const handleClick = (e, target) => {
    e.preventDefault();
    setOpen(false);
    document.querySelector(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav className={`navbar${scrolled ? ' is-scrolled' : ''}`} aria-label={t({ en: 'Main', pt: 'Principal' })}>
      <a href="#home" className="navbar-wordmark" onClick={(e) => handleClick(e, '#home')}>
        Fábio Guerreiro
      </a>

      <div className="navbar-links">
        {links.map(({ href, label }) => (
          <a key={href} href={href} className={active === href ? 'is-active' : ''} onClick={(e) => handleClick(e, href)}>
            {t(label)}
          </a>
        ))}
      </div>

      <div className="navbar-end">
        <LanguageSwitch />
        <button
          type="button"
          className="navbar-toggle"
          aria-expanded={open}
          aria-controls="navbar-overlay"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? t({ en: 'Close', pt: 'Fechar' }) : 'Menu'}
        </button>
      </div>

      <div id="navbar-overlay" className={`navbar-overlay${open ? ' is-open' : ''}`} aria-hidden={!open}>
        {links.map(({ href, label }, i) => (
          <a key={href} href={href} tabIndex={open ? 0 : -1} onClick={(e) => handleClick(e, href)}>
            <span className="navbar-overlay-index">0{i + 1}</span>
            {t(label)}
          </a>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;
