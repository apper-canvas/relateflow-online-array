import React from 'react'

      const Label = ({ children, htmlFor, className = '' }) => {
        return (
          &lt;label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-700 mb-1 ${className}`} &gt;
            {children}
          &lt;/label&gt;
        )
      }

      export default Label