import React, { useState } from 'react';
import { Save, Trash2, Globe, Palette, Bell, Shield } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export const SettingsPage: React.FC = () => {
  const { language, setLanguage, theme, setTheme, t } = useApp();
  const [notifications, setNotifications] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSave = () => {
    // Mock save functionality
    alert('Paramètres sauvegardés avec succès !');
  };

  const handleDeleteAccount = () => {
    if (showDeleteConfirm) {
      alert('Compte supprimé (simulation)');
      setShowDeleteConfirm(false);
    } else {
      setShowDeleteConfirm(true);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        {t('settings.title')}
      </h1>

      {/* Language Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
            <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t('settings.defaultLanguage')}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Choisissez votre langue préférée pour l'interface
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => setLanguage('fr')}
            className={`p-4 rounded-lg border-2 transition-colors ${
              language === 'fr'
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🇫🇷</span>
              <div className="text-left">
                <p className="font-medium text-gray-900 dark:text-white">Français</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Langue par défaut</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setLanguage('en')}
            className={`p-4 rounded-lg border-2 transition-colors ${
              language === 'en'
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🇬🇧</span>
              <div className="text-left">
                <p className="font-medium text-gray-900 dark:text-white">English</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Default language</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Theme Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
            <Palette className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t('settings.theme')}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Personnalisez l'apparence de l'application
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => setTheme('light')}
            className={`p-4 rounded-lg border-2 transition-colors ${
              theme === 'light'
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full" />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900 dark:text-white">{t('settings.light')}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Thème lumineux</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setTheme('dark')}
            className={`p-4 rounded-lg border-2 transition-colors ${
              theme === 'dark'
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-gray-300 rounded-full" />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900 dark:text-white">{t('settings.dark')}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Thème sombre</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <Bell className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t('settings.notifications')}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Recevoir des notifications par email
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setNotifications(!notifications)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              notifications ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                notifications ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>{t('common.save')}</span>
        </button>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50 dark:bg-red-900/10 rounded-xl border-2 border-red-200 dark:border-red-800 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
            <Shield className="w-5 h-5 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-red-900 dark:text-red-100">
              Zone de danger
            </h2>
            <p className="text-sm text-red-700 dark:text-red-300">
              Actions irréversibles pour votre compte
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-red-200 dark:border-red-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                {t('settings.deleteAccount')}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Supprimer définitivement votre compte et toutes vos données
              </p>
            </div>
            
            <button
              onClick={handleDeleteAccount}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                showDeleteConfirm
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'border border-red-300 dark:border-red-600 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20'
              }`}
            >
              <Trash2 className="w-4 h-4" />
              <span>
                {showDeleteConfirm ? 'Confirmer la suppression' : 'Supprimer le compte'}
              </span>
            </button>
          </div>
          
          {showDeleteConfirm && (
            <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/20 rounded-lg">
              <p className="text-sm text-red-800 dark:text-red-300">
                ⚠️ Cette action est irréversible. Toutes vos données seront définitivement supprimées.
              </p>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="mt-2 text-sm text-red-600 dark:text-red-400 hover:underline"
              >
                Annuler
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};