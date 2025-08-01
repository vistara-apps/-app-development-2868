// Custom hook for AI layout generation with error handling and loading states
import { useState, useCallback } from 'react'
import aiService from '../services/aiService.js'
import usageTracker from '../services/usageTracker.js'

export const useAIGeneration = (subscription) => {
  const [isGenerating, setIsGenerating] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState(null)
  const [lastGeneration, setLastGeneration] = useState(null)

  /**
   * Generate room layouts using AI
   * @param {Object} project - Project data
   * @param {Object} options - Generation options
   * @returns {Promise<Array>} Generated layouts
   */
  const generateLayouts = useCallback(async (project, options = {}) => {
    setIsGenerating(true)
    setError(null)

    try {
      // Check usage permissions
      const permission = usageTracker.checkPermission('layoutGeneration', subscription)
      if (!permission.canPerform) {
        throw new Error(permission.reason)
      }

      // Check if AI service is available
      if (!aiService.isAvailable()) {
        throw new Error('AI service is currently unavailable. Please check your configuration.')
      }

      // Create room analysis from project data
      const roomAnalysis = {
        roomType: project.roomType,
        dimensions: project.roomDimensions,
        squareFootage: project.roomDimensions.length * project.roomDimensions.width,
        challenges: [],
        opportunities: [],
        naturalLight: 'moderate',
        existingFeatures: [],
        userPreferences: {
          description: project.description
        }
      }

      // Analyze room photos if available
      let enhancedAnalysis = roomAnalysis
      if (project.roomPhotos && project.roomPhotos.length > 0) {
        try {
          // Note: In a real implementation, you'd need to handle file objects
          // For now, we'll use the basic analysis
          enhancedAnalysis = await aiService.analyzeRoomPhotos([], roomAnalysis)
        } catch (analysisError) {
          console.warn('Photo analysis failed, using basic analysis:', analysisError)
        }
      }

      // Generate layouts
      const count = options.count || 3
      const userPreferences = {
        style: options.style || 'modern',
        budget: options.budget || 'moderate',
        priorities: options.priorities || []
      }

      const layouts = await aiService.generateLayouts(enhancedAnalysis, userPreferences, count)

      // Track usage
      usageTracker.trackLayoutGeneration()

      setLastGeneration({
        timestamp: Date.now(),
        projectId: project.id,
        layoutCount: layouts.length
      })

      return layouts
    } catch (err) {
      const errorMessage = err.message || 'Failed to generate layouts'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setIsGenerating(false)
    }
  }, [subscription])

  /**
   * Analyze room photos using AI
   * @param {Array} imageFiles - Array of image files
   * @param {Object} roomData - Basic room data
   * @returns {Promise<Object>} Room analysis
   */
  const analyzeRoomPhotos = useCallback(async (imageFiles, roomData) => {
    setIsAnalyzing(true)
    setError(null)

    try {
      // Check usage permissions
      const permission = usageTracker.checkPermission('imageAnalysis', subscription)
      if (!permission.canPerform) {
        throw new Error(permission.reason)
      }

      // Check if AI service is available
      if (!aiService.isAvailable()) {
        throw new Error('AI service is currently unavailable. Please check your configuration.')
      }

      const analysis = await aiService.analyzeRoomPhotos(imageFiles, roomData)

      // Track usage
      usageTracker.trackImageAnalysis()

      return analysis
    } catch (err) {
      const errorMessage = err.message || 'Failed to analyze room photos'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setIsAnalyzing(false)
    }
  }, [subscription])

  /**
   * Check if user can perform AI operations
   * @param {string} action - Action type
   * @returns {Object} Permission result
   */
  const checkPermission = useCallback((action) => {
    return usageTracker.checkPermission(action, subscription)
  }, [subscription])

  /**
   * Get usage statistics
   * @returns {Object} Usage stats
   */
  const getUsageStats = useCallback(() => {
    return usageTracker.getUsageStats(subscription)
  }, [subscription])

  /**
   * Clear current error
   */
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  /**
   * Retry last failed operation
   */
  const retry = useCallback(async (retryFunction) => {
    if (typeof retryFunction === 'function') {
      clearError()
      return await retryFunction()
    }
  }, [clearError])

  return {
    // State
    isGenerating,
    isAnalyzing,
    error,
    lastGeneration,
    
    // Actions
    generateLayouts,
    analyzeRoomPhotos,
    checkPermission,
    getUsageStats,
    clearError,
    retry,
    
    // Computed
    isLoading: isGenerating || isAnalyzing,
    canGenerateLayouts: checkPermission('layoutGeneration').canPerform,
    canAnalyzeImages: checkPermission('imageAnalysis').canPerform,
    isAIAvailable: aiService.isAvailable()
  }
}

