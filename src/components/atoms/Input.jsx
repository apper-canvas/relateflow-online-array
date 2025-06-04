import React from 'react'

      const Input = ({ label, type = 'text', value, onChange, placeholder, required = false, className = '', min, step }) => {
        return (
          &lt;&gt;
            {label && (
              &lt;label className="block text-sm font-medium text-gray-700 mb-1"&gt;{label}&lt;/label&gt;
            )}
            &lt;input
              type={type}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              required={required}
              className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${className}`}
              min={min}
              step={step}
            />
          &lt;/>
        )
      }

      export default Input