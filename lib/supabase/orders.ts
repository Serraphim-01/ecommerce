import { supabase } from './client';
import { Order } from '@/types';

export const createOrder = async (orderData: Omit<Order, 'id' | 'created_at' | 'updated_at'>): Promise<Order> => {
  const { data, error } = await supabase
    .from('orders')
    .insert(orderData)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getOrders = async (): Promise<Order[]> => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

export const getOrderById = async (id: string): Promise<Order | null> => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // Not found
    throw error;
  }
  return data;
};

export const updateOrderStatus = async (orderId: string, status: Order['status']): Promise<Order> => {
  const { data, error } = await supabase
    .from('orders')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', orderId)
    .select()
    .maybeSingle();

  if (error) throw error;
  return data;
};

export const uploadPaymentReceipt = async (file: File, orderId: string): Promise<string> => {
  const fileName = `payment-receipts/${orderId}-${Date.now()}.${file.name.split('.').pop()}`;

  const { data, error } = await supabase.storage
    .from('receipts')
    .upload(fileName, file);

  if (error) throw error;

  const { data: { publicUrl } } = supabase.storage
    .from('receipts')
    .getPublicUrl(fileName);

  return publicUrl;
};
