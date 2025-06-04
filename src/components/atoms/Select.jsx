import React from 'react'

      const Select = ({ label, value, onChange, options, className = '' }) => {
return (
          <>
            {label && (
              <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            )}
            <select
              value={value}
              onChange={onChange}
              className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${className}`}
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </>
        )
      }

      export default Select