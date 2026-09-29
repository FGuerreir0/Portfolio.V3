import { useLang } from '../i18n';

const skillsData = [
  { title: 'Frontend', skills: ['React', 'Vue.js', 'Next.js', 'Nuxt', 'Vite', 'React Native'] },
  { title: 'Backend', skills: ['Node.js', 'Express', 'ASP.NET', 'Redis', 'Kafka', 'WebSockets'] },
  { title: { en: 'Databases', pt: 'Bases de dados' }, skills: ['MSSQL', 'MongoDB', 'Supabase'] },
  { title: { en: 'Data & AI', pt: 'Dados e IA' }, skills: ['Python', 'Pandas', 'LLMs', 'MCP'] },
  { title: { en: 'Cloud & DevOps', pt: 'Cloud e DevOps' }, skills: ['AWS', 'Docker', 'Git', 'GitHub Actions'] },
  { title: { en: 'Testing', pt: 'Testes' }, skills: ['Jest', 'Mocha', 'Playwright', 'Puppeteer'] }
];

function Skills() {
  const { t } = useLang();

  return (
    <section id="skills" className="section">
      <div className="container">
        <header className="section-head reveal">
          <p className="section-number">04</p>
          <h2 className="section-title">{t({ en: 'Expertise', pt: 'Competências' })}</h2>
        </header>
        <div className="skills-grid">
          {skillsData.map((category, index) => (
            <div key={index} className="skill reveal" style={{ transitionDelay: `${(index % 3) * 80}ms` }}>
              <h3 className="skill-title">{t(category.title)}</h3>
              <ul className="skill-list">
                {category.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
