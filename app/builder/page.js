'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getSession } from '@/lib/session'
import { saveResumeData, getResumeData } from '@/lib/storage'
import ResumeForm from '@/components/ResumeForm'

export default function Builder() {
  const [resumeData, setResumeData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const session = getSession()
    if (!session) {
      router.push('/login')
      return
    }

    const savedData = getResumeData()
    if (savedData) {
      setResumeData(savedData)
    }
    setIsLoading(false)
  }, [router])

  const handleSave = (data) => {
    setResumeData(data)
    saveResumeData(data)
  }

  const handleNext = () => {
    router.push('/templates')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-2xl font-bold text-black">Resume Builder</h1>
            <button
              onClick={handleNext}
              className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Choose Template →
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <ResumeForm 
          initialData={resumeData} 
          onSave={handleSave}
        />
      </div>
    </div>
  )
}