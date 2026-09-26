import type { CSSProperties } from 'react';
import { skillIcon } from '../lib/skillIcons';

interface SkillBadgeProps {
    name: string;
    delay?: number;
    revealed?: boolean;
    className?: string;
}

export default function SkillBadge({
    name,
    delay = 0,
    revealed = true,
    className = '',
}: SkillBadgeProps) {
    const icon = skillIcon(name);

    if (!revealed) {
        return <span className="rv-badge-hidden" style={{ display: 'none' }} />;
    }

    return (
        <span
            className={`rv-badge-pop ${className}`.trim()}
            style={{
                '--rv-delay': `${delay}ms`,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: 'var(--font-geist-mono)',
                fontSize: '0.76rem',
                letterSpacing: '0.03em',
                color: 'var(--color-ink)',
                background: 'rgba(16,32,42,0.6)',
                border: '1px solid rgba(38,217,227,0.14)',
                borderRadius: '8px',
                padding: '5px 10px',
                lineHeight: '1',
                whiteSpace: 'nowrap',
            } as CSSProperties}
        >
            {icon ? (
                <svg
                    role="img"
                    aria-label={icon.title}
                    viewBox="0 0 24 24"
                    width={12}
                    height={12}
                    fill={`#${icon.hex}`}
                    style={{ flexShrink: 0 }}
                >
                    <path d={icon.path} />
                </svg>
            ) : (
                <span
                    style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: 'rgba(38, 217, 227, 0.35)',
                        flexShrink: 0,
                        display: 'inline-block',
                    }}
                />
            )}
            {name}
        </span>
    );
}
