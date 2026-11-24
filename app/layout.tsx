import './globals.css'
import { ReactNode } from 'react'
import AuthSessionProvider from './components/SessionProvider'
import NavBar from './components/NavBar'
import { NotificationProvider } from './components/NotificationContext'
import Notification from './components/Notification'

// Base layout of the navigation bar
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">
        <AuthSessionProvider>
          <NotificationProvider>
            <NavBar />
            <Notification />
            {children}
          </NotificationProvider>
        </AuthSessionProvider>
      </body>
    </html>
  )
}
