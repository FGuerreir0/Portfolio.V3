import { useLang } from '../i18n';

const credentials = [
  {
    imageUrl: '/images/introduction-to-cybersecurity.png',
    title: 'Introduction to Cybersecurity',
    issuer: 'Cisco',
    platform: 'Credly',
    url: 'https://www.credly.com/badges/8f98e19d-0fe2-40ea-bfbb-34f1cb36e386/public_url',
  },
  {
    imageUrl: 'https://api.accredible.com/v1/frontend/credential_website_embed_image/badge/19310021',
    title: 'Web Development Bootcamp',
    issuer: 'Ironhack',
    platform: 'Accredible',
    url: 'https://www.credential.net/aedd67cb-be9b-4628-b2bf-ab68d2102bbd',
  },
];

function Credentials() {
  const { t } = useLang();

  return (
    <section id="credentials" className="section">
      <div className="container">
        <header className="section-head reveal">
          <p className="section-number">05</p>
          <h2 className="section-title">{t({ en: 'Credentials', pt: 'Credenciais' })}</h2>
        </header>
        <ul className="credential-list">
          {credentials.map((badge) => (
            <li key={badge.url} className="reveal">
              <a href={badge.url} target="_blank" rel="noopener noreferrer" className="credential">
                <img src={badge.imageUrl} alt="" className="credential-img" loading="lazy" />
                <span className="credential-title">{badge.title}</span>
                <span className="credential-issuer">{badge.issuer}</span>
                <span className="credential-verify">{t({ en: 'Verify on', pt: 'Verificar no' })} {badge.platform} ↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Credentials;
