import type { CSSProperties } from 'react';

interface StatChipProps {
    emoji: string;
    label: string;
    delay?: number;
    revealed?: boolean;
    className?: string;
}

export default function StatChip({
    emoji,
    label,
    delay = 0,
    revealed = true,
    className = '',
}: StatChipProps) {
    return (
        <span
            className={`${revealed ? 'rv-badge-pop' : 'rv-badge-hidden'} ${className}`.trim()}
            style={{ '--rv-delay': `${delay}ms` } as CSSProperties}
        >
            <span className="stat-chip">
                <span className="text-sm shrink-0">{emoji}</span>
                <span>{label}</span>
            </span>
        </span>
    );
}
