import { createServerSupabaseClient } from '@/lib/supabaseServer'
import { redirect } from 'next/navigation'
import LogoutButton from '@/components/LogoutButton'

export default async function HomePage() {
  const supabase = await createServerSupabaseClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Orbital Pet</h1>
      <p className="text-lg mb-8">환영합니다, {session.user.email}님!</p>
      {/* 여기에 위성 펫 UI가 들어갈 예정입니다. */}
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md text-center">
        <p className="text-xl font-semibold mb-4">당신의 위성 펫</p>
        {/* 임시 펫 이미지 */}
        <img src="/satellite_placeholder.png" alt="Satellite Pet" className="mx-auto w-32 h-32 mb-4" />
        <p className="text-gray-700">에너지: 100%</p>
        <p className="text-gray-700">통신 감도: 100%</p>
        <p className="text-gray-700 mb-6">행복도: 😊</p>
        <div className="flex justify-around">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            에너지 충전
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            교신하기
          </button>
        </div>
      </div>
      <div className="mt-8">
        <LogoutButton />
      </div>
    </div>
  )
}
