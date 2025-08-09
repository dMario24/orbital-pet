'use client'

import { useState, FormEvent } from 'react'
import Typewriter from './Typewriter';

interface CommandLineProps {
  prompt: string;
  onCommand: (command: string) => void;
}

const BlinkingCursor = () => (
    <span className="animate-blink bg-green-400 w-2 h-4 inline-block ml-1"></span>
);

const CommandLine = ({ prompt, onCommand }: CommandLineProps) => {
  const [inputValue, setInputValue] = useState('');
  const [isReady, setIsReady] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onCommand(inputValue.toLowerCase().trim());
    setInputValue('');
  };

  return (
    <div>
      <span className="crt-glow">
        <Typewriter
          text={prompt}
          onComplete={() => setIsReady(true)}
        />
      </span>
      {isReady && (
        <form onSubmit={handleSubmit} className="inline">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="bg-transparent border-none text-green-400 focus:outline-none w-1/2"
            autoFocus
          />
          <BlinkingCursor />
        </form>
      )}
    </div>
  );
};

export default CommandLine;
