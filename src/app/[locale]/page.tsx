import { SubscribeForm } from '@/components/SubscribeForm'
import { createServerSupabaseClient } from '@/lib/supabaseServer'
import { revalidatePath } from 'next/cache'
import { getI18n, getCurrentLocale } from '@/locales/server'

type FormState = { error?: string; success?: string; } | null;

async function subscribe(prevState: FormState, formData: FormData): Promise<FormState> {
  'use server'
  const t = await getI18n();
  const email = formData.get('email') as string
  if (!email) {
    return { error: t('subscribe.error.email_required') }
  }
  const supabase = await createServerSupabaseClient()
  const { error } = await supabase.from('subscribers').insert({ email })
  if (error) {
    if (error.code === '23505') {
      return { error: t('subscribe.error.already_subscribed') }
    }
    return { error: t('subscribe.error.general') }
  }
  revalidatePath('/')
  return { success: t('subscribe.success') }
}

const SatelliteArt = () => (
  <pre className="text-cyan-400 text-center text-sm md:text-base leading-tight">
{`      /\\
     /  \\
    /____\\
    |    |
    |----|
   /|    |\\
  / |    | \\
 /  |    |  \\
*---*----*---*`}
  </pre>
);

const BlinkingCursor = () => (
  <span className="animate-blink bg-green-400 w-2 h-4 inline-block ml-1"></span>
);

export default async function HomePage() {
  const t = await getI18n();
  const locale = getCurrentLocale();

  const kakaoUrl = process.env.NEXT_PUBLIC_KAKAO_URL || '#';
  const discordUrl = process.env.NEXT_PUBLIC_DISCORD_URL || '#';
  const telegramUrl = process.env.NEXT_PUBLIC_TELEGRAM_URL || '#';

  return (
    <div className="font-mono bg-black text-green-400 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl border-2 border-green-500 bg-gray-900 bg-opacity-50 rounded-lg p-6 shadow-[0_0_20px_rgba(0,255,0,0.3)]">
        <div className="text-center mb-6">
          <SatelliteArt />
          <h1 className="text-3xl md:text-4xl font-bold mt-4">
            {t('home.title')}<BlinkingCursor />
          </h1>
          <p className="text-base mt-2 text-green-300">
            &gt; {t('home.subtitle')}
          </p>
        </div>

        <div className="mt-8">
          <p className="mb-2">{t('subscribe.prompt')}</p>
          <SubscribeForm
            action={subscribe}
            submittingText={t('subscribe.button.submitting')}
            submitText={t('subscribe.button.submit')}
          />
        </div>

        <div className="mt-8">
          <p className="mb-2">{t('mission.prompt')}</p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            {locale === 'ko' ? (
              <a href={kakaoUrl} target="_blank" rel="noopener noreferrer" className="hover:bg-green-700 p-1">
                {t('mission.kakao')}
              </a>
            ) : (
              <>
                <a href={discordUrl} target="_blank" rel="noopener noreferrer" className="hover:bg-green-700 p-1">
                  {t('mission.discord')}
                </a>
                <a href={telegramUrl} target="_blank" rel="noopener noreferrer" className="hover:bg-green-700 p-1">
                  {t('mission.telegram')}
                </a>
              </>
            )}
            <div className="flex flex-wrap justify-center gap-2 border-l-2 border-green-700 pl-4 ml-2">
              <a href="#" className="hover:bg-green-700 p-1">{t('mission.recruitment.mathematician')}</a>
              <a href="#" className="hover:bg-green-700 p-1">{t('mission.recruitment.developer')}</a>
              <a href="#" className="hover:bg-green-700 p-1">{t('mission.recruitment.planner')}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
