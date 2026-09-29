import { useEffect, useState } from 'react';
import { useLang } from '../i18n';

const projectsData = [
  {
    id: 'ghostimport',
    title: 'ghostimport',
    kind: { en: 'Open source · Supply-chain security', pt: 'Open source · Segurança da cadeia de fornecimento' },
    year: '2026',
    description: {
      en: 'An npm package that catches imports of packages that don\'t exist, the names AI coding tools make up. Someone can register one of those names and ship a malicious postinstall script with it. ghostimport checks every import against the live npm registry, flags typosquats and risky install scripts, and runs as a CLI, a GitHub Action, a pre-commit hook or an MCP server for coding agents.',
      pt: 'Um pacote npm que deteta imports de pacotes que não existem, os nomes que as ferramentas de IA inventam. Qualquer pessoa pode registar um desses nomes e publicar com ele um script postinstall malicioso. O ghostimport verifica cada import no registo npm em tempo real, assinala typosquats e scripts de instalação arriscados, e funciona como CLI, GitHub Action, hook de pre-commit ou servidor MCP para agentes de programação.',
    },
    note: {
      text: {
        en: 'Scanning 174 public repos with it turned up an unregistered name in Lovable\'s project template. Lovable fixed it and credited the report on their HackerOne thanks page.',
        pt: 'Ao analisar 174 repositórios públicos com ele, encontrei um nome não registado no template de projetos da Lovable. A Lovable corrigiu-o e reconheceu o relatório na sua página de agradecimentos do HackerOne.',
      },
      href: '#research',
      label: { en: 'Read the field report', pt: 'Ler o relatório' },
    },
    tags: ['TypeScript', 'Node.js', 'CLI', 'MCP', 'npm'],
    link: 'https://github.com/FGuerreir0/ghostimport',
    liveLink: 'https://fguerreir0.github.io/ghostimport/',
    npmPackage: 'ghostimport',
    githubRepo: 'FGuerreir0/ghostimport',
    icon: '/images/ghostimport.png'
  },
  {
    id: 'alcoda',
    title: 'Al Coda',
    kind: { en: 'Product · SaaS', pt: 'Produto · SaaS' },
    year: '2026',
    description: {
      en: 'An all-in-one management platform for music organizations. Manage attendance, events, fuel voucher reimbursements, and analytics for orchestras, bands, choirs, and ensembles — with multi-language, multi-currency, and role-based access control.',
      pt: 'Uma plataforma de gestão completa para organizações musicais. Presenças, eventos, reembolso de senhas de combustível e análises para orquestras, bandas, coros e ensembles, com várias línguas, várias moedas e controlo de acessos por função.',
    },
    tags: ['React', 'TypeScript', 'Node.js', 'Supabase', 'TailwindCSS'],
    liveLink: 'https://alcoda.pt/',
    icon: '/images/alcoda.png'
  },
  {
    // Kept anonymous on purpose: no name, link, logo or identifying details.
    id: 'marketplace',
    title: { en: 'Booking marketplace', pt: 'Marketplace de reservas' },
    kind: { en: 'Private project · Marketplace', pt: 'Projeto privado · Marketplace' },
    year: '2026',
    description: {
      en: 'A two-sided marketplace that connects customers with independent service providers. It has real-time messaging, booking requests, reviews, and a dashboard where providers manage their offer and follow their numbers.',
      pt: 'Um marketplace que liga clientes a prestadores de serviços independentes. Tem mensagens em tempo real, pedidos de reserva, avaliações e um painel onde os prestadores gerem a sua oferta e acompanham os resultados.',
    },
    tags: ['Next.js', 'React', 'TypeScript', 'Supabase', 'Realtime'],
    privateNote: { en: 'Private · details on request', pt: 'Privado · detalhes a pedido' },
  },
  {
    id: 'ensinarmais',
    title: 'EnsinarMais',
    kind: { en: 'Product · Education', pt: 'Produto · Educação' },
    year: '2026',
    description: {
      en: 'Coding bootcamps for children and teenagers in Portugal, in three levels: block puzzles for ages 6–9, written JavaScript for 10–14, and full-stack web apps from 15. There are no videos and no AI. Kids learn by solving problems, a little every day, and every level includes an internet-safety track and missions for the whole family.',
      pt: 'Bootcamps de programação para crianças e jovens em Portugal, em três níveis: puzzles de blocos dos 6 aos 9 anos, JavaScript escrito dos 10 aos 14 e aplicações web full stack a partir dos 15. Sem vídeos e sem IA. As crianças aprendem a resolver problemas, um pouco todos os dias, e cada nível inclui um percurso de segurança na internet e missões para toda a família.',
    },
    tags: ['Next.js', 'React', 'TypeScript', 'Supabase', 'Stripe'],
    liveLink: 'https://www.ensinarmais.pt/',
    icon: '/images/ensinarmais.svg'
  },
  {
    id: 'clarinetes',
    title: 'Clarinetes de Santiago',
    kind: { en: 'Website · Music association', pt: 'Website · Associação musical' },
    year: '2022 — 2026',
    description: {
      en: 'The official website of a clarinet ensemble from Palmela, designed and built by me and maintained since 2022. It has an editorial layout with scroll-driven animations, pages for upcoming concerts and events, a photo gallery, and a contact form that runs on a Netlify serverless function. It also has structured data and a sitemap, so the ensemble shows up in local search.',
      pt: 'O site oficial de um ensemble de clarinetes de Palmela, desenhado e desenvolvido por mim e mantido desde 2022. Tem um layout editorial com animações ligadas ao scroll, páginas de concertos e eventos, uma galeria de fotografias e um formulário de contacto que corre numa função serverless da Netlify. Tem também dados estruturados e um sitemap, para que o ensemble apareça nas pesquisas locais.',
    },
    tags: ['React', 'React Router', 'Netlify Functions', 'SEO', 'CSS scroll animations'],
    liveLink: 'https://clarinetesdesantiago.netlify.app/',
    icon: '/images/clarinetes.png'
  },
  {
    id: 'twitch-bot',
    title: 'Twitch Bot',
    kind: { en: 'Open source · Tooling', pt: 'Open source · Ferramentas' },
    description: {
      en: 'A customizable Twitch chat bot that engages viewers, manages chat commands, runs interactive events, and automates moderation for a smooth streaming experience.',
      pt: 'Um bot de chat para a Twitch, personalizável, que interage com os espectadores, gere comandos, organiza eventos interativos e automatiza a moderação para uma transmissão sem falhas.',
    },
    tags: ['Node.js', 'Twitch API', 'Automation'],
    link: 'https://github.com/FGuerreir0/my-twitch-chat-bot',
    liveLink: 'https://www.twitch.tv/fabio_guerreiro',
    icon: '/images/twitch.png'
  }
];

