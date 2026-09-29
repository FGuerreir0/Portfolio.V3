import { lazy, Suspense } from 'react';
import { useLang } from '../i18n';

// Recharts is most of the bundle, so the chart loads after first paint.
const CodingJourney = lazy(() => import('./CodingJourney'));

const PORTRAIT_URL = '/images/portrait.webp';

// What each chapter before (and alongside) code left behind.
const lessons = [
  {
    from: { en: 'From music', pt: 'Da música' },
    title: { en: 'Discipline & ensemble', pt: 'Disciplina e conjunto' },
    text: {
      en: 'Years of daily clarinet practice taught me to polish the details, and playing in ensembles taught me to listen and work as part of a team.',
      pt: 'Anos de estudo diário de clarinete ensinaram-me a cuidar dos detalhes, e tocar em ensembles ensinou-me a ouvir e a trabalhar em equipa.',
    },
  },
  {
    from: { en: 'From changing careers', pt: 'Da mudança de carreira' },
    title: { en: 'Learning fast', pt: 'Aprender depressa' },
    text: {
      en: 'Going from musician to developer through a nine-week bootcamp taught me to pick up new tools quickly and learn on the job. I haven’t stopped since.',
      pt: 'Passar de músico a programador num bootcamp de nove semanas ensinou-me a dominar novas ferramentas depressa e a aprender no trabalho. Nunca mais parei.',
    },
  },
  {
    from: { en: 'From working with the public', pt: 'Do trabalho com o público' },
    title: { en: 'Calm & ownership', pt: 'Calma e responsabilidade' },
    text: {
      en: 'Customer-facing and security jobs taught me to stay calm under pressure, communicate well and take responsibility until the problem is solved.',
      pt: 'O atendimento ao público e a segurança privada ensinaram-me a manter a calma sob pressão, a comunicar bem e a assumir um problema até estar resolvido.',
    },
  },
];

const TE_LINK = <a href="https://tradingeconomics.com" target="_blank" rel="noopener noreferrer">Trading Economics</a>;

const bio = {
  en: (
    <>
      <p>
        I’m <strong>Fábio Guerreiro</strong>, a Full Stack Developer at {TE_LINK} in Lisbon since 2021. I work
        across the whole stack, from APIs and data to the interface.
      </p>
      <p>
        I started programming in school, spent a decade as a musician and music teacher, and came back to code
        full time in 2020. That path shows up in what I build: <strong>Al Coda</strong> for music organisations,
        the <strong>Clarinetes de Santiago</strong> website for a clarinet ensemble, and{' '}
        <strong>EnsinarMais</strong> to teach kids to code.
      </p>
    </>
  ),
  pt: (
    <>
      <p>
        Sou o <strong>Fábio Guerreiro</strong>, Full Stack Developer na {TE_LINK}, em Lisboa, desde 2021.
        Trabalho em toda a stack, das APIs e dos dados à interface.
      </p>
      <p>
        Comecei a programar na escola, passei uma década como músico e professor de música e voltei ao código a
        tempo inteiro em 2020. Esse percurso vê-se no que construo: o <strong>Al Coda</strong> para organizações
        musicais, o site dos <strong>Clarinetes de Santiago</strong> para um ensemble de clarinetes e o{' '}
        <strong>EnsinarMais</strong> para ensinar crianças a programar.
      </p>
    </>
  ),
};

function About() {
  const { lang, t } = useLang();

  return (
    <section id="about" className="section about">
      <div className="container">
        <header className="section-head reveal">
          <p className="section-number">01</p>
          <h2 className="section-title">{t({ en: 'About', pt: 'Sobre' })}</h2>
        </header>

        <div className="about-grid">
          <figure className="about-portrait reveal">
            <div className="about-portrait-frame">
              <img
                src={PORTRAIT_URL}
                alt={t({ en: 'Portrait of Fábio Guerreiro', pt: 'Retrato de Fábio Guerreiro' })}
                width="1200"
                height="1200"
                loading="lazy"
                data-parallax="0.08"
              />
            </div>
            <figcaption>Fábio Guerreiro · {t({ en: 'Lisbon', pt: 'Lisboa' })}</figcaption>
          </figure>

          <div className="about-copy">
            <p className="about-statement reveal">
              {t({
                en: 'A Full Stack Developer with over five years of production experience, ',
                pt: 'Full Stack Developer com mais de cinco anos de experiência em produção, ',
              })}
              <em>{t({ en: 'who got into code by way of music and teaching.', pt: 'que chegou ao código pela música e pelo ensino.' })}</em>
            </p>
            <div className="about-text reveal">{bio[lang]}</div>
          </div>
        </div>

        {/* Keys are indexes, not titles: a key that changed with the language
            would remount the item and drop its scroll-reveal state. */}
        <ul className="lessons">
          {lessons.map((l, i) => (
            <li key={i} className="lesson reveal" style={{ transitionDelay: `${i * 80}ms` }}>
              <p className="eyebrow">{t(l.from)}</p>
              <h3 className="lesson-title">{t(l.title)}</h3>
              <p className="lesson-text">{t(l.text)}</p>
            </li>
          ))}
        </ul>

        <Suspense fallback={<div className="journey journey-placeholder" aria-hidden="true" />}>
          <CodingJourney />
        </Suspense>
      </div>
    </section>
  );
}

export default About;
