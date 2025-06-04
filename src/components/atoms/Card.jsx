import React from 'react'
      import { motion } from 'framer-motion'

      const Card = ({ children, className = '', onClick, animationProps }) => {
        const baseClasses = 'bg-white rounded-xl shadow-sm'
        const hoverClasses = onClick ? 'hover:shadow-lg transition-shadow duration-300 cursor-pointer' : ''

        if (animationProps) {
          return (
            <motion.div
              className={`${baseClasses} ${className} ${hoverClasses}`}
              onClick={onClick}
              {...animationProps}
            >
              {children}
            </motion.div>
          )
        }

        return (
          <div
            className={`${baseClasses} ${className} ${hoverClasses}`}
            onClick={onClick}
          >
            {children}
          </div>
        )
      }

      export default Card