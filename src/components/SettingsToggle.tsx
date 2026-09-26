import { useEffect, useState } from 'react';
import { readFlag, writeFlag } from '../lib/storage';

export default function SettingsToggle() {
    const [autoSkip, setAutoSkip] = useState(() => readFlag('auto_skip_intro'));
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleAutoSkip = () => {
        const next = !autoSkip;
        setAutoSkip(next);
        writeFlag('auto_skip_intro', next);
    };

    return (
        <div
            className={`fixed top-6 right-8 z-50 transition-all duration-500 ${
                isScrolled ? 'opacity-0 pointer-events-none -translate-y-4' : 'opacity-100 translate-y-0'
            }`}
        >
            <button
                type="button"
                onClick={toggleAutoSkip}
                className="bg-transparent border-none cursor-pointer p-0 hover:opacity-80 transition-opacity focus-visible:outline-accent"
                style={{
                    fontFamily: 'var(--font-bios-ibm)',
                    fontSize: '11px',
                    letterSpacing: '0.15em',
                    color: autoSkip ? '#39ff14' : '#ff6b35',
                    textShadow: autoSkip ? '0 0 5px #39ff1499' : '0 0 5px #ff6b3599',
                    transition: 'color 0.15s, text-shadow 0.15s',
                }}
            >
                {autoSkip ? 'SKIP-INTRO: ON ' : 'SKIP-INTRO: OFF'}
            </button>
        </div>
    );
}
