import { createClient } from '@supabase/supabase-js'

// Get environment variables with clear logging
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log('🔧 Supabase Configuration Check:')
console.log('  URL:', supabaseUrl ? '✅ Set' : '❌ Not Set')
console.log('  Anon Key:', supabaseAnonKey ? '✅ Set' : '❌ Not Set')

// Validate required environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  const missingVars = []
  if (!supabaseUrl) missingVars.push('NEXT_PUBLIC_SUPABASE_URL')
  if (!supabaseAnonKey) missingVars.push('NEXT_PUBLIC_SUPABASE_ANON_KEY')
  
  console.error('❌ CRITICAL: Missing environment variables:', missingVars.join(', '))
  console.error('⚠️ Supabase client will NOT work without these variables')
  console.error('📝 Please add them to Vercel Environment Variables and redeploy')
}

// Create Supabase client
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: typeof window !== 'undefined', // Only persist in browser
      },
    })
  : null

if (!supabase) {
  console.error('❌ Supabase client is NULL - database operations will fail')
}

// Export a safe getter function
export function getSupabaseClient() {
  if (!supabase) {
    throw new Error('Supabase client is not initialized. Check environment variables.')
  }
  return supabase
}
