// Local storage utilities for resume data

const RESUME_DATA_KEY = 'resumeData'

export function saveResumeData(data) {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(RESUME_DATA_KEY, JSON.stringify({
      data,
      timestamp: Date.now()
    }))
  } catch (error) {
    console.error('Error saving resume data:', error)
  }
}

export function getResumeData() {
  if (typeof window === 'undefined') return null
  
  try {
    const stored = localStorage.getItem(RESUME_DATA_KEY)
    if (!stored) return null
    
    const parsed = JSON.parse(stored)
    return parsed.data
  } catch (error) {
    console.error('Error loading resume data:', error)
    return null
  }
}

export function clearResumeData() {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.removeItem(RESUME_DATA_KEY)
  } catch (error) {
    console.error('Error clearing resume data:', error)
  }
}

export function exportResumeData() {
  const data = getResumeData()
  if (!data) return null
  
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json'
  })
  
  return blob
}

export function importResumeData(file) {
  return new Promise((resolve, reject) => {
    if (!file || file.type !== 'application/json') {
      reject(new Error('Please select a valid JSON file'))
      return
    }
    
    const reader = new FileReader()
    
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result)
        saveResumeData(data)
        resolve(data)
      } catch (error) {
        reject(new Error('Invalid JSON file format'))
      }
    }
    
    reader.onerror = () => {
      reject(new Error('Error reading file'))
    }
    
    reader.readAsText(file)
  })
}