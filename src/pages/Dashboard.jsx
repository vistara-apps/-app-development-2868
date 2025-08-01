import React from 'react'
import { Link } from 'react-router-dom'
import { Plus, Home, Calendar, Users, TrendingUp, Sparkles } from 'lucide-react'
import { useUser } from '../contexts/UserContext'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="mb-10 animate-slide-up">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h1 className="heading-md text-gray-900">
              Welcome back, {user.name}!
            </h1>
            <p className="text-gray-600 text-lg">
              Let's continue transforming your spaces into functional, beautiful homes.
            </p>
          </div>
        </div>
      </div>

      {/* Subscription Status */}
      {subscription && (
        <Card className="mb-10 bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200 animate-slide-up" style={{animationDelay: '0.1s'}}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary-200 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-primary-700" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-900 mb-1">
                  {subscription.plan} Plan Active
                </h3>
                <p className="text-primary-700">
                  Your subscription is active and ready to use all features.
                </p>
              </div>
            </div>
            <div className="hidden sm:flex items-center space-x-2 text-primary-600">
              <TrendingUp className="w-5 h-5" />
              <span className="text-sm font-medium">Premium</span>
            </div>
          </div>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card 
          interactive
          className="group hover-lift animate-slide-up"
          style={{animationDelay: '0.2s'}}
        >
          <Link to="/projects" className="block">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center group-hover:shadow-medium transition-all duration-300">
                <Plus className="w-7 h-7 text-primary-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-700 transition-colors">Create New Project</h3>
                <p className="text-gray-600">Start designing a new room</p>
              </div>
            </div>
          </Link>
        </Card>

        <Card className="animate-slide-up" style={{animationDelay: '0.3s'}}>
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-gradient-to-br from-success-100 to-success-200 rounded-xl flex items-center justify-center">
              <Home className="w-7 h-7 text-success-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{projects.length}</h3>
              <p className="text-gray-600 font-medium">Total Projects</p>
            </div>
          </div>
        </Card>

        <Card className="animate-slide-up" style={{animationDelay: '0.4s'}}>
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
              <Users className="w-7 h-7 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Design Style</h3>
              <p className="text-gray-600 font-medium">{user.designPreferences || 'Not set'}</p>
            </div>
          </div>
        </Card>
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
