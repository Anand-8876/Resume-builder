export default function TemplateCard({ template, onSelect }) {
  return (
    <div className="group cursor-pointer" onClick={onSelect}>
      <div className="bg-white rounded-lg border-2 border-gray-200 shadow-lg overflow-hidden transition-all duration-300 hover:border-black hover:shadow-xl">
        {/* Template Preview */}
        <div className="relative h-64 bg-gray-50 flex items-center justify-center">
          <div className="text-6xl font-bold text-gray-300 group-hover:text-gray-400 transition-colors">
            {template.name.charAt(0)}
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity flex items-center justify-center">
            <div className="bg-black text-white px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
              Select Template
            </div>
          </div>
        </div>
        
        {/* Template Info */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-black mb-2">{template.name}</h3>
          <p className="text-gray-600 text-sm mb-4">{template.description}</p>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 uppercase font-medium">
              {template.name} Style
            </span>
            <div className="w-6 h-6 border-2 border-black rounded transition-colors group-hover:bg-black">
              <div className="w-2 h-2 bg-white rounded-full m-0.5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}