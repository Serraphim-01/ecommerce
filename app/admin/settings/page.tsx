'use client';

import Link from 'next/link';
import { useSettingsPage } from './hooks/useSettingsPage';
import { SiteNameSetting } from './components/SiteNameSetting';
import { LogoSetting } from './components/LogoSetting';

const SettingsPage = () => {
  const {
    settings,
    loading,
    error,
    editMode,
    setEditMode,
    handleSettingChange,
    handleGeneralSave,
    handleLogoImageUpload,
  } = useSettingsPage();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link href="/admin" className="text-blue-600 hover:underline mb-4 inline-block">
            &larr; Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Admin Settings</h1>
          <p className="text-gray-600 mt-2">Manage your site settings</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Site Settings</h2>
          <div className="space-y-6">
            <SiteNameSetting
              siteName={settings.siteName}
              handleSettingChange={handleSettingChange}
              editMode={editMode.siteName}
              setEditMode={(value) => setEditMode({ ...editMode, siteName: value })}
            />
            <LogoSetting
              logo={settings.logo}
              handleSettingChange={handleSettingChange}
              handleLogoImageUpload={handleLogoImageUpload}
              editMode={editMode.logo}
              setEditMode={(value) => setEditMode({ ...editMode, logo: value })}
            />
          </div>
          <div className="pt-5">
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleGeneralSave}
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save All Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
