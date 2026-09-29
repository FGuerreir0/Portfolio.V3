import { useLang } from '../i18n';

const copy = {
  lead: {
    en: 'Over five years shipping production software at Trading Economics. I build web platforms, developer tools and, now and then, some supply-chain security research, from the database to the last pixel.',
    pt: 'Mais de cinco anos a desenvolver software em produção na Trading Economics. Crio plataformas web, ferramentas para programadores e, de vez em quando, investigação em segurança da cadeia de fornecimento de software, da base de dados ao último pixel.',
  },
  work: { en: 'Selected work', pt: 'Trabalho selecionado' },
  report: { en: 'Read the field report', pt: 'Ler o relatório' },
  meta: [
    { dt: { en: 'Currently', pt: 'Atualmente' }, dd: 'Full Stack Developer, Trading Economics' },
    { dt: { en: 'Latest', pt: 'Mais recente' }, dd: { en: 'Credited by Lovable on HackerOne, 2026', pt: 'Reconhecido pela Lovable no HackerOne, 2026' } },
    { dt: { en: 'Based in', pt: 'Localização' }, dd: 'Portugal' },
  ],
  scroll: { en: 'Scroll', pt: 'Deslizar' },
};

function Hero() {
  const { t } = useLang();

  const handleClick = (e, target) => {
    e.preventDefault();
    document.querySelector(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header id="home" className="hero">
      <div className="hero-backdrop" aria-hidden="true">
        <span className="hero-monogram">FG</span>
      </div>

      <div className="hero-inner">
        <p className="eyebrow hero-eyebrow">Full Stack Developer · Portugal</p>
        <h1 className="hero-title">
          <span className="hero-line"><span>Fábio</span></span>
          <span className="hero-line"><span><em>Guerreiro</em></span></span>
        </h1>
        <span className="hero-rule" aria-hidden="true" />
        <p className="hero-lead">{t(copy.lead)}</p>
        <div className="hero-actions">
          <a href="#projects" className="text-button" onClick={(e) => handleClick(e, '#projects')}>
            {t(copy.work)} <span aria-hidden="true">→</span>
          </a>
          <a href="#research" className="text-button" onClick={(e) => handleClick(e, '#research')}>
            {t(copy.report)} <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      <dl className="hero-meta">
        {copy.meta.map((item, i) => (
          <div key={i}>
            <dt>{t(item.dt)}</dt>
            <dd>{t(item.dd)}</dd>
          </div>
        ))}
        <div className="hero-scroll" aria-hidden="true">
          <dt>{t(copy.scroll)}</dt>
          <dd>↓</dd>
        </div>
      </dl>
    </header>
  );
}

export default Hero;
