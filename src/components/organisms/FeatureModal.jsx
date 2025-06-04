import React from 'react'
      import { motion, AnimatePresence } from 'framer-motion'
      import Icon from '../atoms/Icon'
      import Button from '../atoms/Button'
      import ContactForm from './ContactForm'
      import DealForm from './DealForm'
      import ActivityForm from './ActivityForm'

      const FeatureModal = ({ showModal, view, editingItem, formData, setFormData, handleSubmit, resetForm, dealStages, activityTypes }) => {
        const renderForm = () => {
          switch (view) {
            case 'contacts':
              return &lt;ContactForm formData={formData} setFormData={setFormData} /&gt;
            case 'deals':
              return &lt;DealForm formData={formData} setFormData={setFormData} dealStages={dealStages} /&gt;
            case 'activities':
              return &lt;ActivityForm formData={formData} setFormData={setFormData} activityTypes={activityTypes} /&gt;
            default:
              return null
          }
        }

        return (
          &lt;AnimatePresence&gt;
            {showModal && (
              &lt;div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"&gt;
                &lt;div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-xl bg-white"&gt;
                  &lt;motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  &gt;
                    &lt;div className="flex items-center justify-between mb-6"&gt;
                      &lt;h3 className="text-lg font-semibold text-gray-900"&gt;
                        {editingItem ? 'Edit' : 'Add'} {view.slice(0, -1)}
                      &lt;/h3&gt;
                      &lt;Button onClick={resetForm} className="text-gray-400 hover:text-gray-600"&gt;
                        &lt;Icon name="X" className="w-6 h-6" /&gt;
                      &lt;/Button&gt;
                    &lt;/div&gt;

                    &lt;form onSubmit={handleSubmit}&gt;
                      {renderForm()}

                      &lt;div className="flex justify-end space-x-4 mt-6"&gt;
                        &lt;Button type="button" onClick={resetForm} className="btn-secondary"&gt;
                          Cancel
                        &lt;/Button&gt;
                        &lt;Button type="submit" className="btn-primary"&gt;
                          {editingItem ? 'Update' : 'Create'}
                        &lt;/Button&gt;
                      &lt;/div&gt;
                    &lt;/form&gt;
                  &lt;/motion.div&gt;
                &lt;/div&gt;
              &lt;/div&gt;
            )}
          &lt;/AnimatePresence&gt;
        )
      }

      export default FeatureModal