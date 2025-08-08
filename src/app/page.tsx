import { createServerSupabaseClient } from '@/lib/supabaseServer'
import { revalidatePath } from 'next/cache'
import { SubscribeForm } from '@/components/SubscribeForm' // Assuming SubscribeForm is restored
import { version } from '../../package.json';

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
  return { success: '구독해주셔서 감사합니다!' }
}

const SatelliteArt = () => (
  <pre className="text-cyan-400 text-center text-sm md:text-base leading-tight font-mono">
{`
      ( (
       ) )
    .-------.
   /  @   @  \\
  |     -     |
  |  \\_____/  |
  '-----------'
     / /|\\ \\
    / / | \\ \\
   * * * *
`}
  </pre>
);

const BlinkingCursor = () => (
  <span className="animate-blink bg-green-400 w-2 h-4 inline-block ml-1"></span>
);

const Stars = () => {
  const starCount = 100;
  const stars = [];

  for (let i = 0; i < starCount; i++) {
    const style = {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      width: `${Math.random() * 2 + 1}px`,
      height: `${Math.random() * 2 + 1}px`,
      animationDelay: `${Math.random() * 4}s`,
      animationDuration: `${Math.random() * 3 + 2}s`
    };
    stars.push(<div key={i} className="star" style={style}></div>);
  }

  return <div className="absolute top-0 left-0 w-full h-full overflow-hidden">{stars}</div>;
};

export default async function HomePage() {
  return (
    <div className="font-mono bg-black text-green-400 min-h-screen flex flex-col items-center justify-center p-4 relative">
      <Stars />
      <div className="relative z-10 w-full max-w-4xl border-2 border-green-500 bg-gray-900 bg-opacity-50 rounded-lg p-6 shadow-[0_0_20px_rgba(0,255,0,0.3)]">
        <div className="text-center mb-6">
          <SatelliteArt />
          <h1 className="text-3xl md:text-4xl font-bold mt-4">
            Orbital Pet<BlinkingCursor />
          </h1>
          <p className="text-base mt-2 text-green-300">
            &gt; 인공위성 애완동물을 키워보세요.
          </p>
        </div>

        <div className="mt-8">
          <p className="mb-2">$ 가장 먼저 소식을 받아보세요!</p>
          <SubscribeForm
            action={subscribe}
            submittingText={'✨'}
            submitText={'OK'}
          />
        </div>

        <div className="mt-8">
          <p className="mb-2">$ 함께 만들어요!</p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <a href="https://open.kakao.com/o/gYj8cuLh" className="hover:bg-green-700 p-1">
              [ 카카오톡 참여하기 ]
            </a>
            <div className="flex flex-wrap justify-center gap-2">
              <a href="#" className="hover:bg-green-700 p-1">#수학자</a>
              <a href="#" className="hover:bg-green-700 p-1">#개발자</a>
              <a href="#" className="hover:bg-green-700 p-1">#우주덕후_기획자</a>
            </div>
          </div>
        </div>
      </div>
       <footer className="w-full text-center text-xs text-gray-500 p-4 font-mono absolute bottom-0 left-0">
          v{version}
        </footer>
    </div>
  )
}
