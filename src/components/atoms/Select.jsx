import React from 'react'

      const Select = ({ label, value, onChange, options, className = '' }) => {
        return (
          &lt;&gt;
            {label && (
              &lt;label className="block text-sm font-medium text-gray-700 mb-1"&gt;{label}&lt;/label&gt;
            )}
            &lt;select
              value={value}
              onChange={onChange}
              className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${className}`}
            &gt;
              {options.map((option) => (
                &lt;option key={option.value} value={option.value}&gt;
                  {option.label}
                &lt;/option&gt;
              ))}
            &lt;/select&gt;
          &lt;/>
        )
      }

      export default Select