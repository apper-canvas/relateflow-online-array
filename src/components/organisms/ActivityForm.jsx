import React from 'react'
      import FormField from '../molecules/FormField'

      const ActivityForm = ({ formData, setFormData, activityTypes }) => {
        return (
          &lt;div className="grid grid-cols-1 md:grid-cols-2 gap-4"&gt;
            &lt;FormField
              label="Type"
              type="select"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              options={activityTypes.map(type => ({ value: type, label: type.charAt(0).toUpperCase() + type.slice(1) }))}
            /&gt;
            &lt;FormField
              label="Contact"
              type="text"
              value={formData.contactId}
              onChange={(e) => setFormData({ ...formData, contactId: e.target.value })}
              placeholder="Contact ID"
            /&gt;
            &lt;FormField
              label="Description"
              type="textarea"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows="3"
              required
              colSpan={2}
            /&gt;
          &lt;/div&gt;
        )
      }

      export default ActivityForm