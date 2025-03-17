export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden">
      {children}
    </main>
  )
}
