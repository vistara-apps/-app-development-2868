// AI Service for room layout generation using OpenAI API
import OpenAI from 'openai'
import config from '../config/env.js'
import { createLayout, createRoomAnalysis, validateLayout, LayoutStyle } from '../models/layoutModels.js'
import { prepareImageForAI } from '../utils/imageUtils.js'

class AIService {
  constructor() {
    this.client = null
    this.isInitialized = false
    this.initializeClient()
  }

  initializeClient() {
    try {
      if (!config.openai.apiKey) {
        console.warn('OpenAI API key not configured. AI features will be disabled.')
        return
      }

      this.client = new OpenAI({
        apiKey: config.openai.apiKey,
        dangerouslyAllowBrowser: true // Note: In production, API calls should go through a backend
      })
      this.isInitialized = true
    } catch (error) {
      console.error('Failed to initialize OpenAI client:', error)
    }
  }

  isAvailable() {
    return this.isInitialized && this.client !== null
  }

  /**
   * Generate room layouts based on room analysis
   * @param {Object} roomAnalysis - Room analysis data
   * @param {Object} userPreferences - User preferences
   * @param {number} count - Number of layouts to generate
   * @returns {Promise<Array>} Generated layouts
   */
  async generateLayouts(roomAnalysis, userPreferences = {}, count = 3) {
    if (!this.isAvailable()) {
      throw new Error('AI service is not available. Please check your API configuration.')
    }

    try {
      const prompt = this.buildLayoutPrompt(roomAnalysis, userPreferences, count)
      
      const response = await this.client.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: this.getSystemPrompt()
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.8,
        max_tokens: 2000,
        response_format: { type: 'json_object' }
      })

