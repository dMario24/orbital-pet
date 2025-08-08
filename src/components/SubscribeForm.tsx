'use client'

import { useActionState, useEffect, useRef } from 'react'
import { useFormStatus } from 'react-dom'

type FormState = { error?: string; success?: string; } | null;

export function SubscribeForm({ action }: { action: (prevState: FormState, formData: FormData) => Promise<FormState> }) {
  const [state, formAction] = useActionState(action, null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset()
    }
  }, [state])

  return (
    <form ref={formRef} action={formAction} className="flex flex-col md:flex-row gap-2">
      <input
        type="email"
        name="email"
        placeholder="your-email@example.com"
        required
        className="flex-grow bg-gray-900 border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <SubmitButton />
      {state?.error && <p className="text-red-400 text-sm mt-2">{state.error}</p>}
      {state?.success && <p className="text-green-400 text-sm mt-2">{state.success}</p>}
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
    >
      {pending ? '구독 중...' : '구독하기'}
    </button>
  )
}
