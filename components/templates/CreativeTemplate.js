export default function CreativeTemplate({ data }) {
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
      {/* Header with Geometric Design */}
      <div className="relative mb-12">
        <div className="absolute top-0 right-0 w-32 h-32 bg-black transform rotate-45 opacity-10"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-black mb-2 tracking-tight">
            {data.personalInfo?.fullName || 'Your Name'}
          </h1>
          <div className="w-20 h-1 bg-black mb-4"></div>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 max-w-lg">
            {data.personalInfo?.email && (
              <span className="flex items-center">
                <span className="w-2 h-2 bg-black rounded-full mr-2"></span>
                {data.personalInfo.email}
              </span>
            )}
            {data.personalInfo?.phone && (
              <span className="flex items-center">
                <span className="w-2 h-2 bg-black rounded-full mr-2"></span>
                {data.personalInfo.phone}
              </span>
            )}
            {data.personalInfo?.address && (
              <span className="flex items-center">
                <span className="w-2 h-2 bg-black rounded-full mr-2"></span>
                {data.personalInfo.address}
              </span>
            )}
            {data.personalInfo?.linkedin && (
              <span className="flex items-center">
                <span className="w-2 h-2 bg-black rounded-full mr-2"></span>
                {data.personalInfo.linkedin}
              </span>
            )}
            {data.personalInfo?.website && (
              <span className="flex items-center col-span-2">
                <span className="w-2 h-2 bg-black rounded-full mr-2"></span>
                {data.personalInfo.website}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Summary with Creative Layout */}
      {data.summary && (
        <div className="mb-10">
          <div className="relative">
            <div className="absolute -left-4 top-0 w-1 h-full bg-black"></div>
            <div className="pl-8">
              <h2 className="text-2xl font-bold text-black mb-4">About Me</h2>
              <p className="text-gray-700 leading-relaxed text-lg">{data.summary}</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="col-span-2 space-y-8">
          {/* Experience */}
          {data.experience && data.experience.length > 0 && data.experience[0].company && (
            <div>
              <h2 className="text-2xl font-bold text-black mb-6 relative">
                Experience
                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-black"></div>
              </h2>
              {data.experience.map((exp, index) => exp.company && (
                <div key={index} className="mb-6 last:mb-0 relative">
                  <div className="absolute -left-8 top-2 w-3 h-3 bg-black rounded-full"></div>
                  <div className="border-l-2 border-gray-200 pl-6 pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-black">{exp.position}</h3>
                        <p className="text-gray-600 font-medium">{exp.company}</p>
                      </div>
                      <div className="bg-black text-white px-3 py-1 text-xs font-medium rounded">
                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </div>
                    </div>
                    {exp.description && (
                      <p className="text-gray-700 text-sm leading-relaxed mt-2">{exp.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {data.projects && data.projects.length > 0 && data.projects[0].name && (
            <div>
              <h2 className="text-2xl font-bold text-black mb-6 relative">
                Projects
                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-black"></div>
              </h2>
              {data.projects.map((project, index) => project.name && (
                <div key={index} className="mb-6 last:mb-0 bg-gray-50 p-4 rounded-lg border-l-4 border-black">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-black text-lg">{project.name}</h3>
                    {project.link && (
                      <span className="text-sm text-gray-500 bg-white px-2 py-1 rounded">{project.link}</span>
                    )}
                  </div>
                  {project.technologies && (
                    <p className="text-sm text-gray-600 mb-2 font-medium">
                      <span className="font-bold">Tech Stack:</span> {project.technologies}
                    </p>
                  )}
                  {project.description && (
                    <p className="text-gray-700 text-sm leading-relaxed">{project.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-black mb-4 relative">
                Skills
                <div className="absolute -bottom-2 left-0 w-8 h-1 bg-black"></div>
              </h2>
              <div className="space-y-3">
                {data.skills.map((skill, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
                    <span className="text-sm text-gray-700 font-medium">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {data.education && data.education.length > 0 && data.education[0].school && (
            <div>
              <h2 className="text-xl font-bold text-black mb-4 relative">
                Education
                <div className="absolute -bottom-2 left-0 w-8 h-1 bg-black"></div>
              </h2>
              {data.education.map((edu, index) => edu.school && (
                <div key={index} className="mb-4 last:mb-0 p-3 bg-gray-50 rounded-lg">
                  <h3 className="font-bold text-black text-sm">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h3>
                  <p className="text-gray-600 text-sm">{edu.school}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    {edu.gpa && <span className="block">GPA: {edu.gpa}</span>}
                    }
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}