import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'
import MainFeature from '../components/MainFeature'
import contactService from '../services/api/contactService'
import dealService from '../services/api/dealService'
import activityService from '../services/api/activityService'

const Home = () => {
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

  const renderContent = () => {
    switch (activeView) {
      case 'contacts':
      case 'deals':
      case 'activities':
        return <MainFeature view={activeView} />
      default:
        return (
          <div className="space-y-6">
            {/* Dashboard Header */}
            <div className="bg-gradient-to-r from-primary to-primary-dark text-white p-6 md:p-8 rounded-xl">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome to RelateFlow</h1>
                  <p className="text-primary-light opacity-90">Manage your customer relationships effectively</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <button 
                    onClick={() => setActiveView('contacts')}
                    className="bg-white text-primary px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
                  >
                    <ApperIcon name="Plus" className="inline w-5 h-5 mr-2" />
                    Add Contact
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {[
                { label: 'Total Contacts', value: stats.totalContacts, icon: 'Users', color: 'text-primary' },
                { label: 'Active Deals', value: stats.totalDeals, icon: 'TrendingUp', color: 'text-secondary' },
                { label: 'Pipeline Value', value: formatCurrency(stats.pipelineValue), icon: 'DollarSign', color: 'text-accent' },
                { label: 'Activities', value: stats.totalActivities, icon: 'Clock', color: 'text-green-600' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {loading ? '-' : stat.value}
                      </p>
                    </div>
                    <div className={`p-3 rounded-full bg-gray-50 ${stat.color}`}>
                      <ApperIcon name={stat.icon} className="w-6 h-6" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { label: 'Add New Contact', icon: 'UserPlus', action: () => setActiveView('contacts') },
                  { label: 'Create Deal', icon: 'Plus', action: () => setActiveView('deals') },
                  { label: 'Log Activity', icon: 'Calendar', action: () => setActiveView('activities') }
                ].map((action) => (
                  <button
                    key={action.label}
                    onClick={action.action}
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary-50 transition-colors duration-200 group"
                  >
                    <ApperIcon name={action.icon} className="w-5 h-5 text-gray-400 group-hover:text-primary mr-3" />
                    <span className="text-gray-700 group-hover:text-primary font-medium">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
                <div className="flex items-center">
                  <ApperIcon name="AlertTriangle" className="w-5 h-5 mr-2" />
                  <span>{error}</span>
                </div>
              </div>
            )}
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-primary">RelateFlow</h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          >
            <ApperIcon name="Menu" className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <motion.div
          initial={false}
          animate={{ 
            x: sidebarOpen ? 0 : '-100%',
            opacity: sidebarOpen ? 1 : 0
          }}
          className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 lg:translate-x-0 lg:opacity-100 ${
            sidebarOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
          } lg:block transition-all duration-300`}
        >
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-primary">RelateFlow</h1>
            <p className="text-sm text-gray-600 mt-1">CRM Platform</p>
          </div>
          
          <nav className="mt-6 px-3">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveView(item.id)
                  setSidebarOpen(false)
                }}
                className={`w-full sidebar-nav-item mb-1 ${
                  activeView === item.id ? 'active' : ''
                }`}
              >
                <ApperIcon name={item.icon} className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            ))}
          </nav>
        </motion.div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          <main className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  )
}

export default Home