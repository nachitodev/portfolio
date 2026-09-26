export const THEME = {
    colors: {
        bg: '#04070a',
        panel: '#0a1117',
        panel2: '#10202a',
        panelBg: 'rgba(10, 17, 23, 0.86)',
        cardBg: 'rgba(10, 17, 23, 0.82)',
        chipBg: 'rgba(16, 32, 42, 0.55)',
        tagBg: 'rgba(16, 32, 42, 0.6)',
        ink: '#dce9e6',
        dim: '#7d9a95',
        accent: '#3dff7a',
        accent2: '#26d9e3',
        warn: '#ffb454',
        danger: '#ff4d6d',
        line: 'rgba(38, 217, 227, 0.14)',
        borderHover: 'rgba(61, 255, 122, 0.5)',
        glowHover: 'rgba(61, 255, 122, 0.18)',
    },
    fonts: {
        sans: 'var(--font-geist-sans)',
        mono: 'var(--font-geist-mono)',
        bios: 'var(--font-bios-ibm)',
    },
    radii: {
        default: 'var(--radius)',
        badge: '8px',
        chip: '999px',
    },
    animation: {
        easing: {
            smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
            pop: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
            hover: 'cubic-bezier(0.16, 1, 0.3, 1)',
        },
        duration: {
            reveal: 600,
            slide: 500,
            pop: 500,
            underline: 400,
            hover: 220,
            pulse: 1400,
        },
        stagger: {
            default: 60,
            badge: 45,
            card: 70,
            list: 65,
        },
    },
} as const;

export type Theme = typeof THEME;
