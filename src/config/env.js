// Environment configuration
export const config = {
  openai: {
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  },
  app: {
    name: import.meta.env.VITE_APP_NAME || 'Spaceify',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
    debugMode: import.meta.env.VITE_DEBUG_MODE === 'true',
  },
}

// Validation
if (!config.openai.apiKey && import.meta.env.PROD) {
  console.warn('OpenAI API key is not configured. AI features will be disabled.')
}

export default config

