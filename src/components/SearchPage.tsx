import React, { useState, useMemo } from 'react';
import { Search, Filter, Download, ChevronDown } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { allCompanies, regions, communes, quartiers, activities } from '../data/mockData';
import { SearchFilters, Company } from '../types';

export const SearchPage: React.FC = () => {
  const { t, setCurrentPage, setSelectedCompanyId } = useApp();
  const [filters, setFilters] = useState<SearchFilters>({});
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [sortBy, setSortBy] = useState<'name' | 'niu' | 'activity' | 'commune' | 'status'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  
  const itemsPerPage = 10;

  const filteredCompanies = useMemo(() => {
    let filtered = allCompanies.filter(company => {
      if (filters.activity && company.activity !== filters.activity) return false;
      if (filters.region && company.region !== filters.region) return false;
      if (filters.commune && company.commune !== filters.commune) return false;
      if (filters.quartier && company.quartier !== filters.quartier) return false;
      if (filters.yearStart && company.yearRegistered < filters.yearStart) return false;
      if (filters.yearEnd && company.yearRegistered > filters.yearEnd) return false;
      if (filters.searchTerm) {
        const term = filters.searchTerm.toLowerCase();
        return company.name.toLowerCase().includes(term) || 
               company.niu.toLowerCase().includes(term);
      }
      return true;
    });

    // Sort
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [filters, sortBy, sortOrder]);

  const paginatedCompanies = useMemo(() => {
    const startIndex = (currentPageNum - 1) * itemsPerPage;
    return filteredCompanies.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredCompanies, currentPageNum]);

  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);

  const handleFilterChange = (key: keyof SearchFilters, value: string | number) => {
    setFilters(prev => ({ ...prev, [key]: value || undefined }));
    setCurrentPageNum(1);
  };

  const handleSort = (column: typeof sortBy) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleCompanyClick = (companyId: string) => {
    setSelectedCompanyId(companyId);
    setCurrentPage('company');
  };

  const getStatusColor = (status: Company['status']) => {
    switch (status) {
      case 'Actif': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Inactif': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'Suspendu': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        {t('search.title')}
      </h1>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Activity Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('search.activity')}
            </label>
            <select
              value={filters.activity || ''}
              onChange={(e) => handleFilterChange('activity', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Toutes les activités</option>
              {activities.map(activity => (
                <option key={activity} value={activity}>{activity}</option>
              ))}
            </select>
          </div>

          {/* Region Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('search.region')}
            </label>
            <select
              value={filters.region || ''}
              onChange={(e) => {
                handleFilterChange('region', e.target.value);
                handleFilterChange('commune', '');
                handleFilterChange('quartier', '');
              }}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Toutes les régions</option>
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>

          {/* Commune Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('search.commune')}
            </label>
            <select
              value={filters.commune || ''}
              onChange={(e) => {
                handleFilterChange('commune', e.target.value);
                handleFilterChange('quartier', '');
              }}
              disabled={!filters.region}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
            >
              <option value="">Toutes les communes</option>
              {filters.region && communes[filters.region]?.map(commune => (
                <option key={commune} value={commune}>{commune}</option>
              ))}
            </select>
          </div>

          {/* Quartier Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('search.quartier')}
            </label>
            <select
              value={filters.quartier || ''}
              onChange={(e) => handleFilterChange('quartier', e.target.value)}
              disabled={!filters.commune}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
            >
              <option value="">Tous les quartiers</option>
              {filters.commune && quartiers[filters.commune]?.map(quartier => (
                <option key={quartier} value={quartier}>{quartier}</option>
              ))}
            </select>
          </div>

          {/* Search Term */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('search.searchTerm')}
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={filters.searchTerm || ''}
                onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                placeholder="Rechercher par nom ou NIU..."
                className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Year Range */}
          <div className="md:col-span-2 grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Année début
              </label>
              <input
                type="number"
                value={filters.yearStart || ''}
                onChange={(e) => handleFilterChange('yearStart', parseInt(e.target.value))}
                min="2001"
                max="2024"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Année fin
              </label>
              <input
                type="number"
                value={filters.yearEnd || ''}
                onChange={(e) => handleFilterChange('yearEnd', parseInt(e.target.value))}
                min="2001"
                max="2024"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('search.results')} ({filteredCompanies.length} résultats)
          </h2>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>{t('search.exportCsv')}</span>
          </button>
        </div>

        {paginatedCompanies.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">{t('search.noResults')}</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    {[
                      { key: 'name', label: t('search.companyName') },
                      { key: 'niu', label: t('search.niu') },
                      { key: 'activity', label: t('search.activity') },
                      { key: 'commune', label: t('search.commune') },
                      { key: 'status', label: t('search.status') }
                    ].map(column => (
                      <th
                        key={column.key}
                        onClick={() => handleSort(column.key as typeof sortBy)}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        <div className="flex items-center space-x-1">
                          <span>{column.label}</span>
                          <ChevronDown className="w-3 h-3" />
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {paginatedCompanies.map(company => (
                    <tr
                      key={company.id}
                      onClick={() => handleCompanyClick(company.id)}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {company.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {company.niu}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {company.activity}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {company.commune}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(company.status)}`}>
                          {company.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Affichage {(currentPageNum - 1) * itemsPerPage + 1} à {Math.min(currentPageNum * itemsPerPage, filteredCompanies.length)} sur {filteredCompanies.length} résultats
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPageNum(Math.max(1, currentPageNum - 1))}
                    disabled={currentPageNum === 1}
                    className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Précédent
                  </button>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const page = i + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPageNum(page)}
                        className={`px-3 py-1 text-sm rounded-lg ${
                          currentPageNum === page
                            ? 'bg-blue-600 text-white'
                            : 'border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => setCurrentPageNum(Math.min(totalPages, currentPageNum + 1))}
                    disabled={currentPageNum === totalPages}
                    className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Suivant
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};