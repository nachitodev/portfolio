import { useEffect, useLayoutEffect, useState, useRef, useCallback } from 'react';
import { readFlag, writeFlag } from '../lib/storage';
import { BOOT_LINES, GLITCH_LINE_INDICES } from '../data/boot';

const BOOT_SOUND = "/sounds/boot.mp3";
const STARTUP_SOUND = "/sounds/startup.mp3";

function playStartupSound(muted: boolean) {
    if (muted) return;
    const startupAudio = new window.Audio(STARTUP_SOUND);
    startupAudio.volume = 0.8;
    startupAudio.play().catch(() => { });
}

interface RenderedLine {
    text: string;
    glitched: boolean;
    done: boolean;
}

function ParsedLine({ line, glitched }: { line: string; glitched: boolean }) {
    if (!line) return <div>&nbsp;</div>;
    const parts = line.split(/(\[.*?\])/g);
    return (
        <div style={{ color: glitched ? '#ff6b35' : undefined }}>
            {parts.map((part, j) =>
                part.startsWith("[") ? (
                    <span key={j} style={{ color: glitched ? '#ff9900' : '#39ff14', textShadow: glitched ? '0 0 8px #ff6b35' : '0 0 6px #39ff14, 0 0 12px #39ff1480' }}>{part}</span>
                ) : (
                    <span key={j}>{part}</span>
                )
            )}
        </div>
    );
}

