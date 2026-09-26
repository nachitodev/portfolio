import {
    siArchlinux, siBun, siClaude, siCloudflare, siCss, siCursor, siDebian, siDocker,
    siElectron, siExpo, siExpress, siFastify, siFigma, siFlask, siGit, siGithub, siGithubactions,
    siGnubash, siGo, siGooglecloud, siGooglegemini, siHtml5, siInsomnia, siJavascript,
    siJest, siMongodb, siMysql, siNestjs, siNginx, siNodedotjs, siPostgresql, siPrisma,
    siPython, siReact, siRedis, siRust, siSupabase, siTailwindcss, siTauri, siTypescript,
    siUbuntu, siVercel, siVim, siVite, siVscodium,
} from 'simple-icons';
import type { SimpleIcon } from 'simple-icons';

const siPowershell: SimpleIcon = {
    title: 'PowerShell',
    slug: 'powershell',
    hex: '5391FE',
    source: '',
    svg: '',
    get path() { return 'M23.181 2.974a2.625 2.625 0 0 0-3.715 0L1.093 21.348A2.624 2.624 0 0 0 2.943 24H21.38a2.624 2.624 0 0 0 2.624-2.624V5.538a2.625 2.625 0 0 0-.823-2.564zM10.42 17.337l-4.2 2.394a.656.656 0 0 1-.656-1.137l3.544-2.02-3.544-2.02a.656.656 0 1 1 .656-1.136l4.2 2.394a.656.656 0 0 1 0 1.125zm6.56.657H12.6a.656.656 0 0 1 0-1.313h4.38a.656.656 0 0 1 0 1.313z'; },
};

const siAws: SimpleIcon = {
    title: 'AWS',
    slug: 'amazonaws',
    hex: 'FF9900',
    source: '',
    svg: '',
    get path() { return 'M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.064.056.128.056.184 0 .08-.048.16-.152.24l-.504.336a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.24-.112a2.474 2.474 0 0 1-.288-.376 6.18 6.18 0 0 1-.248-.472c-.624.736-1.408 1.104-2.352 1.104-.672 0-1.208-.192-1.6-.576-.392-.384-.592-.896-.592-1.536 0-.68.24-1.232.728-1.648.488-.416 1.136-.624 1.96-.624.272 0 .552.024.848.064.296.04.6.104.92.176v-.584c0-.608-.128-1.032-.376-1.28-.256-.248-.688-.368-1.304-.368-.28 0-.568.032-.864.104-.296.072-.584.16-.864.272a2.294 2.294 0 0 1-.28.104.488.488 0 0 1-.128.024c-.112 0-.168-.08-.168-.248v-.392c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.168c.28-.144.616-.264 1.008-.36a4.82 4.82 0 0 1 1.232-.152c.944 0 1.632.216 2.072.648.432.432.656 1.088.656 1.968v2.592zm-3.24 1.212c.264 0 .536-.048.824-.144.288-.096.544-.272.76-.512.128-.152.224-.32.272-.512.048-.192.08-.424.08-.696v-.336a6.8 6.8 0 0 0-.736-.136 6.02 6.02 0 0 0-.752-.048c-.536 0-.928.104-1.192.32-.264.216-.392.52-.392.92 0 .376.096.656.296.848.192.2.472.296.84.296zm6.44.888c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.312L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.192-.2h.784c.152 0 .256.024.312.08.064.048.112.16.16.312l1.48 5.83 1.368-5.83c.04-.16.088-.264.152-.312a.513.513 0 0 1 .32-.08h.64c.152 0 .256.024.32.08.064.048.12.16.152.312l1.384 5.904 1.52-5.904c.048-.16.104-.264.16-.312a.52.52 0 0 1 .312-.08h.744c.128 0 .2.064.2.2 0 .04-.008.08-.016.128a1.137 1.137 0 0 1-.056.2l-2.128 6.196c-.048.16-.104.264-.168.312a.47.47 0 0 1-.304.08h-.688c-.152 0-.256-.024-.32-.08-.064-.056-.12-.16-.152-.32l-1.36-5.688-1.352 5.68c-.04.16-.088.264-.152.32-.064.056-.176.08-.32.08h-.688zm11.168.2c-.416 0-.832-.048-1.232-.144-.4-.096-.712-.2-.92-.32-.128-.072-.216-.152-.248-.224a.56.56 0 0 1-.048-.224v-.408c0-.168.064-.248.184-.248.048 0 .096.008.144.024.048.016.12.048.2.08.272.12.568.216.888.28.328.064.648.096.976.096.52 0 .92-.088 1.2-.264a.86.86 0 0 0 .424-.772.778.778 0 0 0-.212-.556c-.144-.152-.416-.288-.808-.416l-1.16-.36c-.584-.184-1.016-.456-1.284-.816a1.89 1.89 0 0 1-.404-1.16c0-.336.072-.632.216-.888.144-.256.336-.48.576-.656.24-.184.512-.32.832-.416.32-.096.656-.136 1.008-.136.176 0 .36.008.536.032.184.024.352.056.512.088.152.04.296.08.432.128.136.048.24.096.312.144a.649.649 0 0 1 .208.184.41.41 0 0 1 .056.224v.376c0 .168-.064.256-.184.256a.83.83 0 0 1-.304-.096 3.652 3.652 0 0 0-1.52-.312c-.472 0-.84.072-1.096.224-.256.152-.384.384-.384.704 0 .216.08.4.24.552.16.152.456.304.88.44l1.136.36c.576.184.992.44 1.24.768.248.328.368.704.368 1.12 0 .344-.072.656-.208.928-.144.272-.336.512-.592.704-.256.2-.56.344-.912.448-.368.112-.76.168-1.184.168z'; },
};

