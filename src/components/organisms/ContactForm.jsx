import React from 'react'
      import FormField from '../molecules/FormField'

      const ContactForm = ({ formData, setFormData }) => {
        return (
          &lt;div className="grid grid-cols-1 md:grid-cols-2 gap-4"&gt;
            &lt;FormField
              label="First Name"
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              required
            /&gt;
            &lt;FormField
              label="Last Name"
              type="text"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              required
            /&gt;
            &lt;FormField
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            /&gt;
            &lt;FormField
              label="Phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            /&gt;
            &lt;FormField
              label="Company"
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            /&gt;
            &lt;FormField
              label="Position"
              type="text"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
            /&gt;
          &lt;/div&gt;
        )
      }

      export default ContactForm