import type { CSSProperties, RefObject } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { profile } from '../data/profile';
import SectionHeader from './SectionHeader';
import SkillCategory from './SkillCategory';
import ProjectCard from './ProjectCard';

export default function WorkSection() {
    const { ref, revealed } = useScrollReveal(0.12);

    return (
        <div
            ref={ref as RefObject<HTMLDivElement>}
            style={{ width: '100%', maxWidth: '72rem', padding: '0 var(--gutter)' }}
        >
            <SectionHeader
                number="02"
                label="Skills + Projects"
                title="Stack & Work"
                revealed={revealed}
                color="var(--color-accent-2)"
                withUnderline={true}
            />

            <div
                style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: '1fr' }}
                className="lg:grid-cols-12"
            >
                <aside className="panel lg:col-span-4" style={{ padding: '2rem' }}>
                    <h3
                        className={`overline rv-label-wrap${revealed ? ' rv-revealed rv-slide-left' : ' rv-hidden-left'}`}
                        style={{
                            color: 'var(--color-accent)',
                            marginBottom: '1.5rem',
                            '--rv-delay': '0ms',
                        } as CSSProperties}
                    >
                        Skills
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                        {profile.skills.map((cat, catIdx) => {
                            const itemOffset = profile.skills
                                .slice(0, catIdx)
                                .reduce((sum, c) => sum + c.items.length, 0);

                            return (
                                <SkillCategory
                                    key={cat.category}
                                    category={cat.category}
                                    icon={cat.icon}
                                    items={cat.items}
                                    revealed={revealed}
                                    baseDelay={catIdx * 80}
                                    itemBaseDelay={100 + itemOffset * 45}
                                    stagger={45}
                                />
                            );
                        })}
                    </div>
                </aside>

                <section className="panel lg:col-span-8" style={{ padding: '2rem' }}>
                    <h3
                        className={`overline rv-label-wrap${revealed ? ' rv-revealed rv-slide-left' : ' rv-hidden-left'}`}
                        style={{
                            color: 'var(--color-accent)',
                            marginBottom: '0.5rem',
                            '--rv-delay': '60ms',
                        } as CSSProperties}
                    >
                        Selected Work
                    </h3>

                    <p
                        className={revealed ? 'rv-fade-up' : 'rv-hidden'}
                        style={{
                            fontSize: '0.82rem',
                            color: 'var(--color-dim)',
                            marginBottom: '1.5rem',
                            lineHeight: '1.5',
                            '--rv-delay': '120ms',
                        } as CSSProperties}
                    >
                        Open-source contributions and pull requests merged into existing projects.
                    </p>

                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                            gap: '16px',
                        }}
                    >
                        {profile.contributions.map((c, i) => (
                            <ProjectCard
                                key={c.url}
                                contribution={c}
                                revealed={revealed}
                                delay={180 + i * 70}
                            />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
