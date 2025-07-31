import React, { useState } from 'react'
import { Zap, Clock, CheckCircle, Eye, Star } from 'lucide-react'
import { useUser } from '../contexts/UserContext'

const AILayoutGenerator = ({ project, updateProject }) => {
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedLayout, setSelectedLayout] = useState(project.selectedLayout)
  const { subscription } = useUser()

  const generateLayouts = async () => {
    if (!subscription && project.layoutOptions?.length >= 2) {
      alert('Free plan allows only 2 layout generations. Upgrade to get unlimited generations.')
      return
    }

    setIsGenerating(true)
    
    // Simulate AI generation with realistic delay
    setTimeout(() => {
      const newLayouts = [
        {
          id: Date.now(),
          name: 'Modern Open Layout',
          description: 'Maximizes natural light with an open floor plan. Furniture arranged to create distinct zones while maintaining flow.',
          pros: ['Great natural light', 'Open feel', 'Easy navigation'],
          cons: ['Less privacy', 'Noise carries'],
          style: 'Modern',
          efficiency: 85
        },
        {
          id: Date.now() + 1,
          name: 'Cozy Traditional Layout',
          description: 'Intimate arrangement focused on conversation and comfort. Strategic furniture placement creates warm, inviting spaces.',
          pros: ['Intimate atmosphere', 'Defined spaces', 'Storage optimization'],
          cons: ['Smaller feeling', 'Less natural light'],
          style: 'Traditional',
          efficiency: 78
        },
        {
          id: Date.now() + 2,
          name: 'Multi-functional Smart Layout',
          description: 'Flexible design that adapts to different needs. Incorporates space-saving solutions and dual-purpose furniture.',
          pros: ['Versatile use', 'Space efficient', 'Modern solutions'],
          cons: ['Complex setup', 'Higher cost'],
          style: 'Contemporary',
          efficiency: 92
        }
      ]

      updateProject(project.id, {
        layoutOptions: [...(project.layoutOptions || []), ...newLayouts]
      })
      setIsGenerating(false)
    }, 3000)
  }

  const selectLayout = (layout) => {
    setSelectedLayout(layout.id)
    updateProject(project.id, {
      selectedLayout: layout.id
    })
  }

  const layouts = project.layoutOptions || []

  return (
    <div className="space-y-8">
      {/* Generate Section */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Layout Generator</h2>
            <p className="text-gray-600">
              Generate optimized room layouts based on your space dimensions and preferences
            </p>
          </div>
          <button
            onClick={generateLayouts}
            disabled={isGenerating}
            className="btn-primary flex items-center space-x-2"
          >
            {isGenerating ? (
              <>
                <Clock className="w-5 h-5 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                <span>Generate Layouts</span>
              </>
            )}
          </button>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Room Analysis</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Room Type:</span>
              <span className="ml-2 text-gray-600">{project.roomType}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Square Footage:</span>
              <span className="ml-2 text-gray-600">
                {(project.roomDimensions.length * project.roomDimensions.width).toFixed(1)} sq ft
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Ceiling Height:</span>
              <span className="ml-2 text-gray-600">{project.roomDimensions.height} ft</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Room Shape:</span>
              <span className="ml-2 text-gray-600">Rectangular</span>
            </div>
          </div>
        </div>

        {!subscription && (
          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-amber-800 text-sm">
              <strong>Free Plan:</strong> You can generate up to 2 layout options. 
              <a href="/pricing" className="text-amber-900 underline ml-1">Upgrade</a> for unlimited generations.
            </p>
          </div>
        )}
      </div>

      {/* Generated Layouts */}
      {layouts.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900">
            Generated Layouts ({layouts.length})
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {layouts.map((layout) => (
              <div 
                key={layout.id} 
                className={`card border-2 transition-all ${
                  selectedLayout === layout.id 
                    ? 'border-primary-500 bg-primary-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">
                      {layout.name}
                    </h4>
                    <span className="text-sm text-gray-500">{layout.style} Style</span>
                  </div>
                  <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    <Star className="w-4 h-4" />
                    <span className="text-sm font-medium">{layout.efficiency}% efficient</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{layout.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <h5 className="text-sm font-semibold text-green-700 mb-2">Pros</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {layout.pros.map((pro, index) => (
                        <li key={index} className="flex items-center space-x-1">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-red-700 mb-2">Considerations</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {layout.cons.map((con, index) => (
                        <li key={index} className="flex items-center space-x-1">
                          <div className="w-3 h-3 rounded-full bg-red-500" />
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => selectLayout(layout)}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                      selectedLayout === layout.id
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {selectedLayout === layout.id ? 'Selected' : 'Select Layout'}
                  </button>
                  <button className="btn-secondary flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>Preview</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {layouts.length === 0 && (
        <div className="card text-center py-12">
          <Zap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No layouts generated yet</h3>
          <p className="text-gray-600 mb-6">
            Click "Generate Layouts" to create AI-powered room layout options for your space.
          </p>
        </div>
      )}
    </div>
  )
}

export default AILayoutGenerator