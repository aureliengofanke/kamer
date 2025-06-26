import { Company } from '../types';

export const regions = [
  'Adamaoua', 'Centre', 'Est', 'Extrême-Nord', 'Littoral', 
  'Nord', 'Nord-Ouest', 'Ouest', 'Sud', 'Sud-Ouest'
];

export const communes = {
  'Centre': ['Yaoundé 1', 'Yaoundé 2', 'Yaoundé 3', 'Yaoundé 4', 'Yaoundé 5', 'Yaoundé 6', 'Yaoundé 7', 'Mbalmayo', 'Obala'],
  'Littoral': ['Douala 1', 'Douala 2', 'Douala 3', 'Douala 4', 'Douala 5', 'Edéa', 'Nkongsamba'],
  'Ouest': ['Bafoussam 1', 'Bafoussam 2', 'Bafoussam 3', 'Dschang', 'Mbouda', 'Bandjoun'],
  'Nord-Ouest': ['Bamenda 1', 'Bamenda 2', 'Bamenda 3', 'Kumbo', 'Ndop', 'Wum'],
  'Sud-Ouest': ['Buea', 'Limbe', 'Tiko', 'Kumba', 'Mamfe'],
  'Adamaoua': ['Ngaoundéré', 'Tibati', 'Banyo', 'Tignère'],
  'Est': ['Bertoua', 'Batouri', 'Yokadouma', 'Abong-Mbang'],
  'Extrême-Nord': ['Maroua', 'Kousseri', 'Mokolo', 'Mora'],
  'Nord': ['Garoua', 'Guider', 'Figuil', 'Tcholliré'],
  'Sud': ['Ebolowa', 'Kribi', 'Sangmélima', 'Ambam']
};

export const quartiers = {
  'Yaoundé 2': ['Biyem-Assi', 'Tsinga', 'Mendong', 'Mvan', 'Damas'],
  'Yaoundé 3': ['Efoulan', 'Mfandena', 'Nkomo', 'Mvog-Mbi'],
  'Douala 1': ['Akwa', 'Bonanjo', 'Bonapriso', 'Deido'],
  'Douala 3': ['Bépanda', 'Logbaba', 'New-Bell', 'Ndokotti'],
  'Bafoussam 1': ['Tamdja', 'Famla', 'Ndamvout', 'Djeleng'],
  'Bamenda 1': ['Commercial Avenue', 'Up Station', 'Cow Street', 'Foncha Street']
};

export const activities = [
  'Commerce général', 'Vente de pièces auto', 'Restaurant', 'Salon de coiffure',
  'Pharmacie', 'Boulangerie', 'Couture', 'Menuiserie', 'Électronique',
  'Transport', 'Agriculture', 'Élevage', 'Pêche', 'Construction',
  'Immobilier', 'Informatique', 'Télécommunications', 'Banque',
  'Assurance', 'Éducation', 'Santé', 'Tourisme', 'Hôtellerie'
];

export const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'ETS AKONO & FILS',
    niu: 'P0123456789A',
    activity: 'Vente de pièces auto',
    region: 'Centre',
    commune: 'Yaoundé 2',
    quartier: 'Biyem-Assi',
    yearRegistered: 2015,
    status: 'Actif',
    activeYears: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024]
  },
  {
    id: '2',
    name: 'SARL DOUALA TRADING',
    niu: 'P0987654321B',
    activity: 'Commerce général',
    region: 'Littoral',
    commune: 'Douala 1',
    quartier: 'Akwa',
    yearRegistered: 2008,
    status: 'Actif',
    activeYears: [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024]
  },
  {
    id: '3',
    name: 'RESTAURANT LA PAIX',
    niu: 'P0555666777C',
    activity: 'Restaurant',
    region: 'Ouest',
    commune: 'Bafoussam 1',
    quartier: 'Tamdja',
    yearRegistered: 2012,
    yearEnd: 2020,
    status: 'Inactif',
    activeYears: [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020]
  },
  {
    id: '4',
    name: 'SALON BEAUTÉ DIVINE',
    niu: 'P0111222333D',
    activity: 'Salon de coiffure',
    region: 'Centre',
    commune: 'Yaoundé 3',
    quartier: 'Efoulan',
    yearRegistered: 2018,
    status: 'Actif',
    activeYears: [2018, 2019, 2020, 2021, 2022, 2023, 2024]
  },
  {
    id: '5',
    name: 'PHARMACIE MODERNE',
    niu: 'P0444555666E',
    activity: 'Pharmacie',
    region: 'Nord-Ouest',
    commune: 'Bamenda 1',
    quartier: 'Commercial Avenue',
    yearRegistered: 2010,
    status: 'Actif',
    activeYears: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024]
  }
];

export const generateRandomCompanies = (count: number): Company[] => {
  const companies: Company[] = [];
  
  for (let i = 0; i < count; i++) {
    const region = regions[Math.floor(Math.random() * regions.length)];
    const communeList = communes[region] || [];
    const commune = communeList[Math.floor(Math.random() * communeList.length)] || 'Commune Inconnue';
    const quartierList = quartiers[commune] || ['Quartier Centre'];
    const quartier = quartierList[Math.floor(Math.random() * quartierList.length)];
    const activity = activities[Math.floor(Math.random() * activities.length)];
    const yearRegistered = 2001 + Math.floor(Math.random() * 24);
    const isActive = Math.random() > 0.2;
    const yearEnd = isActive ? undefined : yearRegistered + Math.floor(Math.random() * (2024 - yearRegistered));
    
    const activeYears: number[] = [];
    for (let year = yearRegistered; year <= (yearEnd || 2024); year++) {
      if (Math.random() > 0.1) { // 90% chance d'être actif chaque année
        activeYears.push(year);
      }
    }
    
    companies.push({
      id: `mock-${i}`,
      name: `ENTREPRISE ${i + 1}`,
      niu: `P${String(Math.floor(Math.random() * 10000000000)).padStart(10, '0')}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
      activity,
      region,
      commune,
      quartier,
      yearRegistered,
      yearEnd,
      status: isActive ? 'Actif' : 'Inactif',
      activeYears
    });
  }
  
  return companies;
};

export const allCompanies = [...mockCompanies, ...generateRandomCompanies(195)];

export const dashboardStats = {
  totalCompanies: 238000,
  dominantActivity: 'Commerce général',
  activeThisMonth: 14500
};

export const monthlyCreationsData = [
  { month: 'Jan 2024', count: 1200 },
  { month: 'Fév 2024', count: 1350 },
  { month: 'Mar 2024', count: 1100 },
  { month: 'Avr 2024', count: 1450 },
  { month: 'Mai 2024', count: 1300 },
  { month: 'Jun 2024', count: 1600 },
  { month: 'Jul 2024', count: 1400 },
  { month: 'Aoû 2024', count: 1250 },
  { month: 'Sep 2024', count: 1500 },
  { month: 'Oct 2024', count: 1350 },
  { month: 'Nov 2024', count: 1400 },
  { month: 'Déc 2024', count: 1550 }
];

export const regionalGrowthData = [
  { region: 'Centre', companies: 45000 },
  { region: 'Littoral', companies: 38000 },
  { region: 'Ouest', companies: 28000 },
  { region: 'Nord-Ouest', companies: 22000 },
  { region: 'Sud-Ouest', companies: 18000 },
  { region: 'Adamaoua', companies: 15000 },
  { region: 'Est', companies: 12000 },
  { region: 'Extrême-Nord', companies: 25000 },
  { region: 'Nord', companies: 20000 },
  { region: 'Sud', companies: 15000 }
];