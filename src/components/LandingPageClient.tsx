'use client'

import { SubscribeForm } from '@/components/SubscribeForm'
import { TerminalWindow } from '@/components/TerminalWindow'
import { TypeAnimation } from 'react-type-animation'
import React from 'react'

const AsciiSatellite = () => (
  <pre className="text-cyan-400 text-glow text-xs md:text-sm leading-none text-center animate-pulse">
    {`
          /\\
         /  \\
        /____\\
        |    |
        |    |
    /\\  |    |  /\\
   /  \\ |    | /  \\
  /____\\|    |/____\\
  '----' '--' '----'
    `}
  </pre>
);

type FormState = { error?: string; success?: string; } | null;

type LandingPageClientProps = {
  subscribeAction: (prevState: FormState, formData: FormData) => Promise<FormState>;
  kakaoUrl: string;
  version: string;
};

export const LandingPageClient: React.FC<LandingPageClientProps> = ({ subscribeAction, kakaoUrl, version }) => {
  const terminalTitle = `[o]rbital-pet-v${version}`;

  return (
    <div className="font-mono text-white min-h-screen flex items-center justify-center p-4">
      <TerminalWindow title={terminalTitle}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-4 text-glow">
              <TypeAnimation
                sequence={[
                  'Orbital Pet',
                  2000,
                  '당신만의 인공위성 애완동물',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </h1>
            <p className="text-lg md:text-xl text-gray-300">
              우주를 탐험하는 당신의 동반자.
            </p>
          </div>
          <div className="flex-shrink-0">
            <AsciiSatellite />
          </div>
        </div>

        <div className="border-t-2 border-dashed border-gray-700 my-6"></div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-900 bg-opacity-50 border border-gray-700 rounded-lg p-4">
            <h2 className="text-xl font-bold text-green-400 mb-2 text-glow-green">$ init --subscribe</h2>
            <p className="text-gray-400 mb-4 text-sm">가장 먼저 Orbital Pet의 출시 소식을 받아보세요.</p>
            <SubscribeForm
              action={subscribeAction}
              submittingText={'전송 중...'}
              submitText={'소식 받기'}
            />
          </div>

          <div className="bg-gray-900 bg-opacity-50 border border-gray-700 rounded-lg p-4">
            <h2 className="text-xl font-bold text-green-400 mb-2 text-glow-green">$ join --community</h2>
            <p className="text-gray-400 mb-4 text-sm">함께 세상을 놀라게 할 동료를 찾습니다.</p>
            <a
              href={kakaoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded-lg inline-flex items-center justify-center transition-transform transform hover:scale-105"
            >
              <span>오픈채팅 참여</span>
            </a>
            <a href="/milestone" className="text-cyan-400 hover:underline mt-3 inline-block text-sm">
              &gt; cat ./PROJECT_MILESTONES
            </a>
          </div>
        </div>
      </TerminalWindow>
    </div>
  );
};
