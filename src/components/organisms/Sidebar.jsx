import React from 'react'
      import { motion } from 'framer-motion'
      import SidebarHeader from '../molecules/SidebarHeader'
      import NavigationItem from '../molecules/NavigationItem'

const Sidebar = ({ sidebarOpen, navigationItems, activeView, setActiveView, setSidebarOpen }) => {
        return (
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
            <SidebarHeader />

            <nav className="mt-6 px-3">
              {navigationItems.map((item) => (
                <NavigationItem
                  key={item.id}
                  item={item}
                  isActive={activeView === item.id}
                  onClick={() => {
                    setActiveView(item.id)
                    setSidebarOpen(false)
                  }}
                />
              ))}
            </nav>
          </motion.div>
        )
      }

      export default Sidebar