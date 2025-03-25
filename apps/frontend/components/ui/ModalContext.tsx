import { X } from 'lucide-react'
import React, { createContext, useState, useContext, ReactNode } from 'react'
import { BtnIcon } from './btn/BtnIcon'

type ModalContextType = {
  openModal: (title: string, content: ReactNode) => void
  closeModal: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) throw new Error('useModal must be used within ModalProvider')
  return context
}

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [content, setContent] = useState<ReactNode>(null)
  const [title, setTitle] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  const openModal = (title: string, modalContent: ReactNode) => {
    setTitle(title)
    setContent(modalContent)
    setIsOpen(true)
    setTimeout(() => setIsVisible(true), 10)
  }

  const closeModal = () => {
    setIsVisible(false)
    setTimeout(() => {
      setIsOpen(false)
      setTitle('')
      setContent(null)
    }, 250)
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal()
    }
  }

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {isOpen && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-dark/90 transition duration-250 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          onClick={handleBackdropClick}
        >
          <div className="relative max-w-screen min-w-md mx-12 horizontal-card rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <p className="text-[20px] font-semibold">{title}</p>
              <BtnIcon onClick={closeModal}>
                <X className="w-5 h-5"></X>
              </BtnIcon>
            </div>
            {content}
          </div>
        </div>
      )}
    </ModalContext.Provider>
  )
}
