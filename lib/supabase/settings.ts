import { supabase } from './client';

export const uploadLogo = async (file: File): Promise<string> => {
  const fileName = `logo-${Date.now()}.${file.name.split('.').pop()}`;

  // Try update first
  let { error } = await supabase.storage
    .from('logos')
    .update(fileName, file, { contentType: file.type });

  if (error && error.message.includes('not found')) {
    // If file doesn't exist, fallback to upload
    const res = await supabase.storage
      .from('logos')
      .upload(fileName, file, { contentType: file.type });
    error = res.error;
  }

  if (error) throw error;

  const { data } = supabase.storage
    .from('logos')
    .getPublicUrl(fileName);

  return data.publicUrl;
};

export const getSettings = async (): Promise<any> => {
  const { data, error } = await supabase
    .from('settings')
    .select('*');

  if (error) throw error;

  const settings = data.reduce((acc, setting) => {
    acc[setting.key] = setting.value;
    return acc;
  }, {} as any);

  return settings;
};

export const updateSetting = async (key: string, value: any): Promise<any> => {
  const { data, error } = await supabase
    .from('settings')
    .update({ value })
    .eq('key', key)
    .select()
    .single();

  if (error) throw error;
  return data;
};
