import React, { useState } from 'react'
import { Hammer, Star, MapPin, Phone, Mail, ExternalLink, Filter } from 'lucide-react'

const ContractorReferrals = ({ project }) => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedContractor, setSelectedContractor] = useState(null)

  const categories = [
    { id: 'all', name: 'All Services' },
    { id: 'general', name: 'General Contractor' },
    { id: 'painter', name: 'Painting' },
    { id: 'flooring', name: 'Flooring' },
    { id: 'electrical', name: 'Electrical' },
    { id: 'plumbing', name: 'Plumbing' }
  ]

  const contractors = [
    {
      id: 1,
      name: 'Premier Home Solutions',
      category: 'general',
      specialties: ['Full Renovations', 'Room Additions', 'Kitchen Remodel'],
      rating: 4.8,
      reviews: 124,
      location: '2.3 miles away',
      phone: '(555) 123-4567',
      email: 'info@premierhome.com',
      website: 'www.premierhome.com',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300&h=200&fit=crop',
      description: 'Full-service contractor specializing in residential renovations with 15+ years experience.',
      priceRange: '$$$',
      availability: 'Available in 2-3 weeks',
      verified: true,
      insurance: true,
      portfolio: [
        'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=200&h=150&fit=crop',
        'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=200&h=150&fit=crop'
      ]
    },
    {
      id: 2,
      name: 'ColorCraft Painters',
      category: 'painter',
      specialties: ['Interior Painting', 'Color Consultation', 'Wallpaper'],
      rating: 4.9,
      reviews: 89,
      location: '1.8 miles away',
      phone: '(555) 234-5678',
      email: 'hello@colorcraft.com',
      website: 'www.colorcraft.com',
      image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=300&h=200&fit=crop',
      description: 'Professional painting services with expertise in color matching and premium finishes.',
      priceRange: '$$',
      availability: 'Available next week',
      verified: true,
      insurance: true,
      portfolio: [
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=200&h=150&fit=crop'
      ]
    },
    {
      id: 3,
      name: 'Elite Floor Solutions',
      category: 'flooring',
      specialties: ['Hardwood', 'Luxury Vinyl', 'Tile Installation'],
      rating: 4.7,
      reviews: 156,
      location: '3.1 miles away',
      phone: '(555) 345-6789',
      email: 'contact@eliteflooring.com',
      website: 'www.eliteflooring.com',
      image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=300&h=200&fit=crop',
      description: 'Flooring specialists offering premium materials and expert installation services.',
      priceRange: '$$$',
      availability: 'Available in 1-2 weeks',
      verified: true,
      insurance: true,
      portfolio: [
        'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200&h=150&fit=crop',
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=150&fit=crop'
      ]
    }
  ]

  const filteredContractors = selectedCategory === 'all' 
    ? contractors 
    : contractors.filter(contractor => contractor.category === selectedCategory)

  const handleContactContractor = (contractor) => {
    alert(`Contacting ${contractor.name}...\nEmail: ${contractor.email}\nPhone: ${contractor.phone}`)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Find Contractors</h2>
            <p className="text-gray-600">
              Connect with verified contractors to implement your design plan
            </p>
          </div>
          <div className="text-primary-600">
            <Hammer className="w-12 h-12" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Verified Professionals</h4>
            <p className="text-blue-800 text-sm">
              All contractors are pre-screened, licensed, and insured for your protection.
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-2">Project Matching</h4>
            <p className="text-green-800 text-sm">
              We match you with contractors experienced in your specific project type.
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-900 mb-2">Quality Guarantee</h4>
            <p className="text-purple-800 text-sm">
              All work comes with warranty protection and our satisfaction guarantee.
            </p>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter by Service</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                selectedCategory === category.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Contractors List */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-gray-900">
          Recommended Contractors ({filteredContractors.length})
        </h3>
        
        {filteredContractors.map((contractor) => (
          <div key={contractor.id} className="card hover:shadow-lg transition-shadow">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Basic Info */}
              <div>
                <div className="flex items-start space-x-4 mb-4">
                  <img
                    src={contractor.image}
                    alt={contractor.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="text-lg font-semibold text-gray-900">
                        {contractor.name}
                      </h4>
                      {contractor.verified && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          Verified
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(contractor.rating) 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-1">
                        {contractor.rating} ({contractor.reviews} reviews)
                      </span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      {contractor.location}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4">{contractor.description}</p>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Price Range:</span>
                    <span className="font-medium">{contractor.priceRange}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Availability:</span>
                    <span className="font-medium">{contractor.availability}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Insurance:</span>
                    <span className="font-medium text-green-600">
                      {contractor.insurance ? 'Verified' : 'Not Verified'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Middle Column - Specialties & Portfolio */}
              <div>
                <h5 className="font-semibold text-gray-900 mb-3">Specialties</h5>
                <div className="flex flex-wrap gap-2 mb-4">
                  {contractor.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>

                <h5 className="font-semibold text-gray-900 mb-3">Recent Work</h5>
                <div className="grid grid-cols-2 gap-2">
                  {contractor.portfolio.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${contractor.name} portfolio`}
                      className="w-full h-20 object-cover rounded"
                    />
                  ))}
                </div>
              </div>

              {/* Right Column - Contact */}
              <div className="flex flex-col space-y-3">
                <button
                  onClick={() => handleContactContractor(contractor)}
                  className="btn-primary w-full"
                >
                  Get Quote
                </button>
                
                <div className="space-y-2">
                  <a
                    href={`tel:${contractor.phone}`}
                    className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{contractor.phone}</span>
                  </a>
                  
                  <a
                    href={`mailto:${contractor.email}`}
                    className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900"
                  >
                    <Mail className="w-4 h-4" />
                    <span>{contractor.email}</span>
                  </a>
                  
                  <a
                    href={`https://${contractor.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>{contractor.website}</span>
                  </a>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h6 className="text-sm font-medium text-gray-900 mb-2">Project Match</h6>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-green-800 text-xs">
                      ✓ Experienced with {project.roomType.toLowerCase()} renovations<br />
                      ✓ Available in your area<br />
                      ✓ Matches your project scope
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredContractors.length === 0 && (
        <div className="card text-center py-12">
          <Hammer className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No contractors found</h3>
          <p className="text-gray-600 mb-4">
            No contractors match your current filter. Try selecting "All Services" or a different category.
          </p>
          <button
            onClick={() => setSelectedCategory('all')}
            className="btn-primary"
          >
            Show All Contractors
          </button>
        </div>
      )}
    </div>
  )
}

export default ContractorReferrals