import React from 'react';
import { Building2, TrendingUp, Activity, RefreshCw } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { dashboardStats, monthlyCreationsData, regionalGrowthData } from '../data/mockData';

export const Dashboard: React.FC = () => {
  const { t } = useApp();

  const stats = [
    {
      title: t('dashboard.totalCompanies'),
      value: dashboardStats.totalCompanies.toLocaleString(),
      icon: Building2,
      color: 'bg-blue-500',
      trend: '+12.5%'
    },
    {
      title: t('dashboard.dominantActivity'),
      value: t('dashboard.commerceGeneral'),
      icon: TrendingUp,
      color: 'bg-green-500',
      trend: '35%'
    },
    {
      title: t('dashboard.activeThisMonth'),
      value: dashboardStats.activeThisMonth.toLocaleString(),
      icon: Activity,
      color: 'bg-purple-500',
      trend: '+5.2%'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('dashboard.title')}
        </h1>
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <RefreshCw className="w-4 h-4" />
          <span>{t('dashboard.lastUpdate')}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                    {stat.trend}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Creations Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t('dashboard.monthlyCreations')}
          </h3>
          <div className="h-64 flex items-end justify-between space-x-2">
            {monthlyCreationsData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-blue-500 rounded-t-sm transition-all duration-300 hover:bg-blue-600"
                  style={{ height: `${(data.count / 1600) * 200}px` }}
                />
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-2 transform -rotate-45">
                  {data.month.split(' ')[0]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Regional Growth Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t('dashboard.regionalGrowth')}
          </h3>
          <div className="space-y-3">
            {regionalGrowthData.slice(0, 8).map((data, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400 w-24">
                  {data.region}
                </span>
                <div className="flex-1 mx-4 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(data.companies / 45000) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white w-16 text-right">
                  {data.companies.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cameroon Map Mock */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Répartition géographique des entreprises
        </h3>
        <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 opacity-20" />
          <div className="text-center z-10">
            <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-2 flex items-center justify-center">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Carte interactive du Cameroun
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              Visualisation des entreprises par région
            </p>
          </div>
          
          {/* Mock data points */}
          <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
          <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-green-500 rounded-full animate-pulse" />
          <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
};