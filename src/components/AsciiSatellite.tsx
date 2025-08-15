import React from 'react';

type AsciiSatelliteProps = {
  frame: string;
};

export const AsciiSatellite: React.FC<AsciiSatelliteProps> = ({ frame }) => (
  <pre className="text-cyan-400 text-glow text-xs md:text-sm leading-none text-center animate-pulse">
    {frame}
  </pre>
);
