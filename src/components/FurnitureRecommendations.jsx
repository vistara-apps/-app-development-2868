import React, { useState } from 'react'
import { Palette, ShoppingBag, Heart, ExternalLink } from 'lucide-react'

const FurnitureRecommendations = ({ project, updateProject }) => {
  const [activeCategory, setActiveCategory] = useState('furniture')
  const [selectedItems, setSelectedItems] = useState(project.selectedItems || [])

  const categories = [
    { id: 'furniture', name: 'Furniture' },
    { id: 'decor', name: 'Decor' },
    { id: 'lighting', name: 'Lighting' },
    { id: 'storage', name: 'Storage' }
  ]

  const recommendations = {
    furniture: [
      {
        id: 1,
        name: 'Modern Sectional Sofa',
        price: '$1,299',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop',
        description: 'Comfortable L-shaped sectional perfect for your layout',
        category: 'Seating',
        style: 'Modern'
      },
      {
        id: 2,
        name: 'Glass Coffee Table',
        price: '$399',
        image: 'https://images.unsplash.com/photo-1549497538-303791108f95?w=300&h=200&fit=crop',
        description: 'Sleek glass top with minimalist metal frame',
        category: 'Tables',
        style: 'Contemporary'
      },
      {
        id: 3,
        name: 'Accent Chair',
        price: '$549',
        image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=300&h=200&fit=crop',
        description: 'Velvet upholstered chair with wooden legs',
        category: 'Seating',
        style: 'Mid-Century Modern'
      }
    ],
    decor: [
      {
        id: 4,
        name: 'Abstract Wall Art Set',
        price: '$189',
        image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=200&fit=crop',
        description: 'Set of 3 modern abstract prints',
        category: 'Wall Art',
        style: 'Contemporary'
      },
      {
        id: 5,
        name: 'Floor Vase',
        price: '$89',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop',
        description: 'Ceramic vase with natural texture',
        category: 'Accessories',
        style: 'Minimalist'
      }
    ],
    lighting: [
      {
        id: 6,
        name: 'Pendant Light Fixture',
        price: '$299',
        image: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=300&h=200&fit=crop',
        description: 'Modern brass pendant for ambient lighting',
        category: 'Ceiling',
        style: 'Industrial'
      },
      {
        id: 7,
        name: 'Floor Lamp',
        price: '$199',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop',
        description: 'Adjustable reading lamp with fabric shade',
        category: 'Floor',
        style: 'Modern'
      }
    ],
    storage: [
      {
        id: 8,
        name: 'Floating Shelves',
        price: '$129',
        image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop',
        description: 'Set of 3 oak floating shelves',
        category: 'Wall Storage',
        style: 'Scandinavian'
      }
    ]
  }

  const toggleItemSelection = (item) => {
    const isSelected = selectedItems.some(selected => selected.id === item.id)
    let newSelection
    
    if (isSelected) {
      newSelection = selectedItems.filter(selected => selected.id !== item.id)
    } else {
      newSelection = [...selectedItems, item]
    }
    
    setSelectedItems(newSelection)
    updateProject(project.id, { selectedItems: newSelection })
  }

  const getTotalPrice = () => {
    return selectedItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace('$', '').replace(',', ''))
      return total + price
    }, 0)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Furniture & Decor Recommendations</h2>
            <p className="text-gray-600">
              AI-curated items that complement your selected layout and style preferences
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Total Budget</div>
            <div className="text-2xl font-bold text-primary-600">
              ${getTotalPrice().toLocaleString()}
            </div>
          </div>
        </div>

        {project.selectedLayout ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800 text-sm">
              <strong>Great!</strong> Recommendations are optimized for your selected layout. 
              Items are positioned based on your chosen room arrangement.
            </p>
          </div>
        ) : (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-amber-800 text-sm">
              <strong>Tip:</strong> Select a layout first to get more precise furniture positioning and sizing recommendations.
            </p>
          </div>
        )}
      </div>

      {/* Category Navigation */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`flex-1 py-2 px-4 rounded-md font-medium text-sm transition-colors ${
              activeCategory === category.id
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations[activeCategory]?.map((item) => {
          const isSelected = selectedItems.some(selected => selected.id === item.id)
          
          return (
            <div key={item.id} className="card hover:shadow-lg transition-all">
              <div className="relative mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  onClick={() => toggleItemSelection(item)}
                  className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
                    isSelected 
                      ? 'bg-red-500 text-white' 
                      : 'bg-white text-gray-400 hover:text-red-500'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isSelected ? 'fill-current' : ''}`} />
                </button>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold text-gray-900">{item.name}</h4>
                  <span className="text-lg font-bold text-primary-600">{item.price}</span>
                </div>
                
                <p className="text-sm text-gray-600">{item.description}</p>
                
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{item.category}</span>
                  <span>{item.style}</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => toggleItemSelection(item)}
                  className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-colors ${
                    isSelected
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {isSelected ? (
                    <span className="flex items-center justify-center space-x-1">
                      <ShoppingBag className="w-4 h-4" />
                      <span>Added</span>
                    </span>
                  ) : (
                    'Add to Plan'
                  )}
                </button>
                
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Selected Items Summary */}
      {selectedItems.length > 0 && (
        <div className="card bg-primary-50 border-primary-200">
          <h3 className="text-lg font-semibold text-primary-900 mb-4">
            Selected Items ({selectedItems.length})
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {selectedItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-3 bg-white p-3 rounded-lg">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h5 className="font-medium text-gray-900">{item.name}</h5>
                  <p className="text-sm text-gray-600">{item.price}</p>
                </div>
                <button
                  onClick={() => toggleItemSelection(item)}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-primary-200">
            <div>
              <span className="text-lg font-semibold text-primary-900">
                Total: ${getTotalPrice().toLocaleString()}
              </span>
            </div>
            <button className="btn-primary">
              Export Shopping List
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {recommendations[activeCategory]?.length === 0 && (
        <div className="card text-center py-12">
          <Palette className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No {activeCategory} recommendations yet
          </h3>
          <p className="text-gray-600">
            Recommendations will appear here based on your room layout and preferences.
          </p>
        </div>
      )}
    </div>
  )
}

export default FurnitureRecommendations