import React from 'react'
import { clsx } from 'clsx'

const LoadingSpinner = ({ 
  size = 'md', 
  className = '',
  color = 'primary'
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  }
  
  const colors = {
    primary: 'border-primary-600',
    white: 'border-white',
    gray: 'border-gray-600'
  }
  
  return (
    <div 
      className={clsx(
        'loading-spinner border-2 border-gray-300',
        sizes[size],
        colors[color],
        className
      )}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}

const LoadingSkeleton = ({ 
  className = '',
  width = 'w-full',
  height = 'h-4',
  rounded = 'rounded'
}) => {
  return (
    <div 
      className={clsx(
        'loading-skeleton',
        width,
        height,
        rounded,
        className
      )}
      role="status"
      aria-label="Loading content"
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}

const LoadingCard = ({ className = '' }) => {
  return (
    <div className={clsx('card animate-pulse', className)}>
      <div className="flex items-start space-x-4">
        <LoadingSkeleton width="w-12" height="h-12" rounded="rounded-lg" />
        <div className="flex-1 space-y-3">
          <LoadingSkeleton width="w-3/4" height="h-4" />
          <LoadingSkeleton width="w-1/2" height="h-3" />
          <LoadingSkeleton width="w-full" height="h-3" />
        </div>
      </div>
    </div>
  )
}

const LoadingButton = ({ 
  children, 
  loading = false, 
  className = '',
  ...props 
}) => {
  return (
    <button 
      className={clsx(
        'btn-primary relative',
        { 'opacity-75 cursor-not-allowed': loading },
        className
      )}
      disabled={loading}
      {...props}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoadingSpinner size="sm" color="white" />
        </div>
      )}
      <span className={clsx({ 'invisible': loading })}>
        {children}
      </span>
    </button>
  )
}

LoadingSpinner.Skeleton = LoadingSkeleton
LoadingSpinner.Card = LoadingCard
LoadingSpinner.Button = LoadingButton

export default LoadingSpinner
