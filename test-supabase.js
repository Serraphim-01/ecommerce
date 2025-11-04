const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('Testing Supabase connection...');
console.log('URL:', supabaseUrl);
console.log('Key exists:', !!supabaseKey);

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    console.log('Testing getSession...');
    const { data, error } = await supabase.auth.getSession();
    console.log('getSession result:', { data, error });

    if (error) {
      console.error('Connection test failed:', error);
    } else {
      console.log('Connection test successful!');
    }
  } catch (err) {
    console.error('Connection test error:', err);
  }
}

testConnection();
