import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, Theme, Page, User } from '../types';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  selectedCompanyId: string | null;
  setSelectedCompanyId: (id: string | null) => void;
  user: User;
  setUser: (user: User) => void;
  t: (key: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const translations = {
  fr: {
    // Header
    'header.profile': 'Mon profil',
    'header.subscription': 'Mon abonnement',
    'header.logout': 'Se déconnecter',
    
    // Sidebar
    'sidebar.dashboard': 'Tableau de bord',
    'sidebar.search': 'Rechercher une entreprise',
    'sidebar.statistics': 'Statistiques & Rapports',
    'sidebar.api': 'API & Export',
    'sidebar.account': 'Mon compte',
    'sidebar.help': 'Aide & FAQ',
    'sidebar.logout': 'Déconnecter',
    
    // Dashboard
    'dashboard.title': 'Tableau de bord',
    'dashboard.totalCompanies': 'Total entreprises',
    'dashboard.dominantActivity': 'Activité dominante',
    'dashboard.activeThisMonth': 'Entreprises actives ce mois',
    'dashboard.commerceGeneral': 'Commerce général',
    'dashboard.monthlyCreations': 'Créations mensuelles',
    'dashboard.regionalGrowth': 'Croissance par région',
    'dashboard.lastUpdate': 'Dernière mise à jour des données : Mai 2025',
    
    // Search
    'search.title': 'Rechercher une entreprise',
    'search.activity': 'Activité principale',
    'search.region': 'Région',
    'search.commune': 'Commune',
    'search.quartier': 'Quartier',
    'search.year': 'Année d\'enregistrement',
    'search.searchTerm': 'NIU ou Raison sociale',
    'search.results': 'Résultats de recherche',
    'search.companyName': 'Raison sociale',
    'search.niu': 'NIU',
    'search.activity': 'Activité',
    'search.commune': 'Commune',
    'search.status': 'Statut',
    'search.exportCsv': 'Exporter CSV',
    'search.noResults': 'Aucun résultat trouvé',
    
    // Company
    'company.title': 'Fiche Entreprise',
    'company.name': 'Nom',
    'company.niu': 'NIU',
    'company.activity': 'Activité',
    'company.location': 'Localisation',
    'company.presence': 'Présence historique',
    'company.status': 'Statut',
    'company.activeYears': 'Années d\'activité',
    'company.exportPdf': 'Exporter en PDF',
    'company.addToFavorites': 'Ajouter aux favoris',
    
    // Subscription
    'subscription.title': 'Plans d\'abonnement',
    'subscription.free': 'Gratuit',
    'subscription.pro': 'Pro',
    'subscription.business': 'Business',
    'subscription.freeDesc': '5 recherches/mois',
    'subscription.proDesc': 'Recherches illimitées, export CSV',
    'subscription.businessDesc': 'API + rapport avancé + support prioritaire',
    'subscription.subscribe': 'S\'abonner maintenant',
    'subscription.current': 'Plan actuel',
    
    // Settings
    'settings.title': 'Paramètres',
    'settings.defaultLanguage': 'Langue par défaut',
    'settings.theme': 'Thème',
    'settings.notifications': 'Notifications',
    'settings.deleteAccount': 'Supprimer mon compte',
    'settings.light': 'Clair',
    'settings.dark': 'Sombre',
    
    // Common
    'common.active': 'Actif',
    'common.inactive': 'Inactif',
    'common.suspended': 'Suspendu',
    'common.save': 'Enregistrer',
    'common.cancel': 'Annuler',
    'common.back': 'Retour',
  },
  en: {
    // Header
    'header.profile': 'My Profile',
    'header.subscription': 'My Subscription',
    'header.logout': 'Logout',
    
    // Sidebar
    'sidebar.dashboard': 'Dashboard',
    'sidebar.search': 'Search Company',
    'sidebar.statistics': 'Statistics & Reports',
    'sidebar.api': 'API & Export',
    'sidebar.account': 'My Account',
    'sidebar.help': 'Help & FAQ',
    'sidebar.logout': 'Logout',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.totalCompanies': 'Total Companies',
    'dashboard.dominantActivity': 'Dominant Activity',
    'dashboard.activeThisMonth': 'Active Companies This Month',
    'dashboard.commerceGeneral': 'General Commerce',
    'dashboard.monthlyCreations': 'Monthly Creations',
    'dashboard.regionalGrowth': 'Regional Growth',
    'dashboard.lastUpdate': 'Last Data Update: May 2025',
    
    // Search
    'search.title': 'Search Company',
    'search.activity': 'Main Activity',
    'search.region': 'Region',
    'search.commune': 'Commune',
    'search.quartier': 'District',
    'search.year': 'Registration Year',
    'search.searchTerm': 'NIU or Company Name',
    'search.results': 'Search Results',
    'search.companyName': 'Company Name',
    'search.niu': 'NIU',
    'search.activity': 'Activity',
    'search.commune': 'Commune',
    'search.status': 'Status',
    'search.exportCsv': 'Export CSV',
    'search.noResults': 'No results found',
    
    // Company
    'company.title': 'Company Profile',
    'company.name': 'Name',
    'company.niu': 'NIU',
    'company.activity': 'Activity',
    'company.location': 'Location',
    'company.presence': 'Historical Presence',
    'company.status': 'Status',
    'company.activeYears': 'Active Years',
    'company.exportPdf': 'Export PDF',
    'company.addToFavorites': 'Add to Favorites',
    
    // Subscription
    'subscription.title': 'Subscription Plans',
    'subscription.free': 'Free',
    'subscription.pro': 'Pro',
    'subscription.business': 'Business',
    'subscription.freeDesc': '5 searches/month',
    'subscription.proDesc': 'Unlimited searches, CSV export',
    'subscription.businessDesc': 'API + advanced reports + priority support',
    'subscription.subscribe': 'Subscribe Now',
    'subscription.current': 'Current Plan',
    
    // Settings
    'settings.title': 'Settings',
    'settings.defaultLanguage': 'Default Language',
    'settings.theme': 'Theme',
    'settings.notifications': 'Notifications',
    'settings.deleteAccount': 'Delete My Account',
    'settings.light': 'Light',
    'settings.dark': 'Dark',
    
    // Common
    'common.active': 'Active',
    'common.inactive': 'Inactive',
    'common.suspended': 'Suspended',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.back': 'Back',
  }
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');
  const [theme, setTheme] = useState<Theme>('light');
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [user, setUser] = useState<User>({
    id: '1',
    name: 'Jean Dupont',
    email: 'jean.dupont@example.com',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1',
    subscription: 'Pro'
  });

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <AppContext.Provider value={{
      language,
      setLanguage,
      theme,
      setTheme,
      currentPage,
      setCurrentPage,
      selectedCompanyId,
      setSelectedCompanyId,
      user,
      setUser,
      t
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};