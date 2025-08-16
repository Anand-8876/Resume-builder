export default function ElegantTemplate({ data }) {
  if (!data) return null

  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    })
  }

  return (
    <div className="resume-preview bg-white">
      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-1/3 bg-gray-900 text-white p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">
              {data.personalInfo?.fullName || 'Your Name'}
            </h1>
            <div className="w-12 h-1 bg-white mb-6"></div>
          </div>

          {/* Contact */}
          <div className="mb-8">
            <h2 className="text-sm font-semibold uppercase tracking-wide mb-4">Contact</h2>
            <div className="space-y-2 text-sm">
              {data.personalInfo?.email && (
                <div className="break-words">{data.personalInfo.email}</div>
              )}
              {data.personalInfo?.phone && (
                <div>{data.personalInfo.phone}</div>
              )}
              {data.personalInfo?.address && (
                <div>{data.personalInfo.address}</div>
              )}
              {data.personalInfo?.linkedin && (
                <div className="break-words">{data.personalInfo.linkedin}</div>
              )}
              {data.personalInfo?.website && (
                <div className="break-words">{data.personalInfo.website}</div>
              )}
            </div>
          </div>

          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <div className="mb-8">
              <h2 className="text-sm font-semibold uppercase tracking-wide mb-4">Skills</h2>
              <div className="space-y-2">
                {data.skills.map((skill, index) => (
                  <div key={index} className="text-sm">{skill}</div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {data.education && data.education.length > 0 && data.education[0].school && (
            <div className="mb-8">
              <h2 className="text-sm font-semibold uppercase tracking-wide mb-4">Education</h2>
              {data.education.map((edu, index) => edu.school && (
                <div key={index} className="mb-4 last:mb-0">
                  <div className="text-sm font-medium">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </div>
                  <div className="text-sm text-gray-300">{edu.school}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    {edu.gpa && (
                      <div>GPA: {edu.gpa}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Content */}
        <div className="w-2/3 p-8">
          {/* Summary */}
          {data.summary && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-black mb-4 border-b-2 border-gray-200 pb-2">
                Professional Summary
              </h2>
              <p className="text-gray-700 leading-relaxed">{data.summary}</p>
            </div>
          )}

          {/* Experience */}
          {data.experience && data.experience.length > 0 && data.experience[0].company && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-black mb-4 border-b-2 border-gray-200 pb-2">
                Professional Experience
              </h2>
              {data.experience.map((exp, index) => exp.company && (
                <div key={index} className="mb-6 last:mb-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-black">{exp.position}</h3>
                      <p className="text-gray-600 font-medium">{exp.company}</p>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </div>
                  </div>
                  {exp.description && (
                    <p className="text-gray-700 text-sm leading-relaxed mt-2">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {data.projects && data.projects.length > 0 && data.projects[0].name && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-black mb-4 border-b-2 border-gray-200 pb-2">
                Projects
              </h2>
              {data.projects.map((project, index) => project.name && (
                <div key={index} className="mb-4 last:mb-0">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-black">{project.name}</h3>
                    {project.link && (
                      <span className="text-sm text-gray-500">{project.link}</span>
                    )}
                  </div>
                  {project.technologies && (
                    <p className="text-sm text-gray-600 mb-1 italic">Technologies: {project.technologies}</p>
                  )}
                  {project.description && (
                    <p className="text-gray-700 text-sm leading-relaxed">{project.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}