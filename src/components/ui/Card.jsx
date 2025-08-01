import React from 'react'
import { clsx } from 'clsx'

const Card = ({
  children,
  variant = 'default',
  interactive = false,
  className = '',
  onClick,
  ...props
}) => {
  const baseClasses = 'card'
  
  const variants = {
    default: '',
    gradient: 'card-gradient',
    glass: 'glass-effect'
  }
  
  const cardClasses = clsx(
    baseClasses,
    variants[variant],
    {
      'card-interactive': interactive || onClick,
      'cursor-pointer': onClick
    },
    className
  )
  
  const CardComponent = onClick ? 'button' : 'div'
  
  return (
    <CardComponent
      className={cardClasses}
      onClick={onClick}
      {...props}
    >
      {children}
    </CardComponent>
  )
}

const CardHeader = ({ children, className = '', ...props }) => (
  <div className={clsx('mb-4', className)} {...props}>
    {children}
  </div>
)

const CardTitle = ({ children, className = '', ...props }) => (
  <h3 className={clsx('text-lg font-semibold text-gray-900', className)} {...props}>
    {children}
  </h3>
)

const CardDescription = ({ children, className = '', ...props }) => (
  <p className={clsx('text-gray-600', className)} {...props}>
    {children}
  </p>
)

const CardContent = ({ children, className = '', ...props }) => (
  <div className={clsx('', className)} {...props}>
    {children}
  </div>
)

const CardFooter = ({ children, className = '', ...props }) => (
  <div className={clsx('mt-4 pt-4 border-t border-gray-100', className)} {...props}>
    {children}
  </div>
)

Card.Header = CardHeader
Card.Title = CardTitle
Card.Description = CardDescription
Card.Content = CardContent
Card.Footer = CardFooter

export default Card
