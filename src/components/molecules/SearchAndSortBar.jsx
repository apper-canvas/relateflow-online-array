import React from 'react'
      import Icon from '../atoms/Icon'
      import Input from '../atoms/Input'
      import Select from '../atoms/Select'
      import Button from '../atoms/Button'

      const SearchAndSortBar = ({
        searchTerm,
        onSearchChange,
        sortField,
        onSortFieldChange,
        sortDirection,
        onSortDirectionToggle,
        sortOptions,
        view
}) => {
        return (
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder={`Search ${view}...`}
                  value={searchTerm}
                  onChange={onSearchChange}
                  className="pl-10 pr-4"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select
                value={sortField}
                onChange={onSortFieldChange}
                options={sortOptions}
              />
              <Button
                onClick={onSortDirectionToggle}
                className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <Icon name={sortDirection === 'asc' ? 'ArrowUp' : 'ArrowDown'} className="w-5 h-5" />
              </Button>
            </div>
          </div>
        )
      }

      export default SearchAndSortBar