import { useLang } from '../i18n';

// A full-width pull quote between the work and the research, with a
// background word that drifts sideways as you scroll past.
function Interlude() {
  const { t } = useLang();

  return (
    <section className="interlude" aria-label={t({ en: 'Pull quote', pt: 'Citação' })}>
      <div className="interlude-track" aria-hidden="true">
        <span data-parallax-x="0.5">slopsquatting · slopsquatting · slopsquatting</span>
      </div>
      <figure className="container interlude-figure reveal">
        <blockquote>
          {t({
            en: '“A made-up import in one person’s code just breaks their build. A made-up import in a template gets copied into every project the template creates.”',
            pt: '“Um import inventado no código de uma pessoa só lhe parte a build. Um import inventado num template é copiado para todos os projetos que esse template cria.”',
          })}
        </blockquote>
        <figcaption>
          {t({ en: 'From the ghostimport field report, September 2026', pt: 'Do relatório de campo do ghostimport, setembro de 2026' })}
        </figcaption>
      </figure>
    </section>
  );
}

export default Interlude;
