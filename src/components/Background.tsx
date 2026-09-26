import SceneCard, { type Scene } from './SceneCard';
import Hero from './Hero';
import WorkSection from './WorkSection';
import SecuritySection from './SecuritySection';
import SettingsToggle from './SettingsToggle';
import Footer from './Footer';
import '../animations.css';

const scenes: Scene[] = [
    { image: '/images/1.avif', accent: '#3dff7a', section: 'hero' },
    { image: '/images/2.avif', accent: '#26d9e3', section: 'work' },
    { image: '/images/3.avif', accent: '#ffb454', section: 'security' },
];

export default function Background() {
    return (
        <div className="relative">
            <SettingsToggle />
            {scenes.map((scene, i) => (
                <SceneCard key={scene.section} scene={scene} index={i}>
                    {scene.section === 'hero' && <Hero />}
                    {scene.section === 'work' && <WorkSection />}
                    {scene.section === 'security' && <SecuritySection />}
                </SceneCard>
            ))}
            <Footer />
        </div>
    );
}