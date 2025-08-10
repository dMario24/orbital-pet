import React from 'react';

type TerminalWindowProps = {
  title: string;
  children: React.ReactNode;
};

export const TerminalWindow: React.FC<TerminalWindowProps> = ({ title, children }) => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-black bg-opacity-75 border-2 border-cyan-400 rounded-lg shadow-lg shadow-cyan-500/20 scanline-effect overflow-hidden">
      <div className="flex items-center justify-between h-8 px-4 bg-gray-800 border-b-2 border-cyan-400">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="text-gray-300 font-mono text-sm text-glow">{title}</div>
        <div className="w-12"></div>
      </div>
      <div className="p-4 md:p-6">
        {children}
      </div>
    </div>
  );
};
