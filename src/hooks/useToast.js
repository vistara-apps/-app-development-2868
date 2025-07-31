import { useState, useCallback } from 'react'

const useToast = () => {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((toast) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast = {
      id,
      ...toast,
      createdAt: Date.now()
    }
    
    setToasts(prev => [...prev, newToast])
    
    return id
  }, [])

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  const clearAllToasts = useCallback(() => {
    setToasts([])
  }, [])

  // Convenience methods
  const success = useCallback((title, message, options = {}) => {
    return addToast({
      type: 'success',
      title,
      message,
      ...options
    })
  }, [addToast])

  const error = useCallback((title, message, options = {}) => {
    return addToast({
      type: 'error',
      title,
      message,
      duration: 0, // Don't auto-dismiss errors by default
      ...options
    })
  }, [addToast])

  const warning = useCallback((title, message, options = {}) => {
    return addToast({
      type: 'warning',
      title,
      message,
      ...options
    })
  }, [addToast])

  const info = useCallback((title, message, options = {}) => {
    return addToast({
      type: 'info',
      title,
      message,
      ...options
    })
  }, [addToast])

  return {
    toasts,
    addToast,
    removeToast,
    clearAllToasts,
    success,
    error,
    warning,
    info
  }
}

export default useToast
