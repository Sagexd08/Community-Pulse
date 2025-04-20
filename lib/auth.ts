import { createClientSupabaseClient } from './supabase';

export async function getSession() {
  const supabase = createClientSupabaseClient();
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
}

export async function getUserProfile() {
  const session = await getSession();
  if (!session) return null;
  
  const supabase = createClientSupabaseClient();
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
}
