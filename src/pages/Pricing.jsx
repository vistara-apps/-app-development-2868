import React from 'react'
import { Check, Zap, Star, Crown } from 'lucide-react'
import { useUser } from '../contexts/UserContext'

const Pricing = () => {
  const { user, subscribe, subscription } = useUser()

  const plans = [
    {
      name: 'Basic',
      price: 29,
      period: 'month',
      icon: Zap,
      description: 'Perfect for single room projects',
      features: [
        '2 AI layout generations per month',
        'Basic furniture recommendations',
        'Email support',
        'Project templates',
        'Standard design styles'
      ],
      limitations: [
        'No priority support',
        'No consultations included',
        'Limited contractor network'
      ]
    },
    {
      name: 'Pro',
      price: 79,
      period: 'month',
      icon: Star,
      description: 'Ideal for multiple rooms and advanced features',
      popular: true,
      features: [
        'Unlimited AI layout generations',
        'Advanced furniture & decor recommendations',
        'Priority email & chat support',
        '1 professional consultation per month',
        'All design styles & themes',
        'Contractor referral network',
        'Project collaboration tools',
        'Custom style preferences'
      ],
      limitations: []
    },
    {
      name: 'Enterprise',
      price: 199,
      period: 'month',
      icon: Crown,
      description: 'For whole home renovations and professionals',
      features: [
        'Everything in Pro plan',
        'Unlimited professional consultations',
        'Dedicated account manager',
        'Priority contractor matching',
        'Advanced project management',
        'Team collaboration features',
        'White-label options',
        'API access',
        'Custom integrations'
      ],
      limitations: []
    }
  ]

  const handleSubscribe = (plan) => {
    if (!user) {
      alert('Please sign in first to subscribe to a plan.')
      return
    }

    subscribe(plan.name)
    alert(`Successfully subscribed to ${plan.name} plan!`)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Choose Your Perfect Plan
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Get access to AI-powered room design, professional consultations, and trusted contractor network. 
          Cancel anytime.
        </p>
      </div>

      {/* Current Subscription Status */}
      {subscription && (
        <div className="card mb-12 bg-gradient-to-r from-primary-500 to-primary-600 text-white">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">Current Plan: {subscription.plan}</h3>
            <p className="text-primary-100">
              Your subscription is active since {new Date(subscription.startDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      )}

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {plans.map((plan, index) => (
          <div
            key={plan.name}
            className={`card relative ${
              plan.popular 
                ? 'border-2 border-primary-500 shadow-xl scale-105' 
                : 'border border-gray-200'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
            )}

            <div className="text-center mb-6">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                plan.popular ? 'bg-primary-100' : 'bg-gray-100'
              }`}>
                <plan.icon className={`w-8 h-8 ${
                  plan.popular ? 'text-primary-600' : 'text-gray-600'
                }`} />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <p className="text-gray-600 mb-4">{plan.description}</p>
              
              <div className="mb-4">
                <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                <span className="text-gray-600">/{plan.period}</span>
              </div>
            </div>

            <div className="space-y-3 mb-8">
              {plan.features.map((feature, featureIndex) => (
                <div key={featureIndex} className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">{feature}</span>
                </div>
              ))}
              
              {plan.limitations.map((limitation, limitationIndex) => (
                <div key={limitationIndex} className="flex items-start space-x-3 opacity-60">
                  <div className="w-5 h-5 mt-0.5 flex-shrink-0 flex items-center justify-center">
                    <div className="w-1 h-4 bg-gray-400" />
                  </div>
                  <span className="text-gray-500 text-sm line-through">{limitation}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => handleSubscribe(plan)}
              disabled={subscription?.plan === plan.name}
              className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                subscription?.plan === plan.name
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : plan.popular
                  ? 'bg-primary-600 hover:bg-primary-700 text-white'
                  : 'bg-gray-900 hover:bg-gray-800 text-white'
              }`}
            >
              {subscription?.plan === plan.name
                ? 'Current Plan'
                : user
                ? `Subscribe to ${plan.name}`
                : 'Sign Up to Subscribe'
              }
            </button>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Can I change my plan later?
            </h3>
            <p className="text-gray-600">
              Yes, you can upgrade or downgrade your plan at any time. Changes will be prorated 
              and take effect immediately.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              What happens if I cancel my subscription?
            </h3>
            <p className="text-gray-600">
              You can cancel anytime. You'll retain access to all features until the end of your 
              current billing period. Your projects and data will be preserved.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Are the contractor referrals vetted?
            </h3>
            <p className="text-gray-600">
              Yes, all contractors in our network are pre-screened, licensed, insured, and reviewed 
              by other customers. We only recommend trusted professionals.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              How accurate are the AI layout recommendations?
            </h3>
            <p className="text-gray-600">
              Our AI considers room dimensions, furniture sizes, traffic flow, and design principles 
              to create optimized layouts. Professional consultations can further refine the designs.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Do you offer refunds?
            </h3>
            <p className="text-gray-600">
              We offer a 30-day money-back guarantee for all plans. If you're not satisfied, 
              contact our support team for a full refund.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-20 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Ready to Transform Your Space?
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Join thousands of homeowners who have already redesigned their homes with Spaceify.
        </p>
        {!user && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary text-lg px-8 py-4">
              Start Free Trial
            </button>
            <button className="btn-secondary text-lg px-8 py-4">
              View Demo
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Pricing