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
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <span className="ml-3 text-gray-600">Loading {view}...</span>
            </div>
          )
        }

        if (error) {
          return (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
              <div className="flex items-center">
                <Icon name="AlertTriangle" className="w-5 h-5 mr-2" />
                <span>{error}</span>
              </div>
            </div>
          )
        }

        if (data.length === 0) {
          return (
            <div className="text-center py-12">
              <Icon name="Inbox" className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No {view} found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm ? `No ${view} match your search criteria.` : `Get started by creating your first ${view.slice(0, -1)}.`}
              </p>
              <Button onClick={onAddClick} className="btn-primary" icon="Plus">
                Add {view.slice(0, -1)}
              </Button>
            </div>
          )
        }

        return (
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {headers.map(header => (
                      <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {header}
                      </th>
                    ))}
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.map((item, index) => (
                    <TableRow
                      key={item?.id || index}
                      item={item}
                      view={view}
                      dealStages={dealStages}
                      handleStageChange={handleStageChange}
                      handleEdit={handleEdit}
                      handleDelete={handleDelete}
                      index={index}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )
      }

      export default EntityTable