'use client'

import { useActionState, useEffect, useRef } from 'react'
import { useFormStatus } from 'react-dom'

type FormState = { error?: string; success?: string; } | null;

interface SubscribeFormProps {
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
  submittingText: string;
  submitText: string;
}

export function SubscribeForm({ action, submittingText, submitText }: SubscribeFormProps) {
  const [state, formAction] = useActionState(action, null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset()
    }
  }, [state])

  return (
    <form ref={formRef} action={formAction} className="flex flex-col items-start gap-2">
      <div className="flex items-center gap-2 w-full">
        <span className="text-green-400">$</span>
        <input
          type="email"
          name="email"
          placeholder="your-email@example.com"
          required
          className="flex-grow bg-transparent border-none text-green-300 placeholder-gray-600 focus:outline-none"
        />
        <SubmitButton submittingText={submittingText} submitText={submitText} />
      </div>
      {state?.error && <p className="text-red-400 text-sm w-full">{state.error}</p>}
      {state?.success && <p className="text-yellow-400 text-sm w-full">{state.success}</p>}
    </form>
  )
}

function SubmitButton({ submittingText, submitText }: { submittingText: string; submitText: string; }) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-green-800 hover:bg-green-700 text-green-200 font-bold py-1 px-3 rounded-sm border border-green-600 disabled:bg-gray-700 disabled:cursor-not-allowed"
    >
      {pending ? submittingText : submitText}
    </button>
  )
}
