import React, { useState, useEffect } from 'react'
      import { toast } from 'react-toastify'
      import { useNavigate } from 'react-router-dom'
      import AppHeader from '../components/molecules/AppHeader'
      import Sidebar from '../components/organisms/Sidebar'
      import DashboardTemplate from '../components/templates/DashboardTemplate'
      import contactService from '../services/api/contactService'
      import dealService from '../services/api/dealService'
      import activityService from '../services/api/activityService'

      const DashboardPage = () => {
        const [activeView, setActiveView] = useState('dashboard')
        const [sidebarOpen, setSidebarOpen] = useState(false)
        const [stats, setStats] = useState({
          totalContacts: 0,
          totalDeals: 0,
          totalActivities: 0,
          pipelineValue: 0
        })
        const [loading, setLoading] = useState(true)
        const [error, setError] = useState(null)
        const navigate = useNavigate()

        const navigationItems = [
          { id: 'dashboard', label: 'Dashboard', icon: 'BarChart3' },
          { id: 'contacts', label: 'Contacts', icon: 'Users' },
          { id: 'deals', label: 'Pipeline', icon: 'TrendingUp' },
          { id: 'activities', label: 'Activities', icon: 'Clock' },
          { id: 'reports', label: 'Reports', icon: 'FileText' }
        ]

        useEffect(() => {
          const loadDashboardData = async () => {
            setLoading(true)
            try {
              const [contacts, deals, activities] = await Promise.all([
                contactService.getAll(),
                dealService.getAll(),
                activityService.getAll()
              ])

              const pipelineValue = deals?.reduce((sum, deal) => sum + (deal?.value || 0), 0) || 0

              setStats({
                totalContacts: contacts?.length || 0,
                totalDeals: deals?.length || 0,
                totalActivities: activities?.length || 0,
                pipelineValue
              })
            } catch (err) {
              setError(err.message)
              toast.error("Failed to load dashboard data")
            } finally {
              setLoading(false)
            }
          }

          loadDashboardData()
        }, [])

        const formatCurrency = (amount) => {
          return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0
          }).format(amount || 0)
        }

        const handleNavigation = (id) => {
          setActiveView(id)
          setSidebarOpen(false)
          if (id !== 'dashboard') {
            navigate(`/${id}`)
          }
        }

        const quickActions = [
          { label: 'Add New Contact', icon: 'UserPlus', action: () => handleNavigation('contacts') },
          { label: 'Create Deal', icon: 'Plus', action: () => handleNavigation('deals') },
          { label: 'Log Activity', icon: 'Calendar', action: () => handleNavigation('activities') }
        ]

        return (
          &lt;div className="min-h-screen bg-gray-50"&gt;
            &lt;AppHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} /&gt;

            &lt;div className="flex"&gt;
              &lt;Sidebar
                sidebarOpen={sidebarOpen}
                navigationItems={navigationItems}
                activeView={activeView}
                setActiveView={handleNavigation}
                setSidebarOpen={setSidebarOpen}
              /&gt;

              {sidebarOpen && (
                &lt;div
                  className="fixed inset-0 bg-gray-600 bg-opacity-50 z-40 lg:hidden"
                  onClick={() => setSidebarOpen(false)}
                /&gt;
              )}

              &lt;div className="flex-1 lg:ml-0"&gt;
                &lt;main className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto"&gt;
                  {activeView === 'dashboard' ? (
                    &lt;DashboardTemplate
                      stats={stats}
                      loading={loading}
                      error={error}
                      formatCurrency={formatCurrency}
                      onAddContactClick={() => handleNavigation('contacts')}
                      quickActions={quickActions}
                    /&gt;
                  ) : (
                    // Redirect to specific entity page
                    // This case should ideally not be reached if routes are configured correctly
                    // but serves as a fallback or if we want to show a loading state here
                    &lt;div&gt;Loading {activeView} content...&lt;/div&gt;
                  )}
                &lt;/main&gt;
              &lt;/div&gt;
            &lt;/div&gt;
          &lt;/div&gt;
        )
      }

      export default DashboardPage