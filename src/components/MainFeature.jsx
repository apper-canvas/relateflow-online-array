import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { motion, AnimatePresence } from 'framer-motion'
import { format } from 'date-fns'
import ApperIcon from './ApperIcon'
import contactService from '../services/api/contactService'
import dealService from '../services/api/dealService'
import activityService from '../services/api/activityService'

const MainFeature = ({ view = 'contacts' }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState('createdAt')
  const [sortDirection, setSortDirection] = useState('desc')

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    title: '',
    value: '',
    stage: 'lead',
    type: 'call',
    description: '',
    contactId: ''
  })

  const dealStages = ['lead', 'qualified', 'proposal', 'negotiation', 'closed-won', 'closed-lost']
  const activityTypes = ['call', 'email', 'meeting', 'note', 'task']

  useEffect(() => {
    loadData()
  }, [view])

  const loadData = async () => {
    setLoading(true)
    setError(null)
    try {
      let result = []
      switch (view) {
        case 'contacts':
          result = await contactService.getAll()
          break
        case 'deals':
          result = await dealService.getAll()
          break
        case 'activities':
          result = await activityService.getAll()
          break
        default:
          result = []
      }
      setData(result || [])
    } catch (err) {
      setError(err.message)
      toast.error(`Failed to load ${view}`)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let result
      if (editingItem) {
        switch (view) {
          case 'contacts':
            result = await contactService.update(editingItem.id, formData)
            break
          case 'deals':
            result = await dealService.update(editingItem.id, { ...formData, value: parseFloat(formData.value) || 0 })
            break
          case 'activities':
            result = await activityService.update(editingItem.id, formData)
            break
        }
        toast.success(`${view.slice(0, -1)} updated successfully`)
      } else {
        switch (view) {
          case 'contacts':
            result = await contactService.create(formData)
            break
          case 'deals':
            result = await dealService.create({ ...formData, value: parseFloat(formData.value) || 0 })
            break
          case 'activities':
            result = await activityService.create(formData)
            break
        }
        toast.success(`${view.slice(0, -1)} created successfully`)
      }
      
      await loadData()
      resetForm()
    } catch (err) {
      toast.error(`Failed to ${editingItem ? 'update' : 'create'} ${view.slice(0, -1)}`)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm(`Are you sure you want to delete this ${view.slice(0, -1)}?`)) return
    
    try {
      switch (view) {
        case 'contacts':
          await contactService.delete(id)
          break
        case 'deals':
          await dealService.delete(id)
          break
        case 'activities':
          await activityService.delete(id)
          break
      }
      toast.success(`${view.slice(0, -1)} deleted successfully`)
      await loadData()
    } catch (err) {
      toast.error(`Failed to delete ${view.slice(0, -1)}`)
    }
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    setFormData({ ...item, value: item.value?.toString() || '' })
    setShowModal(true)
  }

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      position: '',
      title: '',
      value: '',
      stage: 'lead',
      type: 'call',
      description: '',
      contactId: ''
    })
    setEditingItem(null)
    setShowModal(false)
  }

  const handleStageChange = async (dealId, newStage) => {
    try {
      await dealService.update(dealId, { stage: newStage })
      toast.success("Deal stage updated")
      await loadData()
    } catch (err) {
      toast.error("Failed to update deal stage")
    }
  }

  const filteredAndSortedData = data
    ?.filter(item => {
      if (!searchTerm) return true
      const searchLower = searchTerm.toLowerCase()
      
      switch (view) {
        case 'contacts':
          return (
            item?.firstName?.toLowerCase().includes(searchLower) ||
            item?.lastName?.toLowerCase().includes(searchLower) ||
            item?.email?.toLowerCase().includes(searchLower) ||
            item?.company?.toLowerCase().includes(searchLower)
          )
        case 'deals':
          return item?.title?.toLowerCase().includes(searchLower)
        case 'activities':
          return (
            item?.type?.toLowerCase().includes(searchLower) ||
            item?.description?.toLowerCase().includes(searchLower)
          )
        default:
          return true
      }
    })
    ?.sort((a, b) => {
      const aVal = a?.[sortField] || ''
      const bVal = b?.[sortField] || ''
      
      if (sortDirection === 'asc') {
        return aVal > bVal ? 1 : -1
      } else {
        return aVal < bVal ? 1 : -1
      }
    }) || []

  const renderContactForm = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
        <input
          type="text"
          value={formData.firstName}
          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
        <input
          type="text"
          value={formData.lastName}
          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
        <input
          type="text"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
        <input
          type="text"
          value={formData.position}
          onChange={(e) => setFormData({ ...formData, position: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
        />
      </div>
    </div>
  )

  const renderDealForm = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">Deal Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Value ($)</label>
        <input
          type="number"
          value={formData.value}
          onChange={(e) => setFormData({ ...formData, value: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          min="0"
          step="0.01"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Stage</label>
        <select
          value={formData.stage}
          onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
        >
          {dealStages.map(stage => (
            <option key={stage} value={stage}>
              {stage.charAt(0).toUpperCase() + stage.slice(1).replace('-', ' ')}
            </option>
          ))}
        </select>
      </div>
    </div>
  )

  const renderActivityForm = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
        <select
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
        >
          {activityTypes.map(type => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
        <input
          type="text"
          value={formData.contactId}
          onChange={(e) => setFormData({ ...formData, contactId: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          placeholder="Contact ID"
        />
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          rows="3"
          required
        />
      </div>
    </div>
  )

  const renderPipelineView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {dealStages.map(stage => {
        const stageDeals = filteredAndSortedData.filter(deal => deal?.stage === stage) || []
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
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleEdit(deal)
                        }}
                        className="p-1 text-gray-400 hover:text-primary"
                      >
                        <ApperIcon name="Edit2" className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDelete(deal?.id)
                        }}
                        className="p-1 text-gray-400 hover:text-red-500"
                      >
                        <ApperIcon name="Trash2" className="w-4 h-4" />
                      </button>
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

  const renderTableView = () => (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {view === 'contacts' && (
                <>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                </>
              )}
              {view === 'deals' && (
                <>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stage</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                </>
              )}
              {view === 'activities' && (
                <>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </>
              )}
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAndSortedData.map((item, index) => (
              <motion.tr
                key={item?.id || index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-gray-50"
              >
                {view === 'contacts' && (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-primary font-medium">
                            {(item?.firstName?.[0] || '') + (item?.lastName?.[0] || '')}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {item?.firstName || ''} {item?.lastName || ''}
                          </div>
                          <div className="text-sm text-gray-500">{item?.position || ''}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item?.email || ''}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item?.company || ''}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item?.phone || ''}
                    </td>
                  </>
                )}
                {view === 'deals' && (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item?.title || 'Untitled'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${(item?.value || 0).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={item?.stage || 'lead'}
                        onChange={(e) => handleStageChange(item?.id, e.target.value)}
                        className="text-sm border-none bg-transparent focus:ring-2 focus:ring-primary rounded-lg"
                      >
                        {dealStages.map(stage => (
                          <option key={stage} value={stage}>
                            {stage.charAt(0).toUpperCase() + stage.slice(1).replace('-', ' ')}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item?.contactId || 'No contact'}
                    </td>
                  </>
                )}
                {view === 'activities' && (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary">
                        <ApperIcon name="Calendar" className="w-3 h-3 mr-1" />
                        {item?.type || 'unknown'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                      {item?.description || ''}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item?.contactId || 'No contact'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item?.timestamp ? format(new Date(item.timestamp), 'MMM dd, yyyy') : ''}
                    </td>
                  </>
                )}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-primary hover:text-primary-dark"
                    >
                      <ApperIcon name="Edit2" className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item?.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <ApperIcon name="Trash2" className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 capitalize">
            {view}
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your {view} effectively
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="btn-primary flex items-center"
        >
          <ApperIcon name="Plus" className="w-5 h-5 mr-2" />
          Add {view.slice(0, -1)}
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={`Search ${view}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="createdAt">Date Created</option>
            {view === 'contacts' && (
              <>
                <option value="firstName">First Name</option>
                <option value="lastName">Last Name</option>
                <option value="company">Company</option>
              </>
            )}
            {view === 'deals' && (
              <>
                <option value="title">Title</option>
                <option value="value">Value</option>
                <option value="stage">Stage</option>
              </>
            )}
            {view === 'activities' && (
              <>
                <option value="type">Type</option>
                <option value="timestamp">Date</option>
              </>
            )}
          </select>
          <button
            onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
            className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <ApperIcon name={sortDirection === 'asc' ? 'ArrowUp' : 'ArrowDown'} className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-3 text-gray-600">Loading {view}...</span>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
          <div className="flex items-center">
            <ApperIcon name="AlertTriangle" className="w-5 h-5 mr-2" />
            <span>{error}</span>
          </div>
        </div>
      ) : (
        <>
          {view === 'deals' ? renderPipelineView() : renderTableView()}
          
          {filteredAndSortedData.length === 0 && (
            <div className="text-center py-12">
              <ApperIcon name="Inbox" className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No {view} found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm ? `No ${view} match your search criteria.` : `Get started by creating your first ${view.slice(0, -1)}.`}
              </p>
              <button
                onClick={() => setShowModal(true)}
                className="btn-primary"
              >
                <ApperIcon name="Plus" className="w-5 h-5 mr-2" />
                Add {view.slice(0, -1)}
              </button>
            </div>
          )}
        </>
      )}

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-xl bg-white">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {editingItem ? 'Edit' : 'Add'} {view.slice(0, -1)}
                  </h3>
                  <button
                    onClick={resetForm}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <ApperIcon name="X" className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit}>
                  {view === 'contacts' && renderContactForm()}
                  {view === 'deals' && renderDealForm()}
                  {view === 'activities' && renderActivityForm()}

                  <div className="flex justify-end space-x-4 mt-6">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-primary"
                    >
                      {editingItem ? 'Update' : 'Create'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainFeature