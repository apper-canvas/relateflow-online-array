import React from 'react'
      import StatCard from '../molecules/StatCard'

      const StatsGrid = ({ stats, loading, formatCurrency }) => {
        const statData = [
          { label: 'Total Contacts', value: stats.totalContacts, icon: 'Users', color: 'text-primary' },
          { label: 'Active Deals', value: stats.totalDeals, icon: 'TrendingUp', color: 'text-secondary' },
          { label: 'Pipeline Value', value: formatCurrency(stats.pipelineValue), icon: 'DollarSign', color: 'text-accent' },
          { label: 'Activities', value: stats.totalActivities, icon: 'Clock', color: 'text-green-600' }
        ]

        return (
          &lt;div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"&gt;
            {statData.map((stat, index) => (
              &lt;StatCard
                key={stat.label}
                label={stat.label}
                value={stat.value}
                icon={stat.icon}
                color={stat.color}
                loading={loading}
                index={index}
              /&gt;
            ))}
          &lt;/div&gt;
        )
      }

      export default StatsGrid