import type { CSSProperties } from 'react';
import type { Contribution } from '../data/profile';

interface ProjectCardProps {
    contribution: Contribution;
    delay?: number;
    revealed?: boolean;
    className?: string;
}

export default function ProjectCard({
    contribution,
    delay = 0,
    revealed = true,
    className = '',
}: ProjectCardProps) {
    if (!revealed) {
        return <div className="rv-hidden" style={{ height: '120px' }} />;
    }

    return (
        <article
            className={`rv-fade-up ${className}`.trim()}
            style={{
                '--rv-delay': `${delay}ms`,
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                background: 'rgba(10,17,23,0.82)',
                border: '1px solid rgba(38,217,227,0.14)',
                borderRadius: 'var(--radius)',
                padding: '1.25rem 1.5rem',
                transition: 'border-color 0.22s ease, box-shadow 0.22s ease, transform 0.22s cubic-bezier(0.34,1.56,0.64,1)',
            } as CSSProperties}
            onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'rgba(61,255,122,0.5)';
                el.style.boxShadow = '0 4px 24px rgba(61,255,122,0.18), 0 0 0 1px rgba(61,255,122,0.12)';
                el.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'rgba(38,217,227,0.14)';
                el.style.boxShadow = 'none';
                el.style.transform = 'none';
            }}
        >
            <a
                href={contribution.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open pull request for ${contribution.project}`}
                style={{
                    position: 'absolute',
                    top: '1.25rem',
                    right: '1.5rem',
                    fontFamily: 'var(--font-geist-mono)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.06em',
                    color: 'var(--color-accent)',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                    transition: 'opacity 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
                PR ↗
            </a>
            <div style={{ paddingRight: '3.5rem' }}>
                <span style={{ fontSize: '1.1rem', lineHeight: 1, display: 'block', marginBottom: '6px' }}>
                    {contribution.icon}
                </span>
                <h4
                    style={{
                        fontFamily: 'var(--font-geist-sans)',
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        lineHeight: '1.4',
                        color: 'var(--color-ink)',
                        margin: 0,
                    }}
                >
                    <a
                        href={contribution.url}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.15s' }}
                        onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-accent)')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-ink)')}
                    >
                        {contribution.project}
                    </a>
                </h4>
            </div>
            <p
                style={{
                    marginTop: '0.75rem',
                    fontSize: '0.82rem',
                    lineHeight: '1.6',
                    color: 'var(--color-dim)',
                }}
            >
                {contribution.description}
            </p>
        </article>
    );
}