const siAzure: SimpleIcon = {
    title: 'Azure',
    slug: 'microsoftazure',
    hex: '0078D4',
    source: '',
    svg: '',
    get path() { return 'M13.05 4.24L6.56 18.05H2L8.09 7.97l4.96-3.73zm.78.89l4.6 13.92H2.24l5.53-1.04 3.7-4.34-2.87-3.9 5.23-4.64z'; },
};

const siWindows: SimpleIcon = {
    title: 'Windows',
    slug: 'windows',
    hex: '0078D4',
    source: '',
    svg: '',
    get path() { return 'M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.551H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.951-1.801'; },
};

function withHex(icon: SimpleIcon, hex: string): SimpleIcon {
    return { ...icon, hex };
}

const skillIcons: Record<string, SimpleIcon> = {
    TypeScript: siTypescript,
    JavaScript: siJavascript,
    Python: siPython,
    Go: siGo,
    Rust: withHex(siRust, 'DEA584'),
    HTML: siHtml5,
    CSS: siCss,
    'GNU Bash': siGnubash,
    PowerShell: siPowershell,
    'Tailwind CSS': siTailwindcss,
    Fastify: withHex(siFastify, 'FFFFFF'),
    NestJS: siNestjs,
    Vite: siVite,
    React: siReact,
    Prisma: withHex(siPrisma, 'FFFFFF'),
    Tauri: siTauri,
    Express: withHex(siExpress, 'FFFFFF'),
    NGINX: siNginx,
    'React Native': siReact,
    Expo: withHex(siExpo, 'FFFFFF'),
    Electron: siElectron,
    Flask: siFlask,
    Jest: siJest,
    Insomnia: siInsomnia,
    Git: siGit,
    Docker: siDocker,
    'Node.js': siNodedotjs,
    Vim: siVim,
    Bun: withHex(siBun, 'FBF0DF'),
    Figma: siFigma,
    'VS Code': siVscodium,
    'Visual Studio': siVscodium,
    Cursor: withHex(siCursor, 'FFFFFF'),
    Claude: siClaude,
    'Google Gemini': siGooglegemini,
    PostgreSQL: siPostgresql,
    Supabase: siSupabase,
    MySQL: siMysql,
    Vercel: withHex(siVercel, 'FFFFFF'),
    'GitHub Actions': siGithubactions,
    Cloudflare: siCloudflare,
    Redis: siRedis,
    MongoDB: siMongodb,
    GitHub: withHex(siGithub, 'FFFFFF'),
    AWS: siAws,
    Azure: siAzure,
    'Google Cloud': siGooglecloud,
    Debian: siDebian,
    'Arch Linux': siArchlinux,
    Ubuntu: siUbuntu,
    Windows: siWindows,
};

export function skillIcon(name: string): SimpleIcon | undefined {
    return skillIcons[name];
}