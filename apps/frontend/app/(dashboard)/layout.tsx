import { Header } from '@components/ui/Header'
import { Footer } from '@components/ui/Footer'
import { Sidebar } from '@components/ui/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="relative min-h-screen min-w-screen flex flex-col overflow-hidden">
      <div className="flex flex-1 w-full h-full">
        <Sidebar className="hidden sm:block" />
        <div className="w-full flex flex-col">
          <Header />
          {/* Content */}
          <div className="w-full sm:max-w-[calc(100vw-191px)] z-10 p-[40px_16px_16px_16px]">
            {children}
          </div>
        </div>
      </div>
      <Footer className="mt-auto" />
    </main>
  )
}
