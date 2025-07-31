"use client";

import { Edit, Save } from 'lucide-react';

interface LogoBackgroundSettingProps {
  logo: any;
  handleSettingChange: (key: string, value: any) => void;
  editMode: boolean;
  setEditMode: (value: boolean) => void;
}

export const LogoBackgroundSetting = ({
  logo,
  handleSettingChange,
  editMode,
  setEditMode,
}: LogoBackgroundSettingProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Logo Background</label>
      <div className="mt-2 space-y-4">
        <div className="flex items-center">
          <input
            id="bg-type-plain"
            name="bg-type"
            type="radio"
            checked={logo?.background?.type === 'plain'}
            onChange={() => handleSettingChange('logo', { ...logo, background: { ...logo.background, type: 'plain' } })}
            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
            disabled={!editMode}
          />
          <label htmlFor="bg-type-plain" className="ml-3 block text-sm font-medium text-gray-700">
            Plain Color
          </label>
        </div>
        {logo?.background?.type === 'plain' && (
          <div className="ml-7">
            <input
              type="color"
              value={logo?.background?.color || '#ffffff'}
              onChange={(e) => handleSettingChange('logo', { ...logo, background: { ...logo.background, color: e.target.value } })}
              className="w-16 h-8 border-gray-300 rounded-md"
              disabled={!editMode}
            />
          </div>
        )}

        <div className="flex items-center">
          <input
            id="bg-type-gradient"
            name="bg-type"
            type="radio"
            checked={logo?.background?.type === 'gradient'}
            onChange={() => handleSettingChange('logo', { ...logo, background: { ...logo.background, type: 'gradient' } })}
            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
            disabled={!editMode}
          />
          <label htmlFor="bg-type-gradient" className="ml-3 block text-sm font-medium text-gray-700">
            Gradient
          </label>
        </div>
        {logo?.background?.type === 'gradient' && (
          <div className="ml-7 space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Direction</label>
              <select
                value={logo?.background?.direction || 'br'}
                onChange={(e) => handleSettingChange('logo', { ...logo, background: { ...logo.background, direction: e.target.value } })}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                disabled={!editMode}
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
              {logo?.background?.colors?.map((color: string, index: number) => (
                <div key={index} className="flex items-center mt-2">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => {
                      const newColors = [...(logo.background.colors || [])];
                      newColors[index] = e.target.value;
                      handleSettingChange('logo', { ...logo, background: { ...logo.background, colors: newColors } });
                    }}
                    className="w-16 h-8 border-gray-300 rounded-md"
                    disabled={!editMode}
                  />
                  {index > 1 && (
                    <button
                      onClick={() => {
                        const newColors = [...(logo.background.colors || [])];
                        newColors.splice(index, 1);
                        handleSettingChange('logo', { ...logo, background: { ...logo.background, colors: newColors } });
                      }}
                      className="ml-2 text-red-500"
                      disabled={!editMode}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => {
                  const newColors = [...(logo.background.colors || []), '#ffffff'];
                  handleSettingChange('logo', { ...logo, background: { ...logo.background, colors: newColors } });
                }}
                className="mt-2 text-sm text-blue-600"
                disabled={!editMode}
              >
                + Add Color
              </button>
            </div>
          </div>
        )}
        <button
          onClick={() => setEditMode(!editMode)}
          className="mt-4 inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          {editMode ? <Save className="w-5 h-5 mr-2" /> : <Edit className="w-5 h-5 mr-2" />}
          {editMode ? 'Save Background Settings' : 'Edit Background Settings'}
        </button>
      </div>
    </div>
  );
};
