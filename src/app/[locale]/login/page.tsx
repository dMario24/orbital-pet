'use client'

import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Image from 'next/image'

export default function LoginPage() {
  const router = useRouter()

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        router.push('/')
      }
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [router])

  const handleKakaoLogin = async () => {
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Orbital Pet</h1>
        <p className="mb-6">위성 다마고치에 오신 것을 환영합니다!</p>
        <button
          onClick={handleKakaoLogin}
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
        >
          <Image src="/kakao_logo.svg" alt="Kakao Logo" width={20} height={20} className="w-5 h-5 mr-2" />
          <span>카카오로 로그인</span>
        </button>
      </div>
    </div>
  )
}
