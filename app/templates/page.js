'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getSession } from '@/lib/session'
import TemplateCard from '@/components/TemplateCard'

const templates = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and contemporary design with bold headers',
    preview: '/api/placeholder/300/400'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple and elegant with maximum white space',
    preview: '/api/placeholder/300/400'
  },
  {
    id: 'elegant',
    name: 'Elegant',
    description: 'Professional and sophisticated layout',
    preview: '/api/placeholder/300/400'
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Unique design for creative professionals',
    preview: '/api/placeholder/300/400'
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional resume format that never goes out of style',
    preview: '/api/placeholder/300/400'
  }
]

export default function Templates() {
  const router = useRouter()

  useEffect(() => {
    const session = getSession()
    if (!session) {
      router.push('/login')
    }
  }, [router])

  const handleTemplateSelect = (templateId) => {
    router.push(`/preview/${templateId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-black">Choose Your Template</h1>
              <p className="text-gray-600 mt-1">Select a design that matches your style</p>
            </div>
            <button
              onClick={() => router.back()}
              className="border-2 border-black text-black px-6 py-2 rounded-lg hover:bg-black hover:text-white transition-colors"
            >
              ← Back to Builder
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onSelect={() => handleTemplateSelect(template.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}