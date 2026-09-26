import type { CSSProperties } from 'react';
import SkillBadge from './SkillBadge';

interface SkillCategoryProps {
    category: string;
    icon: string;
    items: string[];
    revealed?: boolean;
    stagger?: number;
    baseDelay?: number;
    itemBaseDelay?: number;
    className?: string;
}

export default function SkillCategory({
    category,
    icon,
    items,
    revealed = true,
    stagger = 45,
    baseDelay = 0,
    itemBaseDelay = 100,
    className = '',
}: SkillCategoryProps) {
    return (
        <div className={className}>
            <p
                className={revealed ? 'rv-fade-up' : 'rv-hidden'}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontFamily: 'var(--font-geist-mono)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: 'var(--color-dim)',
                    marginBottom: '0.75rem',
                    '--rv-delay': `${baseDelay}ms`,
                } as CSSProperties}
            >
                <span style={{ lineHeight: 1 }}>{icon}</span>
                {category}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {items.map((item, index) => (
                    <SkillBadge
                        key={item}
                        name={item}
                        revealed={revealed}
                        delay={revealed ? itemBaseDelay + index * stagger : 0}
                    />
                ))}
            </div>
        </div>
    );
}
