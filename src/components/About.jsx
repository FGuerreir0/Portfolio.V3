import { useEffect, useRef, useState } from 'react';
import CodingJourney from './CodingJourney';

function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>Hi! I'm <strong>Fábio Guerreiro</strong>, a passionate Full Stack Developer from Portugal <img src="https://flagcdn.com/16x12/pt.png" alt="Portugal" className="flag-icon" /> working at <a href="https://github.com/tradingeconomics" target="_blank" rel="noopener noreferrer">@tradingeconomics</a>.</p>
            <p>I specialize in building scalable web applications, real-time collaborative platforms, and AI-powered solutions. With expertise across the full stack, I bring ideas to life through clean code and intuitive design.</p>
            <p>When I'm not coding, you can find me exploring new technologies, creating content on <a href="https://www.twitch.tv/fabio_guerreiro" target="_blank" rel="noopener noreferrer">Twitch</a>, or working on exciting side projects.</p>
          </div>
        </div>

        {/* GitHub Contributions Chart with Stats */}
        <CodingJourney />
      </div>
    </section>
  );
}

export default About;
