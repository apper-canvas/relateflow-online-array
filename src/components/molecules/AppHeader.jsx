import React from 'react'
      import Icon from '../atoms/Icon'
      import Button from '../atoms/Button'

const AppHeader = ({ onMenuToggle }) => {
        return (
          <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold text-primary">RelateFlow</h1>
              <Button
                onClick={onMenuToggle}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              >
                <Icon name="Menu" className="w-6 h-6" />
              </Button>
            </div>
          </div>
        )
      }

      export default AppHeader