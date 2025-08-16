'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSession } from '@/lib/session';
import { getResumeData } from '@/lib/storage';
import ModernTemplate from '@/components/templates/ModernTemplate';
import MinimalTemplate from '@/components/templates/MinimalTemplate';
import ElegantTemplate from '@/components/templates/ElegantTemplate';
import CreativeTemplate from '@/components/templates/CreativeTemplate';
import ClassicTemplate from '@/components/templates/ClassicTemplate';

const templateComponents = {
  modern: ModernTemplate,
  minimal: MinimalTemplate,
  elegant: ElegantTemplate,
  creative: CreativeTemplate,
  classic: ClassicTemplate,
};

export default function PreviewClient({ template }) {
  const [resumeData, setResumeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (!template || !templateComponents[template]) {
          setError('Invalid template specified');
          setIsLoading(false);
          return;
        }

        const session = getSession();
        if (!session) {
          router.push('/login');
          return;
        }

        const data = getResumeData();
        if (!data) {
          router.push('/builder');
          return;
        }

        setResumeData(data);
      } catch (err) {
        console.error('Error loading resume data:', err);
        setError('Failed to load resume data');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [router, template]);

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      try {
        window.print();
      } catch (err) {
        console.error('Error printing:', err);
        alert('Print functionality is not available in this environment');
      }
    }
  };

  const handleGoBack = () => {
    router.push('/templates');
  };

  const handleEditContent = () => {
    router.push('/builder');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={handleGoBack}
            className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Go Back to Templates
          </button>
        </div>
      </div>
    );
  }

  if (!resumeData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No resume data found. Please go back to the builder.</p>
          <button
            onClick={() => router.push('/builder')}
            className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Go to Builder
          </button>
        </div>
      </div>
    );
  }

  const TemplateComponent = templateComponents[template];

  if (!TemplateComponent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Template not found.</p>
          <button
            onClick={handleGoBack}
            className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Choose Different Template
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b-2 border-gray-900 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 capitalize">
                {template} Template
              </h1>
              <p className="text-gray-600 mt-1">Preview your resume</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleGoBack}
                className="border-2 border-gray-900 text-gray-900 px-6 py-2 rounded-lg hover:bg-gray-900 hover:text-white transition-colors"
              >
                ← Change Template
              </button>
              <button
                onClick={handleEditContent}
                className="border-2 border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Edit Content
              </button>
              <button
                onClick={handlePrint}
                className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
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
  );
}