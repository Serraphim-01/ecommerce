import { supabase } from './client';

export const getShippingInfo = async (userId: string) => {
  const { data, error } = await supabase
    .from('shipping_info')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error && error.code !== 'PGRST116') { // Ignore 'not found' error
    throw error;
  }
  return data;
};

export const saveShippingInfo = async (userId: string, shippingData: any) => {
  const { data, error } = await supabase
    .from('shipping_info')
    .upsert({ user_id: userId, ...shippingData }, { onConflict: 'user_id' });

  if (error) {
    throw error;
  }
  return data;
};
