import { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import BootAnimation from './components/Boot';
import Background from './components/Background';
import { readFlag } from './lib/storage';

export default function App() {
  const [booted, setBooted] = useState(() => readFlag('auto_skip_intro'));

  return (
    <>

      {booted && <div className="vcr-overlay pointer-events-none fixed inset-0 z-9999" />}
      
      {!booted ? (
        <BootAnimation onFinish={() => setBooted(true)} />
      ) : (
        <main className="bg-black">
          <Background />
        </main>
      )}

      <Analytics />
    </>
  );
}
