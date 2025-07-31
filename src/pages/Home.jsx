import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Zap, Users, Award, Upload, Palette, MessageSquare, Hammer } from 'lucide-react'
import { useUser } from '../contexts/UserContext'
import LoginModal from '../components/LoginModal'

const Home = () => {
  const { user } = useUser()
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const features = [
    {
      icon: Upload,
      title: 'AI-Powered Room Layout Generator',
      description: 'Upload room dimensions and photos to get personalized layout options that optimize your space.'
    },
    {
      icon: Palette,
      title: 'Furniture & Decor Recommendations',
      description: 'Get AI-powered suggestions for furniture and decor that match your style and budget.'
    },
    {
      icon: MessageSquare,
      title: 'Virtual Design Consultations',
      description: 'Schedule one-on-one sessions with professional designers for personalized advice.'
    },
    {
      icon: Hammer,
      title: 'Contractor Referrals',
      description: 'Connect with trusted contractors to implement your new room design seamlessly.'
    }
  ]

  const stats = [
    { icon: Zap, value: '10K+', label: 'Room Designs Generated' },
    { icon: Users, value: '2K+', label: 'Happy Customers' },
    { icon: Award, value: '4.9/5', label: 'Average Rating' }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Transform Awkward Spaces into
              <span className="text-primary-600"> Functional Homes</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              AI-powered home design that helps you optimize layouts and decor for any living space. 
              Get personalized recommendations and professional guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {user ? (
                <Link to="/dashboard" className="btn-primary text-lg px-8 py-4">
                  Go to Dashboard
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              ) : (
                <button 
                  onClick={() => setIsLoginModalOpen(true)}
                  className="btn-primary text-lg px-8 py-4"
                >
                  Start Designing
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              )}
              <Link to="/pricing" className="btn-secondary text-lg px-8 py-4">
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-primary-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Design Your Perfect Space
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our comprehensive platform combines AI technology with professional expertise 
              to transform your home design experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-primary-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of homeowners who have already transformed their living spaces with Spaceify.
          </p>
          {user ? (
            <Link to="/dashboard" className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
              Go to Dashboard
            </Link>
          ) : (
            <button 
              onClick={() => setIsLoginModalOpen(true)}
              className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Get Started Today
            </button>
          )}
        </div>
      </section>

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </div>
  )
}

export default Home