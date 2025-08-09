import { createServerSupabaseClient } from '@/lib/supabaseServer'
import { redirect } from 'next/navigation'
import LogoutButton from '@/components/LogoutButton'

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="font-mono bg-black text-white min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-3xl font-bold text-cyan-400 mb-2">
          Welcome to your Control Room
        </h1>
        <p className="text-gray-400 mb-8">
          Logged in as: {session.user.email}
        </p>

        <div className="bg-gray-900 border-2 border-green-500 rounded-lg p-6 shadow-[0_0_20px_rgba(0,255,0,0.3)]">
          <h2 className="text-2xl font-bold text-green-400 mb-4">SATELLITE PET: ORBIT-1</h2>

          <div className="text-left space-y-4 text-lg">
            <div>
              <p>STATUS: <span className="text-green-400">NOMINAL</span></p>
            </div>
            <div>
              <p>ORBITAL ENERGY:</p>
              <div className="w-full bg-gray-700 rounded-full h-4">
                <div className="bg-green-500 h-4 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div>
              <p>SIGNAL STRENGTH:</p>
              <div className="w-full bg-gray-700 rounded-full h-4">
                <div className="bg-cyan-500 h-4 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
            <div>
              <p>HAPPINESS: <span className="text-yellow-400">JOYFUL 😊</span></p>
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-transform transform hover:scale-105">
              RECHARGE ENERGY
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-transform transform hover:scale-105">
              ESTABLISH COMMS
            </button>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-4">
          <a href="/milestone" className="text-cyan-400 hover:underline">
            &gt; View Milestones
          </a>
          <LogoutButton />
        </div>
      </div>
    </div>
  )
}
