import type { CSSProperties, RefObject } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { profile } from '../data/profile';
import DecryptText from './DecryptText';
import StatChip from './StatChip';
import Button from './Button';

export default function Hero() {
    const { bio } = profile;
    const { ref, revealed } = useScrollReveal(0.15);

    const statsRow1 = [
        { emoji: '📍', label: bio.location },
        { emoji: '🎂', label: `${bio.age} years old` },
        { emoji: '💻', label: `Coding since ${bio.startedAt}` },
    ];
    const statsRow2 = [
        { emoji: '🗣️', label: bio.languages.map(l => `${l.language} (${l.level})`).join(' · ') },
        { emoji: '⚙️', label: bio.interests.join(', ') },
    ];

    const totalChips = statsRow1.length + statsRow2.length;
    const buttonDelay = 240 + totalChips * 60;

    return (
        <div
            ref={ref as RefObject<HTMLDivElement>}
            className="w-full max-w-[880px] mx-auto px-4 sm:px-8 flex flex-col items-center text-center"
        >
            <h1
                className={`font-bold leading-tight ${revealed ? 'rv-fade-up' : 'rv-hidden'}`}
                style={{
                    color: 'var(--color-ink)',
                    fontSize: 'var(--text-hero)',
                    marginBottom: '1rem',
                    '--rv-delay': '0ms',
                } as CSSProperties}
            >
                <DecryptText text={bio.name} duration={1000} />
            </h1>

            <p
                className={`subtitle-flicker font-mono uppercase tracking-[0.18em] text-card ${
                    revealed ? 'rv-fade-up' : 'rv-hidden'
                }`}
                style={{
                    color: 'var(--color-accent-2)',
                    marginBottom: '2rem',
                    '--rv-delay': '80ms',
                } as CSSProperties}
            >
                {bio.role}
            </p>

            <p
                className={`text-base max-w-[600px] leading-relaxed ${revealed ? 'rv-fade-up' : 'rv-hidden'}`}
                style={{
                    color: 'var(--color-dim)',
                    lineHeight: '1.7',
                    marginBottom: '1.5rem',
                    '--rv-delay': '160ms',
                } as CSSProperties}
            >
                {bio.summary}
            </p>

            <div
                className="w-12 h-[1px] mb-6 rounded-xs"
                style={{ background: 'rgba(38, 217, 227, 0.2)' }}
            />

            <div className="flex flex-col items-center gap-2.5 mb-10">
                <div className="flex flex-wrap justify-center gap-2">
                    {statsRow1.map((s, i) => (
                        <StatChip
                            key={s.label}
                            emoji={s.emoji}
                            label={s.label}
                            revealed={revealed}
                            delay={240 + i * 60}
                        />
                    ))}
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                    {statsRow2.map((s, i) => (
                        <StatChip
                            key={s.label}
                            emoji={s.emoji}
                            label={s.label}
                            revealed={revealed}
                            delay={420 + i * 60}
                        />
                    ))}
                </div>
            </div>

            <div
                className={`flex flex-wrap justify-center gap-4 ${revealed ? 'rv-fade-up' : 'rv-hidden'}`}
                style={{ '--rv-delay': `${buttonDelay}ms` } as CSSProperties}
            >
                <Button
                    variant="primary"
                    href="#work"
                    icon={
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9" />
                        </svg>
                    }
                >
                    View Work
                </Button>
                <Button
                    variant="ghost"
                    href="#contact"
                    icon={
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="4" width="20" height="16" rx="2" />
                            <path d="m22 7-10 7L2 7" />
                        </svg>
                    }
                >
                    Contact
                </Button>
            </div>
        </div>
    );
}
