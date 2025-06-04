import React from 'react'
      import Icon from '../atoms/Icon'
      import Button from '../atoms/Button'

      const AppHeader = ({ onMenuToggle }) => {
        return (
          &lt;div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3"&gt;
            &lt;div className="flex items-center justify-between"&gt;
              &lt;h1 className="text-xl font-bold text-primary"&gt;RelateFlow&lt;/h1&gt;
              &lt;Button
                onClick={onMenuToggle}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              &gt;
                &lt;Icon name="Menu" className="w-6 h-6" /&gt;
              &lt;/Button&gt;
            &lt;/div&gt;
          &lt;/div&gt;
        )
      }

      export default AppHeader