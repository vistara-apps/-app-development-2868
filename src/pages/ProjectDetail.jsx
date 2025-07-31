import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Zap, Palette, MessageSquare, Hammer, Plus, Trash2 } from 'lucide-react'
import { useUser } from '../contexts/UserContext'
import AILayoutGenerator from '../components/AILayoutGenerator'
import FurnitureRecommendations from '../components/FurnitureRecommendations'
import ConsultationScheduler from '../components/ConsultationScheduler'
import ContractorReferrals from '../components/ContractorReferrals'

const ProjectDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, projects, updateProject, deleteProject } = useUser()
  const [activeTab, setActiveTab] = useState('layout')

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please sign in to access this project</h2>
          <button onClick={() => navigate('/')} className="btn-primary">Go to Home</button>
        </div>
      </div>
    )
  }

  const project = projects.find(p => p.id === parseInt(id))

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Project not found</h2>
          <button onClick={() => navigate('/projects')} className="btn-primary">Back to Projects</button>
        </div>
      </div>
    )
  }

  const handleDeleteProject = () => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteProject(project.id)
      navigate('/projects')
    }
  }

  const tabs = [
    { id: 'layout', name: 'Layout Generator', icon: Zap },
    { id: 'furniture', name: 'Furniture & Decor', icon: Palette },
    { id: 'consultation', name: 'Design Consultation', icon: MessageSquare },
    { id: 'contractors', name: 'Find Contractors', icon: Hammer }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/projects')}
            className="btn-secondary flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Projects</span>
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
            <p className="text-gray-600">{project.roomType} • {project.roomDimensions.length}' × {project.roomDimensions.width}' × {project.roomDimensions.height}'</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            project.status === 'active' ? 'bg-green-100 text-green-800' :
            project.status === 'completed' ? 'bg-blue-100 text-blue-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {project.status}
          </span>
          <button
            onClick={handleDeleteProject}
            className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Project Info */}
      <div className="card mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Room Dimensions</h3>
            <p className="text-gray-600">
              {project.roomDimensions.length}' × {project.roomDimensions.width}' × {project.roomDimensions.height}'
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {(project.roomDimensions.length * project.roomDimensions.width).toFixed(1)} sq ft
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Created</h3>
            <p className="text-gray-600">
              {new Date(project.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Progress</h3>
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary-600 h-2 rounded-full" 
                  style={{ 
                    width: `${
                      (project.layoutOptions?.length > 0 ? 25 : 0) +
                      (project.furnitureRecommendations?.length > 0 ? 25 : 0) +
                      (project.selectedLayout ? 25 : 0) +
                      (project.status === 'completed' ? 25 : 0)
                    }%` 
                  }}
                ></div>
              </div>
              <span className="text-sm text-gray-600">
                {Math.round(
                  (project.layoutOptions?.length > 0 ? 25 : 0) +
                  (project.furnitureRecommendations?.length > 0 ? 25 : 0) +
                  (project.selectedLayout ? 25 : 0) +
                  (project.status === 'completed' ? 25 : 0)
                )}%
              </span>
            </div>
          </div>
        </div>
        {project.description && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-600">{project.description}</p>
          </div>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="min-h-96">
        {activeTab === 'layout' && (
          <AILayoutGenerator project={project} updateProject={updateProject} />
        )}
        {activeTab === 'furniture' && (
          <FurnitureRecommendations project={project} updateProject={updateProject} />
        )}
        {activeTab === 'consultation' && (
          <ConsultationScheduler project={project} />
        )}
        {activeTab === 'contractors' && (
          <ContractorReferrals project={project} />
        )}
      </div>
    </div>
  )
}

export default ProjectDetail