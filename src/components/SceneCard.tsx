import { useEffect, useRef, type ReactNode } from 'react';
import { useIntersection } from '../hooks/useIntersection';
import VCREffects from './VCREffects';

export type SectionType = 'hero' | 'work' | 'security';

export interface Scene {
    image: string;
    accent: string;
    section: SectionType;
}

function srcFor(scene: Scene, ext: string) {
    return `${scene.image.slice(0, scene.image.lastIndexOf('.'))}.${ext}`;
}

interface SceneCardProps {
    scene: Scene;
    index: number;
    children: ReactNode;
}

export default function SceneCard({ scene, index, children }: SceneCardProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLPictureElement>(null);
    const visible = useIntersection(sectionRef, 0.15);

    const id = scene.section === 'work' ? 'work' : scene.section === 'security' ? 'contact' : 'top';

    useEffect(() => {
        const isMobile = window.matchMedia('(max-width: 640px)').matches;
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (isMobile || prefersReduced) return;

        const el = imgRef.current;
        if (!el) return;

        let rafId: number;

        const onScroll = () => {
            rafId = requestAnimationFrame(() => {
                const section = sectionRef.current;
                if (!section) return;
                const rect = section.getBoundingClientRect();
                const relY = -rect.top;
                const parallax = relY * 0.22;
                el.style.transform = `scale(${visible ? 1 : 1.06}) translateY(${parallax}px)`;
            });
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', onScroll);
            cancelAnimationFrame(rafId);
        };
    }, [visible]);

    return (
        <section
            ref={sectionRef}
            id={id}
            className="relative min-h-screen flex flex-col justify-center overflow-hidden py-[var(--section-y)]"
        >
            <picture
                ref={imgRef}
                className={`absolute inset-0 parallax-img ${index === 0 ? 'bg-warp' : ''}`.trim()}
                style={{
                    transform: visible ? 'scale(1)' : 'scale(1.06)',
                    transition: 'transform 700ms cubic-bezier(0.22, 1, 0.36, 1)',
                }}
            >
                <source srcSet={scene.image} type="image/avif" />
                <source srcSet={srcFor(scene, 'webp')} type="image/webp" />
                <img src={srcFor(scene, 'png')} alt="" className="h-full w-full object-cover object-center" />
            </picture>

            <div className="scrim absolute inset-0" />

            <div className="vcr-layers absolute inset-0 pointer-events-none">
                <VCREffects />
            </div>

            <div
                className={`section-reveal relative z-10 w-full flex justify-center ${
                    visible ? 'is-visible' : ''
                }`}
            >
                {children}
            </div>
        </section>
    );
}
