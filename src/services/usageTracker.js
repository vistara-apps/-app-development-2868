// Usage tracking service for AI API calls and subscription management

class UsageTracker {
  constructor() {
    this.storageKey = 'spaceify_usage'
    this.resetInterval = 24 * 60 * 60 * 1000 // 24 hours in milliseconds
  }

  /**
   * Get current usage data
   * @returns {Object} Usage statistics
   */
  getUsage() {
    const stored = localStorage.getItem(this.storageKey)
    const defaultUsage = {
      layoutGenerations: 0,
      imageAnalyses: 0,
      lastReset: Date.now(),
      totalApiCalls: 0,
      estimatedCost: 0
    }

    if (!stored) {
      this.saveUsage(defaultUsage)
      return defaultUsage
    }

    const usage = JSON.parse(stored)
    
    // Reset daily usage if 24 hours have passed
    if (Date.now() - usage.lastReset > this.resetInterval) {
      const resetUsage = {
        ...defaultUsage,
        totalApiCalls: usage.totalApiCalls || 0,
        estimatedCost: usage.estimatedCost || 0
      }
      this.saveUsage(resetUsage)
      return resetUsage
    }

    return usage
  }

  /**
   * Save usage data to localStorage
   * @param {Object} usage - Usage data to save
   */
  saveUsage(usage) {
    localStorage.setItem(this.storageKey, JSON.stringify(usage))
  }

  /**
   * Track a layout generation API call
   * @param {number} tokensUsed - Number of tokens consumed
   * @param {string} model - AI model used
   */
  trackLayoutGeneration(tokensUsed = 1000, model = 'gpt-4o-mini') {
    const usage = this.getUsage()
    const cost = this.calculateCost(tokensUsed, model)
    
    usage.layoutGenerations += 1
    usage.totalApiCalls += 1
    usage.estimatedCost += cost
    
    this.saveUsage(usage)
    return usage
  }

  /**
   * Track an image analysis API call
   * @param {number} tokensUsed - Number of tokens consumed
   * @param {string} model - AI model used
   */
  trackImageAnalysis(tokensUsed = 1500, model = 'gpt-4o') {
    const usage = this.getUsage()
    const cost = this.calculateCost(tokensUsed, model)
    
    usage.imageAnalyses += 1
    usage.totalApiCalls += 1
    usage.estimatedCost += cost
    
    this.saveUsage(usage)
    return usage
  }

  /**
   * Calculate estimated cost based on tokens and model
   * @param {number} tokens - Number of tokens
   * @param {string} model - AI model name
   * @returns {number} Estimated cost in USD
   */
  calculateCost(tokens, model) {
    // Approximate pricing (as of 2024)
    const pricing = {
      'gpt-4o': 0.005 / 1000, // $0.005 per 1K tokens
      'gpt-4o-mini': 0.0015 / 1000, // $0.0015 per 1K tokens
      'gpt-4': 0.03 / 1000, // $0.03 per 1K tokens
      'gpt-3.5-turbo': 0.001 / 1000 // $0.001 per 1K tokens
    }
    
    const rate = pricing[model] || pricing['gpt-4o-mini']
    return tokens * rate
  }

  /**
   * Check if user can perform an action based on subscription
   * @param {string} action - Action type ('layoutGeneration' or 'imageAnalysis')
   * @param {Object} subscription - User subscription data
   * @returns {Object} Permission result
   */
  checkPermission(action, subscription) {
    const usage = this.getUsage()
    const limits = this.getSubscriptionLimits(subscription)
    
    let canPerform = true
    let reason = ''
    let remainingUses = 0

    switch (action) {
      case 'layoutGeneration':
        remainingUses = limits.layoutGenerations - usage.layoutGenerations
        if (usage.layoutGenerations >= limits.layoutGenerations) {
          canPerform = false
          reason = `Daily limit of ${limits.layoutGenerations} layout generations reached`
        }
        break
        
      case 'imageAnalysis':
        remainingUses = limits.imageAnalyses - usage.imageAnalyses
        if (usage.imageAnalyses >= limits.imageAnalyses) {
          canPerform = false
          reason = `Daily limit of ${limits.imageAnalyses} image analyses reached`
        }
        break
        
      default:
        canPerform = false
        reason = 'Unknown action type'
    }

    return {
      canPerform,
      reason,
      remainingUses: Math.max(0, remainingUses),
      currentUsage: usage,
      limits
    }
  }

  /**
   * Get subscription limits based on plan
   * @param {Object} subscription - User subscription data
   * @returns {Object} Usage limits
   */
  getSubscriptionLimits(subscription) {
    if (!subscription || subscription.status !== 'active') {
      // Free tier limits
      return {
        layoutGenerations: 2,
        imageAnalyses: 1,
        plan: 'free'
      }
    }

    switch (subscription.plan?.toLowerCase()) {
      case 'basic':
        return {
          layoutGenerations: 10,
          imageAnalyses: 5,
          plan: 'basic'
        }
        
      case 'pro':
        return {
          layoutGenerations: 50,
          imageAnalyses: 25,
          plan: 'pro'
        }
        
      case 'enterprise':
        return {
          layoutGenerations: -1, // Unlimited
          imageAnalyses: -1, // Unlimited
          plan: 'enterprise'
        }
        
      default:
        return {
          layoutGenerations: 2,
          imageAnalyses: 1,
          plan: 'free'
        }
    }
  }

  /**
   * Get usage statistics for display
   * @param {Object} subscription - User subscription data
   * @returns {Object} Formatted usage stats
   */
  getUsageStats(subscription) {
    const usage = this.getUsage()
    const limits = this.getSubscriptionLimits(subscription)
    
    return {
      layoutGenerations: {
        used: usage.layoutGenerations,
        limit: limits.layoutGenerations,
        remaining: limits.layoutGenerations === -1 ? 'Unlimited' : Math.max(0, limits.layoutGenerations - usage.layoutGenerations),
        percentage: limits.layoutGenerations === -1 ? 0 : Math.min(100, (usage.layoutGenerations / limits.layoutGenerations) * 100)
      },
      imageAnalyses: {
        used: usage.imageAnalyses,
        limit: limits.imageAnalyses,
        remaining: limits.imageAnalyses === -1 ? 'Unlimited' : Math.max(0, limits.imageAnalyses - usage.imageAnalyses),
        percentage: limits.imageAnalyses === -1 ? 0 : Math.min(100, (usage.imageAnalyses / limits.imageAnalyses) * 100)
      },
      totalApiCalls: usage.totalApiCalls,
      estimatedCost: usage.estimatedCost,
      plan: limits.plan,
      resetTime: new Date(usage.lastReset + this.resetInterval).toLocaleString()
    }
  }

  /**
   * Reset usage counters (for testing or manual reset)
   */
  resetUsage() {
    const usage = this.getUsage()
    const resetUsage = {
      layoutGenerations: 0,
      imageAnalyses: 0,
      lastReset: Date.now(),
      totalApiCalls: usage.totalApiCalls || 0,
      estimatedCost: usage.estimatedCost || 0
    }
    this.saveUsage(resetUsage)
    return resetUsage
  }

  /**
   * Clear all usage data
   */
  clearUsage() {
    localStorage.removeItem(this.storageKey)
  }
}

// Create singleton instance
const usageTracker = new UsageTracker()

export default usageTracker

