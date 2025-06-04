import React from 'react'
      import { motion } from 'framer-motion'
      import Card from '../atoms/Card'
      import Icon from '../atoms/Icon'
      import Button from '../atoms/Button'

      const PipelineBoard = ({ data, dealStages, handleEdit, handleDelete, loading, error, searchTerm, onAddClick }) => {
        if (loading) {
          return (
            &lt;div className="flex items-center justify-center py-12"&gt;
              &lt;div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"&gt;&lt;/div&gt;
              &lt;span className="ml-3 text-gray-600"&gt;Loading deals...&lt;/span&gt;
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
              &lt;h3 className="text-lg font-medium text-gray-900 mb-2"&gt;No deals found&lt;/h3&gt;
              &lt;p className="text-gray-500 mb-4"&gt;
                {searchTerm ? `No deals match your search criteria.` : `Get started by creating your first deal.`}
              &lt;/p&gt;
              &lt;Button onClick={onAddClick} className="btn-primary" icon="Plus"&gt;
                Add Deal
              &lt;/Button&gt;
            &lt;/div&gt;
          )
        }

        return (
          &lt;div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4"&gt;
            {dealStages.map(stage => {
              const stageDeals = data.filter(deal => deal?.stage === stage) || []
              const stageValue = stageDeals.reduce((sum, deal) => sum + (deal?.value || 0), 0)

              return (
                &lt;div key={stage} className="bg-gray-50 rounded-xl p-4 min-h-96"&gt;
                  &lt;div className="mb-4"&gt;
                    &lt;h3 className="font-semibold text-gray-900 capitalize mb-1"&gt;
                      {stage.replace('-', ' ')}
                    &lt;/h3&gt;
                    &lt;p className="text-sm text-gray-600"&gt;
                      {stageDeals.length} deals • ${stageValue.toLocaleString()}
                    &lt;/p&gt;
                  &lt;/div&gt;

                  &lt;div className="space-y-3"&gt;
                    {stageDeals.map(deal => (
                      &lt;motion.div
                        key={deal?.id}
                        layout
                        className="card p-4 hover:shadow-lg transition-shadow duration-200 cursor-pointer group"
                        onClick={() => handleEdit(deal)}
                      &gt;
                        &lt;h4 className="font-medium text-gray-900 mb-2 group-hover:text-primary"&gt;
                          {deal?.title || 'Untitled Deal'}
                        &lt;/h4&gt;
                        &lt;p className="text-sm text-gray-600 mb-2"&gt;
                          ${(deal?.value || 0).toLocaleString()}
                        &lt;/p&gt;
                        &lt;div className="flex items-center justify-between"&gt;
                          &lt;span className="text-xs text-gray-500"&gt;
                            {deal?.contactId || 'No contact'}
                          &lt;/span&gt;
                          &lt;div className="flex space-x-1"&gt;
                            &lt;Button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleEdit(deal)
                              }}
                              className="p-1 text-gray-400 hover:text-primary"
                            &gt;
                              &lt;Icon name="Edit2" className="w-4 h-4" /&gt;
                            &lt;/Button&gt;
                            &lt;Button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDelete(deal?.id)
                              }}
                              className="p-1 text-gray-400 hover:text-red-500"
                            &gt;
                              &lt;Icon name="Trash2" className="w-4 h-4" /&gt;
                            &lt;/Button&gt;
                          &lt;/div&gt;
                        &lt;/div&gt;
                      &lt;/motion.div&gt;
                    ))}
                  &lt;/div&gt;
                &lt;/div&gt;
              )
            })}
          &lt;/div&gt;
        )
      }

      export default PipelineBoard