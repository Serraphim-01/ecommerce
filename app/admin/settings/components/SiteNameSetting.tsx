"use client";

import { Edit, Save } from 'lucide-react';

interface SiteNameSettingProps {
  siteName: string;
  handleSettingChange: (key: string, value: any) => void;
  editMode: boolean;
  setEditMode: (value: boolean) => void;
}

export const SiteNameSetting = ({
  siteName,
  handleSettingChange,
  editMode,
  setEditMode,
}: SiteNameSettingProps) => {
  return (
    <div>
      <label htmlFor="siteName" className="block text-sm font-medium text-gray-700">
        Site Name
      </label>
      <div className="mt-1 flex rounded-md shadow-sm">
        <input
          type="text"
          name="siteName"
          id="siteName"
          value={siteName || ''}
          onChange={(e) => handleSettingChange('siteName', e.target.value)}
          className="flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
          disabled={!editMode}
        />
        <button
          onClick={() => setEditMode(!editMode)}
          className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"
        >
          {editMode ? <Save className="w-5 h-5" /> : <Edit className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
};
