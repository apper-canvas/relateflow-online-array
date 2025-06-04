import React from 'react'
      import Card from '../atoms/Card'
      import Icon from '../atoms/Icon'

      const StatCard = ({ label, value, icon, color, loading, index }) => {
        return (
          &lt;Card className="p-6" animationProps={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.1 } }}&gt;
            &lt;div className="flex items-center justify-between"&gt;
              &lt;div&gt;
                &lt;p className="text-sm text-gray-600 mb-1"&gt;{label}&lt;/p&gt;
                &lt;p className="text-2xl font-bold text-gray-900"&gt;
                  {loading ? '-' : value}
                &lt;/p&gt;
              &lt;/div&gt;
              &lt;div className={`p-3 rounded-full bg-gray-50 ${color}`}&gt;
                &lt;Icon name={icon} className="w-6 h-6" /&gt;
              &lt;/div&gt;
            &lt;/div&gt;
          &lt;/Card&gt;
        )
      }

      export default StatCard