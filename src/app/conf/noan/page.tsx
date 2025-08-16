import { TerminalWindow } from '@/components/TerminalWindow';
import React from 'react';

export const revalidate = 600; // Revalidate at most every 10 minutes

type Speaker = {
  '이름': string;
  '소속': string;
  '주제': string;
};

async function getSpeakers() {
  const res = await fetch('https://raw.githubusercontent.com/orbital-pet/NOANcon2025/refs/heads/main/speakers_list.json', {
    next: { revalidate: 600 }
  });
  if (!res.ok) {
    throw new Error('Failed to fetch speakers');
  }
  const speakers: Speaker[] = await res.json();

  // Shuffle the speakers array
  for (let i = speakers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [speakers[i], speakers[j]] = [speakers[j], speakers[i]];
  }

  return speakers;
}

export default async function NoanConPage() {
  const speakers = await getSpeakers();

  return (
    <div className="font-mono text-white min-h-screen flex items-center justify-center p-4">
      <TerminalWindow title="cat ./conf/noan.conf">
        <div className="text-cyan-400 text-2xl font-bold">
          NOAN con 2025 in jeju
        </div>
        <p className="mt-2 text-gray-300">
          &quot;NOANcon&quot; is a 24-hour conference in Jeju where 33 NOAN citizen speakers offer a sharper, clearer perspective on the current era & AI.
        </p>
        <div className="border-t-2 border-dashed border-gray-700 my-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {speakers.map((speaker, index) => (
            <div key={index} className="bg-gray-900 bg-opacity-50 border border-gray-700 rounded-lg p-3">
              <h3 className="text-green-400 font-bold text-lg">{speaker['이름']}</h3>
              {speaker['소속'] && <p className="text-gray-400 text-sm">{speaker['소속']}</p>}
              {speaker['주제'] && <p className="text-gray-500 mt-1 text-xs">{speaker['주제']}</p>}
            </div>
          ))}
        </div>
      </TerminalWindow>
    </div>
  );
}
