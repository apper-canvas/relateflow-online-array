import React from 'react'
      import Card from '../atoms/Card'
      import QuickActionButton from '../molecules/QuickActionButton'

      const QuickActionsSection = ({ actions }) => {
        return (
          &lt;Card className="p-6"&gt;
            &lt;h3 className="text-lg font-semibold mb-4"&gt;Quick Actions&lt;/h3&gt;
            &lt;div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"&gt;
              {actions.map((action) => (
                &lt;QuickActionButton
                  key={action.label}
                  label={action.label}
                  icon={action.icon}
                  onClick={action.action}
                /&gt;
              ))}
            &lt;/div&gt;
          &lt;/Card&gt;
        )
      }

      export default QuickActionsSection