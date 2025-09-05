import { TerminalWindow } from '@/components/TerminalWindow';
import React from 'react';
import Image from 'next/image';
import type { Metadata } from 'next';
import Script from 'next/script';
import { FullScreenAd } from '@/components/FullScreenAd';
// import { SponsorBanner } from '@/components/SponsorBanner';
import { ShareButtons } from '@/components/ShareButtons';
import { RegistrationButtons } from '@/components/RegistrationButtons';

const siteUrl = 'https://orbital-pet.diginori.com';
const conferenceTitle = 'NOANcon 2025.12.12 in Jeju';
const conferenceDescription = '"NOANcon" is a 24-hour conference in Jeju where 33 NOAN citizen speakers offer a sharper, clearer perspective on the current era & AI.';

export const metadata: Metadata = {
  title: conferenceTitle,
  description: conferenceDescription,
  openGraph: {
    title: conferenceTitle,
    description: conferenceDescription,
    url: `${siteUrl}/conf/noan`,
    siteName: 'Orbital Pet',
    images: [
      {
        url: `${siteUrl}/noan/NOAN.png`,
        width: 800,
        height: 600,
        alt: 'NOANcon 2025 in Jeju',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: conferenceTitle,
    description: conferenceDescription,
    images: [`${siteUrl}/noan/NOAN.png`],
  },
};

export const revalidate = 600; // Revalidate at most every 10 minutes

type Speaker = {
  '이름': string;
  '소속': string;
  '주제': string;
  '참조'?: string;
  '사진'?: string;
};

type Sponsor = {
  name: string;
  url: string;
  logo?: string;
};

type Community = {
  name: string;
  url: string;
  logo?: string;
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

async function getSponsors() {
  const res = await fetch('https://raw.githubusercontent.com/orbital-pet/NOANcon2025/refs/heads/main/sponsors.json', {
    next: { revalidate: 600 }
  });
  if (!res.ok) {
    // Return empty array if the file is not found
    if (res.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch sponsors');
  }
  const sponsors: Sponsor[] = await res.json();
  return sponsors;
}

async function getCommunities() {
  const res = await fetch('https://raw.githubusercontent.com/orbital-pet/NOANcon2025/refs/heads/main/communities.json', {
    next: { revalidate: 600 }
  });
  if (!res.ok) {
    if (res.status === 404) {
        return [];
    }
    throw new Error('Failed to fetch communities');
  }
  const communities: Community[] = await res.json();
  return communities;
}

export default async function NoanConPage() {
  const speakers = await getSpeakers();
  const sponsors = await getSponsors();
  const communities = await getCommunities();

  return (
    <>
      <div className="font-mono text-white min-h-screen flex items-center justify-center p-4">
        <FullScreenAd />
        <TerminalWindow title="cat ./conf/noan.conf">
          {/* <SponsorBanner /> */}
          <div className="text-cyan-400 text-2xl font-bold">
            NOANcon 2025 in jeju
          </div>
          <div className="mt-2 text-gray-300 space-y-3">
            <p>
              20세기 초 당대 최고의 물리학자들은 벨기에에 모였고, 19-20세기에 당대 최고의 문학가와 예술가들은 파리의 카페에 모였습니다. 그들은 얘기를 나누며 토론했고 때로는 싸우기도 했지만, 언제나 사유의 확장의 기쁨을 향유했습니다.
            </p>
            <p>
              AI의 발전은 동전과 같아서 한쪽 면에는 효용성의 극대화가, 다른 면에는 그로 인한 악영향이 있습니다. 이것이 우리가 AI를 두고 위기라고 부르는 이유입니다. 노안콘은 AI에 대한 불안, 공포, 두려움 등을 어떻게 떨쳐내고 극복할지에 대한 사유의 확장이 이루어질 곳입니다.
            </p>
            <p>
              우리의 만남은 아주 잘난 사람들의 만남은 아니지만, 길지도 자주 반복되는 만남은 또 아니지만, 한국의 솔베이 회의가, 21세기의 레 되 마고(Les Deux Magots)가 되기를 바랍니다.
            </p>
            <p className="text-right">- 청년 철학자 @고태경 -</p>
          </div>
          <RegistrationButtons />
          <div className="border-t-2 border-dashed border-gray-700 my-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {speakers.map((speaker, index) => (
              <div key={index} className="relative bg-gray-900 bg-opacity-50 border border-gray-700 rounded-lg p-4 flex flex-col items-center text-center">
                {speaker['참조'] && (
                  <a href={speaker['참조']} target="_blank" rel="noopener noreferrer" className="absolute top-2 right-2 text-gray-400 hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                      <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                    </svg>
                  </a>
                )}
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-700 mb-4">
                  <Image
                    src={speaker['사진'] ? speaker['사진'] : `/noan/speakers/${speaker['이름']}.webp`}
                    alt={`Photo of ${speaker['이름']}`}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-green-400 font-bold text-lg">{speaker['이름']}</h3>
                <p className="text-gray-400 text-sm min-h-[1.25rem]">{speaker['소속'] || ''}</p>
                <p className="text-gray-500 mt-1 text-xs min-h-[1rem]">{speaker['주제'] || ''}</p>
              </div>
            ))}
          </div>

          {sponsors.length > 0 && (
            <>
              <div className="border-t-2 border-dashed border-gray-700 my-4"></div>
              <div className="text-cyan-400 text-xl font-bold mt-8 mb-4">
                Sponsors
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {sponsors.map((sponsor, index) => (
                  <a key={index} href={sponsor.url} target="_blank" rel="noopener noreferrer" className="bg-gray-900 bg-opacity-50 border border-gray-700 rounded-lg p-4 text-center hover:border-cyan-400 transition-colors flex flex-col items-center justify-center">
                    {sponsor.logo && (
                      <div className="relative w-full h-20 mb-2">
                        <Image
                          src={sponsor.logo}
                          alt={`${sponsor.name} logo`}
                          fill
                          style={{ objectFit: 'contain' }}
                          className="rounded-md"
                        />
                      </div>
                    )}
                    <h3 className="text-green-400 font-bold text-lg">{sponsor.name}</h3>
                  </a>
                ))}
              </div>
            </>
          )}

          {communities.length > 0 && (
            <>
              <div className="border-t-2 border-dashed border-gray-700 my-4"></div>
              <div className="text-cyan-400 text-xl font-bold mt-8 mb-4">
                Communities
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {communities.map((community, index) => (
                  <a key={index} href={community.url} target="_blank" rel="noopener noreferrer" className="bg-gray-900 bg-opacity-50 border border-gray-700 rounded-lg p-4 text-center hover:border-cyan-400 transition-colors flex flex-col items-center justify-center">
                    {community.logo && (
                      <div className="relative w-full h-20 mb-2">
                        <Image
                          src={community.logo}
                          alt={`${community.name} logo`}
                          fill
                          style={{ objectFit: 'contain' }}
                          className="rounded-md"
                        />
                      </div>
                    )}
                    <h3 className="text-green-400 font-bold text-lg">{community.name}</h3>
                  </a>
                ))}
              </div>
            </>
          )}

          <ShareButtons />
        </TerminalWindow>
      </div>
      <Script src="https://loopback.social/banner.js" defer />
    </>
  );
}
