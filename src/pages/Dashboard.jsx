import React from 'react'
import { Link } from 'react-router-dom'
import { Plus, Home, Calendar, Users } from 'lucide-react'
import { useUser } from '../contexts/UserContext'

const Dashboard = () => {
  const { user, projects, subscription } = useUser()

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please sign in to access your dashboard</h2>
          <Link to="/" className="btn-primary">Go to Home</Link>
        </div>
      </div>
    )
  }

  const recentProjects = projects.slice(-3)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user.name}!
        </h1>
        <p className="text-gray-600">
          Let's continue transforming your spaces into functional, beautiful homes.
        </p>
      </div>

      {/* Subscription Status */}
      {subscription && (
        <div className="card mb-8 bg-primary-50 border-primary-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-primary-900 mb-1">
                {subscription.plan} Plan Active
              </h3>
              <p className="text-primary-700">
                Your subscription is active and ready to use.
              </p>
            </div>
            <div className="text-primary-600">
              <Calendar className="w-8 h-8" />
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link to="/projects" className="card hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <Plus className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Create New Project</h3>
              <p className="text-gray-600">Start designing a new room</p>
            </div>
          </div>
        </Link>

        <div className="card">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Home className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{projects.length}</h3>
              <p className="text-gray-600">Total Projects</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Design Style</h3>
              <p className="text-gray-600">{user.designPreferences || 'Not set'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Projects */}
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Recent Projects</h2>
          <Link to="/projects" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
            View All
          </Link>
        </div>

        {recentProjects.length === 0 ? (
          <div className="text-center py-8">
            <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
            <p className="text-gray-600 mb-4">Create your first project to get started with AI-powered room design.</p>
            <Link to="/projects" className="btn-primary">
              Create Your First Project
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentProjects.map((project) => (
              <Link
                key={project.id}
                to={`/projects/${project.id}`}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <h4 className="font-medium text-gray-900 mb-2">{project.name}</h4>
                <p className="text-sm text-gray-600 mb-2">{project.roomType}</p>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>Status: {project.status}</span>
                  <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Call to Action */}
      {!subscription && (
        <div className="mt-8 card bg-gradient-to-r from-primary-500 to-primary-600 text-white">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">Unlock Premium Features</h3>
            <p className="mb-4">
              Get unlimited AI generations, priority support, and professional consultations.
            </p>
            <Link to="/pricing" className="bg-white text-primary-600 hover:bg-gray-100 px-6 py-2 rounded-lg font-medium transition-colors">
              View Plans
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard