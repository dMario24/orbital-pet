'use client'

import { SubscribeForm } from '@/components/SubscribeForm'
import { TypeAnimation } from 'react-type-animation'
import React from 'react'
import { AsciiSatellite } from './AsciiSatellite'

type FormState = { error?: string; success?: string; } | null;

type LocalizedContent = {
  greeting: string;
  tagline: string;
  announcement: string;
  community_prompt: string;
};

type LandingPageContentProps = {
  subscribeAction: (prevState: FormState, formData: FormData) => Promise<FormState>;
  kakaoUrl: string;
  localizedContent: LocalizedContent;
};

export const LandingPageContent: React.FC<LandingPageContentProps> = ({
  subscribeAction,
  kakaoUrl,
  localizedContent
}) => {
  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-4 text-glow">
            <TypeAnimation
              sequence={[
                localizedContent.greeting,
                2000,
                '인공위성 애완동물',
                1000,
                '벌탱이는 별과함께',
                500,
                '우주덕후 모십니다',
                500,
                '수학자도 모십니다',
                500,
                '외계인도 모십니다',
                500,
                'Ελάτε στο Σύμπαν του Orbital Pet!',
                500,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h1>
          <p className="text-lg md:text-xl text-gray-300">
            {localizedContent.tagline}
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
          <p className="text-gray-400 mb-4 text-sm">{localizedContent.announcement}</p>
          <SubscribeForm
            action={subscribeAction}
            submittingText={'전송 중...'}
            submitText={'구독'}
          />
        </div>

        <div className="bg-gray-900 bg-opacity-50 border border-gray-700 rounded-lg p-4">
          <h2 className="text-xl font-bold text-green-400 mb-2 text-glow-green">$ join --community</h2>
          <p className="text-gray-400 mb-4 text-sm">{localizedContent.community_prompt}</p>
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
          <a href="/lab" className="text-cyan-400 hover:underline mt-3 inline-block text-sm">
            &gt; bash ./lab/run.sh
          </a>
        </div>
      </div>
    </>
  );
};
