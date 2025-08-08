import Image from 'next/image'
import { createServerSupabaseClient } from '@/lib/supabaseServer'
import { revalidatePath } from 'next/cache'
import { SubscribeForm } from '@/components/SubscribeForm'

type FormState = { error?: string; success?: string; } | null;

async function subscribe(prevState: FormState, formData: FormData): Promise<FormState> {
  'use server'

  const email = formData.get('email') as string
  if (!email) {
    return { error: 'Email is required.' }
  }

  const supabase = await createServerSupabaseClient()
  const { error } = await supabase.from('subscribers').insert({ email })

  if (error) {
    console.error('Supabase error:', error)
    if (error.code === '23505') {
      return { error: '이미 구독된 이메일입니다.' }
    }
    return { error: '구독 중 오류가 발생했습니다. 다시 시도해주세요.' }
  }

  revalidatePath('/')
  return { success: '구독해주셔서 감사합니다!' }
}

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-[#0d1117] text-gray-300 flex flex-col items-center justify-center p-4 font-mono scanlines">
      <div className="relative z-10 w-full max-w-2xl mx-auto">
        <div className="bg-[#161b22] border border-gray-700 rounded-lg p-6 md:p-8 shadow-[0_0_20px_rgba(0,192,255,0.2)]">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 animate-pulse">
              Orbital Pet
            </h1>
            <p className="text-lg text-cyan-300">
              당신만의 인공위성 애완동물을 키워보세요. 우주를 탐험하고 교감하며 성장하는 특별한 경험!
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <Image
              src="/satellite_placeholder.png"
              alt="Satellite Pet"
              width={150}
              height={150}
              className="w-32 h-32 md:w-40 md:h-40"
            />
          </div>

          <div className="mb-8">
            <p className="text-center text-lg font-semibold text-white mb-4">
              가장 먼저 소식을 받아보세요!
            </p>
            <SubscribeForm action={subscribe} />
          </div>

          <div className="text-center">
            <p className="text-lg font-semibold text-white mb-4">함께 만들어요!</p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-4">
              <a href="https://open.kakao.com/o/your-chat-link" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-yellow-400 text-black font-bold py-2 px-4 rounded-md hover:bg-yellow-500 transition-colors">
                <Image src="/kakao_logo.svg" alt="Kakao" width={20} height={20} />
                <span>카카오톡 참여하기</span>
              </a>
              <div className="flex flex-wrap justify-center gap-2">
                <a href="https://github.com/your-repo/issues/1" target="_blank" rel="noopener noreferrer" className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-3 rounded-md text-sm transition-colors">#수학자</a>
                <a href="https://github.com/your-repo/issues/2" target="_blank" rel="noopener noreferrer" className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-3 rounded-md text-sm transition-colors">#개발자</a>
                <a href="https://github.com/your-repo/issues/3" target="_blank" rel="noopener noreferrer" className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-3 rounded-md text-sm transition-colors">#우주덕후_기획자</a>
              </div>
            </div>
          </div>
        </div>
        <footer className="text-center mt-6 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Orbital Pet. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}
