'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getSession } from '@/lib/session'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const session = getSession()
    if (session) {
      router.push('/builder')
    } else {
      router.push('/login')
    }
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  )
}