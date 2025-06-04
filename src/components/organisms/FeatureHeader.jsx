import React from 'react'
      import Button from '../atoms/Button'

      const FeatureHeader = ({ title, description, onAddClick, addButtonLabel }) => {
        return (
          &lt;div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"&gt;
            &lt;div&gt;
              &lt;h1 className="text-2xl md:text-3xl font-bold text-gray-900 capitalize"&gt;
                {title}
              &lt;/h1&gt;
              &lt;p className="text-gray-600 mt-1"&gt;
                {description}
              &lt;/p&gt;
            &lt;/div&gt;
            {onAddClick && (
              &lt;Button
                onClick={onAddClick}
                className="btn-primary"
                icon="Plus"
              &gt;
                {addButtonLabel}
              &lt;/Button&gt;
            )}
          &lt;/div&gt;
        )
      }

      export default FeatureHeader