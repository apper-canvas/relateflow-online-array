import React from 'react'
      import Label from '../atoms/Label'
      import Input from '../atoms/Input'
      import Select from '../atoms/Select'
      import Textarea from '../atoms/Textarea'

      const FormField = ({ label, type, value, onChange, options, rows, placeholder, required, className, min, step, colSpan }) => {
        const Wrapper = colSpan ? &lt;div className={`md:col-span-${colSpan}`}&gt; : &lt;div&gt;

        const renderInput = () => {
          switch (type) {
            case 'select':
              return &lt;Select value={value} onChange={onChange} options={options} required={required} className={className} /&gt;
            case 'textarea':
              return &lt;Textarea value={value} onChange={onChange} rows={rows} placeholder={placeholder} required={required} className={className} /&gt;
            default:
              return &lt;Input type={type} value={value} onChange={onChange} placeholder={placeholder} required={required} className={className} min={min} step={step} /&gt;
          }
        }

        return (
          &lt;Wrapper&gt;
            {label && &lt;Label&gt;{label}&lt;/Label&gt;}
            {renderInput()}
          &lt;/Wrapper&gt;
        )
      }

      export default FormField