import React, { useState, useEffect } from 'react'
import { clsx } from 'clsx'
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react'

const Toast = ({
  type = 'info',
  title,
  message,
  duration = 5000,
  onClose,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(true)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose()
      }, duration)
      
      return () => clearTimeout(timer)
    }
  }, [duration])

  const handleClose = () => {
    setIsExiting(true)
    setTimeout(() => {
      setIsVisible(false)
      onClose?.()
    }, 300)
  }

  if (!isVisible) return null

  const types = {
    success: {
      icon: CheckCircle,
      bgColor: 'bg-success-50',
      borderColor: 'border-success-200',
      iconColor: 'text-success-600',
      titleColor: 'text-success-800',
      messageColor: 'text-success-700'
    },
    error: {
      icon: AlertCircle,
      bgColor: 'bg-error-50',
      borderColor: 'border-error-200',
      iconColor: 'text-error-600',
      titleColor: 'text-error-800',
      messageColor: 'text-error-700'
    },
    warning: {
      icon: AlertTriangle,
      bgColor: 'bg-warning-50',
      borderColor: 'border-warning-200',
      iconColor: 'text-warning-600',
      titleColor: 'text-warning-800',
      messageColor: 'text-warning-700'
    },
    info: {
      icon: Info,
      bgColor: 'bg-primary-50',
      borderColor: 'border-primary-200',
      iconColor: 'text-primary-600',
      titleColor: 'text-primary-800',
      messageColor: 'text-primary-700'
    }
  }

  const config = types[type]
  const Icon = config.icon

  return (
    <div
      className={clsx(
        'fixed top-4 right-4 z-50 max-w-sm w-full shadow-large rounded-lg border p-4 transition-all duration-300',
        config.bgColor,
        config.borderColor,
        {
          'animate-slide-down': !isExiting,
          'animate-fade-out opacity-0 transform translate-y-2': isExiting
        },
        className
      )}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <Icon className={clsx('w-5 h-5', config.iconColor)} />
        </div>
        
        <div className="ml-3 flex-1">
          {title && (
            <h4 className={clsx('text-sm font-medium mb-1', config.titleColor)}>
              {title}
            </h4>
          )}
          {message && (
            <p className={clsx('text-sm', config.messageColor)}>
              {message}
            </p>
          )}
        </div>
        
        <div className="ml-4 flex-shrink-0">
          <button
            onClick={handleClose}
            className={clsx(
              'inline-flex rounded-md p-1.5 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
              config.iconColor,
              'hover:bg-black/5 focus:ring-current'
            )}
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Toast
