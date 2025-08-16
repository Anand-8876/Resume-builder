export default function ModernTemplate({ data }) {
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
    <div className="resume-preview p-8 bg-white">
      {/* Header */}
      <div className="border-b-4 border-black pb-6 mb-8">
        <h1 className="text-4xl font-bold text-black mb-2">
          {data.personalInfo?.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-700">
          {data.personalInfo?.email && (
            <span>{data.personalInfo.email}</span>
          )}
          {data.personalInfo?.phone && (
            <span>{data.personalInfo.phone}</span>
          )}
          {data.personalInfo?.address && (
            <span>{data.personalInfo.address}</span>
          )}
          {data.personalInfo?.linkedin && (
            <span>{data.personalInfo.linkedin}</span>
          )}
          {data.personalInfo?.website && (
            <span>{data.personalInfo.website}</span>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-black mb-3 uppercase tracking-wide">Summary</h2>
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && data.experience[0].company && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-black mb-4 uppercase tracking-wide">Experience</h2>
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

      {/* Education */}
      {data.education && data.education.length > 0 && data.education[0].school && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-black mb-4 uppercase tracking-wide">Education</h2>
          {data.education.map((edu, index) => edu.school && (
            <div key={index} className="mb-4 last:mb-0">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="font-semibold text-black">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h3>
                  <p className="text-gray-600">{edu.school}</p>
                </div>
                <div className="text-right text-sm text-gray-500">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  {edu.gpa && <div>GPA: {edu.gpa}</div>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-black mb-4 uppercase tracking-wide">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span key={index} className="bg-black text-white px-3 py-1 text-sm font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && data.projects[0].name && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-black mb-4 uppercase tracking-wide">Projects</h2>
          {data.projects.map((project, index) => project.name && (
            <div key={index} className="mb-4 last:mb-0">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-black">{project.name}</h3>
                {project.link && (
                  <span className="text-sm text-gray-500 hover:text-black">{project.link}</span>
                )}
              </div>
              {project.technologies && (
                <p className="text-sm text-gray-600 mb-1">Technologies: {project.technologies}</p>
              )}
              {project.description && (
                <p className="text-gray-700 text-sm leading-relaxed">{project.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}