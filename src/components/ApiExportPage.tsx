import React, { useState } from 'react';
import { 
  Key, 
  Download, 
  Code, 
  Database, 
  Settings, 
  Copy, 
  Eye, 
  EyeOff,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Clock,
  FileText,
  Zap,
  Shield,
  Globe
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export const ApiExportPage: React.FC = () => {
  const { t, user } = useApp();
  const [showApiKey, setShowApiKey] = useState(false);
  const [selectedEndpoint, setSelectedEndpoint] = useState('companies');
  const [exportFormat, setExportFormat] = useState<'json' | 'csv' | 'xml'>('json');
  const [exportFilters, setExportFilters] = useState({
    region: '',
    activity: '',
    status: 'all',
    dateFrom: '',
    dateTo: ''
  });

  // Mock API key
  const apiKey = 'ki_live_1234567890abcdef1234567890abcdef12345678';
  const sandboxKey = 'ki_test_abcdef1234567890abcdef1234567890abcdef12';

  const apiEndpoints = [
    {
      id: 'companies',
      name: 'Entreprises',
      method: 'GET',
      endpoint: '/api/v1/companies',
      description: 'Récupérer la liste des entreprises avec filtres',
      params: ['region', 'activity', 'status', 'limit', 'offset'],
      rateLimit: '1000/hour'
    },
    {
      id: 'company',
      name: 'Entreprise détaillée',
      method: 'GET',
      endpoint: '/api/v1/companies/{id}',
      description: 'Obtenir les détails complets d\'une entreprise',
      params: ['id'],
      rateLimit: '2000/hour'
    },
    {
      id: 'search',
      name: 'Recherche',
      method: 'POST',
      endpoint: '/api/v1/search',
      description: 'Recherche avancée avec critères multiples',
      params: ['query', 'filters', 'sort', 'limit'],
      rateLimit: '500/hour'
    },
    {
      id: 'statistics',
      name: 'Statistiques',
      method: 'GET',
      endpoint: '/api/v1/statistics',
      description: 'Données statistiques agrégées',
      params: ['type', 'period', 'region'],
      rateLimit: '200/hour'
    },
    {
      id: 'export',
      name: 'Export en lot',
      method: 'POST',
      endpoint: '/api/v1/export',
      description: 'Exporter de grandes quantités de données',
      params: ['format', 'filters', 'fields'],
      rateLimit: '10/hour'
    }
  ];

  const usageStats = [
    { label: 'Requêtes ce mois', value: '2,847', limit: '10,000', percentage: 28 },
    { label: 'Exports réalisés', value: '23', limit: '100', percentage: 23 },
    { label: 'Bande passante', value: '1.2 GB', limit: '5 GB', percentage: 24 },
    { label: 'Taux de succès', value: '99.2%', limit: '100%', percentage: 99 }
  ];

  const recentExports = [
    {
      id: '1',
      name: 'Entreprises_Centre_2024.csv',
      format: 'CSV',
      size: '2.4 MB',
      status: 'completed',
      date: '2024-12-15 14:30',
      records: 1250
    },
    {
      id: '2',
      name: 'Commerce_General_Q4.json',
      format: 'JSON',
      size: '1.8 MB',
      status: 'completed',
      date: '2024-12-14 09:15',
      records: 890
    },
    {
      id: '3',
      name: 'Statistiques_Regionales.xml',
      format: 'XML',
      size: '856 KB',
      status: 'processing',
      date: '2024-12-14 16:45',
      records: 340
    },
    {
      id: '4',
      name: 'Export_Complet_2024.csv',
      format: 'CSV',
      size: '12.5 MB',
      status: 'failed',
      date: '2024-12-13 11:20',
      records: 5600
    }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copié dans le presse-papiers !');
  };

  const generateNewKey = () => {
    alert('Nouvelle clé API générée ! (Simulation)');
  };

  const startExport = () => {
    alert(`Export démarré en format ${exportFormat.toUpperCase()} avec les filtres sélectionnés`);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'processing':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            API & Export
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Intégrez KamerInsight dans vos applications et exportez vos données
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <FileText className="w-4 h-4" />
            <span>Documentation</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Code className="w-4 h-4" />
            <span>Exemples de code</span>
          </button>
        </div>
      </div>

      {/* API Keys Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <Key className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Clés API
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Gérez vos clés d'accès à l'API KamerInsight
              </p>
            </div>
          </div>
          
          <button
            onClick={generateNewKey}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Générer nouvelle clé</span>
          </button>
        </div>

        <div className="space-y-4">
          {/* Production Key */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="font-medium text-gray-900 dark:text-white">
                  Clé de production
                </span>
                <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 px-2 py-1 rounded-full">
                  Actif
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => copyToClipboard(apiKey)}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 font-mono text-sm">
              {showApiKey ? apiKey : '••••••••••••••••••••••••••••••••••••••••••••••••'}
            </div>
            
            <div className="flex items-center justify-between mt-3 text-xs text-gray-500 dark:text-gray-400">
              <span>Créée le 15 nov. 2024</span>
              <span>Dernière utilisation: il y a 2 heures</span>
            </div>
          </div>

          {/* Sandbox Key */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="font-medium text-gray-900 dark:text-white">
                  Clé de test (Sandbox)
                </span>
                <span className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 px-2 py-1 rounded-full">
                  Test
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => copyToClipboard(sandboxKey)}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 font-mono text-sm">
              {sandboxKey}
            </div>
            
            <div className="flex items-center justify-between mt-3 text-xs text-gray-500 dark:text-gray-400">
              <span>Données de test uniquement</span>
              <span>Limite: 100 req/heure</span>
            </div>
          </div>
        </div>
      </div>

      {/* Usage Statistics */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
            <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Utilisation de l'API
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Statistiques d'usage pour le mois en cours
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {usageStats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                {stat.label}
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${stat.percentage}%` }}
                />
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Limite: {stat.limit}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* API Endpoints */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
            <Globe className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Points d'accès API
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Endpoints disponibles avec votre abonnement {user.subscription}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {apiEndpoints.map((endpoint, index) => (
            <div
              key={index}
              className={`border rounded-lg p-4 transition-colors cursor-pointer ${
                selectedEndpoint === endpoint.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/10'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
              onClick={() => setSelectedEndpoint(endpoint.id)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <span className={`text-xs font-bold px-2 py-1 rounded ${
                    endpoint.method === 'GET' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                  }`}>
                    {endpoint.method}
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {endpoint.name}
                  </span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {endpoint.rateLimit}
                </span>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded p-2 mb-3">
                <code className="text-sm text-gray-800 dark:text-gray-200">
                  https://api.kamerinsight.com{endpoint.endpoint}
                </code>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {endpoint.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {endpoint.params.map((param, paramIndex) => (
                  <span
                    key={paramIndex}
                    className="text-xs bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded"
                  >
                    {param}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Export Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Export Configuration */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
              <Download className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Nouvel export
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Configurez et lancez un export de données
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Format Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Format d'export
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['json', 'csv', 'xml'] as const).map((format) => (
                  <button
                    key={format}
                    onClick={() => setExportFormat(format)}
                    className={`p-3 text-center rounded-lg border transition-colors ${
                      exportFormat === format
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <div className="font-medium text-sm">
                      {format.toUpperCase()}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Région
                </label>
                <select
                  value={exportFilters.region}
                  onChange={(e) => setExportFilters({...exportFilters, region: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Toutes les régions</option>
                  <option value="Centre">Centre</option>
                  <option value="Littoral">Littoral</option>
                  <option value="Ouest">Ouest</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Activité
                </label>
                <select
                  value={exportFilters.activity}
                  onChange={(e) => setExportFilters({...exportFilters, activity: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Toutes les activités</option>
                  <option value="Commerce général">Commerce général</option>
                  <option value="Restaurant">Restaurant</option>
                  <option value="Transport">Transport</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Date début
                </label>
                <input
                  type="date"
                  value={exportFilters.dateFrom}
                  onChange={(e) => setExportFilters({...exportFilters, dateFrom: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Date fin
                </label>
                <input
                  type="date"
                  value={exportFilters.dateTo}
                  onChange={(e) => setExportFilters({...exportFilters, dateTo: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <button
              onClick={startExport}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Lancer l'export</span>
            </button>
          </div>
        </div>

        {/* Recent Exports */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <Database className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Exports récents
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Historique de vos derniers exports
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {recentExports.map((exportItem) => (
              <div
                key={exportItem.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(exportItem.status)}
                    <span className="font-medium text-gray-900 dark:text-white text-sm">
                      {exportItem.name}
                    </span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(exportItem.status)}`}>
                    {exportItem.status === 'completed' ? 'Terminé' : 
                     exportItem.status === 'processing' ? 'En cours' : 'Échec'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-4">
                    <span>{exportItem.format}</span>
                    <span>{exportItem.size}</span>
                    <span>{exportItem.records.toLocaleString()} enregistrements</span>
                  </div>
                  <span>{exportItem.date}</span>
                </div>
                
                {exportItem.status === 'completed' && (
                  <button className="mt-2 text-xs text-blue-600 dark:text-blue-400 hover:underline">
                    Télécharger
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <Shield className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
          <div>
            <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
              Sécurité et bonnes pratiques
            </h4>
            <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
              <li>• Ne partagez jamais vos clés API en public ou dans votre code source</li>
              <li>• Utilisez des variables d'environnement pour stocker vos clés</li>
              <li>• Régénérez vos clés régulièrement pour maintenir la sécurité</li>
              <li>• Surveillez l'usage de votre API pour détecter toute activité suspecte</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};