import { useEffect, useRef, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// GitHub contributions per year (2026 is in progress — update as it grows)
const GITHUB_CONTRIBUTIONS_DATA = [
  { year: '2019', contributions: 0 },
  { year: '2020', contributions: 388 },
  { year: '2021', contributions: 330 },
  { year: '2022', contributions: 688 },
  { year: '2023', contributions: 1442 },
  { year: '2024', contributions: 1259 },
  { year: '2025', contributions: 1398 },
  { year: '2026', contributions: 1168, inProgress: true },
];

// Fallbacks if the GitHub API is unavailable
const FALLBACK_STATS = { contributions: 1168, repositories: 49, followers: 80 };

const GITHUB_USER = 'FGuerreir0';

function formatTick(value) {
  return value >= 1000 ? `${(value / 1000).toFixed(1).replace(/\.0$/, '')}k` : value;
}

function CodingJourney() {
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
      <circle key={index} cx={cx} cy={cy} r={5} fill="#0a0f1e" stroke="#8b5cf6" strokeWidth={2.5} />
    );
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const point = payload[0].payload;
      return (
        <div style={{
          background: 'rgba(15, 23, 42, 0.95)',
          border: '1px solid #6366f1',
          borderRadius: '8px',
          padding: '12px',
          backdropFilter: 'blur(10px)',
        }}>
          <p style={{ color: '#f1f5f9', margin: 0, fontSize: '14px' }}>
            <strong>{point.year}</strong>
            {point.inProgress && (
              <span style={{ color: '#94a3b8', fontWeight: 400 }}> · year in progress</span>
            )}
          </p>
          <p style={{ color: '#c4b5fd', margin: '4px 0 0 0', fontSize: '16px', fontWeight: '600' }}>
            {payload[0].value.toLocaleString()} contributions
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="github-contributions-section">
      <div className="chart-stats-wrapper">
        <div className="github-contributions-chart">
          <div className="chart-container">
            <svg className="github-icon" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={GITHUB_CONTRIBUTIONS_DATA} margin={{ top: 16, right: 16, left: -12, bottom: 0 }}>
                <defs>
                  <linearGradient id="aboutColorContributions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.45}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.02}/>
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#334155" strokeOpacity={0.25} />
                <XAxis
                  dataKey="year"
                  stroke="#94a3b8"
                  style={{ fontSize: '12px' }}
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis
                  stroke="#94a3b8"
                  style={{ fontSize: '12px' }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={formatTick}
                  width={44}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#6366f1', strokeWidth: 1, strokeDasharray: '4 4' }} />
                <Area
                  type="monotone"
                  dataKey="contributions"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#aboutColorContributions)"
                  dot={renderDot}
                  activeDot={{ r: 5, strokeWidth: 2, stroke: '#0a0f1e' }}
                  animationDuration={1200}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="about-stats">
          <div className="stat-card" ref={el => statCardsRef.current[0] = el}>
            <div className="stat-number">{stats.contributions}+</div>
            <div className="stat-label">Contributions in 2026</div>
          </div>
          <div className="stat-card" ref={el => statCardsRef.current[1] = el}>
            <div className="stat-number">{stats.repositories}+</div>
            <div className="stat-label">Repositories</div>
          </div>
          <div className="stat-card" ref={el => statCardsRef.current[2] = el}>
            <div className="stat-number">{stats.followers}+</div>
            <div className="stat-label">Followers</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CodingJourney;
