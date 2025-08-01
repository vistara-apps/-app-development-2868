import React, { createContext, useContext, useState, useEffect } from 'react'

const UserContext = createContext()

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [projects, setProjects] = useState([])
  const [subscription, setSubscription] = useState(null)

  // Load user data from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('spaceify_user')
    const savedProjects = localStorage.getItem('spaceify_projects')
    const savedSubscription = localStorage.getItem('spaceify_subscription')
    
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects))
    }
    if (savedSubscription) {
      setSubscription(JSON.parse(savedSubscription))
    }
  }, [])

  // Save to localStorage when data changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('spaceify_user', JSON.stringify(user))
    }
  }, [user])

  useEffect(() => {
    localStorage.setItem('spaceify_projects', JSON.stringify(projects))
  }, [projects])

  useEffect(() => {
    if (subscription) {
      localStorage.setItem('spaceify_subscription', JSON.stringify(subscription))
    }
  }, [subscription])

  const login = (userData) => {
    setUser({
      id: Date.now(),
      ...userData,
      createdAt: new Date().toISOString()
    })
  }

  const logout = () => {
    setUser(null)
    setProjects([])
    setSubscription(null)
    localStorage.removeItem('spaceify_user')
    localStorage.removeItem('spaceify_projects')
    localStorage.removeItem('spaceify_subscription')
  }

  const createProject = (projectData) => {
    const newProject = {
      id: Date.now(),
      ...projectData,
      userId: user.id,
      createdAt: new Date().toISOString(),
      status: 'active',
      layoutOptions: [],
      selectedLayout: null,
      furnitureRecommendations: [],
      decorRecommendations: [],
      tasks: [],
      roomAnalysis: null,
      aiGenerationHistory: [],
      preferences: {
        style: 'modern',
        budget: 'moderate',
        priorities: []
      }
    }
    setProjects(prev => [...prev, newProject])
    return newProject
  }

  const updateProject = (projectId, updates) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId ? { ...project, ...updates } : project
    ))
  }

  const deleteProject = (projectId) => {
    setProjects(prev => prev.filter(project => project.id !== projectId))
  }

  const subscribe = (plan) => {
    setSubscription({
      plan,
      startDate: new Date().toISOString(),
      status: 'active'
    })
  }

  const value = {
    user,
    projects,
    subscription,
    login,
    logout,
    createProject,
    updateProject,
    deleteProject,
    subscribe,
    isSubscribed: !!subscription?.status === 'active'
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}
