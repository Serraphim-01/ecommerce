"use client";

import { useState, useEffect } from 'react';
import { getSettings, updateSetting, uploadLogo } from '@/lib/supabase/settings';

export const useSettingsPage = () => {
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
      await handleSave("logo");
    } catch (error) {
      console.error("Error uploading logo:", error);
      alert("Failed to upload logo");
    }
  };

  return {
    settings,
    loading,
    error,
    editMode,
    setEditMode,
    handleSettingChange,
    handleGeneralSave,
    handleLogoImageUpload,
  };
};
