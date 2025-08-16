export default function MinimalTemplate({ data }) {
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
    <div className="resume-preview p-12 bg-white">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-light text-black mb-4 tracking-wide">
          {data.personalInfo?.fullName || 'Your Name'}
        </h1>
        <div className="flex justify-center flex-wrap gap-6 text-sm text-gray-600">
          {data.personalInfo?.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo?.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo?.address && <span>{data.personalInfo.address}</span>}
        </div>
        {(data.personalInfo?.linkedin || data.personalInfo?.website) && (
          <div className="flex justify-center flex-wrap gap-6 text-sm text-gray-600 mt-2">
            {data.personalInfo?.linkedin && <span>{data.personalInfo.linkedin}</span>}
            {data.personalInfo?.website && <span>{data.personalInfo.website}</span>}
          </div>
        )}
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-10">
          <p className="text-gray-700 leading-relaxed text-center italic">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && data.experience[0].company && (
        <div className="mb-10">
          <h2 className="text-lg font-light text-black mb-6 text-center border-b border-gray-200 pb-2">
            EXPERIENCE
          </h2>
          {data.experience.map((exp, index) => exp.company && (
            <div key={index} className="mb-8 last:mb-0">
              <div className="text-center mb-4">
                <h3 className="text-base font-medium text-black">{exp.position}</h3>
                <p className="text-gray-600 text-sm">{exp.company}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                </p>
              </div>
              {exp.description && (
                <p className="text-gray-700 text-sm leading-relaxed text-center max-w-2xl mx-auto">
                  {exp.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && data.education[0].school && (
        <div className="mb-10">
          <h2 className="text-lg font-light text-black mb-6 text-center border-b border-gray-200 pb-2">
            EDUCATION
          </h2>
          {data.education.map((edu, index) => edu.school && (
            <div key={index} className="mb-6 last:mb-0 text-center">
              <h3 className="font-medium text-black text-base">
                {edu.degree} {edu.field && `in ${edu.field}`}
              </h3>
              <p className="text-gray-600 text-sm">{edu.school}</p>
              <p className="text-xs text-gray-500 mt-1">
                {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                {edu.gpa && ` • GPA: ${edu.gpa}`}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <div className="mb-10">
          <h2 className="text-lg font-light text-black mb-6 text-center border-b border-gray-200 pb-2">
            SKILLS
          </h2>
          <div className="text-center">
            <p className="text-gray-700 text-sm leading-relaxed">
              {data.skills.join(' • ')}
            </p>
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && data.projects[0].name && (
        <div className="mb-10">
          <h2 className="text-lg font-light text-black mb-6 text-center border-b border-gray-200 pb-2">
            PROJECTS
          </h2>
          {data.projects.map((project, index) => project.name && (
            <div key={index} className="mb-6 last:mb-0 text-center">
              <h3 className="font-medium text-black text-base">{project.name}</h3>
              {project.technologies && (
                <p className="text-xs text-gray-500 mt-1">{project.technologies}</p>
              )}
              {project.description && (
                <p className="text-gray-700 text-sm leading-relaxed mt-2 max-w-xl mx-auto">
                  {project.description}
                </p>
              )}
              {project.link && (
                <p className="text-xs text-gray-500 mt-1">{project.link}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}