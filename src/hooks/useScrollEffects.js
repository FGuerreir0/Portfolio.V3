import { useEffect } from 'react';

/**
 * Page-wide scroll choreography, wired once from App.
 *
 * - `.reveal` elements get `.is-visible` the first time they enter the viewport.
 * - `[data-parallax]` elements drift vertically at the given rate relative to
 *   their distance from the viewport centre (0.1 = subtle, 0.4 = strong;
 *   negative values move against the scroll). `[data-parallax-x]` does the
 *   same horizontally.
 * - `--scroll-progress` on <html> tracks document progress for the top bar, and
 *   `--hero-progress` goes 0 → 1 over the first viewport, for the pinned hero
 *   (its position never changes, so it can't use `data-parallax`).
 *
 * Parallax and progress are skipped entirely under prefers-reduced-motion.
 */
export default function useScrollEffects() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const root = document.documentElement;

    const reveals = document.querySelectorAll('.reveal');
    let observer;
    if (reduced || !('IntersectionObserver' in window)) {
      reveals.forEach((el) => el.classList.add('is-visible'));
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
      );
      reveals.forEach((el) => observer.observe(el));
    }

    if (reduced) return () => observer?.disconnect();

    const layers = [...document.querySelectorAll('[data-parallax], [data-parallax-x]')].map((el) => ({
      el,
      y: parseFloat(el.dataset.parallax) || 0,
      x: parseFloat(el.dataset.parallaxX) || 0,
    }));

    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const max = root.scrollHeight - vh;
      root.style.setProperty('--scroll-progress', max > 0 ? window.scrollY / max : 0);
      root.style.setProperty('--hero-progress', Math.min(window.scrollY / vh, 1).toFixed(4));

      for (const { el, x, y } of layers) {
        // Measure the parent so the element's own transform doesn't feed back.
        const rect = (el.parentElement || el).getBoundingClientRect();
        if (rect.bottom < -vh || rect.top > vh * 2) continue;
        const offset = rect.top + rect.height / 2 - vh / 2;
        el.style.transform = `translate3d(${(-offset * x).toFixed(1)}px, ${(-offset * y).toFixed(1)}px, 0)`;
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      observer?.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
}
