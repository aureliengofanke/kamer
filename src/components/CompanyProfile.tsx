import React from 'react';
import { ArrowLeft, Download, Star, Building2, MapPin, Calendar, Activity } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { allCompanies } from '../data/mockData';

export const CompanyProfile: React.FC = () => {
  const { selectedCompanyId, setCurrentPage, t } = useApp();
  
  const company = allCompanies.find(c => c.id === selectedCompanyId);
  
  if (!company) {
    return (
      <div className="p-6">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400">Entreprise non trouvée</p>
          <button
            onClick={() => setCurrentPage('search')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retour à la recherche
          </button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Actif': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Inactif': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'Suspendu': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setCurrentPage('search')}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('company.title')}
          </h1>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>{t('company.exportPdf')}</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Star className="w-4 h-4" />
            <span>{t('company.addToFavorites')}</span>
          </button>
        </div>
      </div>

      {/* Company Info */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {company.name}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                {company.niu}
              </p>
            </div>
          </div>
          
          <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(company.status)}`}>
            {company.status}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t('company.name')}</p>
              <p className="font-medium text-gray-900 dark:text-white">{company.name}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <Activity className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t('company.activity')}</p>
              <p className="font-medium text-gray-900 dark:text-white">{company.activity}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <MapPin className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t('company.location')}</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {company.commune}, {company.quartier}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
              <Calendar className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t('company.presence')}</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {company.yearRegistered} → {company.yearEnd || '2024'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {t('company.activeYears')}
        </h3>
        
        <div className="space-y-4">
          {/* Timeline visualization */}
          <div className="relative">
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
              <span>{company.yearRegistered}</span>
              <span>{company.yearEnd || '2024'}</span>
            </div>
            
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 relative overflow-hidden">
              {company.activeYears.map((year, index) => {
                const yearRange = (company.yearEnd || 2024) - company.yearRegistered + 1;
                const position = ((year - company.yearRegistered) / yearRange) * 100;
                
                return (
                  <div
                    key={year}
                    className="absolute top-0 bg-blue-500 h-4 w-1 transition-all duration-300 hover:bg-blue-600"
                    style={{ left: `${position}%` }}
                    title={`Année ${year}`}
                  />
                );
              })}
            </div>
          </div>

          {/* Activity chart mock */}
          <div className="mt-6">
            <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
              Évolution de l'activité
            </h4>
            <div className="h-32 flex items-end justify-between space-x-1">
              {company.activeYears.slice(-10).map((year, index) => (
                <div key={year} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-sm transition-all duration-300 hover:from-blue-600 hover:to-blue-500"
                    style={{ height: `${Math.random() * 80 + 20}%` }}
                  />
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {year}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Informations géographiques
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Région:</span>
              <span className="font-medium text-gray-900 dark:text-white">{company.region}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Commune:</span>
              <span className="font-medium text-gray-900 dark:text-white">{company.commune}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Quartier:</span>
              <span className="font-medium text-gray-900 dark:text-white">{company.quartier}</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Statistiques
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Années d'activité:</span>
              <span className="font-medium text-gray-900 dark:text-white">{company.activeYears.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Durée totale:</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {(company.yearEnd || 2024) - company.yearRegistered + 1} ans
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Statut actuel:</span>
              <span className={`font-medium ${company.status === 'Actif' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {company.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};