import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  Calendar, 
  MapPin, 
  Building2, 
  Activity, 
  Users,
  PieChart,
  LineChart,
  Filter,
  RefreshCw
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { regionalGrowthData, monthlyCreationsData, activities } from '../data/mockData';

export const StatisticsPage: React.FC = () => {
  const { t } = useApp();
  const [selectedPeriod, setSelectedPeriod] = useState('2024');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [reportType, setReportType] = useState<'overview' | 'regional' | 'sectorial' | 'temporal'>('overview');

  // Mock data for different report types
  const sectoralData = [
    { sector: 'Commerce général', count: 45000, percentage: 18.9, growth: '+12%' },
    { sector: 'Vente de pièces auto', count: 28000, percentage: 11.8, growth: '+8%' },
    { sector: 'Restaurant', count: 22000, percentage: 9.2, growth: '+15%' },
    { sector: 'Salon de coiffure', count: 18000, percentage: 7.6, growth: '+6%' },
    { sector: 'Transport', count: 15000, percentage: 6.3, growth: '+10%' },
    { sector: 'Construction', count: 12000, percentage: 5.0, growth: '+20%' },
    { sector: 'Agriculture', count: 10000, percentage: 4.2, growth: '+5%' },
    { sector: 'Autres', count: 88000, percentage: 37.0, growth: '+7%' }
  ];

  const temporalData = [
    { year: '2020', creations: 8500, closures: 2100, net: 6400 },
    { year: '2021', creations: 9200, closures: 2300, net: 6900 },
    { year: '2022', creations: 11800, closures: 2800, net: 9000 },
    { year: '2023', creations: 13500, closures: 3200, net: 10300 },
    { year: '2024', creations: 15200, closures: 3500, net: 11700 }
  ];

  const kpiData = [
    {
      title: 'Taux de croissance annuel',
      value: '+12.8%',
      icon: TrendingUp,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
      description: 'Croissance des créations vs année précédente'
    },
    {
      title: 'Taux de survie (5 ans)',
      value: '68.4%',
      icon: Activity,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
      description: 'Entreprises encore actives après 5 ans'
    },
    {
      title: 'Densité entrepreneuriale',
      value: '9.2/1000',
      icon: Users,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
      description: 'Entreprises pour 1000 habitants'
    },
    {
      title: 'Concentration géographique',
      value: '65%',
      icon: MapPin,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-100 dark:bg-orange-900/20',
      description: 'Entreprises dans les 3 principales régions'
    }
  ];

  const generateReport = () => {
    // Mock report generation
    alert(`Génération du rapport ${reportType} pour la période ${selectedPeriod}...`);
  };

  const exportData = (format: 'pdf' | 'excel' | 'csv') => {
    alert(`Export des données en format ${format.toUpperCase()}...`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Statistiques & Rapports
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Analyse approfondie du tissu entrepreneurial camerounais
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => window.location.reload()}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Actualiser</span>
          </button>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => exportData('pdf')}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>PDF</span>
            </button>
            <button
              onClick={() => exportData('excel')}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Excel</span>
            </button>
            <button
              onClick={() => exportData('csv')}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>CSV</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center space-x-4 mb-4">
          <Filter className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filtres d'analyse</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Type de rapport
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="overview">Vue d'ensemble</option>
              <option value="regional">Analyse régionale</option>
              <option value="sectorial">Analyse sectorielle</option>
              <option value="temporal">Évolution temporelle</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Période
            </label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2020-2024">2020-2024</option>
              <option value="2015-2024">2015-2024</option>
              <option value="all">Toutes les années</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Région
            </label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Toutes les régions</option>
              <option value="Centre">Centre</option>
              <option value="Littoral">Littoral</option>
              <option value="Ouest">Ouest</option>
              <option value="Nord-Ouest">Nord-Ouest</option>
              <option value="Sud-Ouest">Sud-Ouest</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={generateReport}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Générer rapport</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${kpi.bgColor}`}>
                  <Icon className={`w-6 h-6 ${kpi.color}`} />
                </div>
              </div>
              
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                {kpi.title}
              </h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {kpi.value}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {kpi.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sectorial Analysis */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Répartition par secteur d'activité
            </h3>
            <PieChart className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {sectoralData.map((sector, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {sector.sector}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {sector.count.toLocaleString()}
                      </span>
                      <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                        {sector.growth}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${sector.percentage}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {sector.percentage}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Temporal Evolution */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Évolution créations vs fermetures
            </h3>
            <LineChart className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </div>
          
          <div className="h-64 flex items-end justify-between space-x-4">
            {temporalData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full flex flex-col items-center space-y-1 mb-2">
                  {/* Creations bar */}
                  <div
                    className="w-full bg-green-500 rounded-t-sm transition-all duration-500 hover:bg-green-600"
                    style={{ height: `${(data.creations / 20000) * 120}px` }}
                    title={`Créations: ${data.creations.toLocaleString()}`}
                  />
                  {/* Closures bar */}
                  <div
                    className="w-full bg-red-500 rounded-b-sm transition-all duration-500 hover:bg-red-600"
                    style={{ height: `${(data.closures / 20000) * 120}px` }}
                    title={`Fermetures: ${data.closures.toLocaleString()}`}
                  />
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  {data.year}
                </span>
                <span className="text-xs text-blue-600 dark:text-blue-400 font-bold">
                  +{data.net.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-center space-x-6 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span className="text-xs text-gray-600 dark:text-gray-400">Créations</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <span className="text-xs text-gray-600 dark:text-gray-400">Fermetures</span>
            </div>
          </div>
        </div>
      </div>

      {/* Regional Performance */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Performance régionale - Créations d'entreprises 2024
          </h3>
          <MapPin className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {regionalGrowthData.slice(0, 10).map((region, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer"
            >
              <div className="text-center">
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-2">
                  {region.region}
                </h4>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                  {region.companies.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  entreprises
                </div>
                <div className="mt-2 w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1">
                  <div
                    className="bg-blue-500 h-1 rounded-full transition-all duration-500"
                    style={{ width: `${(region.companies / 45000) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Reports Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Rapports détaillés disponibles
          </h3>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: 'Rapport mensuel - Décembre 2024',
                description: 'Analyse complète des créations et fermetures',
                date: '01/01/2025',
                size: '2.4 MB',
                type: 'PDF'
              },
              {
                title: 'Analyse sectorielle Q4 2024',
                description: 'Performance par secteur d\'activité',
                date: '28/12/2024',
                size: '1.8 MB',
                type: 'Excel'
              },
              {
                title: 'Cartographie entrepreneuriale',
                description: 'Répartition géographique détaillée',
                date: '25/12/2024',
                size: '3.1 MB',
                type: 'PDF'
              },
              {
                title: 'Tendances 2020-2024',
                description: 'Évolution sur 5 ans avec projections',
                date: '20/12/2024',
                size: '4.2 MB',
                type: 'PDF'
              },
              {
                title: 'Base de données complète',
                description: 'Export complet des entreprises actives',
                date: '15/12/2024',
                size: '12.5 MB',
                type: 'CSV'
              },
              {
                title: 'Rapport de conformité',
                description: 'Statut réglementaire des entreprises',
                date: '10/12/2024',
                size: '1.2 MB',
                type: 'PDF'
              }
            ].map((report, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-blue-300 dark:hover:border-blue-600 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                    {report.title}
                  </h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    report.type === 'PDF' 
                      ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                      : report.type === 'Excel'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                  }`}>
                    {report.type}
                  </span>
                </div>
                
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                  {report.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>{report.date}</span>
                  <span>{report.size}</span>
                </div>
                
                <button className="w-full mt-3 flex items-center justify-center space-x-2 px-3 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                  <Download className="w-3 h-3" />
                  <span className="text-xs font-medium">Télécharger</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};