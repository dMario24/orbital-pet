'use client'

import { I18nProviderClient } from '@/locales/client'
import { ReactNode } from 'react'

export default function I18nProvider({
  locale,
  children,
}: {
  locale: string
  children: ReactNode
}) {
  return (
    <I18nProviderClient locale={locale}>
      {children}
    </I18nProviderClient>
  )
}
