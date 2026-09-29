import { useLang } from '../i18n';

const REPORT_URL = 'https://fguerreir0.github.io/ghostimport/research/';
const HACKERONE_URL = 'https://hackerone.com/lovable-vdp/thanks';

const figures = [
  { value: '174', label: { en: 'Repositories scanned', pt: 'Repositórios analisados' } },
  { value: '23,773', label: { en: 'Source files checked', pt: 'Ficheiros verificados' } },
  { value: '404', label: { en: 'Repos exposed', pt: 'Repositórios expostos' }, emphasis: true },
  { value: '16', label: { en: 'Days to fix', pt: 'Dias até à correção' } },
];

const PACKAGE = <code>lovable-agent-playwright-config</code>;

const standfirst = {
  en: (
    <>
      I scanned public GitHub repos with ghostimport and found that Lovable’s project template imported{' '}
      {PACKAGE}, a package nobody had ever published on npm. Anyone could have registered it and run code on every
      machine that installed it. I reported it privately through HackerOne, and Lovable reserved the name.
    </>
  ),
  pt: (
    <>
      Analisei repositórios públicos do GitHub com o ghostimport e descobri que o template de projetos da Lovable
      importava o {PACKAGE}, um pacote que nunca tinha sido publicado no npm. Qualquer pessoa o podia ter registado
      e executado código em todas as máquinas que o instalassem. Reportei-o em privado através do HackerOne e a
      Lovable reservou o nome.
    </>
  ),
};

function FieldReport() {
  const { lang, t } = useLang();

  return (
    <section id="research" className="section report">
      <div className="container">
        <header className="section-head reveal">
          <p className="section-number">03</p>
          <p className="eyebrow">
            {t({ en: 'Field report · ghostimport · September 2026', pt: 'Relatório de campo · ghostimport · Setembro 2026' })}
          </p>
          <h2 className="report-title">
            {t({ en: '404 repositories imported a package ', pt: '404 repositórios importavam um pacote ' })}
            <em>{t({ en: 'nobody owned.', pt: 'que não era de ninguém.' })}</em>
          </h2>
          <p className="report-standfirst">{standfirst[lang]}</p>
        </header>

        <div className="report-figures">
          {figures.map((f, i) => (
            <div key={i} className={`report-figure reveal${f.emphasis ? ' is-emphasis' : ''}`}>
              <div className="report-figure-value">{f.value}</div>
              <div className="report-figure-label">{t(f.label)}</div>
            </div>
          ))}
        </div>

        <div className="report-honour reveal">
          <div className="report-honour-mark" aria-hidden="true">
            <span>2026</span>
          </div>
          <div className="report-honour-body">
            <p className="eyebrow">{t({ en: 'Recognition', pt: 'Reconhecimento' })}</p>
            <p className="report-honour-title">
              {t({
                en: 'Listed on the Lovable Vulnerability Disclosure Program’s 2026 thanks page on HackerOne',
                pt: 'Na página de agradecimentos de 2026 do Programa de Divulgação de Vulnerabilidades da Lovable, no HackerOne',
              })}
            </p>
          </div>
          <div className="report-honour-links">
            <a href={HACKERONE_URL} target="_blank" rel="noopener noreferrer" className="text-button">
              {t({ en: 'HackerOne thanks', pt: 'Agradecimentos no HackerOne' })} <span aria-hidden="true">↗</span>
            </a>
            <a href={REPORT_URL} target="_blank" rel="noopener noreferrer" className="text-button">
              {t({ en: 'Full report', pt: 'Relatório completo' })} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FieldReport;
