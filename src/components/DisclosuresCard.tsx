import type { CSSProperties } from 'react';
import { profile } from '../data/profile';
import TimelineItem from './TimelineItem';

interface DisclosuresCardProps {
    revealed?: boolean;
    className?: string;
}

export default function DisclosuresCard({ revealed = true, className = '' }: DisclosuresCardProps) {
    const { disclosures, contributions, bio } = profile;

    return (
        <div
            className={className}
            style={{
                background: 'rgba(10,17,23,0.86)',
                border: '1px solid rgba(38,217,227,0.14)',
                borderRadius: 'var(--radius)',
                backdropFilter: 'blur(8px)',
                boxShadow: 'inset 0 1px 0 rgba(61,255,122,0.07), 0 24px 48px rgba(0,0,0,0.4)',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <h3
                className={`overline rv-label-wrap${revealed ? ' rv-revealed rv-slide-left' : ' rv-hidden-left'}`}
                style={{
                    color: 'var(--color-warn)',
                    marginBottom: '1.5rem',
                    '--rv-delay': '0ms',
                } as CSSProperties}
            >
                Security Research
            </h3>
            <ol style={{ display: 'flex', flexDirection: 'column', gap: '14px', margin: 0, padding: 0, listStyle: 'none' }}>
                {disclosures.map((d, i) => (
                    <TimelineItem
                        key={d.organization}
                        index={i}
                        title={d.organization}
                        url={d.url}
                        revealed={revealed}
                        delay={80 + i * 65}
                    />
                ))}
            </ol>

            <p
                className={revealed ? 'rv-fade-up' : 'rv-hidden'}
                style={{
                    marginTop: '1.25rem',
                    fontSize: '0.8rem',
                    lineHeight: '1.6',
                    color: 'var(--color-dim)',
                    '--rv-delay': `${80 + disclosures.length * 65}ms`,
                } as CSSProperties}
            >
                Vulnerabilities reported privately under responsible disclosure.
            </p>

            <div
                style={{
                    marginTop: 'auto',
                    paddingTop: '1.25rem',
                    borderTop: '1px solid rgba(38,217,227,0.12)',
                }}
            >
                <p
                    className={revealed ? 'rv-fade-up' : 'rv-hidden'}
                    style={{
                        fontFamily: 'var(--font-geist-mono)',
                        fontSize: '0.8rem',
                        color: 'var(--color-dim)',
                        lineHeight: '1.6',
                        '--rv-delay': `${120 + disclosures.length * 65}ms`,
                    } as CSSProperties}
                >
                    OSS: <span style={{ color: 'var(--color-ink)' }}>{contributions.length} merged contributions</span> across open-source projects.
                </p>
                <a
                    className="btn btn-ghost"
                    href={bio.contact.github}
                    target="_blank"
                    rel="noreferrer"
                    style={{ marginTop: '1.25rem', display: 'inline-flex' }}
                >
                    GitHub Profile ↗
                </a>
            </div>
        </div>
    );
}
