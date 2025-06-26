export interface Company {
  id: string;
  name: string;
  niu: string;
  activity: string;
  region: string;
  commune: string;
  quartier: string;
  yearRegistered: number;
  yearEnd?: number;
  status: 'Actif' | 'Inactif' | 'Suspendu';
  activeYears: number[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  subscription: 'Gratuit' | 'Pro' | 'Business';
}

export interface SearchFilters {
  activity?: string;
  region?: string;
  commune?: string;
  quartier?: string;
  yearStart?: number;
  yearEnd?: number;
  searchTerm?: string;
}

export type Language = 'fr' | 'en';
export type Theme = 'light' | 'dark';
export type Page = 'dashboard' | 'search' | 'company' | 'subscription' | 'settings' | 'profile';