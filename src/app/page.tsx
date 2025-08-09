'use client'

import { useState, useEffect } from 'react';
import Typewriter from '@/components/Typewriter';
import CommandLine from '@/components/CommandLine';

const scenes = {
  BOOT: 'boot',
  PROMPT: 'prompt',
  ABOUT: 'about',
  PROJECTS: 'projects',
  CONTACT: 'contact',
  NOT_FOUND: 'not_found',
};

const bootSequence = [
  'Booting Orbital Pet OS v0.3.0...',
  'Connecting to satellite network...',
  'Connection established.',
  'Welcome, developer!',
];

const helpText = 'Available commands: [about], [projects], [contact], [clear]';
const commandNotFoundText = 'Command not found. Type [help] for a list of commands.';

const AboutScene = () => (
  <div>
    <p>&gt; Orbital Pet is a web-based virtual pet service inspired by Tamagotchi.</p>
    <p>&gt; Users can raise and manage their own satellite pet.</p>
    <p>&gt; Join our mission to create a unique experience connecting space and everyday life.</p>
  </div>
);

const ProjectsScene = () => (
  <div>
    <p>&gt; Current Mission: Pre-launch Landing Page</p>
    <p>&gt; Status: <span className="text-yellow-400">COMPLETE</span></p>
    <p>&gt; Next Mission: Core Pet-rearing System</p>
  </div>
);

const ContactScene = () => (
  <div>
    <p>&gt; For inquiries, please join our community channels.</p>
    <p>&gt; We are recruiting #mathematicians, #developers, and #space_nerd_planners.</p>
  </div>
);

export default function HomePage() {
  const [scene, setScene] = useState(scenes.BOOT);
  const [bootIndex, setBootIndex] = useState(0);
  const [history, setHistory] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    if (scene === scenes.BOOT && bootIndex < bootSequence.length) {
      const timer = setTimeout(() => {
        setBootIndex(bootIndex + 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
    if (scene === scenes.BOOT && bootIndex >= bootSequence.length) {
      setTimeout(() => setScene(scenes.PROMPT), 1000);
    }
  }, [scene, bootIndex]);

  const handleCommand = (command: string) => {
    let output;
    if (command === 'clear') {
      setHistory([]);
      return;
    }

    const newHistory = [...history, <p key={history.length}><span className="text-green-400">$ orbital-pet &gt;</span> {command}</p>];

    switch (command) {
      case 'help':
        output = <p>{helpText}</p>;
        break;
      case 'about':
        output = <AboutScene />;
        break;
      case 'projects':
        output = <ProjectsScene />;
        break;
      case 'contact':
        output = <ContactScene />;
        break;
      default:
        output = <p>{commandNotFoundText}</p>;
    }
    setHistory([...newHistory, output]);
  };

  return (
    <div className="crt-effect font-mono bg-black text-green-400 min-h-screen p-4 md:p-8">
      <div className="crt-glow w-full h-full">
        {scene === scenes.BOOT && (
          <div>
            {bootSequence.slice(0, bootIndex).map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        )}
        {scene !== scenes.BOOT && (
          <div>
            {bootSequence.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
            <p className="mt-4">{helpText}</p>
            <div id="history">{history}</div>
            <CommandLine prompt="$ orbital-pet >" onCommand={handleCommand} />
          </div>
        )}
      </div>
    </div>
  );
}
