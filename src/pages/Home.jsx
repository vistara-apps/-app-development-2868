import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Zap, Users, Award, Upload, Palette, MessageSquare, Hammer, Star, CheckCircle } from 'lucide-react'
import { useUser } from '../contexts/UserContext'
import LoginModal from '../components/LoginModal'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

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
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-primary-100 py-24 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-soft"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-soft" style={{animationDelay: '1s'}}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-slide-up">
              <h1 className="heading-xl text-gray-900 mb-6">
                Transform Awkward Spaces into
                <span className="text-gradient block mt-2"> Functional Homes</span>
              </h1>
            </div>
            <div className="animate-slide-up" style={{animationDelay: '0.2s'}}>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                AI-powered home design that helps you optimize layouts and decor for any living space. 
                Get personalized recommendations and professional guidance from industry experts.
              </p>
            </div>
            <div className="animate-slide-up flex flex-col sm:flex-row gap-4 justify-center items-center" style={{animationDelay: '0.4s'}}>
              {user ? (
                <Button size="lg" className="group">
                  <Link to="/dashboard" className="flex items-center">
                    Go to Dashboard
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              ) : (
                <Button 
                  size="lg"
                  onClick={() => setIsLoginModalOpen(true)}
                  className="group"
                >
                  Start Designing
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              )}
              <Button variant="secondary" size="lg">
                <Link to="/pricing">View Pricing</Link>
              </Button>
            </div>
            
            {/* Trust indicators */}
            <div className="mt-12 animate-slide-up" style={{animationDelay: '0.6s'}}>
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-success-500 mr-2" />
                  Free to start
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-success-500 mr-2" />
                  No credit card required
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-success-500 mr-2" />
                  Professional designers
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group animate-slide-up hover-lift" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl mb-6 group-hover:shadow-medium transition-all duration-300">
                  <stat.icon className="w-10 h-10 text-primary-600" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-3">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-slide-up">
            <h2 className="heading-lg text-gray-900 mb-6">
              Everything You Need to Design Your Perfect Space
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our comprehensive platform combines cutting-edge AI technology with professional expertise 
              to transform your home design experience from concept to completion.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                interactive
                className="group animate-slide-up hover-lift"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center group-hover:shadow-medium transition-all duration-300">
                      <feature.icon className="w-8 h-8 text-primary-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-700 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 py-24 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full animate-pulse-soft"></div>
          <div className="absolute bottom-10 left-10 w-24 h-24 bg-white/10 rounded-full animate-pulse-soft" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-slide-up">
            <h2 className="heading-lg text-white mb-6">
              Ready to Transform Your Space?
            </h2>
            <p className="text-xl text-primary-100 mb-10 max-w-3xl mx-auto leading-relaxed">
              Join thousands of homeowners who have already transformed their living spaces with Spaceify. 
              Start your journey to a more functional and beautiful home today.
            </p>
          </div>
          
          <div className="animate-slide-up flex flex-col sm:flex-row gap-4 justify-center items-center" style={{animationDelay: '0.2s'}}>
            {user ? (
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-white text-primary-700 hover:bg-gray-50 group"
              >
                <Link to="/dashboard" className="flex items-center">
                  Go to Dashboard
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            ) : (
              <Button 
                size="lg"
                variant="secondary"
                onClick={() => setIsLoginModalOpen(true)}
                className="bg-white text-primary-700 hover:bg-gray-50 group"
              >
                Get Started Today
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            )}
          </div>
          
          {/* Social proof */}
          <div className="mt-12 animate-slide-up" style={{animationDelay: '0.4s'}}>
            <div className="flex items-center justify-center space-x-1 text-primary-200">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <p className="text-primary-200 mt-2">Rated 4.9/5 by over 2,000 happy customers</p>
          </div>
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
