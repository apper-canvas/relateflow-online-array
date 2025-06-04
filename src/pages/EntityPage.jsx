import React, { useState, useEffect, useCallback } from 'react'
      import { useParams } from 'react-router-dom'
      import { toast } from 'react-toastify'
      import AppHeader from '../components/molecules/AppHeader'
      import Sidebar from '../components/organisms/Sidebar'
      import MainFeatureTemplate from '../components/templates/MainFeatureTemplate'
      import contactService from '../services/api/contactService'
      import dealService from '../services/api/dealService'
      import activityService from '../services/api/activityService'

      const serviceMap = {
        contacts: contactService,
        deals: dealService,
        activities: activityService,
      }

      const EntityPage = () => {
        const { view } = useParams()
        const [activeView, setActiveView] = useState(view)
        const [sidebarOpen, setSidebarOpen] = useState(false)
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

        const navigationItems = [
          { id: 'dashboard', label: 'Dashboard', icon: 'BarChart3' },
          { id: 'contacts', label: 'Contacts', icon: 'Users' },
          { id: 'deals', label: 'Pipeline', icon: 'TrendingUp' },
          { id: 'activities', label: 'Activities', icon: 'Clock' },
          { id: 'reports', label: 'Reports', icon: 'FileText' }
        ]

        const loadData = useCallback(async () => {
          if (!serviceMap[activeView]) {
            setError('Invalid view selected.')
            setLoading(false)
            return
          }
          setLoading(true)
          setError(null)
          try {
            const result = await serviceMap[activeView].getAll()
            setData(result || [])
          } catch (err) {
            setError(err.message)
            toast.error(`Failed to load ${activeView}`)
          } finally {
            setLoading(false)
          }
        }, [activeView])

        useEffect(() => {
          setActiveView(view)
          loadData()
        }, [view, loadData])

        const resetForm = useCallback(() => {
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
        }, [])

        const handleSubmit = async (e) => {
          e.preventDefault()
          const service = serviceMap[activeView]
          if (!service) {
            toast.error('Service not found for this view.')
            return
          }

          try {
            const payload = { ...formData }
            if (activeView === 'deals') {
              payload.value = parseFloat(formData.value) || 0
            }

            if (editingItem) {
              await service.update(editingItem.id, payload)
              toast.success(`${activeView.slice(0, -1)} updated successfully`)
            } else {
              await service.create(payload)
              toast.success(`${activeView.slice(0, -1)} created successfully`)
            }

            await loadData()
            resetForm()
          } catch (err) {
            toast.error(`Failed to ${editingItem ? 'update' : 'create'} ${activeView.slice(0, -1)}`)
          }
        }

        const handleDelete = async (id) => {
          if (!confirm(`Are you sure you want to delete this ${activeView.slice(0, -1)}?`)) return

          const service = serviceMap[activeView]
          if (!service) {
            toast.error('Service not found for this view.')
            return
          }

          try {
            await service.delete(id)
            toast.success(`${activeView.slice(0, -1)} deleted successfully`)
            await loadData()
          } catch (err) {
            toast.error(`Failed to delete ${activeView.slice(0, -1)}`)
          }
        }

        const handleEdit = (item) => {
          setEditingItem(item)
          setFormData({ ...item, value: item.value?.toString() || '' })
          setShowModal(true)
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

            switch (activeView) {
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

        const getSortOptions = () => {
          let options = [{ value: 'createdAt', label: 'Date Created' }]
          if (activeView === 'contacts') {
            options = [...options, { value: 'firstName', label: 'First Name' }, { value: 'lastName', label: 'Last Name' }, { value: 'company', label: 'Company' }]
          } else if (activeView === 'deals') {
            options = [...options, { value: 'title', label: 'Title' }, { value: 'value', label: 'Value' }, { value: 'stage', label: 'Stage' }]
          } else if (activeView === 'activities') {
            options = [...options, { value: 'type', label: 'Type' }, { value: 'timestamp', label: 'Date' }]
          }
          return options
        }

        const handleNavigation = (id) => {
          setActiveView(id)
          setSidebarOpen(false)
window.location.href = id === 'dashboard' ? '/' : `/${id}`
        }

        return (
          <div className="min-h-screen bg-gray-50">
            <AppHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />

            <div className="flex">
              <Sidebar
                sidebarOpen={sidebarOpen}
                navigationItems={navigationItems}
                activeView={activeView}
                setActiveView={handleNavigation}
                setSidebarOpen={setSidebarOpen}
              />

              {sidebarOpen && (
                <div
                  className="fixed inset-0 bg-gray-600 bg-opacity-50 z-40 lg:hidden"
                  onClick={() => setSidebarOpen(false)}
                />
              )}

              <div className="flex-1 lg:ml-0">
                <main className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
                  <MainFeatureTemplate
                    view={activeView}
                    data={filteredAndSortedData}
                    loading={loading}
                    error={error}
                    searchTerm={searchTerm}
                    onSearchChange={(e) => setSearchTerm(e.target.value)}
                    sortField={sortField}
                    onSortFieldChange={(e) => setSortField(e.target.value)}
                    sortDirection={sortDirection}
                    onSortDirectionToggle={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
                    sortOptions={getSortOptions()}
                    onAddClick={() => setShowModal(true)}
                    showModal={showModal}
                    editingItem={editingItem}
                    formData={formData}
                    setFormData={setFormData}
                    handleSubmit={handleSubmit}
                    resetForm={resetForm}
                    dealStages={dealStages}
                    activityTypes={activityTypes}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    handleStageChange={handleStageChange}
                  />
                </main>
              </div>
            </div>
          </div>
        )
      }

      export default EntityPage