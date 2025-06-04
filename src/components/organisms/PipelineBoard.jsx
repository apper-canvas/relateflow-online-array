import React from 'react'
      import { motion } from 'framer-motion'
      import Card from '../atoms/Card'
      import Icon from '../atoms/Icon'
      import Button from '../atoms/Button'

      const PipelineBoard = ({ data, dealStages, handleEdit, handleDelete, loading, error, searchTerm, onAddClick }) => {
if (loading) {
          return (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <span className="ml-3 text-gray-600">Loading deals...</span>
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
              <h3 className="text-lg font-medium text-gray-900 mb-2">No deals found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm ? `No deals match your search criteria.` : `Get started by creating your first deal.`}
              </p>
              <Button onClick={onAddClick} className="btn-primary" icon="Plus">
                Add Deal
              </Button>
            </div>
          )
        }

        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {dealStages.map(stage => {
              const stageDeals = data.filter(deal => deal?.stage === stage) || []
              const stageValue = stageDeals.reduce((sum, deal) => sum + (deal?.value || 0), 0)

              return (
                <div key={stage} className="bg-gray-50 rounded-xl p-4 min-h-96">
                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-900 capitalize mb-1">
                      {stage.replace('-', ' ')}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {stageDeals.length} deals • ${stageValue.toLocaleString()}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {stageDeals.map(deal => (
                      <motion.div
                        key={deal?.id}
                        layout
                        className="card p-4 hover:shadow-lg transition-shadow duration-200 cursor-pointer group"
                        onClick={() => handleEdit(deal)}
                      >
                        <h4 className="font-medium text-gray-900 mb-2 group-hover:text-primary">
                          {deal?.title || 'Untitled Deal'}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">
                          ${(deal?.value || 0).toLocaleString()}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            {deal?.contactId || 'No contact'}
                          </span>
                          <div className="flex space-x-1">
                            <Button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleEdit(deal)
                              }}
                              className="p-1 text-gray-400 hover:text-primary"
                            >
                              <Icon name="Edit2" className="w-4 h-4" />
                            </Button>
                            <Button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDelete(deal?.id)
                              }}
                              className="p-1 text-gray-400 hover:text-red-500"
                            >
                              <Icon name="Trash2" className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )
      }

      export default PipelineBoard