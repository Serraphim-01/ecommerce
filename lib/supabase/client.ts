import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kjnnelyffqesrmruohce.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtqbm5lbHlmZnFlc3JtcnVvaGNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyMzM4MTgsImV4cCI6MjA2NzgwOTgxOH0.S3JjHOwhH3OVJ_uFb2AdphwTtoX256LJBVcY5M52sSY';

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
