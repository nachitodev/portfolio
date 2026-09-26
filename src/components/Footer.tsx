import { profile } from '../data/profile';

export default function Footer() {
    const { contact, name } = profile.bio;

    return (
        <footer
            className="relative z-10 border-t py-10"
            style={{ borderColor: 'var(--color-line)' }}
        >
            <div className="max-w-6xl mx-auto px-[var(--gutter)] flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between">
                <p className="font-mono text-sm" style={{ color: 'var(--color-dim)' }}>
                    © {new Date().getFullYear()} {name.toUpperCase()}
                </p>
                <div
                    className="flex items-center gap-4 font-mono text-sm"
                    style={{ color: 'var(--color-dim)' }}
                >
                    <a
                        href={contact.github}
                        target="_blank"
                        rel="noreferrer"
                        className="transition-colors hover:text-accent focus-visible:outline-accent"
                    >
                        GITHUB
                    </a>
                    <span>·</span>
                    <a
                        href={contact.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="transition-colors hover:text-accent focus-visible:outline-accent"
                    >
                        LINKEDIN
                    </a>
                </div>
                <p
                    className="font-mono text-sm flex items-center gap-2"
                    style={{ color: 'var(--color-dim)' }}
                >
                    NACHITODEV://ONLINE
                    <span className="cursor-blink" style={{ color: 'var(--color-accent)' }}>
                        █
                    </span>
                </p>
            </div>
        </footer>
    );
}
