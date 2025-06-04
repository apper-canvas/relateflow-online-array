import React from 'react'
      import TableRow from '../molecules/TableRow'
      import Card from '../atoms/Card'
      import Icon from '../atoms/Icon'
      import Button from '../atoms/Button'

      const EntityTable = ({ data, view, dealStages, handleStageChange, handleEdit, handleDelete, loading, error, searchTerm, onAddClick }) => {
        const getTableHeaders = () => {
          switch (view) {
            case 'contacts':
              return ['Name', 'Email', 'Company', 'Phone']
            case 'deals':
              return ['Title', 'Value', 'Stage', 'Contact']
            case 'activities':
              return ['Type', 'Description', 'Contact', 'Date']
            default:
              return []
          }
        }

        const headers = getTableHeaders()

        if (loading) {
          return (
            &lt;div className="flex items-center justify-center py-12"&gt;
              &lt;div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"&gt;&lt;/div&gt;
              &lt;span className="ml-3 text-gray-600"&gt;Loading {view}...&lt;/span&gt;
            &lt;/div&gt;
          )
        }

        if (error) {
          return (
            &lt;div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg"&gt;
              &lt;div className="flex items-center"&gt;
                &lt;Icon name="AlertTriangle" className="w-5 h-5 mr-2" /&gt;
                &lt;span&gt;{error}&lt;/span&gt;
              &lt;/div&gt;
            &lt;/div&gt;
          )
        }

        if (data.length === 0) {
          return (
            &lt;div className="text-center py-12"&gt;
              &lt;Icon name="Inbox" className="w-12 h-12 text-gray-400 mx-auto mb-4" /&gt;
              &lt;h3 className="text-lg font-medium text-gray-900 mb-2"&gt;No {view} found&lt;/h3&gt;
              &lt;p className="text-gray-500 mb-4"&gt;
                {searchTerm ? `No ${view} match your search criteria.` : `Get started by creating your first ${view.slice(0, -1)}.`}
              &lt;/p&gt;
              &lt;Button onClick={onAddClick} className="btn-primary" icon="Plus"&gt;
                Add {view.slice(0, -1)}
              &lt;/Button&gt;
            &lt;/div&gt;
          )
        }

        return (
          &lt;Card className="overflow-hidden"&gt;
            &lt;div className="overflow-x-auto"&gt;
              &lt;table className="min-w-full divide-y divide-gray-200"&gt;
                &lt;thead className="bg-gray-50"&gt;
                  &lt;tr&gt;
                    {headers.map(header => (
                      &lt;th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"&gt;
                        {header}
                      &lt;/th&gt;
                    ))}
                    &lt;th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"&gt;Actions&lt;/th&gt;
                  &lt;/tr&gt;
                &lt;/thead&gt;
                &lt;tbody className="bg-white divide-y divide-gray-200"&gt;
                  {data.map((item, index) => (
                    &lt;TableRow
                      key={item?.id || index}
                      item={item}
                      view={view}
                      dealStages={dealStages}
                      handleStageChange={handleStageChange}
                      handleEdit={handleEdit}
                      handleDelete={handleDelete}
                      index={index}
                    /&gt;
                  ))}
                &lt;/tbody&gt;
              &lt;/table&gt;
            &lt;/div&gt;
          &lt;/Card&gt;
        )
      }

      export default EntityTable