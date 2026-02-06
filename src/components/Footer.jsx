function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {currentYear} Fábio Guerreiro</p>
      </div>
    </footer>
  );
}

export default Footer;
