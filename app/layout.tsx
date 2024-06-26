import { SessionProvider } from '../components/SessionProvider'
import Sidebar from '@/components/Sidebar'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { getServerSession } from "next-auth";
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import Login from '@/components/Login'
import ClientProvider from '@/components/ClientProvider'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Chat-GPT',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
    <body>
    <SessionProvider session={session}>
          {!session ? (
          <Login />
        ) : ( 
          <div className="flex">
            <div className="bg-[#202123] max-w-xs h-screen overflow-y-auto md:min-w-[20rem]">
              <Sidebar />
            </div>
            {/* client provider  */}
            <ClientProvider />

            <div className="bg-[#343541] flex-1">{children}</div>
          </div>
       )}
        </SessionProvider> 
    </body>
  </html>
  )
}
