'use client'
import { auth } from '@/firebase/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { useSnapshot } from 'valtio'
import { state } from '@/state/state'

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const snapshot = useSnapshot(state)
  onAuthStateChanged(auth, (user) => {
    if (user) {
      
      const uid = user.uid;

      state.uid = uid
      
    } else {
    

      state.uid = ""
    }
  });
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
function initializeApp(firebaseConfig: { apiKey: string; authDomain: string; projectId: string; storageBucket: string; messagingSenderId: string; appId: string; measurementId: string }) {
  throw new Error('Function not implemented.')
}

