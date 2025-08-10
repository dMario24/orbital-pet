import { createServerSupabaseClient } from '@/lib/supabaseServer'
import { redirect } from 'next/navigation'
import { SubscribeForm } from '@/components/SubscribeForm'
import { revalidatePath } from 'next/cache'

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
    <div className="font-mono bg-black text-white min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-5xl md:text-6xl font-bold text-cyan-400 mb-4 animate-pulse">
            Orbital Pet
          </h1>
          <p className="text-xl md:text-2xl text-gray-300">
            당신만의 인공위성 애완동물을 키워보세요.
          </p>
        </div>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 md:p-8 mb-10">
          <h2 className="text-2xl font-bold text-green-400 mb-4">$ 새로운 소식 받기</h2>
          <p className="text-gray-400 mb-4">가장 먼저 Orbital Pet의 출시 소식을 받아보세요. 스팸은 보내지 않습니다.</p>
          <SubscribeForm
            action={subscribe}
            submittingText={'구독 중...'}
            submitText={'구독하기'}
          />
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-400 mb-4">$ 함께 만들기</h2>
          <p className="text-gray-400 mb-6">
            수학자, 우주덕후, 개발자, 디자이너, 마케터, 해커, 심지어 외계인까지!
            <br />
            저희와 함께 세상을 놀라게 할 프로젝트를 만들어갈 동료를 찾습니다.
          </p>
          <a
            href={KAKAO_OPEN_CHAT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-6 rounded-lg inline-flex items-center transition-transform transform hover:scale-105 text-lg"
          >
            <span>카카오톡 오픈채팅 참여하기</span>
          </a>
          <a
            href="/lab"
            className="text-yellow-400 hover:underline mt-6 inline-block text-lg animate-pulse"
          >
            &gt; 실험실에서 궤도 펫 미리보기
          </a>
          <br />
          <a href="/milestone" className="text-cyan-400 hover:underline mt-4 inline-block">
            &gt; 프로젝트 마일스톤 보기
          </a>
        </div>
      </div>
    </div>
  )
}
