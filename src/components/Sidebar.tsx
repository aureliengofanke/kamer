import React from 'react';
import { 
  LayoutDashboard, 
  Search, 
  BarChart3, 
  Database, 
  User, 
  HelpCircle, 
  LogOut 
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { Page } from '../types';

export const Sidebar: React.FC = () => {
  const { currentPage, setCurrentPage, t } = useApp();

  const menuItems = [
    { id: 'dashboard' as Page, icon: LayoutDashboard, label: t('sidebar.dashboard') },
    { id: 'search' as Page, icon: Search, label: t('sidebar.search') },
    { id: 'statistics' as Page, icon: BarChart3, label: t('sidebar.statistics') },
    { id: 'api' as Page, icon: Database, label: t('sidebar.api') },
    { id: 'profile' as Page, icon: User, label: t('sidebar.account') },
    { id: 'help' as Page, icon: HelpCircle, label: t('sidebar.help') },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col h-full">
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
          <LogOut className="w-5 h-5" />
          <span>{t('sidebar.logout')}</span>
        </button>
      </div>
    </aside>
  );
};