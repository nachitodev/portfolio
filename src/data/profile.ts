export interface BioLanguage {
    language: string;
    level: string;
}

export interface ProfileBio {
    name: string;
    role: string;
    age: number;
    location: string;
    education: string;
    startedAt: number;
    languages: BioLanguage[];
    interests: string[];
    summary: string;
    contact: { email: string; github: string; linkedin: string };
}

export interface SkillCategory {
    category: string;
    icon: string;
    items: string[];
}

export interface Contribution {
    project: string;
    url: string;
    description: string;
    icon: string;
}

export interface Disclosure {
    organization: string;
    url?: string;
}

export interface Profile {
    bio: ProfileBio;
    skills: SkillCategory[];
    contributions: Contribution[];
    disclosures: Disclosure[];
}

export const profile: Profile = {
    bio: {
        name: 'Ignacio Maidana',
        role: 'Full Stack Developer & Backend Engineer',
        age: 18,
        location: 'Argentina',
        education: 'Computer Science, University of Buenos Aires (UBA)',
        startedAt: 13,
        languages: [
            { language: 'Spanish', level: 'native' },
            { language: 'English', level: 'B1' },
        ],
        interests: ['DevOps', 'open source', 'gaming', 'agriculture'],
        summary:
            'Full-stack developer from Argentina, focused on backend. Computer Science student at the University of Buenos Aires. Started programming at 13 with Python.',
        contact: {
            email: 'nachito.dev@proton.me',
            github: 'https://github.com/nachitodev',
            linkedin: 'https://linkedin.com/in/nachitodev',
        },
    },
    skills: [
        {
            category: 'Languages',
            icon: '💻',
            items: ['TypeScript', 'JavaScript', 'Python', 'Go', 'Rust', 'HTML', 'CSS', 'GNU Bash', 'PowerShell'],
        },
        {
            category: 'Frameworks',
            icon: '📚',
            items: [
                'Tailwind CSS', 'Fastify', 'NestJS', 'Vite', 'React', 'Prisma', 'Tauri', 'Express',
                'NGINX', 'React Native', 'Expo', 'Electron', 'Flask', 'Jest',
            ],
        },
        {
            category: 'Tools',
            icon: '🛠️',
            items: [
                'Insomnia', 'Git', 'Docker', 'Node.js', 'Vim', 'Bun', 'Figma',
                'VS Code', 'Visual Studio', 'Cursor', 'Claude', 'Google Gemini',
            ],
        },
        {
            category: 'Databases & Cloud',
            icon: '☁️',
            items: ['PostgreSQL', 'Supabase', 'MySQL', 'Vercel', 'GitHub Actions', 'Cloudflare', 'Redis', 'MongoDB', 'GitHub', 'AWS', 'Azure', 'Google Cloud'],
        },
        {
            category: 'OS',
            icon: '🛡️',
            items: ['Debian', 'Arch Linux', 'Ubuntu', 'Windows'],
        },
    ],
    contributions: [
        {
            project: 'Strudel (TidalCycles ecosystem)',
            url: 'https://github.com/tidalcycles/strudel/pull/1350',
            description: 'Improvements and fixes',
            icon: '🔧',
        },
        {
            project: 'Polybar Scripts',
            url: 'https://github.com/polybar/polybar-scripts/pull/420/changes',
            description: 'Script enhancements and optimizations',
            icon: '🎛️',
        },
        {
            project: 'WebSocketFabric',
            url: 'https://github.com/KernelFreeze/WebSocketFabric/pull/2/changes',
            description: 'Feature improvements',
            icon: '🌐',
        },
        {
            project: '8ball WhatsApp Bot',
            url: 'https://github.com/nicolascarlino/8ball-whatsapp-bot/pull/1',
            description: 'Code contributions',
            icon: '🤖',
        },
        {
            project: 'WMPotify',
            url: 'https://github.com/Ingan121/WMPotify/pull/109',
            description: 'Enhancements and fixes',
            icon: '🎵',
        },
        {
            project: 'Cornutron3000',
            url: 'https://github.com/maximoospital/cornutron3000/pull/6',
            description: 'Improvements and optimizations',
            icon: '🚜',
        },
        {
            project: 'Fabric Carpet',
            url: 'https://github.com/gnembon/fabric-carpet/pull/1869/changes',
            description: 'Contribution to the Minecraft mod ecosystem',
            icon: '🧱',
        },
    ],
    disclosures: [
        { organization: 'Spazios — Desarrolladora Inmobiliaria', url: 'https://spazios.com.ar/' },
        { organization: 'Ministerio de Seguridad de la Nación Argentina', url: 'https://www.argentina.gob.ar/seguridad' },
        { organization: 'REPROCANN — Ministerio de Salud Argentina', url: 'https://www.argentina.gob.ar/salud/cannabis-medicinal/reprocann' },
        { organization: 'Municipalidad de San Nicolás', url: 'https://www.sannicolasciudad.gob.ar/' },
        { organization: 'RENAPER — Registro Nacional de las Personas', url: 'https://www.argentina.gob.ar/interior/renaper' },
        { organization: 'Becas Progresar — Becas Estudiantiles', url: 'https://becasprogresar.educacion.gob.ar/' },
        { organization: 'Private companies under NDA' },
    ],
};