      const result = JSON.parse(response.choices[0].message.content)
      return this.processLayoutResponse(result)
    } catch (error) {
      console.error('Error generating layouts:', error)
      throw new Error(`Failed to generate layouts: ${error.message}`)
    }
  }

  /**
   * Analyze room photos using OpenAI Vision
   * @param {Array} imageFiles - Array of image files
   * @param {Object} roomData - Basic room data
   * @returns {Promise<Object>} Room analysis
   */
  async analyzeRoomPhotos(imageFiles, roomData) {
    if (!this.isAvailable()) {
      throw new Error('AI service is not available. Please check your API configuration.')
    }

    if (!imageFiles || imageFiles.length === 0) {
      return this.createBasicRoomAnalysis(roomData)
    }

    try {
      const processedImages = await Promise.all(
        imageFiles.map(file => prepareImageForAI(file))
      )

      const messages = [
        {
          role: 'system',
          content: this.getRoomAnalysisSystemPrompt()
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: this.buildRoomAnalysisPrompt(roomData)
            },
            ...processedImages.map(img => ({
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${img.base64}`,
                detail: 'high'
              }
            }))
          ]
        }
      ]

      const response = await this.client.chat.completions.create({
        model: 'gpt-4o',
        messages,
        temperature: 0.3,
        max_tokens: 1500,
        response_format: { type: 'json_object' }
      })

      const result = JSON.parse(response.choices[0].message.content)
      return this.processRoomAnalysisResponse(result, roomData)
    } catch (error) {
      console.error('Error analyzing room photos:', error)
      // Fallback to basic analysis if image analysis fails
      return this.createBasicRoomAnalysis(roomData)
    }
  }

  /**
   * Build the layout generation prompt
   */
  buildLayoutPrompt(roomAnalysis, userPreferences, count) {
    const { dimensions, roomType, squareFootage } = roomAnalysis
    const budget = userPreferences.budget || 'moderate'
    const style = userPreferences.style || 'modern'
    const priorities = userPreferences.priorities || []

    return `Generate ${count} distinct room layout options for a ${roomType.toLowerCase()} with the following specifications:

Room Details:
- Dimensions: ${dimensions.length}' × ${dimensions.width}' × ${dimensions.height}'
- Square footage: ${squareFootage} sq ft
- Room type: ${roomType}

User Preferences:
- Style preference: ${style}
- Budget: ${budget}
- Priorities: ${priorities.join(', ') || 'functionality and aesthetics'}

${roomAnalysis.challenges?.length ? `Challenges to address: ${roomAnalysis.challenges.join(', ')}` : ''}
${roomAnalysis.opportunities?.length ? `Opportunities to leverage: ${roomAnalysis.opportunities.join(', ')}` : ''}

Please provide diverse layout options that:
1. Optimize the space efficiently
2. Address the specific challenges mentioned
3. Align with the user's style and budget preferences
4. Include practical furniture placement suggestions
5. Consider traffic flow and functionality

Return the response as a JSON object with a "layouts" array containing the generated options.`
  }

  /**
   * Build room analysis prompt for image analysis
   */
  buildRoomAnalysisPrompt(roomData) {
    return `Analyze this ${roomData.roomType?.toLowerCase() || 'room'} with dimensions ${roomData.roomDimensions?.length || 'unknown'}' × ${roomData.roomDimensions?.width || 'unknown'}' × ${roomData.roomDimensions?.height || 'unknown'}' and provide insights about:

1. Current layout and furniture arrangement
2. Natural light sources and quality
3. Existing architectural features (windows, doors, built-ins, etc.)
4. Space utilization challenges
5. Opportunities for improvement
6. Color scheme and style assessment
7. Traffic flow patterns
8. Storage solutions present or needed

${roomData.description ? `Additional context: ${roomData.description}` : ''}

Return analysis as JSON with structured insights.`
  }

  /**
   * System prompt for layout generation
   */
  getSystemPrompt() {
    return `You are an expert interior designer and space planner with 20+ years of experience. You specialize in creating functional, beautiful, and efficient room layouts that maximize space utilization while maintaining aesthetic appeal.

Your expertise includes:
- Space planning and furniture arrangement
- Traffic flow optimization
- Style coordination and design principles
- Budget-conscious recommendations
- Problem-solving for challenging spaces

When generating layouts, consider:
- Functionality and daily use patterns
- Natural light and artificial lighting needs
- Storage requirements
- Safety and accessibility
- Style consistency and visual appeal
- Budget constraints and practical implementation

Always provide practical, implementable solutions with clear explanations of design decisions.

Return responses in JSON format with this structure:
{
  "layouts": [
    {
      "name": "Layout Name",
      "description": "Detailed description of the layout concept and approach",
      "style": "Design style (Modern, Traditional, Contemporary, etc.)",
      "efficiency": 85,
      "pros": ["List of advantages"],
      "cons": ["List of considerations or limitations"],
      "furnitureItems": [
        {
          "name": "Item name",
          "category": "furniture category",
          "dimensions": {"width": 0, "height": 0, "depth": 0},
          "position": {"x": 0, "y": 0, "rotation": 0},
          "description": "Why this item and placement",
          "estimatedPrice": "$XXX-XXX",
          "priority": "high/medium/low"
        }
      ],
      "designPrinciples": ["Key design principles applied"],
      "colorScheme": {
        "primary": "color",
        "secondary": "color",
        "accent": "color"
      },
      "lightingRecommendations": ["Lighting suggestions"],
      "estimatedCost": "$XXX-XXX",
      "implementationTime": "X weeks",
      "aiConfidence": 90
    }
  ]
}`
  }

  /**
   * System prompt for room analysis
   */
  getRoomAnalysisSystemPrompt() {
    return `You are an expert interior designer analyzing room photos to provide detailed insights for space planning. Examine the images carefully and provide comprehensive analysis.

Return analysis in JSON format:
{
  "challenges": ["List of space challenges identified"],
  "opportunities": ["List of improvement opportunities"],
  "naturalLight": "poor/moderate/good/excellent",
  "existingFeatures": ["Notable architectural or design features"],
  "currentStyle": "Current design style if identifiable",
  "colorAnalysis": {
    "dominantColors": ["colors"],
    "mood": "description"
  },
  "functionalityAssessment": "Current functionality rating and notes",
  "recommendations": ["Immediate improvement suggestions"]
}`
  }

  /**
   * Process the AI response for layouts
   */
  processLayoutResponse(response) {
    if (!response.layouts || !Array.isArray(response.layouts)) {
      throw new Error('Invalid response format from AI service')
    }

    return response.layouts.map(layout => {
      const processedLayout = createLayout({
        ...layout,
        id: Date.now() + Math.random(),
        style: this.validateStyle(layout.style),
        efficiency: this.validateEfficiency(layout.efficiency),
        aiConfidence: this.validateConfidence(layout.aiConfidence)
      })

      const validation = validateLayout(processedLayout)
      if (!validation.isValid) {
        console.warn('Generated layout validation failed:', validation.errors)
        // Apply defaults for invalid fields
        return this.applyLayoutDefaults(processedLayout)
      }

      return processedLayout
    })
  }

  /**
   * Process room analysis response
   */
  processRoomAnalysisResponse(response, roomData) {
    return createRoomAnalysis({
      ...roomData,
      challenges: response.challenges || [],
      opportunities: response.opportunities || [],
      naturalLight: response.naturalLight || 'moderate',
      existingFeatures: response.existingFeatures || [],
      userPreferences: {
        currentStyle: response.currentStyle,
        colorAnalysis: response.colorAnalysis,
        functionalityAssessment: response.functionalityAssessment,
        recommendations: response.recommendations || []
      }
    })
  }

  /**
   * Create basic room analysis without photos
   */
  createBasicRoomAnalysis(roomData) {
    const { roomDimensions, roomType, description } = roomData
    const squareFootage = roomDimensions.length * roomDimensions.width

    // Basic analysis based on room type and dimensions
    const challenges = []
    const opportunities = []

    if (squareFootage < 100) {
      challenges.push('Limited space requires efficient furniture selection')
      opportunities.push('Cozy, intimate atmosphere potential')
    } else if (squareFootage > 400) {
      challenges.push('Large space may feel empty without proper zoning')
      opportunities.push('Multiple functional areas possible')
    }

    if (roomDimensions.height < 8) {
      challenges.push('Lower ceiling height may feel cramped')
    } else if (roomDimensions.height > 10) {
      opportunities.push('High ceilings create dramatic vertical space')
    }

    return createRoomAnalysis({
      roomType,
      dimensions: roomDimensions,
      squareFootage,
      challenges,
      opportunities,
      naturalLight: 'moderate',
      existingFeatures: [],
      userPreferences: {
        description: description || ''
      }
    })
  }

  /**
   * Validation helpers
   */
  validateStyle(style) {
    return Object.values(LayoutStyle).includes(style) ? style : LayoutStyle.MODERN
  }

  validateEfficiency(efficiency) {
    const num = parseInt(efficiency)
    return isNaN(num) ? 75 : Math.min(100, Math.max(0, num))
  }

  validateConfidence(confidence) {
    const num = parseInt(confidence)
    return isNaN(num) ? 80 : Math.min(100, Math.max(0, num))
  }

  /**
   * Apply defaults for invalid layouts
   */
  applyLayoutDefaults(layout) {
    return {
      ...layout,
      name: layout.name || 'Generated Layout',
      description: layout.description || 'AI-generated room layout optimized for your space.',
      style: this.validateStyle(layout.style),
      efficiency: this.validateEfficiency(layout.efficiency),
      pros: Array.isArray(layout.pros) ? layout.pros : ['Optimized space utilization'],
      cons: Array.isArray(layout.cons) ? layout.cons : ['May require furniture adjustments'],
      aiConfidence: this.validateConfidence(layout.aiConfidence)
    }
  }
}

// Create singleton instance
const aiService = new AIService()

export default aiService

