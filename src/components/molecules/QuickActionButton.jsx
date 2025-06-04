import React from 'react'
      import ApperIcon from '../ApperIcon'

      const QuickActionButton = ({ label, icon, onClick }) => {
        return (
          &lt;button
            onClick={onClick}
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary-50 transition-colors duration-200 group"
          &gt;
            &lt;ApperIcon name={icon} className="w-5 h-5 text-gray-400 group-hover:text-primary mr-3" /&gt;
            &lt;span className="text-gray-700 group-hover:text-primary font-medium"&gt;{label}&lt;/span&gt;
          &lt;/button&gt;
        )
      }

      export default QuickActionButton