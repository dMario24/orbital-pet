'use client'

import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Image from 'next/image'
import { trackAmplitudeEvent } from '@/lib/amplitude'

export default function LoginPage() {
  const router = useRouter()

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        router.push('/dashboard')
      }
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [router])

  const handleKakaoLogin = async () => {
    trackAmplitudeEvent('CLICK_KAKAO_LOGIN')
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        scopes: 'profile_nickname account_email', // 변경된 부분
      },
    })

    if (error) {
      console.error('Error logging in with Kakao:', error.message)
      alert('카카오 로그인 중 오류가 발생했습니다: ' + error.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="p-8 bg-gray-900 border border-gray-700 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4 text-cyan-400">Orbital Pet</h1>
        <p className="mb-8 text-gray-300">궤도 펫과 함께하는 우주 탐험. 지금 시작하세요.</p>
        <button
          onClick={handleKakaoLogin}
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-6 rounded-lg inline-flex items-center transition-transform transform hover:scale-105"
        >
          <Image src="/kakao_logo.svg" alt="Kakao Logo" width={24} height={24} className="w-6 h-6 mr-3" />
          <span className="text-lg">카카오로 시작하기</span>
        </button>
      </div>
    </div>
  )
}