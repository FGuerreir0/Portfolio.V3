
const credlyBadges = [
  {
    imageUrl: '/images/introduction-to-cybersecurity.png',
    title: 'Introduction to Cybersecurity',
    issuer: 'Cisco',
    url: 'https://www.credly.com/badges/8f98e19d-0fe2-40ea-bfbb-34f1cb36e386/public_url',
  },
];

const accredibleBadges = [
  {
    imageUrl: 'https://api.accredible.com/v1/frontend/credential_website_embed_image/badge/19310021',
    title: 'Web Development Bootcamp',
    issuer: 'Ironhack',
    credentialUrl: 'https://www.credential.net/aedd67cb-be9b-4628-b2bf-ab68d2102bbd',
  },
];

function Credentials() {
  return (
    <section id="credentials" className="credentials">
      <div className="container">
        <h2 className="section-title">Credentials</h2>
        <p className="credentials-subtitle">Verified badges &amp; certifications</p>
        <div className="credentials-badges">
          {credlyBadges.map((badge) => (
            <a
              key={badge.url}
              href={badge.url}
              target="_blank"
              rel="noopener noreferrer"
              className="credential-card"
            >
              <img src={badge.imageUrl} alt={badge.title} className="credential-card-img" />
              <div className="credential-card-body">
                <p className="credential-card-title">{badge.title}</p>
                <p className="credential-card-issuer">{badge.issuer}</p>
              </div>
            </a>
          ))}
          {accredibleBadges.map((badge) => (
            <a
              key={badge.credentialUrl}
              href={badge.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="credential-card"
            >
              <img src={badge.imageUrl} alt={badge.title} className="credential-card-img" />
              <div className="credential-card-body">
                <p className="credential-card-title">{badge.title}</p>
                <p className="credential-card-issuer">{badge.issuer}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Credentials;
