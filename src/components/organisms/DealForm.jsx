import React from 'react'
      import FormField from '../molecules/FormField'

      const DealForm = ({ formData, setFormData, dealStages }) => {
        return (
          &lt;div className="grid grid-cols-1 md:grid-cols-2 gap-4"&gt;
            &lt;FormField
              label="Deal Title"
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              colSpan={2}
            /&gt;
            &lt;FormField
              label="Value ($)"
              type="number"
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: e.target.value })}
              min="0"
              step="0.01"
            /&gt;
            &lt;FormField
              label="Stage"
              type="select"
              value={formData.stage}
              onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
              options={dealStages.map(stage => ({ value: stage, label: stage.charAt(0).toUpperCase() + stage.slice(1).replace('-', ' ') }))}
            /&gt;
          &lt;/div&gt;
        )
      }

      export default DealForm