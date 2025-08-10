import { createServerSupabaseClient } from '@/lib/supabaseServer'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { LandingPageClient } from '@/components/LandingPageClient'
import pkg from '../../package.json'

type FormState = { error?: string; success?: string; } | null;

async function subscribe(prevState: FormState, formData: FormData): Promise<FormState> {
  'use server'
  const email = formData.get('email') as string
  if (!email) {
    return { error: '이메일은 필수입니다.' }
  }
  const supabase = await createServerSupabaseClient()
  const { error } = await supabase.from('subscribers').insert({ email })
  if (error) {
    if (error.code === '23505') {
      return { error: '이미 구독된 이메일입니다.' }
    }
    return { error: '구독 중 오류가 발생했습니다. 다시 시도해주세요.' }
  }
  revalidatePath('/')
  return { success: '구독해주셔서 감사합니다! 곧 소식을 전해드리겠습니다.' }
}

export default async function HomePage() {
  const supabase = await createServerSupabaseClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (session) {
    redirect('/dashboard')
  }

  const KAKAO_OPEN_CHAT_URL = process.env.KAKAO_OPEN_CHAT_URL || '#';

  return (
    <LandingPageClient
      subscribeAction={subscribe}
      kakaoUrl={KAKAO_OPEN_CHAT_URL}
      version={pkg.version}
    />
  )
}
