import React from 'react';
import { Check, Star, Zap, Crown } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export const SubscriptionPage: React.FC = () => {
  const { t, user } = useApp();

  const plans = [
    {
      name: t('subscription.free'),
      price: '0',
      currency: 'FCFA',
      period: '/mois',
      description: t('subscription.freeDesc'),
      icon: Star,
      color: 'text-gray-500',
      bgColor: 'bg-gray-100 dark:bg-gray-700',
      features: [
        '5 recherches par mois',
        'Accès aux données de base',
        'Support communautaire',
        'Historique limité (1 an)'
      ],
      buttonText: user.subscription === 'Gratuit' ? t('subscription.current') : t('subscription.subscribe'),
      buttonStyle: 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700',
      isCurrent: user.subscription === 'Gratuit'
    },
    {
      name: t('subscription.pro'),
      price: '15 000',
      currency: 'FCFA',
      period: '/mois',
      description: t('subscription.proDesc'),
      icon: Zap,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
      features: [
        'Recherches illimitées',
        'Export CSV et Excel',
        'Données complètes',
        'Historique complet (2001-2024)',
        'Support prioritaire',
        'Rapports personnalisés'
      ],
      buttonText: user.subscription === 'Pro' ? t('subscription.current') : t('subscription.subscribe'),
      buttonStyle: 'bg-blue-600 text-white hover:bg-blue-700',
      isCurrent: user.subscription === 'Pro',
      popular: true
    },
    {
      name: t('subscription.business'),
      price: '50 000',
      currency: 'FCFA',
      period: '/mois',
      description: t('subscription.businessDesc'),
      icon: Crown,
      color: 'text-purple-500',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
      features: [
        'Tout du plan Pro',
        'Accès API complet',
        'Rapports avancés',
        'Support prioritaire 24/7',
        'Intégration personnalisée',
        'Données en temps réel',
        'Formation dédiée',
        'Manager de compte'
      ],
      buttonText: user.subscription === 'Business' ? t('subscription.current') : t('subscription.subscribe'),
      buttonStyle: 'bg-purple-600 text-white hover:bg-purple-700',
      isCurrent: user.subscription === 'Business'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {t('subscription.title')}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Choisissez le plan qui correspond le mieux à vos besoins d'analyse du tissu entrepreneurial camerounais.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => {
          const Icon = plan.icon;
          return (
            <div
              key={index}
              className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-sm border-2 transition-all duration-300 hover:shadow-lg ${
                plan.popular
                  ? 'border-blue-500 scale-105'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white text-sm font-medium px-3 py-1 rounded-full">
                    Plus populaire
                  </span>
                </div>
              )}

              <div className="p-8">
                <div className="text-center mb-6">
                  <div className={`w-16 h-16 ${plan.bgColor} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                    <Icon className={`w-8 h-8 ${plan.color}`} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      {plan.price}
                    </span>
                    <span className="text-lg text-gray-500 dark:text-gray-400 ml-1">
                      {plan.currency}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                      {plan.period}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-400 text-sm">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${plan.buttonStyle} ${
                    plan.isCurrent ? 'cursor-default' : 'cursor-pointer'
                  }`}
                  disabled={plan.isCurrent}
                >
                  {plan.buttonText}
                </button>

                {plan.isCurrent && (
                  <div className="mt-3 text-center">
                    <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                      ✓ Plan actuel
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto mt-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
          Questions fréquentes
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Puis-je changer de plan à tout moment ?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Oui, vous pouvez upgrader ou downgrader votre plan à tout moment. Les changements prennent effet immédiatement.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Y a-t-il des frais cachés ?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Non, tous nos prix sont transparents. Aucun frais de setup ou frais cachés.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Puis-je annuler mon abonnement ?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Oui, vous pouvez annuler votre abonnement à tout moment. Votre accès reste actif jusqu'à la fin de la période payée.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Comment accéder à l'API ?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              L'accès API est disponible avec le plan Business. Vous recevrez vos clés d'API et la documentation complète.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};