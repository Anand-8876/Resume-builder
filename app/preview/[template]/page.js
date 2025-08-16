'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { getSession } from '@/lib/session'
import { getResumeData } from '@/lib/storage'
import ModernTemplate from '@/components/templates/ModernTemplate'
import MinimalTemplate from '@/components/templates/MinimalTemplate'
import ElegantTemplate from '@/components/templates/ElegantTemplate'
import CreativeTemplate from '@/components/templates/CreativeTemplate'
import ClassicTemplate from '@/components/templates/ClassicTemplate'

const templateComponents = {
  modern: ModernTemplate,
  minimal: MinimalTemplate,
  elegant: ElegantTemplate,
  creative: CreativeTemplate,
  classic: ClassicTemplate
}

export default function Preview() {
  const [resumeData, setResumeData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const params = useParams()
  const template = params.template

  useEffect(() => {
    const session = getSession()
    if (!session) {
      router.push('/login')
      return
    }

    const data = getResumeData()
    if (!data) {
      router.push('/builder')
      return
    }

    setResumeData(data)
    setIsLoading(false)
  }, [router])

  const handlePrint = () => {
    window.print()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    )
  }

  if (!resumeData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">No resume data found. Please go back to the builder.</p>
      </div>
    )
  }

  const TemplateComponent = templateComponents[template]

  if (!TemplateComponent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Template not found.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b-2 border-black print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-black capitalize">{template} Template</h1>
              <p className="text-gray-600 mt-1">Preview your resume</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => router.push('/templates')}
                className="border-2 border-black text-black px-6 py-2 rounded-lg hover:bg-black hover:text-white transition-colors"
              >
                ← Change Template
              </button>
              <button
                onClick={() => router.push('/builder')}
                className="border-2 border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Edit Content
              </button>
              <button
                onClick={handlePrint}
                className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Print / Save PDF
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="py-8 print:py-0">
        <div className="max-w-4xl mx-auto px-4 print:px-0 print:max-w-none">
          <TemplateComponent data={resumeData} />
        </div>
      </div>
    </div>
  )
}