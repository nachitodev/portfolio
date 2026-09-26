import type { CSSProperties } from 'react';

interface SectionHeaderProps {
    number?: string;
    label?: string;
    title: string;
    revealed?: boolean;
    color?: string;
    withUnderline?: boolean;
    className?: string;
}

export default function SectionHeader({
    number,
    label,
    title,
    revealed = true,
    color = 'var(--color-accent-2)',
    withUnderline = true,
    className = '',
}: SectionHeaderProps) {
    const subtitleText = [number, label].filter(Boolean).join(' // ');

    return (
        <div className={`w-full ${className}`.trim()} style={{ marginBottom: '2.5rem' }}>
            {subtitleText && (
                <p
                    className={`overline ${withUnderline ? 'rv-label-wrap' : ''} ${
                        revealed ? `rv-slide-left ${withUnderline ? 'rv-revealed' : ''}` : 'rv-hidden-left'
                    }`.trim()}
                    style={{
                        color,
                        marginBottom: '0.75rem',
                        '--rv-delay': '0ms',
                    } as CSSProperties}
                >
                    {subtitleText}
                </p>
            )}
            <h2
                className={`font-sans font-bold ${revealed ? 'rv-fade-up' : 'rv-hidden'}`}
                style={{
                    fontSize: 'var(--step-2)',
                    color: 'var(--color-ink)',
                    marginBottom: 0,
                    '--rv-delay': '100ms',
                } as CSSProperties}
            >
                {title}
            </h2>
        </div>
    );
}
