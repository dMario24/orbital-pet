import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createServerSupabaseClient } from '@/lib/supabaseServer';
import { TerminalWindow } from '@/components/TerminalWindow';
import { LandingPageContent } from '@/components/LandingPageContent';
import React from 'react';
import pkg from '../../package.json';

// Type Definitions
type LocalizedContent = {
  greeting: string;
  tagline: string;
  announcement: string;
  community_prompt: string;
};


type FormState = { error?: string; success?: string; } | null;

const DEFAULT_CONTENT: { [key: string]: LocalizedContent } = {
  default: {
    greeting: 'Orbital Pet',
    tagline: 'Your companion for exploring the cosmos.',
    announcement: 'The launch of Orbital Pet is coming soon.',
    community_prompt: 'Find colleagues to surprise the world with.'
  },
  ko: {
    greeting: '인공위성 애완동물',
    tagline: '우주를 탐험하는 당신의 동반자.',
    announcement: '가장 먼저 Orbital Pet의 출시 소식을 받아보세요.',
    community_prompt: '함께 세상을 놀라게 할 동료를 찾습니다.'
  }
};

// Server Action for Subscribing
async function subscribe(prevState: FormState, formData: FormData): Promise<FormState> {
  'use server';
  const email = formData.get('email') as string;
  if (!email) {
    return { error: '이메일은 필수입니다.' };
  }
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from('subscribers').insert({ email });
  if (error) {
    if (error.code === '23505') {
      return { error: '이미 구독된 이메일입니다.' };
    }
    return { error: '구독 중 오류가 발생했습니다. 다시 시도해주세요.' };
  }
  revalidatePath('/');
  return { success: '구독해주셔서 감사합니다! 곧 소식을 전해드리겠습니다.' };
}

export async function LandingPage() {
  // Session check
  const supabase = await createServerSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    redirect('/dashboard');
  }

  // Determine locale and get content
  const headersList = headers();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const country = (headersList as any).get('x-vercel-ip-country')?.toLowerCase() || 'default';

  // Fetch content from Supabase
  let { data: localizedContent } = await supabase
    .from('landing_page_content')
    .select('greeting, tagline, announcement, community_prompt')
    .eq('locale', country)
    .single();

  if (!localizedContent) {
    const { data: defaultContent } = await supabase
      .from('landing_page_content')
      .select('greeting, tagline, announcement, community_prompt')
      .eq('locale', 'default')
      .single();
    localizedContent = defaultContent;
  }

  // Fallback to default content if Supabase fetch fails
  if (!localizedContent) {
    localizedContent = DEFAULT_CONTENT[country] || DEFAULT_CONTENT.default;
  }

  // Other props
  const KAKAO_OPEN_CHAT_URL = process.env.KAKAO_OPEN_CHAT_URL || '#';
  const terminalTitle = `[o]rbital-pet-v${pkg.version}`;

  return (
    <div className="font-mono text-white min-h-screen flex items-center justify-center p-4">
      <TerminalWindow title={terminalTitle}>
        {/* LandingPageContent will be created from LandingPageClient in the next steps */}
        <LandingPageContent
          subscribeAction={subscribe}
          kakaoUrl={KAKAO_OPEN_CHAT_URL}
          localizedContent={localizedContent}
        />
      </TerminalWindow>
    </div>
  );
}
