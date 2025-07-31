"use client";

import { Edit, Save } from 'lucide-react';
import { LogoBackgroundSetting } from './LogoBackgroundSetting';

interface LogoSettingProps {
  logo: any;
  handleSettingChange: (key: string, value: any) => void;
  handleLogoImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  editMode: boolean;
  setEditMode: (value: boolean) => void;
}

export const LogoSetting = ({
  logo,
  handleSettingChange,
  handleLogoImageUpload,
  editMode,
  setEditMode,
}: LogoSettingProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Logo</label>
      <div className="mt-2 space-y-4">
        <div className="flex items-center">
          <input
            id="logo-type-text"
            name="logo-type"
            type="radio"
            checked={logo?.type === 'text'}
            onChange={() => handleSettingChange('logo', { ...logo, type: 'text' })}
            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
            disabled={!editMode}
          />
          <label htmlFor="logo-type-text" className="ml-3 block text-sm font-medium text-gray-700">
            Text
          </label>
        </div>
        {logo?.type === 'text' && (
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
                value={logo?.text || ''}
                onChange={(e) => handleSettingChange('logo', { ...logo, text: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                disabled={!editMode}
              />
            </div>
          </div>
        )}
        <div className="flex items-center">
          <input
            id="logo-type-image"
            name="logo-type"
            type="radio"
            checked={logo?.type === 'image'}
            onChange={() => handleSettingChange('logo', { ...logo, type: 'image' })}
            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
            disabled={!editMode}
          />
          <label htmlFor="logo-type-image" className="ml-3 block text-sm font-medium text-gray-700">
            Image
          </label>
        </div>
        {logo?.type === 'image' && (
          <div className="ml-7 space-y-2">
            <div>
              <label className="text-sm font-medium text-gray-700">Logo Image</label>
              <div className="mt-1 flex items-center">
                {logo?.src && (
                  <img src={logo.src} alt="Logo preview" className="h-12 w-12 object-contain mr-4" />
                )}
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={handleLogoImageUpload}
                  className="text-sm"
                  disabled={!editMode}
                />
              </div>
            </div>
          </div>
        )}
        <button
          onClick={() => setEditMode(!editMode)}
          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          {editMode ? <Save className="w-5 h-5 mr-2" /> : <Edit className="w-5 h-5 mr-2" />}
          {editMode ? 'Save Logo Settings' : 'Edit Logo Settings'}
        </button>
      </div>
      {logo?.type === 'text' && (
        <LogoBackgroundSetting
          logo={logo}
          handleSettingChange={handleSettingChange}
          editMode={editMode}
          setEditMode={setEditMode}
        />
      )}
    </div>
  );
};
