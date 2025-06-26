import React from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { SearchPage } from './components/SearchPage';
import { CompanyProfile } from './components/CompanyProfile';
import { SubscriptionPage } from './components/SubscriptionPage';
import { SettingsPage } from './components/SettingsPage';
import { StatisticsPage } from './components/StatisticsPage';
import { ApiExportPage } from './components/ApiExportPage';

const MainContent: React.FC = () => {
  const { currentPage } = useApp();

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'search':
        return <SearchPage />;
      case 'company':
        return <CompanyProfile />;
      case 'subscription':
        return <SubscriptionPage />;
      case 'settings':
        return <SettingsPage />;
      case 'profile':
        return <SettingsPage />;
      case 'statistics':
        return <StatisticsPage />;
      case 'api':
        return <ApiExportPage />;
      case 'help':
        return <div className="p-6"><h1 className="text-2xl font-bold">Aide & FAQ</h1><p className="text-gray-600 mt-4">Page en construction...</p></div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;