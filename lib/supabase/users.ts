import { supabase } from './client';

export const getAdminCount = async (): Promise<number> => {
  const { data, error, count } = await supabase
    .from('users')
    .select('*', { count: 'exact', head: true })
    .eq('user_metadata->>is_admin', 'true');

  if (error) {
    throw new Error(`Failed to get admin count: ${error.message}`);
  }

  return count || 0;
};

export const getUsers = async (): Promise<any[]> => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('is_admin', false) // hides admins in CustomersPage
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

export const updateUserStatus = async (userId: string, status: 'active' | 'inactive'): Promise<any> => {
  const { data, error } = await supabase
    .from('users')
    .update({ status })
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
};
