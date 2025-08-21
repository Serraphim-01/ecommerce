'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Edit, Save } from 'lucide-react';
import Link from 'next/link';
import { getSettings, updateSetting, uploadLogo, uploadFavicon } from '@/lib/supabase';

const SettingsPage = () => {
  const [settings, setSettings] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<any>({});

  useEffect(() => {
    const loadSettings = async () => {
      try {
        setLoading(true);
        setError(null);
        const settingsData = await getSettings();
        setSettings(settingsData);
      } catch (err) {
        console.error('Error loading settings:', err);
        setError('Failed to load settings');
      } finally {
        setLoading(false);
      }
    };
    loadSettings();
  }, []);

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleSave = async (key: string) => {
    try {
      await updateSetting(key, settings[key]);
      alert('Setting saved successfully!');
    } catch (error) {
      console.error('Error saving setting:', error);
      alert('Failed to save setting');
    }
  };

  const handleGeneralSave = async () => {
    try {
      await Promise.all(
        Object.keys(settings).map((key) => updateSetting(key, settings[key]))
      );
      alert('All settings saved successfully!');
      setEditMode({});
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings');
    }
  };

  const handleLogoImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const logoUrl = await uploadLogo(file);
      handleSettingChange("logo", { ...settings.logo, src: logoUrl });
      await handleSave("logo"); // 👈 optionally save immediately
    } catch (error) {
      console.error("Error uploading logo:", error);
      alert("Failed to upload logo");
    }
  };

  const handleFaviconUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const faviconUrl = await uploadFavicon(file);
      handleSettingChange("faviconUrl", faviconUrl);
      await handleSave("faviconUrl");
    } catch (error) {
      console.error("Error uploading favicon:", error);
      alert("Failed to upload favicon");
    }
  };

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
            <div>
              <label htmlFor="siteName" className="block text-sm font-medium text-gray-700">
                Site Name
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  name="siteName"
                  id="siteName"
                  value={settings.siteName || ''}
                  onChange={(e) => handleSettingChange('siteName', e.target.value)}
                  className="flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
                  disabled={!editMode.siteName}
                />
                <button
                  onClick={() => setEditMode({ ...editMode, siteName: !editMode.siteName })}
                  className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"
                >
                  {editMode.siteName ? <Save className="w-5 h-5" /> : <Edit className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="whatsappNumber" className="block text-sm font-medium text-gray-700">
                WhatsApp Number
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  name="whatsappNumber"
                  id="whatsappNumber"
                  value={settings.whatsappNumber || ''}
                  onChange={(e) => handleSettingChange('whatsappNumber', e.target.value)}
                  className="flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
                  disabled={!editMode.whatsappNumber}
                />
                <button
                  onClick={() => setEditMode({ ...editMode, whatsappNumber: !editMode.whatsappNumber })}
                  className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"
                >
                  {editMode.whatsappNumber ? <Save className="w-5 h-5" /> : <Edit className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Logo</label>
              <div className="mt-2 space-y-4">
                <div className="flex items-center">
                  <input
                    id="logo-type-text"
                    name="logo-type"
                    type="radio"
                    checked={settings.logo?.type === 'text'}
                    onChange={() => handleSettingChange('logo', { ...settings.logo, type: 'text' })}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    disabled={!editMode.logo}
                  />
                  <label htmlFor="logo-type-text" className="ml-3 block text-sm font-medium text-gray-700">
                    Text
                  </label>
                </div>
                {settings.logo?.type === 'text' && (
                  <div className="ml-7 space-y-2">
                    <div>
                      <label htmlFor="logoText" className="text-sm font-medium text-gray-700">
                        Logo Text (max 4 letters)
                      </label>
                      <input
                        type="text"
                        name="logoText"
                        id="logoText"
                        maxLength={4}
                        value={settings.logo?.text || ''}
                        onChange={(e) => handleSettingChange('logo', { ...settings.logo, text: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                        disabled={!editMode.logo}
                      />
                    </div>
                  </div>
                )}
                <div className="flex items-center">
                  <input
                    id="logo-type-image"
                    name="logo-type"
                    type="radio"
                    checked={settings.logo?.type === 'image'}
                    onChange={() => handleSettingChange('logo', { ...settings.logo, type: 'image' })}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    disabled={!editMode.logo}
                  />
                  <label htmlFor="logo-type-image" className="ml-3 block text-sm font-medium text-gray-700">
                    Image
                  </label>
                </div>
                {settings.logo?.type === 'image' && (
                  <div className="ml-7 space-y-2">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Logo Image</label>
                      <div className="mt-1 flex items-center">
                        {settings.logo?.src && (
                          <img src={settings.logo.src} alt="Logo preview" className="h-12 w-12 object-contain mr-4" />
                        )}
                        <input
                          type="file"
                          accept="image/png, image/jpeg"
                          onChange={handleLogoImageUpload}
                          className="text-sm"
                          disabled={!editMode.logo}
                        />
                      </div>
                    </div>
                  </div>
                )}
                <button
                  onClick={() => setEditMode({ ...editMode, logo: !editMode.logo })}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  {editMode.logo ? <Save className="w-5 h-5 mr-2" /> : <Edit className="w-5 h-5 mr-2" />}
                  {editMode.logo ? 'Save Logo Settings' : 'Edit Logo Settings'}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Favicon</label>
              <div className="mt-2 space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Favicon Image</label>
                  <div className="mt-1 flex items-center">
                    {settings.faviconUrl && (
                      <img src={settings.faviconUrl} alt="Favicon preview" className="h-12 w-12 object-contain mr-4" />
                    )}
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/x-icon"
                      onChange={handleFaviconUpload}
                      className="text-sm"
                      disabled={!editMode.favicon}
                    />
                  </div>
                </div>
                <button
                  onClick={() => setEditMode({ ...editMode, favicon: !editMode.favicon })}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  {editMode.favicon ? <Save className="w-5 h-5 mr-2" /> : <Edit className="w-5 h-5 mr-2" />}
                  {editMode.favicon ? 'Save Favicon' : 'Edit Favicon'}
                </button>
              </div>
            </div>

            {settings.logo?.type === 'text' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Logo Background</label>
                <div className="mt-2 space-y-4">
                  <div className="flex items-center">
                    <input
                      id="bg-type-plain"
                      name="bg-type"
                      type="radio"
                      checked={settings.logo?.background?.type === 'plain'}
                      onChange={() => handleSettingChange('logo', { ...settings.logo, background: { ...settings.logo.background, type: 'plain' } })}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      disabled={!editMode.logo}
                    />
                    <label htmlFor="bg-type-plain" className="ml-3 block text-sm font-medium text-gray-700">
                      Plain Color
                    </label>
                  </div>
                  {settings.logo?.background?.type === 'plain' && (
                    <div className="ml-7">
                      <input
                        type="color"
                        value={settings.logo?.background?.color || '#ffffff'}
                        onChange={(e) => handleSettingChange('logo', { ...settings.logo, background: { ...settings.logo.background, color: e.target.value } })}
                        className="w-16 h-8 border-gray-300 rounded-md"
                        disabled={!editMode.logo}
                      />
                    </div>
                  )}

                  <div className="flex items-center">
                    <input
                      id="bg-type-gradient"
                      name="bg-type"
                      type="radio"
                      checked={settings.logo?.background?.type === 'gradient'}
                      onChange={() => handleSettingChange('logo', { ...settings.logo, background: { ...settings.logo.background, type: 'gradient' } })}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      disabled={!editMode.logo}
                    />
                    <label htmlFor="bg-type-gradient" className="ml-3 block text-sm font-medium text-gray-700">
                      Gradient
                    </label>
                  </div>
                  {settings.logo?.background?.type === 'gradient' && (
                    <div className="ml-7 space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Direction</label>
                        <select
                          value={settings.logo?.background?.direction || 'br'}
                          onChange={(e) => handleSettingChange('logo', { ...settings.logo, background: { ...settings.logo.background, direction: e.target.value } })}
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                          disabled={!editMode.logo}
                        >
                          <option value="t">Top</option>
                          <option value="tr">Top Right</option>
                          <option value="r">Right</option>
                          <option value="br">Bottom Right</option>
                          <option value="b">Bottom</option>
                          <option value="bl">Bottom Left</option>
                          <option value="l">Left</option>
                          <option value="tl">Top Left</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Colors</label>
                        {settings.logo?.background?.colors?.map((color: string, index: number) => (
                          <div key={index} className="flex items-center mt-2">
                            <input
                              type="color"
                              value={color}
                              onChange={(e) => {
                                const newColors = [...(settings.logo.background.colors || [])];
                                newColors[index] = e.target.value;
                                handleSettingChange('logo', { ...settings.logo, background: { ...settings.logo.background, colors: newColors } });
                              }}
                              className="w-16 h-8 border-gray-300 rounded-md"
                              disabled={!editMode.logo}
                            />
                            {index > 1 && (
                              <button
                                onClick={() => {
                                  const newColors = [...(settings.logo.background.colors || [])];
                                  newColors.splice(index, 1);
                                  handleSettingChange('logo', { ...settings.logo, background: { ...settings.logo.background, colors: newColors } });
                                }}
                                className="ml-2 text-red-500"
                                  disabled={!editMode.logo}
                              >
                                Remove
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          onClick={() => {
                            const newColors = [...(settings.logo.background.colors || []), '#ffffff'];
                            handleSettingChange('logo', { ...settings.logo, background: { ...settings.logo.background, colors: newColors } });
                          }}
                          className="mt-2 text-sm text-blue-600"
                          disabled={!editMode.logo}
                        >
                          + Add Color
                        </button>
                      </div>
                    </div>
                  )}
                  <button
                    onClick={() => setEditMode({ ...editMode, logo: !editMode.logo })}
                    className="mt-4 inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    {editMode.logo ? <Save className="w-5 h-5 mr-2" /> : <Edit className="w-5 h-5 mr-2" />}
                    {editMode.logo ? 'Save Background Settings' : 'Edit Background Settings'}
                  </button>
                </div>
              </div>
            )}
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
