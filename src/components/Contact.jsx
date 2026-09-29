import { useLang } from '../i18n';

const socialLinks = [
  { name: 'GitHub', handle: 'FGuerreir0', url: 'https://github.com/FGuerreir0' },
  { name: 'LinkedIn', handle: 'fabiofsguerreiro', url: 'https://www.linkedin.com/in/fabiofsguerreiro/' },
  { name: 'Twitch', handle: 'fabio_guerreiro', url: 'https://www.twitch.tv/fabio_guerreiro' },
  { name: 'YouTube', handle: '@fabiopguerreiro', url: 'https://www.youtube.com/@fabiopguerreiro' },
  { name: 'Instagram', handle: 'fguerreir0', url: 'https://www.instagram.com/fguerreir0/' }
];

function Contact() {
  const { t } = useLang();

  return (
    <section id="contact" className="contact">
      <div className="container">
        <p className="section-number">06</p>
        <h2 className="contact-title reveal">
          {t({ en: 'Get in ', pt: 'Vamos ' })}<em>{t({ en: 'touch.', pt: 'falar.' })}</em>
        </h2>
        <p className="contact-intro reveal">
          {t({
            en: 'Open to new roles, projects and collaborations. Send me a message on any of these.',
            pt: 'Disponível para novas funções, projetos e colaborações. Envia-me uma mensagem em qualquer uma destas redes.',
          })}
        </p>
        <ul className="contact-links">
          {socialLinks.map((social) => (
            <li key={social.name} className="reveal">
              <a href={social.url} target="_blank" rel="noopener noreferrer">
                <span className="contact-link-name">{social.name}</span>
                <span className="contact-link-handle">{social.handle}</span>
                <span className="contact-link-arrow" aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Contact;
