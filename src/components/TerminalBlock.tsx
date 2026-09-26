import { useMemo } from 'react';
import { profile } from '../data/profile';
import { useTypewriter, type TypewriterRow } from '../hooks/useTypewriter';

interface TerminalBlockProps {
    revealed?: boolean;
    className?: string;
}

export default function TerminalBlock({ revealed = true, className = '' }: TerminalBlockProps) {
    const { bio } = profile;

    const rows: TypewriterRow[] = useMemo(
        () => [
            { cmd: 'whoami', out: bio.name },
            { cmd: 'role', out: bio.role },
            { cmd: 'mail', out: bio.contact.email, href: `mailto:${bio.contact.email}` },
            { cmd: 'github', out: 'nachitodev', href: bio.contact.github },
            { cmd: 'linkedin', out: 'nachitodev', href: bio.contact.linkedin },
        ],
        [bio]
    );

    const { visibleLines, typedChars, isDone } = useTypewriter(rows, { enabled: revealed });

    return (
        <div className={`flex flex-col gap-3.5 font-mono text-xs ${className}`.trim()}>
            {rows.map((r, i) => {
                const fullCmd = `$ ${r.cmd}`;
                const isCurrentLine = visibleLines === i;
                const isTyped = visibleLines > i;
                if (!revealed || (!isTyped && !isCurrentLine)) return null;

                const displayCmd = isCurrentLine ? fullCmd.slice(0, typedChars) : fullCmd;

                return (
                    <div
                        key={r.cmd}
                        className="flex flex-wrap gap-2 leading-relaxed items-baseline transition-opacity duration-200"
                        style={{ opacity: isTyped ? 1 : 0.9 }}
                    >
                        <span style={{ color: 'var(--color-accent)', flexShrink: 0 }}>
                            {displayCmd}
                            {isCurrentLine && (
                                <span className="cursor-blink ml-0.5" style={{ color: 'var(--color-accent)' }}>
                                    █
                                </span>
                            )}
                        </span>
                        {isTyped && (
                            <>
                                <span style={{ color: 'var(--color-dim)', flexShrink: 0 }}>→</span>
                                {r.href ? (
                                    <a
                                        href={r.href}
                                        {...(r.cmd === 'mail' ? {} : { target: '_blank', rel: 'noreferrer' })}
                                        className="text-ink no-underline transition-colors hover:text-accent-2 focus-visible:outline-accent-2"
                                        style={{ color: 'var(--color-ink)' }}
                                    >
                                        {r.out}
                                    </a>
                                ) : (
                                    <span style={{ color: 'var(--color-ink)' }}>{r.out}</span>
                                )}
                            </>
                        )}
                    </div>
                );
            })}
            {isDone && (
                <div className="flex gap-2 leading-relaxed items-center">
                    <span style={{ color: 'var(--color-accent)' }}>$</span>
                    <span style={{ color: 'var(--color-ink)' }}>
                        ./say_hi{' '}
                        <span className="cursor-blink ml-0.5" style={{ color: 'var(--color-accent)' }}>
                            █
                        </span>
                    </span>
                </div>
            )}
        </div>
    );
}
