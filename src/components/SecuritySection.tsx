import type { RefObject } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import SectionHeader from './SectionHeader';
import DisclosuresCard from './DisclosuresCard';
import ContactCard from './ContactCard';

export default function SecuritySection() {
    const { ref, revealed } = useScrollReveal(0.12);

    return (
        <div
            ref={ref as RefObject<HTMLDivElement>}
            style={{ width: '100%', maxWidth: '72rem', padding: '0 var(--gutter)' }}
        >
            <SectionHeader
                number="03"
                label="Security + Contact"
                title="Research & Reach Out"
                revealed={revealed}
                color="var(--color-warn)"
                withUnderline={true}
            />

            <div
                style={{
                    display: 'grid',
                    gap: '1.5rem',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 440px), 1fr))',
                    alignItems: 'stretch',
                }}
            >
                <DisclosuresCard revealed={revealed} />
                <ContactCard revealed={revealed} />
            </div>
        </div>
    );
}
