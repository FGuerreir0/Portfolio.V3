import { useEffect, useRef, useState } from 'react';

function Hero() {
  const taglineRef = useRef(null);
  const [typedText, setTypedText] = useState('');
  const fullText = "Building interactive experiences & solving complex problems";

  useEffect(() => {
    let i = 0;
    const typeWriter = () => {
      if (i < fullText.length) {
        setTypedText(fullText.substring(0, i + 1));
        i++;
        setTimeout(typeWriter, 50);
      }
    };
    
    setTimeout(typeWriter, 1000);
  }, []);

  const handleClick = (e, target) => {
    e.preventDefault();
    document.querySelector(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <h1 className="glitch" data-text="Fábio Guerreiro">Fábio Guerreiro</h1>
        <p className="subtitle">Full Stack Developer 🚀</p>
        <p className="tagline" ref={taglineRef}>{typedText}</p>
        <div className="cta-buttons">
          <a href="#projects" className="btn btn-primary" onClick={(e) => handleClick(e, '#projects')}>View Projects</a>
          <a href="#contact" className="btn btn-secondary" onClick={(e) => handleClick(e, '#contact')}>Get In Touch</a>
        </div>
      </div>
      <div className="hero-bg">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
