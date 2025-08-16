'use client'
import { useState, useEffect } from 'react'

export default function ResumeForm({ initialData, onSave }) {
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      linkedin: '',
      website: ''
    },
    summary: '',
    experience: [
      {
        id: 1,
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      }
    ],
    education: [
      {
        id: 1,
        school: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        gpa: ''
      }
    ],
    skills: [],
    projects: [
      {
        id: 1,
        name: '',
        description: '',
        technologies: '',
        link: ''
      }
    ]
  })

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData(initialData)
    }
  }, [initialData])

  useEffect(() => {
    onSave(formData)
  }, [formData, onSave])

  const handleInputChange = (section, field, value, index = null) => {
    setFormData(prev => {
      if (index !== null) {
        return {
          ...prev,
          [section]: prev[section].map((item, i) => 
            i === index ? { ...item, [field]: value } : item
          )
        }
      } else if (section === 'personalInfo') {
        return {
          ...prev,
          personalInfo: { ...prev.personalInfo, [field]: value }
        }
      } else {
        return {
          ...prev,
          [field]: value
        }
      }
    })
  }

  const addItem = (section) => {
    const newItem = {
      id: Date.now(),
      ...(section === 'experience' && {
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      }),
      ...(section === 'education' && {
        school: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        gpa: ''
      }),
      ...(section === 'projects' && {
        name: '',
        description: '',
        technologies: '',
        link: ''
      })
    }

    setFormData(prev => ({
      ...prev,
      [section]: [...prev[section], newItem]
    }))
  }

  const removeItem = (section, index) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }))
  }

  const handleSkillsChange = (value) => {
    const skillsArray = value.split(',').map(skill => skill.trim()).filter(skill => skill)
    setFormData(prev => ({ ...prev, skills: skillsArray }))
  }

  return (
    <div className="bg-white rounded-lg border-2 border-black p-8 shadow-lg">
      <h2 className="text-2xl font-bold mb-8 text-black">Build Your Resume</h2>
      
      {/* Personal Information */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-black border-b border-gray-300 pb-2">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-black mb-2">Full Name *</label>
            <input
              type="text"
              value={formData.personalInfo.fullName}
              onChange={(e) => handleInputChange('personalInfo', 'fullName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-2">Email *</label>
            <input
              type="email"
              value={formData.personalInfo.email}
              onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-2">Phone</label>
            <input
              type="tel"
              value={formData.personalInfo.phone}
              onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
              placeholder="+1 (555) 123-4567"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-2">Address</label>
            <input
              type="text"
              value={formData.personalInfo.address}
              onChange={(e) => handleInputChange('personalInfo', 'address', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
              placeholder="City, State"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-2">LinkedIn</label>
            <input
              type="url"
              value={formData.personalInfo.linkedin}
              onChange={(e) => handleInputChange('personalInfo', 'linkedin', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
              placeholder="linkedin.com/in/johndoe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-2">Website</label>
            <input
              type="url"
              value={formData.personalInfo.website}
              onChange={(e) => handleInputChange('personalInfo', 'website', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
              placeholder="www.johndoe.com"
            />
          </div>
        </div>
      </section>

      {/* Professional Summary */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-black border-b border-gray-300 pb-2">Professional Summary</h3>
        <textarea
          value={formData.summary}
          onChange={(e) => handleInputChange('', 'summary', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black h-24"
          placeholder="Brief professional summary highlighting your key achievements and skills..."
        />
      </section>

      {/* Experience */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-black border-b border-gray-300 pb-2">Experience</h3>
          <button
            type="button"
            onClick={() => addItem('experience')}
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm"
          >
            Add Experience
          </button>
        </div>
        {formData.experience.map((exp, index) => (
          <div key={exp.id} className="border border-gray-200 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-medium text-gray-800">Experience {index + 1}</h4>
              {formData.experience.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItem('experience', index)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Remove
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-black mb-2">Company *</label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => handleInputChange('experience', 'company', e.target.value, index)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                  placeholder="Company Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Position *</label>
                <input
                  type="text"
                  value={exp.position}
                  onChange={(e) => handleInputChange('experience', 'position', e.target.value, index)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                  placeholder="Job Title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Start Date</label>
                <input
                  type="month"
                  value={exp.startDate}
                  onChange={(e) => handleInputChange('experience', 'startDate', e.target.value, index)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">End Date</label>
                <input
                  type="month"
                  value={exp.endDate}
                  onChange={(e) => handleInputChange('experience', 'endDate', e.target.value, index)}
                  disabled={exp.current}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black disabled:bg-gray-100"
                />
                <label className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    checked={exp.current}
                    onChange={(e) => handleInputChange('experience', 'current', e.target.checked, index)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-600">Current position</span>
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">Description</label>
              <textarea
                value={exp.description}
                onChange={(e) => handleInputChange('experience', 'description', e.target.value, index)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black h-20"
                placeholder="Describe your responsibilities and achievements..."
              />
            </div>
          </div>
        ))}
      </section>

      {/* Education */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-black border-b border-gray-300 pb-2">Education</h3>
          <button
            type="button"
            onClick={() => addItem('education')}
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm"
          >
            Add Education
          </button>
        </div>
        {formData.education.map((edu, index) => (
          <div key={edu.id} className="border border-gray-200 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-medium text-gray-800">Education {index + 1}</h4>
              {formData.education.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItem('education', index)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Remove
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-black mb-2">School *</label>
                <input
                  type="text"
                  value={edu.school}
                  onChange={(e) => handleInputChange('education', 'school', e.target.value, index)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                  placeholder="University Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Degree</label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => handleInputChange('education', 'degree', e.target.value, index)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                  placeholder="Bachelor's, Master's, etc."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Field of Study</label>
                <input
                  type="text"
                  value={edu.field}
                  onChange={(e) => handleInputChange('education', 'field', e.target.value, index)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                  placeholder="Computer Science, Business, etc."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">GPA</label>
                <input
                  type="text"
                  value={edu.gpa}
                  onChange={(e) => handleInputChange('education', 'gpa', e.target.value, index)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                  placeholder="3.8/4.0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Start Date</label>
                <input
                  type="month"
                  value={edu.startDate}
                  onChange={(e) => handleInputChange('education', 'startDate', e.target.value, index)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">End Date</label>
                <input
                  type="month"
                  value={edu.endDate}
                  onChange={(e) => handleInputChange('education', 'endDate', e.target.value, index)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Skills */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-black border-b border-gray-300 pb-2">Skills</h3>
        <div>
          <label className="block text-sm font-medium text-black mb-2">Skills (comma-separated)</label>
          <textarea
            value={formData.skills.join(', ')}
            onChange={(e) => handleSkillsChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black h-20"
            placeholder="JavaScript, React, Node.js, Python, SQL, etc."
          />
        </div>
      </section>

      {/* Projects */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-black border-b border-gray-300 pb-2">Projects</h3>
          <button
            type="button"
            onClick={() => addItem('projects')}
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm"
          >
            Add Project
          </button>
        </div>
        {formData.projects.map((project, index) => (
          <div key={project.id} className="border border-gray-200 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-medium text-gray-800">Project {index + 1}</h4>
              {formData.projects.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItem('projects', index)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Remove
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-black mb-2">Project Name</label>
                <input
                  type="text"
                  value={project.name}
                  onChange={(e) => handleInputChange('projects', 'name', e.target.value, index)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                  placeholder="Project Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Technologies Used</label>
                <input
                  type="text"
                  value={project.technologies}
                  onChange={(e) => handleInputChange('projects', 'technologies', e.target.value, index)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                  placeholder="React, Node.js, MongoDB"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-black mb-2">Description</label>
              <textarea
                value={project.description}
                onChange={(e) => handleInputChange('projects', 'description', e.target.value, index)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black h-20"
                placeholder="Describe the project and your role..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">Project Link</label>
              <input
                type="url"
                value={project.link}
                onChange={(e) => handleInputChange('projects', 'link', e.target.value, index)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                placeholder="https://github.com/username/project"
              />
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}