function formatCount(count) {
  if (count >= 1000000) return (count / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (count >= 1000) return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  return String(count);
}

async function fetchCached(key, url, extract) {
  const cached = sessionStorage.getItem(key);
  if (cached !== null) return JSON.parse(cached);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status}`);
  const value = extract(await res.json());
  sessionStorage.setItem(key, JSON.stringify(value));
  return value;
}

function useProjectStats(project) {
  const [stats, setStats] = useState({});

  useEffect(() => {
    let active = true;

    if (project.githubRepo) {
      fetchCached(`gh-stars:${project.githubRepo}`, `https://api.github.com/repos/${project.githubRepo}`, (data) => data.stargazers_count)
        .then((stars) => active && setStats((prev) => ({ ...prev, stars })))
        .catch(() => {});
    }

    if (project.npmPackage) {
      fetchCached(
        `npm-downloads:${project.npmPackage}`,
        `https://api.npmjs.org/downloads/point/last-month/${project.npmPackage}`,
        (data) => data.downloads
      )
        .then((downloads) => active && setStats((prev) => ({ ...prev, downloads })))
        .catch(() => {});
    }

    return () => {
      active = false;
    };
  }, [project]);

  return stats;
}

function ProjectRow({ project, index }) {
  const { t } = useLang();
  const stats = useProjectStats(project);

  const scrollTo = (e, target) => {
    e.preventDefault();
    document.querySelector(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <article className="project reveal">
      <div className="project-index">{String(index + 1).padStart(2, '0')}</div>

      <div className="project-body">
        <p className="eyebrow">
          {t(project.kind)}
          {project.year && <> · {project.year}</>}
        </p>
        <h3 className="project-title">{t(project.title)}</h3>
        <p className="project-description">{t(project.description)}</p>

        {project.note && (
          <p className="project-note">
            {t(project.note.text)}{' '}
            <a href={project.note.href} onClick={(e) => scrollTo(e, project.note.href)}>
              {t(project.note.label)} →
            </a>
          </p>
        )}

        <p className="project-tags">{project.tags.join(' · ')}</p>

        <div className="project-footer">
          <div className="project-links">
            {project.liveLink && (
              <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-button">
                {t({ en: 'Visit', pt: 'Visitar' })} <span aria-hidden="true">↗</span>
              </a>
            )}
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-button">
                {t({ en: 'Source', pt: 'Código' })} <span aria-hidden="true">↗</span>
              </a>
            )}
            {project.privateNote && <span className="project-private">{t(project.privateNote)}</span>}
          </div>
          {(stats.stars != null || stats.downloads != null) && (
            <div className="project-stats">
              {stats.stars != null && (
                <span title="GitHub stars">★ {formatCount(stats.stars)} {t({ en: 'stars', pt: 'estrelas' })}</span>
              )}
              {stats.downloads != null && (
                <span title="npm downloads (last month)">↓ {formatCount(stats.downloads)} / {t({ en: 'month', pt: 'mês' })}</span>
              )}
            </div>
          )}
        </div>
      </div>

      <div className={`project-plate${project.icon ? '' : ' is-private'}`} aria-hidden="true">
        {project.icon ? (
          <img src={project.icon} alt="" className="project-icon" loading="lazy" width="512" height="512" data-parallax="0.12" />
        ) : (
          <span className="project-mark" data-parallax="0.12">{t({ en: 'Private', pt: 'Privado' })}</span>
        )}
      </div>
    </article>
  );
}

function Projects() {
  const { t } = useLang();

  return (
    <section id="projects" className="section">
      <div className="container">
        <header className="section-head reveal">
          <p className="section-number">02</p>
          <h2 className="section-title">{t({ en: 'Selected work', pt: 'Trabalho selecionado' })}</h2>
          <p className="section-intro">
            {t({
              en: 'Products, open-source tools and experiments. Some are shipped and in use, some are still growing.',
              pt: 'Produtos, ferramentas open source e experiências. Alguns já estão lançados e em uso, outros ainda estão a crescer.',
            })}
          </p>
        </header>
        <div className="project-list">
          {projectsData.map((project, index) => (
            <ProjectRow key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
