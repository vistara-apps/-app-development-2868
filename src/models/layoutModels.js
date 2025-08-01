// Layout data models and validation

export const LayoutStyle = {
  MODERN: 'Modern',
  TRADITIONAL: 'Traditional',
  CONTEMPORARY: 'Contemporary',
  MINIMALIST: 'Minimalist',
  INDUSTRIAL: 'Industrial',
  SCANDINAVIAN: 'Scandinavian',
  BOHEMIAN: 'Bohemian',
  RUSTIC: 'Rustic'
}

export const RoomType = {
  LIVING_ROOM: 'Living Room',
  BEDROOM: 'Bedroom',
  KITCHEN: 'Kitchen',
  BATHROOM: 'Bathroom',
  OFFICE: 'Office',
  DINING_ROOM: 'Dining Room',
  OTHER: 'Other'
}

// Layout model structure
export const createLayout = ({
  id,
  name,
  description,
  style,
  efficiency,
  pros = [],
  cons = [],
  furnitureItems = [],
  designPrinciples = [],
  colorScheme = {},
  lightingRecommendations = [],
  estimatedCost = null,
  implementationTime = null,
  aiConfidence = 0
}) => ({
  id: id || Date.now() + Math.random(),
  name,
  description,
  style,
  efficiency: Math.min(100, Math.max(0, efficiency)), // Ensure 0-100 range
  pros: Array.isArray(pros) ? pros : [],
  cons: Array.isArray(cons) ? cons : [],
  furnitureItems: Array.isArray(furnitureItems) ? furnitureItems : [],
  designPrinciples: Array.isArray(designPrinciples) ? designPrinciples : [],
  colorScheme: typeof colorScheme === 'object' ? colorScheme : {},
  lightingRecommendations: Array.isArray(lightingRecommendations) ? lightingRecommendations : [],
  estimatedCost,
  implementationTime,
  aiConfidence: Math.min(100, Math.max(0, aiConfidence)),
  createdAt: new Date().toISOString()
})

// Furniture item model
export const createFurnitureItem = ({
  name,
  category,
  dimensions,
  position,
  description,
  estimatedPrice,
  priority = 'medium'
}) => ({
  name,
  category,
  dimensions: {
    width: dimensions?.width || 0,
    height: dimensions?.height || 0,
    depth: dimensions?.depth || 0
  },
  position: {
    x: position?.x || 0,
    y: position?.y || 0,
    rotation: position?.rotation || 0
  },
  description,
  estimatedPrice,
  priority // high, medium, low
})

// Room analysis model
export const createRoomAnalysis = ({
  roomType,
  dimensions,
  squareFootage,
  challenges = [],
  opportunities = [],
  naturalLight,
  existingFeatures = [],
  userPreferences = {},
  photos = []
}) => ({
  roomType,
  dimensions: {
    length: dimensions?.length || 0,
    width: dimensions?.width || 0,
    height: dimensions?.height || 0
  },
  squareFootage: squareFootage || (dimensions?.length * dimensions?.width),
  challenges: Array.isArray(challenges) ? challenges : [],
  opportunities: Array.isArray(opportunities) ? opportunities : [],
  naturalLight: naturalLight || 'moderate',
  existingFeatures: Array.isArray(existingFeatures) ? existingFeatures : [],
  userPreferences: typeof userPreferences === 'object' ? userPreferences : {},
  photos: Array.isArray(photos) ? photos : [],
  analyzedAt: new Date().toISOString()
})

// Validation functions
export const validateLayout = (layout) => {
  const errors = []
  
  if (!layout.name || typeof layout.name !== 'string') {
    errors.push('Layout name is required and must be a string')
  }
  
  if (!layout.description || typeof layout.description !== 'string') {
    errors.push('Layout description is required and must be a string')
  }
  
  if (!layout.style || !Object.values(LayoutStyle).includes(layout.style)) {
    errors.push('Layout style must be a valid style')
  }
  
  if (typeof layout.efficiency !== 'number' || layout.efficiency < 0 || layout.efficiency > 100) {
    errors.push('Layout efficiency must be a number between 0 and 100')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

export const validateRoomAnalysis = (analysis) => {
  const errors = []
  
  if (!analysis.roomType || !Object.values(RoomType).includes(analysis.roomType)) {
    errors.push('Room type must be a valid room type')
  }
  
  if (!analysis.dimensions || typeof analysis.dimensions !== 'object') {
    errors.push('Room dimensions are required')
  } else {
    const { length, width, height } = analysis.dimensions
    if (typeof length !== 'number' || length <= 0) {
      errors.push('Room length must be a positive number')
    }
    if (typeof width !== 'number' || width <= 0) {
      errors.push('Room width must be a positive number')
    }
    if (typeof height !== 'number' || height <= 0) {
      errors.push('Room height must be a positive number')
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

