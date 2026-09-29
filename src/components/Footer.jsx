import { useLang } from '../i18n';

function Footer() {
  const { t } = useLang();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-row">
        <p>&copy; {currentYear} Fábio Guerreiro</p>
        <p>{t({ en: 'Set in Playfair Display & Inter', pt: 'Composto em Playfair Display e Inter' })}</p>
      </div>
    </footer>
  );
}

export default Footer;
