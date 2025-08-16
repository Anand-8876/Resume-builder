export default function ClassicTemplate({ data }) {
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
    <div className="resume-preview p-8 bg-white font-serif">
      {/* Header */}
      <div className="text-center border-b-2 border-black pb-6 mb-8">
        <h1 className="text-3xl font-bold text-black mb-3">
          {data.personalInfo?.fullName || 'Your Name'}
        </h1>
        <div className="text-sm text-gray-700 space-y-1">
          {data.personalInfo?.address && (
            <div>{data.personalInfo.address}</div>
          )}
          <div className="flex justify-center space-x-4">
            {data.personalInfo?.email && <span>{data.personalInfo.email}</span>}
            {data.personalInfo?.phone && <span>{data.personalInfo.phone}</span>}
          </div>
          {(data.personalInfo?.linkedin || data.personalInfo?.website) && (
            <div className="flex justify-center space-x-4">
              {data.personalInfo?.linkedin && <span>{data.personalInfo.linkedin}</span>}
              {data.personalInfo?.website && <span>{data.personalInfo.website}</span>}
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-black mb-3 uppercase text-center">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed text-justify">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && data.experience[0].company && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-black mb-4 uppercase text-center border-b border-gray-300 pb-2">
            Professional Experience
          </h2>
          {data.experience.map((exp, index) => exp.company && (
            <div key={index} className="mb-5 last:mb-0">
              <div className="mb-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-black text-base">{exp.company}</h3>
                  <span className="text-sm text-gray-600">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </span>
                </div>
                <p className="text-gray-700 italic">{exp.position}</p>
              </div>
              {exp.description && (
                <p className="text-gray-700 text-sm leading-relaxed text-justify ml-4">
                  {exp.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && data.education[0].school && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-black mb-4 uppercase text-center border-b border-gray-300 pb-2">
            Education
          </h2>
          {data.education.map((edu, index) => edu.school && (
            <div key={index} className="mb-4 last:mb-0">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-black">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h3>
                  <p className="text-gray-700">{edu.school}</p>
                  {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                </div>
                <span className="text-sm text-gray-600">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-black mb-4 uppercase text-center border-b border-gray-300 pb-2">
            Technical Skills
          </h2>
          <p className="text-gray-700 text-sm text-center leading-relaxed">
            {data.skills.join(', ')}
          </p>
        </div>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && data.projects[0].name && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-black mb-4 uppercase text-center border-b border-gray-300 pb-2">
            Projects
          </h2>
          {data.projects.map((project, index) => project.name && (
            <div key={index} className="mb-4 last:mb-0">
              <div className="mb-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-black">{project.name}</h3>
                  {project.link && (
                    <span className="text-sm text-gray-600">{project.link}</span>
                  )}
                </div>
                {project.technologies && (
                  <p className="text-sm text-gray-600 italic">Technologies: {project.technologies}</p>
                )}
              </div>
              {project.description && (
                <p className="text-gray-700 text-sm leading-relaxed text-justify ml-4">
                  {project.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}