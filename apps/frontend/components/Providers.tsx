'use client'

import { ReactNode } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/react-query-client'
import { ModalProvider } from './ui/ModalContext'

interface Props {
  children: ReactNode
}

const Providers = ({ children }: Props) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ModalProvider>
          {/* - */}
          {children}
          {/* - */}
        </ModalProvider>
      </QueryClientProvider>
    </>
  )
}

export default Providers