export default function BootAnimation({ onFinish }: { onFinish: () => void }) {
    const bootAudioRef = useRef<HTMLAudioElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [renderedLines, setRenderedLines] = useState<RenderedLine[]>([]);
    const [lineIndex, setLineIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [started, setStarted] = useState(false);
    const [finishing, setFinishing] = useState(false);
    const [muted, setMuted] = useState(() => readFlag('boot_muted'));
    const [powerOn, setPowerOn] = useState(false);

    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const glitchTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const finishFiredRef = useRef(false);

    useLayoutEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [renderedLines]);

    const applyRandomGlitch = useCallback(() => {
        setRenderedLines(prev => {
            if (prev.length < 2) return prev;
            const copy = [...prev];
            const targetIdx = Math.floor(Math.random() * Math.max(1, copy.length - 1));
            if (GLITCH_LINE_INDICES.has(targetIdx)) {
                copy[targetIdx] = { ...copy[targetIdx], glitched: true };

                setTimeout(() => {
                    setRenderedLines(p => {
                        const c = [...p];
                        if (c[targetIdx]) c[targetIdx] = { ...c[targetIdx], glitched: false };
                        return c;
                    });
                }, 120);
            }
            return copy;
        });
    }, []);

    useEffect(() => {
        const bootEl = bootAudioRef.current;
        if (!bootEl) return;

        const onBootEnded = () => {
            playStartupSound(muted);
            setFinishing(true);
        };

        bootEl.addEventListener("ended", onBootEnded);
        return () => { bootEl.removeEventListener("ended", onBootEnded); };
    }, [muted]);

    useEffect(() => {
        if (!finishing) return;
        if (lineIndex < BOOT_LINES.length) return;
        if (finishFiredRef.current) return;
        finishFiredRef.current = true;

        setTimeout(onFinish, 800);
    }, [finishing, lineIndex, onFinish]);

    useEffect(() => {
        if (!started) return;
        if (lineIndex >= BOOT_LINES.length) return;

        const currentLine = BOOT_LINES[lineIndex];

        if (!currentLine) {
            timerRef.current = setTimeout(() => {
                setRenderedLines(prev => [...prev, { text: '', glitched: false, done: true }]);
                setLineIndex(i => i + 1);
                setCharIndex(0);
            }, 0);
            return () => { if (timerRef.current) clearTimeout(timerRef.current); };
        }

        if (finishing) {
            timerRef.current = setTimeout(() => {
                setRenderedLines(prev => {
                    const copy = [...prev];
                    copy[lineIndex] = { text: currentLine, glitched: false, done: true };
                    return copy;
                });
                setLineIndex(li => li + 1);
                setCharIndex(0);
            }, 40);
            return () => { if (timerRef.current) clearTimeout(timerRef.current); };
        }

        const bootEl = bootAudioRef.current;
        const bootDuration = bootEl && !isNaN(bootEl.duration) && bootEl.duration > 0
            ? bootEl.duration * 1000
            : 13328;

        const timePerLine = bootDuration / BOOT_LINES.length;
        const timePerChar = timePerLine / Math.max(currentLine.length, 1);

        const delay = Math.min(40, Math.max(8, timePerChar));

        if (charIndex < currentLine.length) {
            timerRef.current = setTimeout(() => {
                setCharIndex(ci => {
                    const nextCi = ci + 1;
                    const visible = currentLine.slice(0, nextCi);
                    setRenderedLines(prev => {
                        const copy = [...prev];
                        copy[lineIndex] = { text: visible, glitched: false, done: false };
                        return copy;
                    });
                    return nextCi;
                });
            }, delay);
        } else {

            timerRef.current = setTimeout(() => {
                setRenderedLines(prev => {
                    const copy = [...prev];
                    if (copy[lineIndex]) copy[lineIndex] = { ...copy[lineIndex], done: true };
                    return copy;
                });
                setLineIndex(li => li + 1);
                setCharIndex(0);
            }, delay * 2);
        }

        return () => { if (timerRef.current) clearTimeout(timerRef.current); };
    }, [started, finishing, lineIndex, charIndex]);

    useEffect(() => {
        if (!started) return;
        glitchTimerRef.current = setInterval(applyRandomGlitch, 800);
        return () => { if (glitchTimerRef.current) clearInterval(glitchTimerRef.current); };
    }, [started, applyRandomGlitch]);

    const handleStart = () => {
        if (started) return;

        setPowerOn(true);
        setTimeout(() => setPowerOn(false), 60);
        setTimeout(() => setPowerOn(true), 120);
        setTimeout(() => setPowerOn(false), 160);
        setTimeout(() => setPowerOn(true), 300);
        setTimeout(() => setPowerOn(false), 420);

        const bootEl = bootAudioRef.current;
        if (bootEl) {
            bootEl.volume = muted ? 0 : 1;
            bootEl.currentTime = 0;
            bootEl.play().catch(() => {
                setTimeout(() => {

                    setFinishing(true);
                }, 13328);
            });
        }
        setStarted(true);
        setLineIndex(0);
        setCharIndex(0);
    };

    const handleSkipKeyboard = () => {
        if (!started) {
            setStarted(true);
            setLineIndex(0);
            setCharIndex(0);
        }
        playStartupSound(muted);
        const bootEl = bootAudioRef.current;
        if (bootEl) { bootEl.pause(); bootEl.volume = 0; }
        setFinishing(true);
    };

    const handleSkip = (e: React.MouseEvent) => {
        e.stopPropagation();
        handleSkipKeyboard();
    };

    const handleToggleMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        setMuted(m => {
            const next = !m;
            const bootEl = bootAudioRef.current;
            if (bootEl) bootEl.volume = next ? 0 : 1;
            writeFlag('boot_muted', next);
            return next;
        });
    };

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                if (!started) {
                    setStarted(true);
                    setLineIndex(0);
                    setCharIndex(0);
                }
                playStartupSound(muted);
                const bootEl = bootAudioRef.current;
                if (bootEl) { bootEl.pause(); bootEl.volume = 0; }
                setFinishing(true);
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [started, muted]);

    const currentlyTypingLine = started && lineIndex < BOOT_LINES.length
        ? renderedLines[lineIndex]?.text ?? ''
        : null;

    const progress = lineIndex >= BOOT_LINES.length ? 100 : (lineIndex / BOOT_LINES.length) * 100;

    return (
        <div
            onClick={handleStart}
            style={{
                position: 'fixed',
                inset: 0,
                background: '#000',
                cursor: 'pointer',
                userSelect: 'none',

                perspective: '1200px',
            }}
        >
            <audio ref={bootAudioRef} src={BOOT_SOUND} preload="auto" />
            <link rel="preload" as="audio" href={STARTUP_SOUND} />

            <div style={{
                position: 'absolute',
                inset: 0,
                overflow: 'hidden',
                opacity: powerOn ? 0.05 : 1,
                transition: 'opacity 0.04s',
            }}>
                <div style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'rgba(0,255,20,0.12)',
                    pointerEvents: 'none',
                    zIndex: 12,
                    animation: 'scanRoll 8s linear infinite',
                }} />

                <div
                    ref={containerRef}
                    style={{
                        height: '100%',
                        overflowY: 'auto',
                        padding: '2rem 2.5rem 6rem 2.5rem',
                        fontFamily: '"BIOS IBM", monospace',
                        fontSize: '14px',
                        lineHeight: '1.6',
                        color: '#d4ffb8',
                        textShadow: '0 0 3px #39ff1490',
                        position: 'relative',
                        zIndex: 100,

                        scrollbarWidth: 'none',
                    }}
                >
                    {!started ? (

                        <div style={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '1.5rem',
                        }}>
                            <pre style={{
                                color: '#39ff14',
                                textShadow: '0 0 4px #39ff1499',
                                fontSize: '11px',
                                lineHeight: '1.2',
                                textAlign: 'center',
                                letterSpacing: '0.05em',
                            }}>{`
  ███╗   ██╗ █████╗  ██████╗██╗  ██╗██╗████████╗ ██████╗ 
  ████╗  ██║██╔══██╗██╔════╝██║  ██║██║╚══██╔══╝██╔═══██╗
  ██╔██╗ ██║███████║██║     ███████║██║   ██║   ██║   ██║
  ██║╚██╗██║██╔══██║██║     ██╔══██║██║   ██║   ██║   ██║
  ██║ ╚████║██║  ██║╚██████╗██║  ██║██║   ██║   ╚██████╔╝
  ╚═╝  ╚═══╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝   ╚═╝    ╚═════╝ 
                    BIOS v${(new Date().getFullYear() - 2008).toString()[0]}.${(new Date().getFullYear() - 2008).toString()[1]} // 2008-${new Date().getFullYear()}
`}</pre>
                            <div style={{
                                color: '#39ff14',
                                textShadow: '0 0 4px #39ff1480',
                                fontSize: '16px',
                                letterSpacing: '0.3em',
                                textTransform: 'uppercase',
                                animation: 'blink 1s step-end infinite',
                            }}>
                                ▶ CLICK ANYWHERE TO BOOT ◀
                            </div>
                            <div style={{
                                color: '#3a6b35',
                                fontSize: '11px',
                                letterSpacing: '0.15em',
                            }}>
                                SYSTEM READY — AWAITING INPUT
                            </div>

                            <div style={{
                                display: 'flex',
                                gap: '2.5rem',
                                marginTop: '0.5rem',
                                alignItems: 'center',
                            }}>
                                <button
                                    onClick={handleToggleMute}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontFamily: '"BIOS IBM", monospace',
                                        fontSize: '11px',
                                        letterSpacing: '0.15em',
                                        color: muted ? '#ff6b35' : '#3a6b35',
                                        textShadow: muted ? '0 0 5px #ff6b3599' : 'none',
                                        padding: 0,
                                        transition: 'color 0.15s, text-shadow 0.15s',
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.color = muted ? '#ff9966' : '#39ff14';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.color = muted ? '#ff6b35' : '#3a6b35';
                                    }}
                                >
                                    {muted ? 'SOUND: OFF' : 'SOUND: ON'}
                                </button>

                                <span style={{ color: '#1e3d1a', fontSize: '11px' }}>│</span>

                                <button
                                    onClick={handleSkip}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontFamily: '"BIOS IBM", monospace',
                                        fontSize: '11px',
                                        letterSpacing: '0.15em',
                                        color: '#3a6b35',
                                        padding: 0,
                                        transition: 'color 0.15s',
                                    }}
                                    onMouseEnter={e => (e.currentTarget.style.color = '#39ff14')}
                                    onMouseLeave={e => (e.currentTarget.style.color = '#3a6b35')}
                                >
                                    SKIP INTRO
                                </button>
                            </div>

                            <div style={{
                                marginTop: '0.5rem',
                                fontSize: '11px',
                                letterSpacing: '0.15em',
                                color: '#3a6b35',
                            }}>
                                ⚠ PRESS ENTER TO SKIP INTRO
                            </div>

                            <div style={{
                                position: 'absolute',
                                bottom: '2rem',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '0.5rem',
                                color: '#3a6b35',
                                fontSize: '11px',
                                letterSpacing: '0.1em',
                                textAlign: 'center',
                            }}>
                                <div>
                                    <span style={{ color: '#ff6b35' }}>⚠ WARNING:</span> CONTAINS FLASHING LIGHTS WHICH MAY AFFECT PHOTOSENSITIVE INDIVIDUALS.
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <span>© {new Date().getFullYear()} IGNACIO MAIDANA</span>
                                    <span>│</span>
                                    <a
                                        href="https://github.com/nachitodev"
                                        target="_blank"
                                        rel="noreferrer"
                                        style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}
                                        onMouseEnter={e => e.currentTarget.style.color = '#39ff14'}
                                        onMouseLeave={e => e.currentTarget.style.color = '#3a6b35'}
                                        onClick={e => e.stopPropagation()}
                                    >GITHUB</a>
                                    <span>│</span>
                                    <a
                                        href="https://linkedin.com/in/nachitodev"
                                        target="_blank"
                                        rel="noreferrer"
                                        style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}
                                        onMouseEnter={e => e.currentTarget.style.color = '#39ff14'}
                                        onMouseLeave={e => e.currentTarget.style.color = '#3a6b35'}
                                        onClick={e => e.stopPropagation()}
                                    >LINKEDIN</a>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            {renderedLines.map((rl, i) => (
                                <ParsedLine key={i} line={rl.text} glitched={rl.glitched} />
                            ))}

                            {currentlyTypingLine !== null && (
                                <span style={{
                                    color: '#39ff14',
                                    textShadow: '0 0 6px #39ff14',
                                    animation: 'blink 0.6s step-end infinite',
                                    fontSize: '14px',
                                }}>█</span>
                            )}

                            <div style={{
                                position: 'fixed',
                                bottom: '1.5rem',
                                left: '2.5rem',
                                right: '2.5rem',
                                zIndex: 20,
                            }}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    fontSize: '10px',
                                    color: '#3a6b35',
                                    letterSpacing: '0.1em',
                                    marginBottom: '4px',
                                }}>
                                    <span>LOADING SYSTEM...</span>
                                    <span>{Math.floor(progress)}%</span>
                                </div>
                                <div style={{
                                    height: '4px',
                                    background: 'rgba(57,255,20,0.12)',
                                    border: '1px solid rgba(57,255,20,0.25)',
                                    borderRadius: '2px',
                                    overflow: 'hidden',
                                }}>
                                    <div style={{
                                        height: '100%',
                                        width: `${progress}%`,
                                        background: 'linear-gradient(90deg, #1a8c0d, #39ff14)',
                                        boxShadow: '0 0 8px #39ff14',
                                        transition: 'width 0.4s ease-out',
                                    }} />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}