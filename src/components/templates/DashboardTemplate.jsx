import React from 'react'
      import Button from '../atoms/Button'
      import Icon from '../atoms/Icon'
      import StatsGrid from '../organisms/StatsGrid'
      import QuickActionsSection from '../organisms/QuickActionsSection'

      const DashboardTemplate = ({ stats, loading, error, formatCurrency, onAddContactClick, quickActions }) => {
        return (
          &lt;div className="space-y-6"&gt;
            {/* Dashboard Header */}
            &lt;div className="bg-gradient-to-r from-primary to-primary-dark text-white p-6 md:p-8 rounded-xl"&gt;
              &lt;div className="flex flex-col md:flex-row md:items-center md:justify-between"&gt;
                &lt;div&gt;
                  &lt;h1 className="text-2xl md:text-3xl font-bold mb-2"&gt;Welcome to RelateFlow&lt;/h1&gt;
                  &lt;p className="text-primary-light opacity-90"&gt;Manage your customer relationships effectively&lt;/p&gt;
                &lt;/div&gt;
                &lt;div className="mt-4 md:mt-0"&gt;
                  &lt;Button
                    onClick={onAddContactClick}
                    className="bg-white text-primary px-6 py-3 rounded-lg font-medium hover:bg-gray-50"
                    icon="Plus"
                  &gt;
                    Add Contact
                  &lt;/Button&gt;
                &lt;/div&gt;
              &lt;/div&gt;
            &lt;/div&gt;

            {/* Stats Grid */}
            &lt;StatsGrid stats={stats} loading={loading} formatCurrency={formatCurrency} /&gt;

            {/* Quick Actions */}
            &lt;QuickActionsSection actions={quickActions} /&gt;

            {error && (
              &lt;div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg"&gt;
                &lt;div className="flex items-center"&gt;
                  &lt;Icon name="AlertTriangle" className="w-5 h-5 mr-2" /&gt;
                  &lt;span&gt;{error}&lt;/span&gt;
                &lt;/div&gt;
              &lt;/div&gt;
            )}
          &lt;/div&gt;
        )
      }

      export default DashboardTemplate