import { useEffect, useRef, useState } from 'react';
import { useTimecode } from '../hooks/useTimecode';

interface TrackLine {
    id: number;
    y: number;
    h: number;
    color: string;
}

export default function VCREffects() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [lines, setLines] = useState<TrackLine[]>([]);
    const [flash, setFlash] = useState(false);
    const [channelBlip, setChannelBlip] = useState(false);
    const timecode = useTimecode();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        let raf: number;
        let frame = 0;
        const draw = () => {
            if (frame % 2 === 0) {
                const id = ctx.createImageData(canvas.width, canvas.height);
                const d = id.data;
                for (let i = 0; i < d.length; i += 4) {
                    if (Math.random() > 0.964) {
                        const v = Math.floor(Math.random() * 255);
                        d[i] = v; d[i + 1] = v; d[i + 2] = v;
                        d[i + 3] = Math.floor(Math.random() * 90 + 30);
                    }
                }
                ctx.putImageData(id, 0, 0);
            }
            frame++;
            raf = requestAnimationFrame(draw);
        };
        draw();
        return () => cancelAnimationFrame(raf);
    }, []);

    useEffect(() => {
        let t: ReturnType<typeof setTimeout>;
        const spawn = () => {
            const count = Math.floor(Math.random() * 5) + 1;
            setLines(
                Array.from({ length: count }, (_, i) => ({
                    id: Date.now() + i,
                    y: Math.random() * 100,
                    h: Math.random() > 0.55 ? Math.random() * 7 + 1 : 1,
                    color: Math.random() > 0.72
                        ? `hsla(${Math.floor(Math.random() * 360)},100%,70%,${(0.25 + Math.random() * 0.45).toFixed(2)})`
                        : `rgba(255,255,255,${(0.2 + Math.random() * 0.45).toFixed(2)})`,
                }))
            );
            setTimeout(() => setLines([]), 55 + Math.random() * 145);
            t = setTimeout(spawn, 1700 + Math.random() * 3800);
        };
        t = setTimeout(spawn, 900 + Math.random() * 2000);
        return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        let t: ReturnType<typeof setTimeout>;
        const drop = () => {
            setFlash(true);
            setTimeout(() => setFlash(false), 45 + Math.random() * 95);
            t = setTimeout(drop, 4000 + Math.random() * 8000);
        };
        t = setTimeout(drop, 2000 + Math.random() * 3500);
        return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        let t: ReturnType<typeof setTimeout>;
        const blip = () => {
            setChannelBlip(true);
            setTimeout(() => setChannelBlip(false), 650 + Math.random() * 500);
            t = setTimeout(blip, 9000 + Math.random() * 14000);
        };
        t = setTimeout(blip, 6000 + Math.random() * 7000);
        return () => clearTimeout(t);
    }, []);

    return (
        <>
            <canvas
                ref={canvasRef}
                width={160}
                height={90}
                style={{
                    position: 'absolute', inset: 0,
                    width: '100%', height: '100%',
                    pointerEvents: 'none',
                    opacity: 0.042,
                    imageRendering: 'pixelated',
                    zIndex: 6,
                    mixBlendMode: 'screen',
                }}
            />

            {lines.map(l => (
                <div
                    key={l.id}
                    style={{
                        position: 'absolute',
                        top: `${l.y}%`,
                        left: 0, right: 0,
                        height: `${l.h}px`,
                        background: l.color,
                        pointerEvents: 'none',
                        zIndex: 7,
                        filter: 'blur(0.4px)',
                        mixBlendMode: 'overlay',
                    }}
                />
            ))}

            {flash && (
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'rgba(255,255,255,0.07)',
                    pointerEvents: 'none', zIndex: 8,
                    mixBlendMode: 'overlay',
                }} />
            )}

            <div style={{
                position: 'absolute',
                bottom: '2rem', right: '2rem',
                fontFamily: 'var(--font-geist-mono)',
                fontSize: '11px',
                color: 'rgba(255,255,255,0.38)',
                letterSpacing: '0.12em',
                pointerEvents: 'none', zIndex: 9,
                userSelect: 'none',
            }}>
                {timecode}
            </div>

            <div style={{
                position: 'absolute',
                top: '2rem', left: '2rem',
                display: 'flex', alignItems: 'center', gap: '6px',
                fontFamily: 'var(--font-geist-mono)',
                fontSize: '11px',
                color: '#f03',
                letterSpacing: '0.14em',
                pointerEvents: 'none', zIndex: 9,
                userSelect: 'none',
            }}>
                <span className="rec-dot" />
                REC
            </div>

            {channelBlip && (
                <div style={{
                    position: 'absolute',
                    top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontFamily: 'var(--font-geist-mono)',
                    fontSize: '52px',
                    fontWeight: 700,
                    color: 'rgba(255,255,255,0.07)',
                    pointerEvents: 'none', zIndex: 9,
                    userSelect: 'none',
                    letterSpacing: '0.25em',
                }}>
                    CH 01
                </div>
            )}
        </>
    );
}
