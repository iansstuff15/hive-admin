'use client'
import { auth } from '@/firebase/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { useSnapshot } from 'valtio'
import { state } from '@/state/state'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathName = usePathname()
  const router = useRouter()
  const snapshot = useSnapshot(state)
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        
        const uid = user.uid;
  
        state.uid = uid
        
      } else {
      
  
        state.uid = ""
      if(pathName!= '/' && state.uid==""){
        router.push('/')
      } 
      }
    });
  },[])
 

  
  return (
    <html lang="en">
      <body className={inter.className}>{children}
      <ProgressBar
          height="18px"
          color="#fffd00"
          options={{ showSpinner: false }}
         
        />
      </body>
    </html>
  )
}
function initializeApp(firebaseConfig: { apiKey: string; authDomain: string; projectId: string; storageBucket: string; messagingSenderId: string; appId: string; measurementId: string }) {
  throw new Error('Function not implemented.')
}

