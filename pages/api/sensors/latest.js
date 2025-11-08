import { supabase } from '@/lib/supabase'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  console.log('🔍 API /sensors/latest called')
  console.log('🔍 Environment check:', {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Missing',
    key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Missing'
  })

  // Check if Supabase is configured
  if (!supabase) {
    console.error('❌ Supabase client is NULL')
    console.error('❌ NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
    console.error('❌ NEXT_PUBLIC_SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'exists' : 'missing')
    return res.status(500).json({ 
      message: 'Database not configured',
      error: 'Supabase client is null. Check environment variables on Vercel.'
    })
  }

  console.log('✅ Supabase client initialized')

  try {
    // Get the latest reading from each sensor
    const tables = [
      'dust_sensor',
      'fire_alarm',
      'humidity',           // NEW: % humidity from air
      'humidity_sensor',    // ON/OFF for essential oil diffuser
      'light_dance_sensor',
      'light_sensor',
      'sound_dance_sensor',
      'temperature_sensor',
      'thieves_alarm',
    ]

    console.log('📊 Fetching data from', tables.length, 'tables...')
    const latestData = {}
    const errors = []

    for (const table of tables) {
      try {
        const { data, error } = await supabase
          .from(table)
          .select('*')
          .order('ts', { ascending: false })
          .limit(1)
          .single()

        if (error) {
          console.error(`❌ Error fetching ${table}:`, {
            message: error.message,
            code: error.code,
            details: error.details,
            hint: error.hint
          })
          errors.push({ table, error: error.message })
        } else if (data) {
          console.log(`✅ ${table}: Found data`)
          latestData[table] = data
        } else {
          console.warn(`⚠️ ${table}: Query returned null`)
        }
      } catch (err) {
        console.error(`❌ Exception fetching ${table}:`, err)
        errors.push({ table, error: err.message })
      }
    }

    console.log('📤 Returning data for', Object.keys(latestData).length, '/', tables.length, 'tables')
    
    if (errors.length > 0) {
      console.error('⚠️ Errors encountered:', errors)
    }

    // Return data even if some tables failed
    res.status(200).json({
      ...latestData,
      _meta: {
        totalTables: tables.length,
        successfulTables: Object.keys(latestData).length,
        errors: errors.length > 0 ? errors : undefined
      }
    })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: 'Internal server error', error: error.message })
  }
}
