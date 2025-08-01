import React, { useState } from 'react'
import { Zap, Clock, CheckCircle, Eye, Star, AlertCircle, RefreshCw, Settings, BarChart3 } from 'lucide-react'
import { useUser } from '../contexts/UserContext'
import { useAIGeneration } from '../hooks/useAIGeneration.js'
import { AIErrorBoundary } from './ErrorBoundary.jsx'

const AILayoutGenerator = ({ project, updateProject }) => {
  const [selectedLayout, setSelectedLayout] = useState(project.selectedLayout)
  const [showUsageStats, setShowUsageStats] = useState(false)
  const [generationOptions, setGenerationOptions] = useState({
    style: 'modern',
    budget: 'moderate',
    count: 3
  })
  const { subscription } = useUser()
  const {
    isGenerating,
    error,
    generateLayouts,
    checkPermission,
    getUsageStats,
    clearError,
    retry,
    canGenerateLayouts,
    isAIAvailable
  } = useAIGeneration(subscription)

  const handleGenerateLayouts = async () => {
    try {
      clearError()
      const newLayouts = await generateLayouts(project, generationOptions)
      
      updateProject(project.id, {
        layoutOptions: [...(project.layoutOptions || []), ...newLayouts]
      })
    } catch (err) {
      console.error('Layout generation failed:', err)
      // Error is already handled by the hook
    }
  }

  const selectLayout = (layout) => {
    setSelectedLayout(layout.id)
    updateProject(project.id, {
      selectedLayout: layout.id
    })
  }

  const handleRetry = () => {
    retry(() => handleGenerateLayouts())
  }

  const usageStats = getUsageStats()
  const layouts = project.layoutOptions || []

  return (
    <AIErrorBoundary>
      <div className="space-y-8">
        {/* AI Service Status */}
        {!isAIAvailable && (
          <div className="card border-amber-200 bg-amber-50">
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-6 h-6 text-amber-600" />
              <div>
                <h3 className="font-semibold text-amber-800">AI Service Unavailable</h3>
                <p className="text-amber-700 text-sm">
                  The AI layout generator is currently unavailable. Please check your configuration or try again later.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="card border-red-200 bg-red-50">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-6 h-6 text-red-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-red-800">Generation Failed</h3>
                  <p className="text-red-700 text-sm mt-1">{error}</p>
                </div>
              </div>
              <button
                onClick={handleRetry}
                className="btn-secondary text-sm flex items-center space-x-1"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Retry</span>
              </button>
            </div>
          </div>
        )}

        {/* Generate Section */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Layout Generator</h2>
              <p className="text-gray-600">
                Generate optimized room layouts based on your space dimensions and preferences
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowUsageStats(!showUsageStats)}
                className="btn-secondary flex items-center space-x-2"
              >
                <BarChart3 className="w-4 h-4" />
                <span>Usage</span>
              </button>
              <button
                onClick={handleGenerateLayouts}
                disabled={isGenerating || !canGenerateLayouts || !isAIAvailable}
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
          </div>

          {/* Usage Stats */}
          {showUsageStats && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Usage Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Layout Generations</span>
                    <span className="text-sm text-gray-600">
                      {usageStats.layoutGenerations.used} / {usageStats.layoutGenerations.limit === -1 ? '∞' : usageStats.layoutGenerations.limit}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-600 h-2 rounded-full" 
                      style={{ width: `${usageStats.layoutGenerations.percentage}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Plan</span>
                    <span className="text-sm text-gray-600 capitalize">{usageStats.plan}</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Resets: {usageStats.resetTime}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Generation Options */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Generation Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Style Preference</label>
                <select
                  value={generationOptions.style}
                  onChange={(e) => setGenerationOptions(prev => ({ ...prev, style: e.target.value }))}
                  className="input-field"
                >
                  <option value="modern">Modern</option>
                  <option value="traditional">Traditional</option>
                  <option value="contemporary">Contemporary</option>
                  <option value="minimalist">Minimalist</option>
                  <option value="industrial">Industrial</option>
                  <option value="scandinavian">Scandinavian</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
                <select
                  value={generationOptions.budget}
                  onChange={(e) => setGenerationOptions(prev => ({ ...prev, budget: e.target.value }))}
                  className="input-field"
                >
                  <option value="budget">Budget ($500-2000)</option>
                  <option value="moderate">Moderate ($2000-5000)</option>
                  <option value="premium">Premium ($5000+)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Layout Count</label>
                <select
                  value={generationOptions.count}
                  onChange={(e) => setGenerationOptions(prev => ({ ...prev, count: parseInt(e.target.value) }))}
                  className="input-field"
                >
                  <option value={1}>1 Layout</option>
                  <option value={2}>2 Layouts</option>
                  <option value={3}>3 Layouts</option>
                  <option value={5}>5 Layouts</option>
                </select>
              </div>
            </div>
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

          {!canGenerateLayouts && (
            <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-amber-800 text-sm">
                <strong>{usageStats.plan === 'free' ? 'Free Plan' : 'Usage Limit'}:</strong> 
                {usageStats.plan === 'free' 
                  ? ` You can generate up to ${usageStats.layoutGenerations.limit} layout options per day.`
                  : ` You've reached your daily limit of ${usageStats.layoutGenerations.limit} generations.`
                }
                {usageStats.plan === 'free' && (
                  <a href="/pricing" className="text-amber-900 underline ml-1">Upgrade</a>
                )}
                {usageStats.plan !== 'free' && (
                  <span className="ml-1">Resets at {usageStats.resetTime}</span>
                )}
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
                    <div className="flex items-center space-x-3 text-sm text-gray-500">
                      <span>{layout.style} Style</span>
                      {layout.estimatedCost && (
                        <span>• {layout.estimatedCost}</span>
                      )}
                      {layout.implementationTime && (
                        <span>• {layout.implementationTime}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {layout.aiConfidence && (
                      <div className="flex items-center space-x-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        <span className="text-xs font-medium">AI: {layout.aiConfidence}%</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      <Star className="w-4 h-4" />
                      <span className="text-sm font-medium">{layout.efficiency}% efficient</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{layout.description}</p>

                {/* Enhanced Layout Details */}
                {(layout.designPrinciples?.length > 0 || layout.lightingRecommendations?.length > 0) && (
                  <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                    {layout.designPrinciples?.length > 0 && (
                      <div className="mb-2">
                        <h6 className="text-xs font-semibold text-blue-800 mb-1">Design Principles</h6>
                        <div className="flex flex-wrap gap-1">
                          {layout.designPrinciples.map((principle, index) => (
                            <span key={index} className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded">
                              {principle}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {layout.lightingRecommendations?.length > 0 && (
                      <div>
                        <h6 className="text-xs font-semibold text-blue-800 mb-1">Lighting</h6>
                        <p className="text-xs text-blue-700">{layout.lightingRecommendations.join(', ')}</p>
                      </div>
                    )}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <h5 className="text-sm font-semibold text-green-700 mb-2">Pros</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {layout.pros?.map((pro, index) => (
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
                      {layout.cons?.map((con, index) => (
                        <li key={index} className="flex items-center space-x-1">
                          <div className="w-3 h-3 rounded-full bg-red-500" />
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Furniture Items */}
                {layout.furnitureItems?.length > 0 && (
                  <div className="mb-4">
                    <h5 className="text-sm font-semibold text-gray-700 mb-2">Key Furniture Items</h5>
                    <div className="space-y-2">
                      {layout.furnitureItems.slice(0, 3).map((item, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <div>
                            <span className="font-medium text-gray-900">{item.name}</span>
                            <span className="text-gray-500 ml-2">({item.category})</span>
                          </div>
                          {item.estimatedPrice && (
                            <span className="text-gray-600">{item.estimatedPrice}</span>
                          )}
                        </div>
                      ))}
                      {layout.furnitureItems.length > 3 && (
                        <p className="text-xs text-gray-500">
                          +{layout.furnitureItems.length - 3} more items
                        </p>
                      )}
                    </div>
                  </div>
                )}

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

      {layouts.length === 0 && !isGenerating && (
        <div className="card text-center py-12">
          <Zap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No layouts generated yet</h3>
          <p className="text-gray-600 mb-6">
            {isAIAvailable 
              ? "Click \"Generate Layouts\" to create AI-powered room layout options for your space."
              : "AI service is currently unavailable. Please check your configuration."
            }
          </p>
          {isAIAvailable && canGenerateLayouts && (
            <button
              onClick={handleGenerateLayouts}
              className="btn-primary flex items-center space-x-2 mx-auto"
            >
              <Zap className="w-5 h-5" />
              <span>Get Started</span>
            </button>
          )}
        </div>
      )}
      </div>
    </AIErrorBoundary>
  )
}

export default AILayoutGenerator
