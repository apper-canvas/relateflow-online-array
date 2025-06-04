import React from 'react'

      const Textarea = ({ label, value, onChange, rows = 3, placeholder, required = false, className = '' }) => {
        return (
          &lt;&gt;
            {label && (
              &lt;label className="block text-sm font-medium text-gray-700 mb-1"&gt;{label}&lt;/label&gt;
            )}
            &lt;textarea
              value={value}
              onChange={onChange}
              rows={rows}
              placeholder={placeholder}
              required={required}
              className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${className}`}
            />
          &lt;/>
        )
      }

      export default Textarea