import { useEffect, useState } from 'react';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e, target) => {
    e.preventDefault();
    document.querySelector(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
      <div className="nav-content">
        <a href="#home" className="logo" onClick={(e) => handleClick(e, '#home')}>FG</a>
        <div className="nav-links">
          <a href="#about" onClick={(e) => handleClick(e, '#about')}>About</a>
          <a href="#skills" onClick={(e) => handleClick(e, '#skills')}>Skills</a>
          <a href="#projects" onClick={(e) => handleClick(e, '#projects')}>Projects</a>
          <a href="#credentials" onClick={(e) => handleClick(e, '#credentials')}>Credentials</a>
          <a href="#contact" onClick={(e) => handleClick(e, '#contact')}>Contact</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
