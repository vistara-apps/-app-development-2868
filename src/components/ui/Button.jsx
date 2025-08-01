import React from 'react'
import { clsx } from 'clsx'

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  onClick,
  type = 'button',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    success: 'btn-success',
    warning: 'btn-warning',
    error: 'btn-error',
    ghost: 'btn-ghost'
  }
  
  const sizes = {
    sm: 'btn-sm',
    md: '',
    lg: 'btn-lg'
  }
  
  const buttonClasses = clsx(
    baseClasses,
    variants[variant],
    sizes[size],
    {
      'cursor-not-allowed': disabled || loading,
      'transform-none': disabled || loading
    },
    className
  )
  
  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && (
        <div className="w-4 h-4 mr-2 loading-spinner" />
      )}
      {children}
    </button>
  )
}

export default Button
