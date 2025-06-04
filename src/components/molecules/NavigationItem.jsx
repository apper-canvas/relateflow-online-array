import React from 'react'
      import Button from '../atoms/Button'
      import Icon from '../atoms/Icon'

      const NavigationItem = ({ item, isActive, onClick }) => {
        return (
          &lt;Button
            onClick={onClick}
            className={`sidebar-nav-item mb-1 ${isActive ? 'active' : ''}`}
          &gt;
            &lt;Icon name={item.icon} className="w-5 h-5 mr-3" /&gt;
            {item.label}
          &lt;/Button&gt;
        )
      }

      export default NavigationItem