import React from 'react'
      import ApperIcon from '../ApperIcon'

      const Button = ({ children, onClick, className, icon, type = 'button', disabled = false }) => {
        const baseClasses = "flex items-center justify-center font-medium transition-colors duration-200"

        let variantClasses = ""
        if (className?.includes('btn-primary')) {
          variantClasses = "bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark"
        } else if (className?.includes('btn-secondary')) {
          variantClasses = "bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300"
        } else if (className?.includes('sidebar-nav-item')) {
          variantClasses = "w-full text-left p-3 rounded-lg text-gray-700 hover:bg-gray-100 flex items-center group"
          if (className?.includes('active')) {
            variantClasses += " bg-gray-100 text-primary"
          }
        } else {
          // Default or custom classes
          variantClasses = className || ""
        }

        return (
          <button
            type={type}
            onClick={onClick}
            className={`${baseClasses} ${variantClasses}`}
            disabled={disabled}
          >
            {icon && <ApperIcon name={icon} className="w-5 h-5 mr-2" />}
            {children}
          </button>
        )
      }

      export default Button