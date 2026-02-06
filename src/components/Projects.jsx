const projectsData = [
  {
    title: 'DotDrop',
    description: 'A real-time collaborative pixel art platform inspired by r/place. Join thousands of players in creating massive pixel art together! Built with React, Canvas API, WebSockets, and Supabase.',
    tags: ['React', 'WebSockets', 'Supabase', 'Canvas API'],
    link: 'https://github.com/FGuerreir0/dotdrop',
    gradient: 'gradient-1'
  },
  {
    title: 'Chatbot Juan',
    description: 'An AI-powered chatbot demonstrating the capabilities of LLMs with Retrieval-Augmented Generation (RAG) and Text-to-Speech (TTS) for interactive and context-aware conversations.',
    tags: ['Python', 'LLMs', 'RAG', 'TTS'],
    link: 'https://github.com/FGuerreir0/chatbot-juan',
    gradient: 'gradient-2'
  },
  {
    title: 'Twitch Bot',
    description: 'A customizable Twitch chat bot that engages viewers, manages chat commands, runs interactive events, and automates moderation for a smooth streaming experience.',
    tags: ['Node.js', 'Twitch API', 'Automation'],
    link: 'https://github.com/FGuerreir0/my-twitch-chat-bot',
    gradient: 'gradient-3'
  },
  {
    title: 'Portfolio V2',
    description: 'My previous portfolio showcasing interactive web applications and problem-solving skills. A testament to my journey in software development.',
    tags: ['JavaScript', 'HTML/CSS', 'Web Design'],
    link: 'https://github.com/FGuerreir0/Portfolio.V2',
    gradient: 'gradient-4'
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
                <div className="project-overlay">
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                    View Project →
                  </a>
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
