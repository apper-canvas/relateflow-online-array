import React from 'react'
      import { motion } from 'framer-motion'
      import { format } from 'date-fns'
      import Icon from '../atoms/Icon'
      import Select from '../atoms/Select'
      import Button from '../atoms/Button'

      const TableRow = ({ item, view, dealStages, handleStageChange, handleEdit, handleDelete, index }) => {
        const renderContactCells = () => (
          &lt;&gt;
            &lt;td className="px-6 py-4 whitespace-nowrap"&gt;
              &lt;div className="flex items-center"&gt;
                &lt;div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3"&gt;
                  &lt;span className="text-primary font-medium"&gt;
                    {(item?.firstName?.[0] || '') + (item?.lastName?.[0] || '')}
                  &lt;/span&gt;
                &lt;/div&gt;
                &lt;div&gt;
                  &lt;div className="text-sm font-medium text-gray-900"&gt;
                    {item?.firstName || ''} {item?.lastName || ''}
                  &lt;/div&gt;
                  &lt;div className="text-sm text-gray-500"&gt;{item?.position || ''}&lt;/div&gt;
                &lt;/div&gt;
              &lt;/div&gt;
            &lt;/td&gt;
            &lt;td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"&gt;
              {item?.email || ''}
            &lt;/td&gt;
            &lt;td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"&gt;
              {item?.company || ''}
            &lt;/td&gt;
            &lt;td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"&gt;
              {item?.phone || ''}
            &lt;/td&gt;
          &lt;/>
        )

        const renderDealCells = () => (
          &lt;&gt;
            &lt;td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"&gt;
              {item?.title || 'Untitled'}
            &lt;/td&gt;
            &lt;td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"&gt;
              ${(item?.value || 0).toLocaleString()}
            &lt;/td&gt;
            &lt;td className="px-6 py-4 whitespace-nowrap"&gt;
              &lt;Select
                value={item?.stage || 'lead'}
                onChange={(e) => handleStageChange(item?.id, e.target.value)}
                options={dealStages.map(stage => ({ value: stage, label: stage.charAt(0).toUpperCase() + stage.slice(1).replace('-', ' ') }))}
                className="text-sm border-none bg-transparent focus:ring-2 focus:ring-primary rounded-lg"
              /&gt;
            &lt;/td&gt;
            &lt;td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"&gt;
              {item?.contactId || 'No contact'}
            &lt;/td&gt;
          &lt;/>
        )

        const renderActivityCells = () => (
          &lt;&gt;
            &lt;td className="px-6 py-4 whitespace-nowrap"&gt;
              &lt;span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary"&gt;
                &lt;Icon name="Calendar" className="w-3 h-3 mr-1" /&gt;
                {item?.type || 'unknown'}
              &lt;/span&gt;
            &lt;/td&gt;
            &lt;td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate"&gt;
              {item?.description || ''}
            &lt;/td&gt;
            &lt;td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"&gt;
              {item?.contactId || 'No contact'}
            &lt;/td&gt;
            &lt;td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"&gt;
              {item?.timestamp ? format(new Date(item.timestamp), 'MMM dd, yyyy') : ''}
            &lt;/td&gt;
          &lt;/>
        )

        return (
          &lt;motion.tr
            key={item?.id || index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.05 }}
            className="hover:bg-gray-50"
          &gt;
            {view === 'contacts' && renderContactCells()}
            {view === 'deals' && renderDealCells()}
            {view === 'activities' && renderActivityCells()}
            &lt;td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"&gt;
              &lt;div className="flex items-center justify-end space-x-2"&gt;
                &lt;Button onClick={() => handleEdit(item)} className="text-primary hover:text-primary-dark"&gt;
                  &lt;Icon name="Edit2" className="w-4 h-4" /&gt;
                &lt;/Button&gt;
                &lt;Button onClick={() => handleDelete(item?.id)} className="text-red-600 hover:text-red-900"&gt;
                  &lt;Icon name="Trash2" className="w-4 h-4" /&gt;
                &lt;/Button&gt;
              &lt;/div&gt;
            &lt;/td&gt;
          &lt;/motion.tr&gt;
        )
      }

      export default TableRow