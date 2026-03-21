const projectsData = [
  {
    title: 'Al Coda',
    description: 'An all-in-one management platform for music organizations. Manage attendance, events, fuel voucher reimbursements, and analytics for orchestras, bands, choirs, and ensembles — with multi-language, multi-currency, and role-based access control.',
    tags: ['React', 'TypeScript', 'Node.js', 'Supabase', 'TailwindCSS'],
    liveLink: 'https://alcoda.netlify.app/',
    gradient: 'gradient-5',
    icon: '/images/alcoda.png'
  },
  {
    title: 'DotDrop',
    description: 'A real-time collaborative pixel art platform inspired by r/place. Join thousands of players in creating massive pixel art together! Built with React, Canvas API, WebSockets, and Supabase.',
    tags: ['React', 'WebSockets', 'Supabase', 'Canvas API'],
    link: 'https://github.com/FGuerreir0/dotdrop',
    liveLink: 'https://dotdrop-art.netlify.app/',
    gradient: 'gradient-1',
    icon: '/images/dotdrop.png'
  },
  {
    title: 'Twitch Bot',
    description: 'A customizable Twitch chat bot that engages viewers, manages chat commands, runs interactive events, and automates moderation for a smooth streaming experience.',
    tags: ['Node.js', 'Twitch API', 'Automation'],
    link: 'https://github.com/FGuerreir0/my-twitch-chat-bot',
    liveLink: 'https://www.twitch.tv/fabio_guerreiro',
    gradient: 'gradient-3',
    icon: '/images/twitch.png'
  }
];

function Projects() {
  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>
        <div className="projects-grid">
          {projectsData.map((project, index) => (
            <div key={index} className="project-card">
              <div className={`project-image ${project.gradient}`}>
                {project.icon && (
                  <img src={project.icon} alt={`${project.title} icon`} className="project-icon" />
                )}
                <div className="project-overlay">
                  <div className="project-overlay-links">
                    {project.liveLink && (
                      <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="project-link" title="Live Demo">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                          <polyline points="15 3 21 3 21 9"/>
                          <line x1="10" y1="14" x2="21" y2="3"/>
                        </svg>
                      </a>
                    )}
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link" title="GitHub">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.2 22 16.447 22 12.021 22 6.484 17.522 2 12 2z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
