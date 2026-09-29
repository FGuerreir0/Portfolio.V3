import { useEffect, useRef, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useLang } from '../i18n';

// GitHub contributions per year (2026 is in progress — update as it grows)
const GITHUB_CONTRIBUTIONS_DATA = [
  { year: '2019', contributions: 0 },
  { year: '2020', contributions: 388 },
  { year: '2021', contributions: 330 },
  { year: '2022', contributions: 688 },
  { year: '2023', contributions: 1442 },
  { year: '2024', contributions: 1259 },
  { year: '2025', contributions: 1398 },
  { year: '2026', contributions: 1625, inProgress: true },
];

// Fallbacks if the GitHub API is unavailable
const FALLBACK_STATS = { contributions: 1625, repositories: 49, followers: 80 };

const GITHUB_USER = 'FGuerreir0';

// Mirrors the ink/rule tokens in index.css; Recharts needs literal colours.
const CHART = { ink: '#0E0E0C', subtle: '#8C8C84', rule: '#DFDED7', ground: '#FAFAF8' };

function formatTick(value) {
  return value >= 1000 ? `${(value / 1000).toFixed(1).replace(/\.0$/, '')}k` : value;
}

function CodingJourney() {
  const { t } = useLang();
  const [stats, setStats] = useState({
    contributions: 0,
    repositories: 0,
    followers: 0
  });

  const targetsRef = useRef({ ...FALLBACK_STATS });
  const animatedRef = useRef(false);
  const statCardsRef = useRef([]);

  useEffect(() => {
    // Followers and repo count come live from the GitHub API; contributions
    // need an authenticated GraphQL call, so that one stays hardcoded.
    const cached = sessionStorage.getItem(`gh-user:${GITHUB_USER}`);
    const apply = ({ followers, repositories }) => {
      targetsRef.current = { ...targetsRef.current, followers, repositories };
      if (animatedRef.current) setStats({ ...targetsRef.current });
    };

    if (cached !== null) {
      apply(JSON.parse(cached));
      return;
    }

    fetch(`https://api.github.com/users/${GITHUB_USER}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data) => {
        const value = { followers: data.followers, repositories: data.public_repos };
        sessionStorage.setItem(`gh-user:${GITHUB_USER}`, JSON.stringify(value));
        apply(value);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateStats();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statCardsRef.current.forEach(card => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  const animateStats = () => {
    if (animatedRef.current) return;
    animatedRef.current = true;

    const targets = targetsRef.current;
    const duration = 1500;
    const steps = 50;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setStats({
        contributions: Math.floor(targets.contributions * progress),
        repositories: Math.floor(targets.repositories * progress),
        followers: Math.floor(targets.followers * progress)
      });

      if (currentStep >= steps) {
        clearInterval(interval);
        setStats({ ...targetsRef.current });
      }
    }, stepDuration);
  };

  const renderDot = (props) => {
    const { cx, cy, index, payload } = props;
    // Only the in-progress year gets a marker: an open ring, signalling
    // the value is still climbing.
    if (!payload.inProgress) {
      return <circle key={index} cx={cx} cy={cy} r={0} fill="none" />;
    }
    return (
      <circle key={index} cx={cx} cy={cy} r={5} fill={CHART.ground} stroke={CHART.ink} strokeWidth={1.5} />
    );
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const point = payload[0].payload;
      return (
        <div className="chart-tooltip">
          <p className="chart-tooltip-year">
            {point.year}
            {point.inProgress && <span> · {t({ en: 'in progress', pt: 'em curso' })}</span>}
          </p>
          <p className="chart-tooltip-value">{payload[0].value.toLocaleString()} {t({ en: 'contributions', pt: 'contribuições' })}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="journey">
      <div className="journey-head">
        <p className="eyebrow">{t({ en: 'On GitHub, year by year', pt: 'No GitHub, ano a ano' })}</p>
        <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noopener noreferrer" className="text-button">
          @{GITHUB_USER} <span aria-hidden="true">↗</span>
        </a>
      </div>

      <div className="journey-grid">
        <div className="journey-chart">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={GITHUB_CONTRIBUTIONS_DATA} margin={{ top: 16, right: 16, left: -12, bottom: 0 }}>
              <defs>
                <linearGradient id="aboutColorContributions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={CHART.ink} stopOpacity={0.14}/>
                  <stop offset="100%" stopColor={CHART.ink} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke={CHART.rule} />
              <XAxis
                dataKey="year"
                stroke={CHART.subtle}
                style={{ fontSize: '12px', fontFamily: 'Inter, system-ui, sans-serif' }}
                tickLine={false}
                axisLine={{ stroke: CHART.ink }}
                tickMargin={10}
              />
              <YAxis
                stroke={CHART.subtle}
                style={{ fontSize: '12px', fontFamily: 'Inter, system-ui, sans-serif' }}
                tickLine={false}
                axisLine={false}
                tickFormatter={formatTick}
                width={44}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: CHART.ink, strokeWidth: 1, strokeDasharray: '3 3' }} />
              <Area
                type="monotone"
                dataKey="contributions"
                stroke={CHART.ink}
                strokeWidth={1.5}
                fillOpacity={1}
                fill="url(#aboutColorContributions)"
                dot={renderDot}
                activeDot={{ r: 4, strokeWidth: 1.5, stroke: CHART.ground, fill: CHART.ink }}
                animationDuration={1200}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <dl className="journey-stats">
          <div className="journey-stat" ref={el => statCardsRef.current[0] = el}>
            <dd>{stats.contributions.toLocaleString()}+</dd>
            <dt>{t({ en: 'Contributions in 2026', pt: 'Contribuições em 2026' })}</dt>
          </div>
          <div className="journey-stat" ref={el => statCardsRef.current[1] = el}>
            <dd>{stats.repositories}+</dd>
            <dt>{t({ en: 'Public repositories', pt: 'Repositórios públicos' })}</dt>
          </div>
          <div className="journey-stat" ref={el => statCardsRef.current[2] = el}>
            <dd>{stats.followers}+</dd>
            <dt>{t({ en: 'Followers', pt: 'Seguidores' })}</dt>
          </div>
        </dl>
      </div>
    </div>
  );
}

export default CodingJourney;
